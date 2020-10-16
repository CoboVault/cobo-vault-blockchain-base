import { CVXRPSdk } from '../lib';

describe('sdk', () => {
    it('should encode bc-bech32 data', function () {
        const sdk = new CVXRPSdk();
        const data = "{'id': 'hello'}";
        expect(sdk.decodeQRData(sdk.encodeDataForQR(data))).toBe(data);
    });
});
