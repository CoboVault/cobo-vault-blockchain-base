import bech32 from './bech32';

export enum Bech32Version {
    Origin = 1,
    bis = 2,
}

const convertBits = (data: Uint8Array, fromBits: number, toBits: number, pad: boolean): number[] => {
    let acc = 0;
    let bits = 0;
    const ret = [];
    const maxv = (1 << toBits) - 1;
    for (let p = 0; p < data.length; ++p) {
        const value = data[p];
        if (value < 0 || value >> fromBits !== 0) {
            return null;
        }
        acc = (acc << fromBits) | value;
        bits += fromBits;
        while (bits >= toBits) {
            bits -= toBits;
            ret.push((acc >> bits) & maxv);
        }
    }
    if (pad) {
        if (bits > 0) {
            ret.push((acc << (toBits - bits)) & maxv);
        }
    } else if (bits >= fromBits || (acc << (toBits - bits)) & maxv) {
        return null;
    }
    return ret;
};

export const decodeSegwitAddress = (hrp: string, addr: string): { version: number; program: number[] } | null => {
    const dec = bech32.decode(addr);
    if (dec === null || dec.hrp !== hrp || dec.data.length < 1 || dec.data[0] > 16) {
        return null;
    }
    const res = convertBits(Uint8Array.from(dec.data.slice(1)), 5, 8, false);
    if (res === null || res.length < 2 || res.length > 40) {
        return null;
    }
    if (dec.data[0] === 0 && res.length !== 20 && res.length !== 32) {
        return null;
    }
    return { version: dec.data[0], program: res };
};

export const encodeSegwitAddress = (hrp: string, version: number, program: Uint8Array): string | null => {
    const ret = bech32.encode(hrp, [version].concat(convertBits(program, 8, 5, true)), Bech32Version.Origin);
    if (decodeSegwitAddress(hrp, ret) === null) {
        return null;
    }
    return ret;
};

export const encodeBc32Data = (hex: string): string => {
    const data = Buffer.from(hex, 'hex');
    return bech32.encode(null, convertBits(data, 8, 5, true), Bech32Version.bis);
};

export const decodeBc32Data = (data: string): null | string => {
    const result = bech32.decode(data);
    if (result) {
        const res = convertBits(Buffer.from(result.data), 5, 8, false);
        return Buffer.from(res).toString('hex');
    } else {
        return null;
    }
};
