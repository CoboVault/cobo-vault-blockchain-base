import React, { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { BaseQRCode } from '../components/BaseQRCode';
import { Play } from '../types';
import { encodeUR } from '@cvbb/bc-ur';

export const useAnimatedQRCodePlayer = (): [JSX.Element, { play: Play }] => {
    const [data, setData] = useState<string[]>([]);
    const [refreshSpeed, setRefreshSpeed] = useState(500);
    const [size, setSize] = useState(250);
    const [index, setIndex] = useState(0);
    const splitArray = data;
    const reset = () => {
        setData([]);
        setRefreshSpeed(500);
        setSize(250);
        setIndex(0);
    };
    useEffect(() => {
        const subscribe = interval(refreshSpeed).subscribe(() => {
            if (index >= splitArray.length - 1) {
                setIndex(0);
            } else {
                setIndex(index + 1);
            }
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, [refreshSpeed, splitArray]);
    const subject = new Subject<boolean>();

    const finish = () => {
        subject.next(true);
    };

    const element = (
        <div>
            <BaseQRCode size={size} data={splitArray[index]} />
            <p style={{ textAlign: 'center' }}>
                {index + 1}/{splitArray.length}
            </p>
            <button onClick={finish} />
        </div>
    );

    return [
        element,
        {
            play: (
                data: string,
                options?: {
                    refreshSpeed?: number;
                    size?: number;
                },
            ) => {
                return new Promise((resolve) => {
                    const urs = encodeUR(data, 800);
                    setData(urs);
                    if (options) {
                        options.refreshSpeed && setRefreshSpeed(options.refreshSpeed);
                        options.size && setSize(options.size);
                    }
                    const subscription = subject.subscribe((finish: boolean) => {
                        if (finish) {
                            reset();
                            subscription.unsubscribe();
                            subject.complete();
                            resolve();
                        }
                    });
                });
            },
        },
    ];
};
