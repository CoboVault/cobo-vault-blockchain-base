import { encodeBc32Data } from '../src';

describe('bc-besh32', () => {
    it('should encode bc-besh32 data', function () {
        const data = encodeBc32Data('48656c6c6f20776f726c64');
        expect(data).toBe('fpjkcmr0ypmk7unvvsh4ra4j');
        const data2 = encodeBc32Data('d934063e82001eec0585ee41ab5d8e4b703a4be1f73aec21e143912c56');
        expect(data2).toBe('jrvngp37sgqpamq9shhyr26a3e9hqwjtu8mn4mppu9peztzkkr5vuw');
    });
});
