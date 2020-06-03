import { createHash } from 'crypto';

export const sha256Hash = (data: Buffer) => {
    return createHash('sha256').update(data).digest();
};

export const compose3 = (f: Function, g: Function, h: Function) => (x: any) => {
    return f(g(h(x)));
};
