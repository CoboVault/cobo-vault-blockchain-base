import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';
import '../../styles/index.scss';
import { extractSingleWorkload } from '@cvbb/bc-ur';

import { Progress } from '../Progress';

export interface URQRCodeData {
    total: number;
    index: number;
    data: string;
}

export const AnimatedQRCodeReader = () => {
    const [data, setData] = useState('');
    const [urCodes, setURCodes] = useState<URQRCodeData[]>([]);

    const clear = () => {
        setURCodes([]);
    };

    const processURQRCode = (ur: string) => {
        try {
            const [index, total] = extractSingleWorkload(ur);
            if (urCodes.length > 0) {
                const currentTotal = urCodes[0].total;
                if (total !== currentTotal) {
                    clear();
                    alert('invalid animated QRCode');
                }
            }
            if (!urCodes.find((item) => item.index === index)) {
                const newCodes = [...urCodes, { index, total, data: ur }];
                setURCodes(newCodes);
                if (newCodes.length === total) {
                    clear();
                }
            }
        } catch (e) {
            clear();
            setData(ur);
        }
    };

    const [decoderIsOpen, setDecoderOpen] = useState(false);

    useEffect(() => {
        if (!decoderIsOpen) {
            clear();
        }
    }, [decoderIsOpen]);

    return (
        <div className="row">
            <div className="col">
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
        </div>
    );
};
