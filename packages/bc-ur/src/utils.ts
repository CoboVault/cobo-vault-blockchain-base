import { crypto } from 'bitcoinjs-lib';

export const sha256Hash = (data: Buffer) => {
    return crypto.sha256(data);
};

export const compose3 = (f: Function, g: Function, h: Function) => (x: any) => {
    return f(g(h(x)));
};
