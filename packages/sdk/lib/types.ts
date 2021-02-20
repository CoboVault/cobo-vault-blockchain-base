export type DecodedResult = {
    type: 'json' | 'ur' | 'text';
    result: string;
    error?: string;
};

export type Play = (
    data: string,
    options?: {
        refreshSpeed?: number;
        size?: number;
    },
) => Promise<void>;

export type Read = () => Promise<DecodedResult>;
