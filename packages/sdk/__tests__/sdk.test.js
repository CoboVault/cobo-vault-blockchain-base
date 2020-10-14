import { CoboVaultSDK } from '../lib';

describe('sdk', () => {
    it('should encode and decode data frame for qr code', () => {
        const sdk = new CoboVaultSDK();
        const data = sdk.encodeDataForQR('helloWorld');
        expect(sdk.decodeQRData(data)).toBe('helloWorld');
        const test =
            '{"TransactionType":"AccountSet","Account":"rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn","Fee":"12","Sequence":5,"Domain":"6578616D706C652E636F6D","SetFlag":5,"MessageKey":"03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB"}';
        expect(sdk.decodeQRData(sdk.encodeDataForQR(test))).toBe(test);
    });
});
