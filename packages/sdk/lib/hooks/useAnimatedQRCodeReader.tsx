import React, { useState } from 'react';
import { Subject } from 'rxjs';
import QrReader from 'react-qr-reader';
import { decodeUR, extractSingleWorkload } from '@cvbb/bc-ur';

import { Progress } from '../components/Progress';
import { DecodedResult, Read } from '../types';

export interface URQRCodeData {
    total: number;
    index: number;
    data: string;
}

export const useAnimatedQRCodeReader = (): [JSX.Element, { read: Read }] => {
    const [urCodes, setURCodes] = useState<URQRCodeData[]>([]);
    const [error, setError] = useState('');
    const subject = new Subject<DecodedResult>();
    const reset = () => {
        setURCodes([]);
    };

    const processQRCode = (qr: string) => {
        try {
            processJSON(qr);
        } catch (e1) {
            try {
                processUR(qr);
            } catch (e2) {
                processText(qr);
            }
        }
    };

    const processJSON = (data: string) => {
        JSON.parse(data);
        subject.next({
            type: 'json',
            result: data,
        });
    };

    const processText = (data: string) => {
        subject.next({
            type: 'text',
            result: data,
        });
    };

    const processUR = (ur: string) => {
        try {
            const [index, total] = extractSingleWorkload(ur);
            if (urCodes.length > 0) {
                const currentTotal = urCodes[0].total;
                if (total !== currentTotal) {
                    setError('invalid animated qrcode: mismatching qrs');
                }
            }
            if (!urCodes.find((item) => item.index === index)) {
                const newCodes = [...urCodes, { index, total, data: ur }];
                setURCodes(newCodes);
                if (newCodes.length === total) {
                    const result = decodeUR(newCodes.map((item) => item.data));
                    subject.next({
                        type: 'ur',
                        result,
                    });
                }
            }
        } catch (e) {
            setError(e.message);
        }
    };

    const element = (
        <div>
            <QrReader
                onScan={(data: any) => {
                    if (data) {
                        processQRCode(data);
                    }
                }}
                delay={100}
                style={{ width: 250 }}
                onError={(e) => {
                    console.log(e);
                }}
            />
            {urCodes[0] && urCodes[0].total > 1 && <Progress progress={urCodes.length} total={urCodes[0].total} />}
        </div>
    );

    return [
        element,
        {
            read: () => {
                return new Promise((resolve) => {
                    const subscription = subject.subscribe((decoded) => {
                        subscription.unsubscribe();
                        subject.complete();
                        reset();
                        resolve(decoded);
                    });
                });
            },
        },
    ];
};
