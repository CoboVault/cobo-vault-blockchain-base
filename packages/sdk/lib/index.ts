import { encodeUR, decodeUR } from '@cvbb/bc-ur';

export class CoboVaultSDK {
    public encodeDataForQR(data: string, fragmentCapacity = 500): string[] {
        const dataHex = Buffer.from(data).toString('hex');
        return encodeUR(dataHex, fragmentCapacity);
    }

    public decodeQRData(dataFrames: string[]): string {
        const hexString = decodeUR(dataFrames);
        return Buffer.from(hexString, 'hex').toString();
    }
}
