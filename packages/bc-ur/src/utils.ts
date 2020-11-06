import shajs from 'sha.js';

export const sha256Hash = (data: Buffer) => {
    return shajs('sha256').update(data).digest();
};

export const compose3 = (f: (x: any) => any, g: (x: any) => any, h: (x: any) => any) => (x: any): any => {
    return f(g(h(x)));
};
