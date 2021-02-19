import React, { useEffect, useState } from 'react';
import { interval } from 'rxjs';
import { BaseQRCode } from '../components/BaseQRCode';

export const useAnimatedQRCodePlayer = (): [JSX.Element, { play: () => any }] => {
    const [data, setData] = useState([]);
    const [refreshSpeed, setRefreshSpeed] = useState(800);
    const [size, setSize] = useState(250);
    const [index, setIndex] = useState(0);
    const splitArray = data;
    const reset = () => {
        setData([]);
        setRefreshSpeed(800);
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
    });

    const element = (
        <div>
            <BaseQRCode size={size} data={splitArray[index]} />
            <p style={{ textAlign: 'center' }}>
                {index + 1}/{splitArray.length}
            </p>
        </div>
    );

    return [
        element,
        {
            play: () => {
                reset();
                return;
            },
        },
    ];
};
