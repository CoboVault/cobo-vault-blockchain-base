import { encodeUR, decodeUR } from '@cvbb/bc-ur';
import ReactDOM from 'react-dom';
import Root from './Root';
import React from 'react';

let initialized = false;

const encode = (data: string, fragmentCapacity = 500): string[] => {
    const dataHex = Buffer.from(data).toString('hex');
    return encodeUR(dataHex, fragmentCapacity);
};

const decode = (dataFrames: string[]): string => {
    const hexString = decodeUR(dataFrames);
    return Buffer.from(hexString, 'hex').toString();
};

const bootstrap = (): void => {
    const htmlBody = document.getElementsByTagName('body').item(0) as HTMLBodyElement;
    const sdkDiv = document.createElement('div');
    htmlBody.appendChild(sdkDiv);
    ReactDOM.render(React.createElement(Root), sdkDiv);
};

const setup = (r: () => any, p: (data: string) => void) => {
    initialized = true;
    read = r;
    play = p;
};

let read = () => {
    return;
};

let play = (data: string): void => {
    return;
};

export default {
    bootstrap,
    setup,
    makeService: () => {
        if (initialized) {
            return {
                read,
                play,
            };
        } else {
            throw new Error('SDK is not initialized');
        }
    },
};
