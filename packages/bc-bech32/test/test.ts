import { encodeBc32Data, decodeBc32Data } from '../src';

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
    })
});
