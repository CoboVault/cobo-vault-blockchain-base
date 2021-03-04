import { EventEmitter } from 'events';
import hash from 'hash.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HDKey from 'hdkey';
import sdk from '@cvbb/sdk';
import ethUtil from 'ethereumjs-util';
import { Transaction } from 'ethereumjs-tx';

const keyringType = 'Air Gaped Device';
const pathBase = 'm';
const MAX_INDEX = 1000;

type StoredKeyring = {
    xfp: string;
    xpub: string;
    hdPath: string;
    accounts: string[];
    currentAccount: number;
    page: number;
    perPage: number;
    paths: Record<string, number>;
};

type PagedAccount = { address: string; balance: any; index: number };

class AirGapedKeyring extends EventEmitter {
    static type = keyringType;
    static async getKeyring(): Promise<AirGapedKeyring> {
        const decodedResult = await sdk.read();
        if (decodedResult) {
            if (decodedResult.type === 'json') {
                // {xfp: "", xpub: "", path: ""}
                const { xfp, xpub, path } = JSON.parse(decodedResult.result);
                if (xfp && xpub && path) {
                    return new AirGapedKeyring({
                        xfp,
                        xpub,
                        hdPath: path,
                        perPage: 5,
                        page: 0,
                        accounts: [],
                        currentAccount: 0,
                        paths: {},
                    });
                }
            }
        }
        throw new Error('invalid qrcode');
    }

    private xfp: string;
    private xpub: string;
    private hdPath: string;
    private type: string;
    private accounts: string[];
    private currentAccount: number;
    private page: number;
    private perPage: number;
    private paths: Record<string, number>;
    private hdk: HDKey;

    constructor(opts: StoredKeyring) {
        super();
        this.xfp = '';
        this.xpub = '';
        this.hdPath = '';
        this.page = 0;
        this.perPage = 5;
        this.type = keyringType;
        this.accounts = [];
        this.currentAccount = 0;
        this.paths = {};
        this.deserialize(opts);
    }

    serialize(): Promise<StoredKeyring> {
        return Promise.resolve({
            xfp: this.xfp,
            xpub: this.xpub,
            hdPath: this.hdPath,
            accounts: this.accounts,
            currentAccount: this.currentAccount,
            page: this.page,
            perPage: this.perPage,
            paths: this.paths,
        });
    }

    deserialize(opts: StoredKeyring): void {
        this.xfp = opts.xfp;
        this.xpub = opts.xpub;
        this.hdPath = opts.hdPath;
        this.accounts = opts.accounts;
        this.currentAccount = opts.currentAccount;
        this.page = opts.page;
        this.perPage = opts.perPage;
        this.paths = opts.paths;
    }

    setCurrentAccount(index: number): void {
        this.currentAccount = index;
    }

    addAccounts(n = 1): Promise<string[]> {
        return new Promise((resolve, reject) => {
            try {
                const from = this.currentAccount;
                const to = from + n;
                this.accounts = [];

                for (let i = from; i < to; i++) {
                    const address = this._addressFromIndex(pathBase, i);
                    this.accounts.push(address);
                    this.page = 0;
                }
                resolve(this.accounts);
            } catch (e) {
                reject(e);
            }
        });
    }

    getFirstPage(): Promise<PagedAccount[]> {
        this.page = 0;
        return this.__getPage(1);
    }

    getNextPage(): Promise<PagedAccount[]> {
        return this.__getPage(1);
    }

    getPreviousPage(): Promise<PagedAccount[]> {
        return this.__getPage(-1);
    }

    __getPage(increment: number): Promise<PagedAccount[]> {
        this.page += increment;

        if (this.page <= 0) {
            this.page = 1;
        }

        return new Promise((resolve, reject) => {
            try {
                const from = (this.page - 1) * this.perPage;
                const to = from + this.perPage;

                const accounts = [];

                for (let i = from; i < to; i++) {
                    const address = this._addressFromIndex(pathBase, i);
                    accounts.push({
                        address,
                        balance: null,
                        index: i,
                    });
                    this.paths[ethUtil.toChecksumAddress(address)] = i;
                }
                resolve(accounts);
            } catch (e) {
                reject(e);
            }
        });
    }

    getAccounts(): Promise<string[]> {
        return Promise.resolve(this.accounts.slice());
    }

    removeAccount(address: string): void {
        if (!this.accounts.map((a) => a.toLowerCase()).includes(address.toLowerCase())) {
            throw new Error(`Address ${address} not found in this keyring`);
        }
        this.accounts = this.accounts.filter((a) => a.toLowerCase() !== address.toLowerCase());
    }

