import { decodeUR, encodeUR } from '@cvbb/bc-ur';
import { protoc } from '../../QRProtocolBuf/proto';
import { encode } from '../encode';
import { decode } from '../decode';

const constructQRCode = (hex: string, codeCapacity = 800): string[] => {
    return encodeUR(hex, codeCapacity).map((item) => item.toUpperCase());
};

const extractQRCode = (codes: string[]): string => {
    return decodeUR(codes);
};

const encodeProtobufToQRCode = (data: protoc.IBase, codeCapacity = 800): string[] => {
    return constructQRCode(encode(data).toString('hex'), codeCapacity);
};

const decodeQRCodeToProtobuf = (workloads: string[]): protoc.Base => {
    return decode(Buffer.from(extractQRCode(workloads), 'hex'));
};

export default {
    constructQRCode,
    extractQRCode,
    encodeProtobufToQRCode,
    decodeQRCodeToProtobuf,
};
