import {encodeSimpleCBOR, decodeSimpleCBOR, composeHeader} from '../src/miniCBOR';

describe('encode cbor', () => {
    it('should encode cbor data when below 24 bytes', () => {
        const x = encodeSimpleCBOR('c3fb80bf2c80732f369225e20f7c7aed')
        expect(x).toBe('50c3fb80bf2c80732f369225e20f7c7aed')
    })

    it('should encode cbor data when larger the 24 bytes not smaller than 255bytes', () => {
        const x = encodeSimpleCBOR('3ab1b5980595a6e13112c5739283ff5286379e0beac4f3427352a254c40a39ff')
        expect(x).toBe('58203ab1b5980595a6e13112c5739283ff5286379e0beac4f3427352a254c40a39ff')
    })
})


describe('decode cbor', () => {
    it('should encode cbor data when below 24 bytes', () => {
        const x = decodeSimpleCBOR('50c3fb80bf2c80732f369225e20f7c7aed')
        expect(x).toBe('c3fb80bf2c80732f369225e20f7c7aed')
    })

    it('should encode cbor data when larger the 24 bytes not smaller than 255bytes', () => {
        const x = decodeSimpleCBOR('58203ab1b5980595a6e13112c5739283ff5286379e0beac4f3427352a254c40a39ff')
        expect(x).toBe('3ab1b5980595a6e13112c5739283ff5286379e0beac4f3427352a254c40a39ff')
    })
})

describe('composeHeader', () => {
    it('should be right when  0< value < 24', () => {
        const header = composeHeader(14);
        expect(header).toEqual(Buffer.from([0x40 + 14]))
    })

    it('should be right when  24 <= value <=255', () => {
        const header = composeHeader(32);
        expect(header).toEqual(Buffer.from([0x58,0x20]))
    })

    it('should be right when  256 <= value <= 65535', () => {
        const header = composeHeader(267);
        expect(header).toEqual(Buffer.from([0x59,0x01, 0x0b]))
        const header2 = composeHeader(65535);
        const expected = Buffer.from([0x59,0xff,0xff])
        expect(header2).toEqual(expected)
    })

    it('should be right whe 65536 <= value <=  2 ** 32 - 1', () => {
        const header = composeHeader(65560);
        expect(header).toEqual(Buffer.from([0x60,0x00,0x01,0x00,0x18]))
    })
})


describe('encode-decode', () => {
    function getRandomString(length) {
        var randomChars = '0123456789abcdef';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    it('should encode and decode right', () => {
        const a = getRandomString(6364)
        const result = decodeSimpleCBOR(encodeSimpleCBOR(a))
        expect(a.toLowerCase()).toEqual(result)
    })
})
