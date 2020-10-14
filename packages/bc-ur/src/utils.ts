import shajs from 'sha.js';

export const sha256Hash = (data: Buffer) => {
    return shajs('sha256').update(data).digest();
};

export const compose3 = (f: Function, g: Function, h: Function) => (x: any) => {
    return f(g(h(x)));
};
