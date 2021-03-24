export type DecodedResult = {
    type: 'json' | 'ur' | 'text' | 'none';
    result: string;
    error?: string;
};

export type Play = (
    data: string,
    options?: {
        refreshSpeed?: number;
        hasNext?: boolean;
    },
) => Promise<void>;

export type Read = () => Promise<DecodedResult>;
