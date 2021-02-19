import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import '../../styles/index.scss';
import { extractSingleWorkload } from '@cvbb/bc-ur';

import { Progress } from '../components/Progress';

export interface URQRCodeData {
    total: number;
    index: number;
    data: string;
}

export const useAnimatedQRCodeReader = (): [JSX.Element, { read: () => any }] => {
    const [urCodes, setURCodes] = useState<URQRCodeData[]>([]);

    const reset = () => {
        setURCodes([]);
    };

    const processURQRCode = (ur: string) => {
        try {
            const [index, total] = extractSingleWorkload(ur);
            if (urCodes.length > 0) {
                const currentTotal = urCodes[0].total;
                if (total !== currentTotal) {
                    reset();
                    alert('invalid animated QRCode');
                }
            }
            if (!urCodes.find((item) => item.index === index)) {
                const newCodes = [...urCodes, { index, total, data: ur }];
                setURCodes(newCodes);
                if (newCodes.length === total) {
                    reset();
                }
            }
        } catch (e) {
            reset();
        }
    };

    const element = (
        <div>
            <QrReader
                onScan={(data: any) => {
                    if (data) {
                        processURQRCode(data);
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
                reset();
                return;
            },
        },
    ];
};
