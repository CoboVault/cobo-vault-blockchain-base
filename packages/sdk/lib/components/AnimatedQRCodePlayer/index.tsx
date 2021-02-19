import React, { useEffect, useState } from 'react';
import { interval } from 'rxjs';
import { BaseQRCode } from '../BaseQRCode';

const AnimatedQRCode = ({
    data,
    refreshSpeed = 800,
    size = 250,
    showIndicator = true,
}: {
    data: string[];
    refreshSpeed?: number;
    size?: number;
    showIndicator?: boolean;
}) => {
    const [index, setIndex] = useState(0);
    const splitArray = data;
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

    return (
        <div
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <BaseQRCode size={size} data={splitArray[index]} />
            </span>
            {showIndicator ? (
                <p style={{ textAlign: 'center' }}>
                    {index + 1}/{splitArray.length}
                </p>
            ) : null}
        </div>
    );
};

export const AnimatedQRCodePlayer = (props: {
    data: string[];
    refreshSpeed?: number;
    size?: number;
    showIndicator?: boolean;
}) => {
    return <AnimatedQRCode {...props} data={props.data.map((item) => item.toUpperCase())} />;
};
