import md5 from 'crypto-js/md5';
import { AnimatedQRDataTypeV1 } from '../types';

export const splitData = (data: string, capacity: number, compress = true) => {
    const checkSum = md5(data).toString();
    const partCount = Math.ceil(data.length / capacity);
    const partLength = Math.ceil(data.length / partCount);
    const parts = [];
    for (let i = 0; i < partCount; i++) {
        parts.push(data.substring(partLength * i, Math.min(partLength * i + partLength, data.length)));
    }
    return parts.map((code, index) => {
        return {
            total: partCount,
            index,
            checkSum,
            value: code,
            compress,
            valueType: 'protobuf',
        };
    });
};

export const verifyCheckSum = (data: string, checkSum: string) => {
    return md5(data).toString() === checkSum;
};

const diff = (a: AnimatedQRDataTypeV1, b: AnimatedQRDataTypeV1) => a.index - b.index;

export const extractData = (data: AnimatedQRDataTypeV1[]) => {
    const received = data.sort(diff);
    if (received.length <= 0 || !received[0].checkSum || typeof received[0].compress === 'undefined') {
        throw Error('input value is not supported');
    }
    const { checkSum } = received[0];
    received.forEach((element) => {
        if (element.checkSum !== checkSum) {
            throw Error('checkSums are not equal for all QRCode');
        }
    });

    const completeData = received.reduce((acc, current) => acc + current.value, '');
    if (verifyCheckSum(completeData, checkSum)) {
        return completeData;
    } else {
        throw Error('checkSum not valid');
    }
};
