import React, { useMemo, useState } from 'react';
import QrReader from 'react-qr-reader';
import { decodeUR, extractSingleWorkload } from '@cvbb/bc-ur';
import { EventEmitter } from 'events';
import { Button } from '../components/Button';

import { Progress } from '../components/Progress';
import { Read } from '../types';
import { ButtonGroup } from '../components/ButtonGroup';

export interface URQRCodeData {
    total: number;
    index: number;
    data: string;
}

export const useAnimatedQRCodeReader = (): [JSX.Element, { read: Read }] => {
    const [urCodes, setURCodes] = useState<URQRCodeData[]>([]);
    const [error, setError] = useState('');
    const ee = useMemo(() => new EventEmitter(), []);
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const reset = () => {
        setURCodes([]);
        setError('');
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

    const handleStop = () => {
        ee.emit('read', {
            type: 'none',
            result: '',
        });
    };

    const handleRetry = () => {
        reset();
    };

    const processJSON = (data: string) => {
        JSON.parse(data);
        ee.emit('read', {
            type: 'json',
            result: data,
        });
    };

    const processText = (data: string) => {
        ee.emit('read', {
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
                    setError('invalid animated qrcode: mismatching qrs, please retry');
                }
            }
            if (!urCodes.find((item) => item.index === index)) {
                const newCodes = [...urCodes, { index, total, data: ur }];
                setURCodes(newCodes);
                if (newCodes.length === total) {
                    const result = decodeUR(newCodes.map((item) => item.data));
                    ee.emit('read', {
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {title && <p>{title}</p>}
            {description && <p>{description}</p>}
            <QrReader
                onScan={(data: any) => {
                    if (data) {
                        processQRCode(data);
                    }
                }}
                delay={100}
                style={{ width: '100%' }}
                onError={(e) => {
                    setError(e.message);
                }}
            />
            <p>
                {urCodes[0] && urCodes[0].total > 1 && <Progress progress={urCodes.length} total={urCodes[0].total} />}
            </p>
            <ButtonGroup>
                <Button onClick={handleStop}>Close</Button>
                {error && <Button onClick={handleRetry}>Retry</Button>}
            </ButtonGroup>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );

    return [
        element,
        {
            read: (options) => {
                return new Promise((resolve) => {
                    console.log(options);
                    if (options) {
                        options.title && setTitle(options.title);
                        options.description && setDescription(options.description);
                    }
                    ee.once('read', (result) => {
                        reset();
                        resolve(result);
                    });
                });
            },
        },
    ];
};
