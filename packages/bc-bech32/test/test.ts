import { encodeBc32Data, decodeBc32Data, encodeSegwitAddress, decodeSegwitAddress } from '../src';

describe('bc-bech32', () => {
    it('should encode bc-bech32 data', function () {
        const data = encodeBc32Data('48656c6c6f20776f726c64');
        expect(data).toBe('fpjkcmr0ypmk7unvvsh4ra4j');
        const data2 = encodeBc32Data('d934063e82001eec0585ee41ab5d8e4b703a4be1f73aec21e143912c56');
        expect(data2).toBe('my6qv05zqq0wcpv9aeq6khvwfdcr5jlp7uawcg0pgwgjc4shjm6xu');
    });

    it('should decode bc-bech32 data', () => {
        const data = decodeBc32Data('fpjkcmr0ypmk7unvvsh4ra4j');
        expect(data).toBe('48656c6c6f20776f726c64');
        const data2 = encodeBc32Data('d934063e82001eec0585ee41ab5d8e4b703a4be1f73aec21e143912c56');
        expect(data2).toBe('my6qv05zqq0wcpv9aeq6khvwfdcr5jlp7uawcg0pgwgjc4shjm6xu');
    });

    describe('bech32', () => {
        describe('valid checksum', () => {
            const VALID_CHECKSUM = [
                'A12UEL5L',
                'an83characterlonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio1tt5tgs',
                'abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw',
                '11qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqc8247j',
                'split1checkupstagehandshakeupstreamerranterredcaperred2y9e3w',
            ];

            VALID_CHECKSUM.forEach((each) => {
                it(`should be vaild checksum for${each}`, () => {
                    const res = decodeBc32Data(each);
                    expect(res).not.toBeNull;
                });
            });
        });

        describe('invalid checksum', () => {
            const INVALID_CHECKSUM = [
                ' 1nwldj5',
                '\x7F' + '1axkwrx',
                'an84characterslonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio1569pvx',
                'pzry9x0s0muk',
                '1pzry9x0s0muk',
                'x1b4n0q5v',
                'li1dgmt3',
                'de1lg7wt' + '\xFF',
            ];

            INVALID_CHECKSUM.forEach((each) => {
                it('should be invaild checksum for' + each, () => {
                    const res = decodeBc32Data(each);
                    expect(res).toBeNull;
                });
            });
        });

        describe('valid address', () => {
            type addressObject = [string, number[]];

            function segwitScriptpubkey(version, program) {
                return [version ? version + 0x50 : 0, program.length].concat(program);
            }

            const VALID_ADDRESS: addressObject[] = [
                [
                    'BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4',
                    [
                        0x00,
                        0x14,
                        0x75,
                        0x1e,
                        0x76,
                        0xe8,
                        0x19,
                        0x91,
                        0x96,
                        0xd4,
                        0x54,
                        0x94,
                        0x1c,
                        0x45,
                        0xd1,
                        0xb3,
                        0xa3,
                        0x23,
                        0xf1,
                        0x43,
                        0x3b,
                        0xd6,
                    ],
                ],
                [
                    'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7',
                    [
                        0x00,
                        0x20,
                        0x18,
                        0x63,
                        0x14,
                        0x3c,
                        0x14,
                        0xc5,
                        0x16,
                        0x68,
                        0x04,
                        0xbd,
                        0x19,
                        0x20,
                        0x33,
                        0x56,
                        0xda,
                        0x13,
                        0x6c,
                        0x98,
                        0x56,
                        0x78,
                        0xcd,
                        0x4d,
                        0x27,
                        0xa1,
                        0xb8,
                        0xc6,
                        0x32,
                        0x96,
                        0x04,
                        0x90,
                        0x32,
                        0x62,
                    ],
                ],
                [
                    'bc1pw508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7k7grplx',
                    [
                        0x51,
                        0x28,
                        0x75,
                        0x1e,
                        0x76,
                        0xe8,
                        0x19,
                        0x91,
                        0x96,
                        0xd4,
                        0x54,
                        0x94,
                        0x1c,
                        0x45,
                        0xd1,
                        0xb3,
                        0xa3,
                        0x23,
                        0xf1,
                        0x43,
                        0x3b,
                        0xd6,
                        0x75,
                        0x1e,
                        0x76,
                        0xe8,
                        0x19,
                        0x91,
                        0x96,
                        0xd4,
                        0x54,
                        0x94,
                        0x1c,
                        0x45,
                        0xd1,
                        0xb3,
                        0xa3,
                        0x23,
                        0xf1,
                        0x43,
                        0x3b,
                        0xd6,
                    ],
                ],
                ['BC1SW50QA3JX3S', [0x60, 0x02, 0x75, 0x1e]],
                [
                    'bc1zw508d6qejxtdg4y5r3zarvaryvg6kdaj',
                    [
                        0x52,
                        0x10,
                        0x75,
                        0x1e,
                        0x76,
                        0xe8,
                        0x19,
                        0x91,
                        0x96,
                        0xd4,
                        0x54,
                        0x94,
                        0x1c,
                        0x45,
                        0xd1,
                        0xb3,
                        0xa3,
                        0x23,
                    ],
                ],
                [
                    'tb1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy',
                    [
                        0x00,
                        0x20,
                        0x00,
                        0x00,
                        0x00,
                        0xc4,
                        0xa5,
                        0xca,
                        0xd4,
                        0x62,
                        0x21,
                        0xb2,
                        0xa1,
                        0x87,
                        0x90,
                        0x5e,
                        0x52,
                        0x66,
                        0x36,
                        0x2b,
                        0x99,
                        0xd5,
                        0xe9,
                        0x1c,
                        0x6c,
                        0xe2,
                        0x4d,
                        0x16,
                        0x5d,
                        0xab,
                        0x93,
                        0xe8,
                        0x64,
                        0x33,
                    ],
                ],
            ];

            VALID_ADDRESS.forEach((each) => {
                it(`should be valid address for ${each[0]}`, () => {
                    const address = each[0];
                    const scriptpubkey = each[1];
                    let hrp = 'bc';
                    let ret = decodeSegwitAddress(hrp, address);
                    if (ret === null) {
                        hrp = 'tb';
                        ret = decodeSegwitAddress(hrp, address);
                    }
                    expect(ret).not.toBeNull;
                    const output = segwitScriptpubkey(ret.version, ret.program);
                    expect(output).toEqual(scriptpubkey);
                    const encodeAddress = encodeSegwitAddress(hrp, ret.version, ret.program);
                    expect(encodeAddress).toEqual(address.toLowerCase());
                });
            });
        });

        describe('invalid address', () => {
            const INVALID_ADDRESS = [
                'tc1qw508d6qejxtdg4y5r3zarvary0c5xw7kg3g4ty',
                'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t5',
                'BC13W508D6QEJXTDG4Y5R3ZARVARY0C5XW7KN40WF2',
                'bc1rw5uspcuh',
                'bc10w508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7kw5rljs90',
                'BC1QR508D6QEJXTDG4Y5R3ZARVARYV98GJ9P',
                'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sL5k7',
                'bc1zw508d6qejxtdg4y5r3zarvaryvqyzf3du',
                'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3pjxtptv',
                'bc1gmk9yu',
            ];

            INVALID_ADDRESS.forEach((each) => {
                it(`should be invalid address for ${each}`, () => {
                    const result1 = decodeSegwitAddress('bc', each);
                    const result2 = decodeSegwitAddress('tb', each);
                    const result = result1 && result2;
                    expect(result).toBeNull;
                });
            });
        });
    });
});
