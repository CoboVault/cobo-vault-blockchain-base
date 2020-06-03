import { encodeSimpleCBOR } from './miniCbor';
import { encodeBc32Data } from 'bc-bech32';
import { sha256Hash, compose3 } from './utils';

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
    const digest = sha256Hash(Buffer.from(bc32Payload, 'hex')).toString('hex');
    const bc32Digest = encodeBc32Data(digest);
    const fragments = bc32Payload.match(new RegExp('.{1,' + fragmentCapacity + '}', 'g'));
    return composeHeadersToFragments(fragments, bc32Digest, 'bytes');
};
