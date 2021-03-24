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
        title?: string;
        description?: string;
    },
) => Promise<void>;

export type Read = (options?: { title?: string; description?: string }) => Promise<DecodedResult>;
