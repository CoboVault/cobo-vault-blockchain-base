import { encodeBc32Data } from 'bc-bech32';
import { encodeSimpleCBOR } from './miniCbor';
import { createHash } from 'crypto';

const sha256 = (data: Buffer) => {
    return createHash('sha256').update(data).digest();
};

const compose3 = (f: Function, g: Function, h: Function) => (x: any) => {
    return f(g(h(x)));
};

const composeUR = (payload: string, type = 'bytes') => {
    return `ur:${type}/${payload}`;
};

const composeDigest = (payload: string, digest: string) => {
    return `${digest}/${payload}`;
};

const composeSequencing = (payload: string, index: number, total: number) => {
    return `${index + 1}of${total}/${payload}`;
};

const composeHeadersToFragments = (fragments: string[], digest: string, type = 'bytes') => {
    if (fragments.length === 1) {
        return [composeUR(fragments[0])];
    } else {
        return fragments.map((f, index) => {
            return compose3(
                (payload) => composeUR(payload, type),
                (payload) => composeSequencing(payload, index, fragments.length),
                (payload) => composeDigest(payload, digest),
            )(f);
        });
    }
};

export const encodeUR = (payload: string, fragmentCapacity = 200): string[] => {
    const cborPayload = encodeSimpleCBOR(payload);
    const bc32Payload = encodeBc32Data(cborPayload);
    const digest = sha256(Buffer.from(bc32Payload, 'hex')).toString('hex');
    const bc32Digest = encodeBc32Data(digest);
    const fragments = bc32Payload.match(new RegExp('.{1,' + fragmentCapacity + '}', 'g'));
    return composeHeadersToFragments(fragments, bc32Digest, 'bytes');
};
