import React, { useEffect, useMemo, useState } from 'react';
import { interval } from 'rxjs';
import { BaseQRCode } from '../components/BaseQRCode';
import { Play } from '../types';
import { encodeUR } from '@cvbb/bc-ur';
import { EventEmitter } from 'events';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';

export const useAnimatedQRCodePlayer = (): [JSX.Element, { play: Play }] => {
    const [data, setData] = useState<string[]>([]);
    const [refreshSpeed, setRefreshSpeed] = useState(500);
    const [hasNext, setHasNext] = useState(false);
    const [index, setIndex] = useState(0);

    const [isPause, setPause] = useState(false);

    const pause = () => {
        setPause(true);
    };

    const play = () => {
        setPause(false);
    };

    const next = () => {
        setIndex((index) => {
            if (index >= splitArray.length - 1) {
                return 0;
            } else {
                return index + 1;
            }
        });
    };

    const prev = () => {
        setIndex((index) => {
            if (index < 0) {
                return splitArray.length - 1;
            } else {
                return index - 1;
            }
        });
    };

    const ee = useMemo(() => new EventEmitter(), []);
    const splitArray = data;
    const reset = () => {
        setData([]);
        setRefreshSpeed(500);
        setIndex(0);
    };

    useEffect(() => {
        if (!isPause) {
            const subscribe = interval(refreshSpeed).subscribe(() => {
                next();
            });
            return () => {
                subscribe.unsubscribe();
            };
        }
    }, [refreshSpeed, splitArray, isPause]);

    const finish = () => {
        ee.emit('finish', true);
    };

    const element = (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <BaseQRCode size={288} data={splitArray[index]} />
            <p style={{ textAlign: 'center' }}>
                {index + 1}/{splitArray.length}
            </p>
            <ButtonGroup>
                {isPause ? <Button onClick={play}>Play</Button> : <Button onClick={pause}>Pause</Button>}
                <Button onClick={next}>Next</Button>
                <Button onClick={prev}>Prev</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button onClick={finish}>{hasNext ? 'Next' : 'Finish'}</Button>
            </ButtonGroup>
        </div>
    );

    return [
        element,
        {
            play: (
                data: string,
                options?: {
                    refreshSpeed?: number;
                    hasNext?: boolean;
                },
            ) => {
                return new Promise((resolve) => {
                    const urs = encodeUR(data, 800);
                    setData(urs);
                    if (options) {
                        options.refreshSpeed && setRefreshSpeed(options.refreshSpeed);
                        options.hasNext && setHasNext(options.hasNext);
                    }
                    ee.once('finish', () => {
                        reset();
                        resolve();
                    });
                });
            },
        },
    ];
};
