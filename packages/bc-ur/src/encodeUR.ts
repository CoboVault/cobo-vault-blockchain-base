import { encodeSimpleCBOR } from './miniCbor';
import { encodeBc32Data } from '@cvbb/bc-bech32';
import { sha256Hash, compose3 } from './utils';

const composeUR = (payload: string, type = 'bytes'): string => {
    return `ur:${type}/${payload}`;
};

const composeDigest = (payload: string, digest: string): string => {
    return `${digest}/${payload}`;
};

const composeSequencing = (payload: string, index: number, total: number): string => {
    return `${index + 1}of${total}/${payload}`;
};

const composeHeadersToFragments = (fragments: string[], digest: string, type = 'bytes'): string[] => {
    if (fragments.length === 1) {
        return [composeUR(fragments[0])];
    } else {
        return fragments.map((f, index) => {
            return compose3(
                (payload: string) => composeUR(payload, type),
                (payload: string) => composeSequencing(payload, index, fragments.length),
                (payload: string) => composeDigest(payload, digest),
            )(f);
        });
    }
};

export const encodeUR = (payload: string, fragmentCapacity = 200): string[] => {
    const cborPayload = encodeSimpleCBOR(payload);
    const bc32Payload = encodeBc32Data(cborPayload);
    const digest = sha256Hash(Buffer.from(cborPayload, 'hex')).toString('hex');
    const bc32Digest = encodeBc32Data(digest);
    const fragments = bc32Payload.match(new RegExp('.{1,' + fragmentCapacity + '}', 'g'));
    if (!fragments) {
        throw new Error('Unexpected error when encoding');
    }
    return composeHeadersToFragments(fragments, bc32Digest, 'bytes').map((str) => str.toUpperCase());
};
