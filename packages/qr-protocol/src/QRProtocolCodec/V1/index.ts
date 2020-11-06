import { AnimatedQRDataTypeV1 } from '../types';
import { extractData, splitData } from './utils';
import { decode } from '../decode';
import { protoc } from '../../QRProtocolBuf/proto';
import { encode } from '../encode';

const constructQRCode = (base64: string, codeCapacity = 800): AnimatedQRDataTypeV1[] => {
    return splitData(base64, codeCapacity);
};

const extractQRCode = (codes: AnimatedQRDataTypeV1[]): string => {
    return extractData(codes);
};

const encodeProtobufToQRCode = (data: protoc.IBase, codeCapacity = 800): AnimatedQRDataTypeV1[] => {
    return constructQRCode(encode(data).toString('base64'), codeCapacity);
};

const decodeQRCodeToProtobuf = (data: AnimatedQRDataTypeV1[]): protoc.Base => {
    const compressed = extractQRCode(data);
    return decode(Buffer.from(compressed, 'base64'));
};

export default {
    constructQRCode,
    extractQRCode,
    encodeProtobufToQRCode,
    decodeQRCodeToProtobuf,
};
