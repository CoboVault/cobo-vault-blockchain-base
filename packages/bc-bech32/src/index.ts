import bech32 from './bech32';

export enum Bech32Version {
    Origin = 1,
    bis = 2,
}

function convertbits(data: Uint8Array, frombits: number, tobits: number, pad: boolean): number[] {
    let acc = 0;
    let bits = 0;
    const ret = [];
    const maxv = (1 << tobits) - 1;
    for (let p = 0; p < data.length; ++p) {
        const value = data[p];
        if (value < 0 || value >> frombits !== 0) {
            return null;
        }
        acc = (acc << frombits) | value;
        bits += frombits;
        while (bits >= tobits) {
            bits -= tobits;
            ret.push((acc >> bits) & maxv);
        }
    }
    if (pad) {
        if (bits > 0) {
            ret.push((acc << (tobits - bits)) & maxv);
        }
    } else if (bits >= frombits || (acc << (tobits - bits)) & maxv) {
        return null;
    }
    return ret;
}

export function decodeSegwitAddress(hrp: string, addr: string) {
    const dec = bech32.decode(addr);
    if (dec === null || dec.hrp !== hrp || dec.data.length < 1 || dec.data[0] > 16) {
        return null;
    }
    const res = convertbits(Uint8Array.from(dec.data.slice(1)), 5, 8, false);
    if (res === null || res.length < 2 || res.length > 40) {
        return null;
    }
    if (dec.data[0] === 0 && res.length !== 20 && res.length !== 32) {
        return null;
    }
    return { version: dec.data[0], program: res };
}

export function encodeSegwitAddress(hrp, version, program) {
    const ret = bech32.encode(hrp, [version].concat(convertbits(program, 8, 5, true)), Bech32Version.Origin);
    if (decodeSegwitAddress(hrp, ret) === null) {
        return null;
    }
    return ret;
}

export function encodeBc32Data(hex: string): string {
    const data = Buffer.from(hex, 'hex');
    const ret = bech32.encode(null, convertbits(data, 8, 5, true), Bech32Version.bis);
    return ret;
}

export function decodeBc32Data(data: string): null | string {
    const result = bech32.decode(data);
    if (result) {
        const res = convertbits(Buffer.from(result.data), 5, 8, false);
        return Buffer.from(res).toString('hex');
    } else {
        return null;
    }
}