    async readSignature(signId: string): Promise<{ r: Buffer; s: Buffer; v: Buffer }> {
        const signature = await sdk.read();
        if (signature) {
            if (signature.type === 'ur') {
                const { peerSignId, signatureHex } = JSON.parse(signature.result);
                if (peerSignId && signatureHex) {
                    if (peerSignId !== signId) {
                        throw new Error('read signature error: mismatched signId');
                    }
                    const r = Buffer.from(signatureHex.slice(0, 64), 'hex');
                    const s = Buffer.from(signatureHex.slice(64, 128), 'hex');
                    const v = Buffer.from(signatureHex.slice(128), 'hex');
                    return {
                        r,
                        s,
                        v,
                    };
                }
            } else {
                throw new Error('invalid signature qrcode');
            }
        }
        throw new Error('read signature canceled');
    }
    // tx is an instance of the ethereumjs-transaction class.
    async signTransaction(address: string, tx: Transaction): Promise<Transaction> {
        tx.v = Buffer.from([tx.getChainId()]);
        const txHex = tx.serialize().toString('hex');
        const hdPath = this._pathFromAddress(address);
        const signId = hash.sha256().update(`${txHex}${hdPath}${this.xfp}`).digest('hex').slice(0, 8);
        const signPayload = {
            txHex,
            xfp: this.xfp,
            hdPath,
            signId,
        };
        await sdk.play(JSON.stringify(signPayload));
        const { r, s, v } = await this.readSignature(signId);
        tx.r = r;
        tx.s = s;
        tx.v = v;
        return tx;
    }

    //
    // signMessage(withAccount, data) {
    //   return this.signPersonalMessage(withAccount, data)
    // }
    //
    // // For personal_sign, we need to prefix the message:
    // signPersonalMessage(withAccount, message) {
    //   return new Promise((resolve, reject) => {
    //     this.unlock()
    //       .then((status) => {
    //         setTimeout(
    //           (_) => {
    //             TrezorConnect.ethereumSignMessage({
    //               path: this._pathFromAddress(withAccount),
    //               message: ethUtil.stripHexPrefix(message),
    //               hex: true,
    //             })
    //               .then((response) => {
    //                 if (response.success) {
    //                   if (
    //                     response.payload.address !==
    //                     ethUtil.toChecksumAddress(withAccount)
    //                   ) {
    //                     reject(
    //                       new Error('signature doesnt match the right address'),
    //                     )
    //                   }
    //                   const signature = `0x${response.payload.signature}`
    //                   resolve(signature)
    //                 } else {
    //                   reject(
    //                     new Error(
    //                       (response.payload && response.payload.error) ||
    //                         'Unknown error',
    //                     ),
    //                   )
    //                 }
    //               })
    //               .catch((e) => {
    //                 console.log('Error while trying to sign a message ', e)
    //                 reject(new Error((e && e.toString()) || 'Unknown error'))
    //               })
    //             // This is necessary to avoid popup collision
    //             // between the unlock & sign trezor popups
    //           },
    //           status === 'just unlocked' ? DELAY_BETWEEN_POPUPS : 0,
    //         )
    //       })
    //       .catch((e) => {
    //         console.log('Error while trying to sign a message ', e)
    //         reject(new Error((e && e.toString()) || 'Unknown error'))
    //       })
    //   })
    // }
    //
    async signTypedData(withAccount: string, typedData: any): Promise<Buffer> {
        const hdPath = this._pathFromAddress(withAccount);
        const signId = hash
            .sha256()
            .update(`${JSON.stringify(typedData)}${hdPath}${this.xfp}`)
            .digest('hex')
            .slice(0, 8);
        const signPayload = {
            data: typedData,
            xfp: this.xfp,
            hdPath,
            signId,
        };
        await sdk.play(JSON.stringify(signPayload));
        const { r, s, v } = await this.readSignature(signId);
        return Buffer.concat([r, s, v]);
    }

    _addressFromIndex(pb: string, i: number): string {
        if (!this.hdk) {
            this.hdk = HDKey.fromExtendedKey(this.xpub);
        }
        const dkey = this.hdk.derive(`${pb}/0/${i}`);
        const address = ethUtil.publicToAddress(dkey.publicKey, true).toString('hex');
        return ethUtil.toChecksumAddress(address);
    }

    _pathFromAddress(address: string): string {
        const checksummedAddress = ethUtil.toChecksumAddress(address);
        let index = this.paths[checksummedAddress];
        if (typeof index === 'undefined') {
            for (let i = 0; i < MAX_INDEX; i++) {
                if (checksummedAddress === this._addressFromIndex(pathBase, i)) {
                    index = i;
                    break;
                }
            }
        }

        if (typeof index === 'undefined') {
            throw new Error('Unknown address');
        }
        return `${this.hdPath}/0/${index}`;
    }
}

export default AirGapedKeyring;
