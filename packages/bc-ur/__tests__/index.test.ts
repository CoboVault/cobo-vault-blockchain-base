import { encodeUR, decodeUR } from '../src';

describe('bc-ur', () => {
    it('should encode ur', () => {
        const random =
            '7e4a61385e2550981b4b5633ab178eb077a30505fbd53f107ec1081e7cf0ca3c0dc0bfea5b8bfb5e6ffc91afd104c3aa756210b5dbc5118fd12c87ee04269815ba6a9968a0d0d3b7a9b631382a36bc70ab626d5670b4b48ff843f4d9a15631aa67c7aaf0ac6ce7e3bff03b2c9643e3375e47493c4e0f8635329d66fdec41b10ce74dcbf25fc15d829e7830c325643a98561f441b40a02e8353493e6afc16192fe99d90d8ca65539af77ddeaccc8943a37563a9ba83675bd5d4da7c60c9a172cf6940cbf0ec8fe04175a629932e3512c5d2aaea3cca3246f40a21ffdc33c3987dc7b880351230eb3759fe3c7dc7b2d3a20a95996ff0b7a0dba834f96beb64c14e3426fb051a936ba41569ab99c0066a6d9c0777a49e49e6cbad24d722a4c7da112432679264b9adc0a8cff9dd1fe0ee9ee2747f6a68537c389a7303a1af23c534ee6392bc17b04cf0fbce7689e66b673a440c04a9454005b0c76664639113458eb7d0902eff04d11138ce2a8ee16a9cd7c8926514efa9bd83ae7a4c139835f0fe0f68c628e0645c8524c30dfc314e825a7aa13224d98e2f7a9d12183a999bb1f28549c99a9072d99c05c24e0c84848c4fc147a094ab7b69e9cbea86952fccf15500fbb234ffe6ee6e6ded515c8016cb017ba36fb931ef276cec4ed22c1aed1495d2df3b3ce66c03f5b9ffa8434bf0e8fb149de94e050b3da178df1f76c00a366cb2801fabdf1a1e90cd3cd45ecb7a930a40b151455f76b726d552f31c21324992da257ff8bde2923dfd5d0d6b87233fae215ffacbecd96249099e7e3427d533db56cdb09c7475b4ce3314e33f43953a7370866cc11d85f00b71b15510b46c4b4fa490c660ddfeda0ceb1b8265995f7071c155ad1b57465fdc0fa81a73f9f19ac4872029d5844c1838f732e803043673e26cbc5b51297a324ff00a2d2d4222bad556b93d27c8e376e3ff8f9d37b3073410708ebb3d4dd7473d27212310b71a3c33a5c8f87f44824640e7f8970f4eda9364195c87a91172b8f085f1773641dde1ce21938746234055bc971ce2325f814e3eec60f781dd4faf52afd5be4a6b38656f7e9739f724cb7ccd4e4d01e802add3dc7b83191f894b3ee0ed752ee514d5ec55';
        expect(encodeUR(random)).toStrictEqual([
            'ur:bytes/1of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/typjqlj2vyu9uf2snqd5k43n4vtcavrh5vzst7748ug8asggre70pj3uphqtl6jm30a4umlujxhazpxr4f6kyy94m0z3rr739jr7uppxnq2m565edzsdp5ah4xmrzwp2x678p2mzd4t8pd953luy8axe59trr2n8c740ptrvul3mlupm9jty8cehter5j0zwp7rr2v5a',
            'ur:bytes/2of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/vm77csd3pnn5mjljtlq4mq570qcvxfty82v9v86yrdq2qt5r2dynu6huzcvjl6vajrvv5e2nntmhmh4vejy58gm4vw5m4qm8t02afknuvry6zuk0d9qvhu8v3lsyzadx9xfjudgjchf2463uegeydaq2y8lacv7rnp7u0wyqx5frp6eht8lrclw8ktf6yz54n9hlpdaq',
            'ur:bytes/3of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/mw5rf7ttadjvzn35ymas2x5ndwjp26dtn8qqv6ndnsrh0fy7f8nvhtfy6u32f376zyjryeujvju6ms9gelua68lqa60wyarldf59xlpcnfes8gd0y0znfmnrj27p0vzv7rauua5fue4kwwjypsz2j32qqkcvwenyvwg3x3vwklgfqthlqng3zwxw928wz65u6lyfyeg5',
            'ur:bytes/4of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/a75mmqaw0fxp8xp47rlq76xx9rsxghy9ynpsmlp3f6p9574pxgjdnr3002w3yxp6nxdmru59f8ye4yrjmxwqtsjwpjzgfrz0c9r6p99t0d57njl2s62jln8325q0hv35llnwumnda4g4eqqkevqhhgm0hyc77fmva38dytq6a52ft5kl8v7wvmqr7kull2zrf0cw37c5',
            'ur:bytes/5of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/nh55upgt8ksh3hclwmqq5dnvk2qpl27lrg0fpnfu630vk75npfqtz529tamtwfk42te3cgfjfxfd5ftllz779y3al4ws66u8yvl6ug2llt97ektzfyyeul35yl2n8k6kekcfcar4kn8rx98r8ape2wnnwzrxesgashcqkud325gtgmztf7jfp3nqmhld5r8trwpxtx2l',
            'ur:bytes/6of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/wpcuz4ddrdt5vh7up75p5ule7xdvfpeq982cgnqc8rmn96qrqsm88cnvh3d4z2t6xf8lqz3d94pz9wk426un6f7gudmw8lu0n5mmxpe5zpcgaweafht5w0f8yy33pdc68se6tj8c0azgy3jqulufwr6wm2fkgx2us753zu4c7zzlzaekg8w7rn3pjwr5vg6q2k7fw88z',
            'ur:bytes/7of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/xf0czn37a3s00qwaf7h49t74he9xkwr9dalfww0hyn9hen2wf5q7sq4d60w8hqcer7y5k0hqa46jaeg56hk92xd0vz4',
        ]);
    });
    it('should encode payload does not need to split', () => {
        const random = '7e4a61385e2550981b4b5633ab178eb077a30505fb';
        expect(encodeUR(random)).toStrictEqual(['ur:bytes/24ly5cfctcj4pxqmfdtr82ch36c80gc9qhasmxdxs3']);
    });

    it('should decode ur with multiple workloads', () => {
        const workloads = [
            'ur:bytes/1of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/typjqlj2vyu9uf2snqd5k43n4vtcavrh5vzst7748ug8asggre70pj3uphqtl6jm30a4umlujxhazpxr4f6kyy94m0z3rr739jr7uppxnq2m565edzsdp5ah4xmrzwp2x678p2mzd4t8pd953luy8axe59trr2n8c740ptrvul3mlupm9jty8cehter5j0zwp7rr2v5a',
            'ur:bytes/2of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/vm77csd3pnn5mjljtlq4mq570qcvxfty82v9v86yrdq2qt5r2dynu6huzcvjl6vajrvv5e2nntmhmh4vejy58gm4vw5m4qm8t02afknuvry6zuk0d9qvhu8v3lsyzadx9xfjudgjchf2463uegeydaq2y8lacv7rnp7u0wyqx5frp6eht8lrclw8ktf6yz54n9hlpdaq',
            'ur:bytes/3of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/mw5rf7ttadjvzn35ymas2x5ndwjp26dtn8qqv6ndnsrh0fy7f8nvhtfy6u32f376zyjryeujvju6ms9gelua68lqa60wyarldf59xlpcnfes8gd0y0znfmnrj27p0vzv7rauua5fue4kwwjypsz2j32qqkcvwenyvwg3x3vwklgfqthlqng3zwxw928wz65u6lyfyeg5',
            'ur:bytes/4of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/a75mmqaw0fxp8xp47rlq76xx9rsxghy9ynpsmlp3f6p9574pxgjdnr3002w3yxp6nxdmru59f8ye4yrjmxwqtsjwpjzgfrz0c9r6p99t0d57njl2s62jln8325q0hv35llnwumnda4g4eqqkevqhhgm0hyc77fmva38dytq6a52ft5kl8v7wvmqr7kull2zrf0cw37c5',
            'ur:bytes/5of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/nh55upgt8ksh3hclwmqq5dnvk2qpl27lrg0fpnfu630vk75npfqtz529tamtwfk42te3cgfjfxfd5ftllz779y3al4ws66u8yvl6ug2llt97ektzfyyeul35yl2n8k6kekcfcar4kn8rx98r8ape2wnnwzrxesgashcqkud325gtgmztf7jfp3nqmhld5r8trwpxtx2l',
            'ur:bytes/6of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/wpcuz4ddrdt5vh7up75p5ule7xdvfpeq982cgnqc8rmn96qrqsm88cnvh3d4z2t6xf8lqz3d94pz9wk426un6f7gudmw8lu0n5mmxpe5zpcgaweafht5w0f8yy33pdc68se6tj8c0azgy3jqulufwr6wm2fkgx2us753zu4c7zzlzaekg8w7rn3pjwr5vg6q2k7fw88z',
            'ur:bytes/7of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/xf0czn37a3s00qwaf7h49t74he9xkwr9dalfww0hyn9hen2wf5q7sq4d60w8hqcer7y5k0hqa46jaeg56hk92xd0vz4',
        ];
        expect(decodeUR(workloads)).toBe(
            '7e4a61385e2550981b4b5633ab178eb077a30505fbd53f107ec1081e7cf0ca3c0dc0bfea5b8bfb5e6ffc91afd104c3aa756210b5dbc5118fd12c87ee04269815ba6a9968a0d0d3b7a9b631382a36bc70ab626d5670b4b48ff843f4d9a15631aa67c7aaf0ac6ce7e3bff03b2c9643e3375e47493c4e0f8635329d66fdec41b10ce74dcbf25fc15d829e7830c325643a98561f441b40a02e8353493e6afc16192fe99d90d8ca65539af77ddeaccc8943a37563a9ba83675bd5d4da7c60c9a172cf6940cbf0ec8fe04175a629932e3512c5d2aaea3cca3246f40a21ffdc33c3987dc7b880351230eb3759fe3c7dc7b2d3a20a95996ff0b7a0dba834f96beb64c14e3426fb051a936ba41569ab99c0066a6d9c0777a49e49e6cbad24d722a4c7da112432679264b9adc0a8cff9dd1fe0ee9ee2747f6a68537c389a7303a1af23c534ee6392bc17b04cf0fbce7689e66b673a440c04a9454005b0c76664639113458eb7d0902eff04d11138ce2a8ee16a9cd7c8926514efa9bd83ae7a4c139835f0fe0f68c628e0645c8524c30dfc314e825a7aa13224d98e2f7a9d12183a999bb1f28549c99a9072d99c05c24e0c84848c4fc147a094ab7b69e9cbea86952fccf15500fbb234ffe6ee6e6ded515c8016cb017ba36fb931ef276cec4ed22c1aed1495d2df3b3ce66c03f5b9ffa8434bf0e8fb149de94e050b3da178df1f76c00a366cb2801fabdf1a1e90cd3cd45ecb7a930a40b151455f76b726d552f31c21324992da257ff8bde2923dfd5d0d6b87233fae215ffacbecd96249099e7e3427d533db56cdb09c7475b4ce3314e33f43953a7370866cc11d85f00b71b15510b46c4b4fa490c660ddfeda0ceb1b8265995f7071c155ad1b57465fdc0fa81a73f9f19ac4872029d5844c1838f732e803043673e26cbc5b51297a324ff00a2d2d4222bad556b93d27c8e376e3ff8f9d37b3073410708ebb3d4dd7473d27212310b71a3c33a5c8f87f44824640e7f8970f4eda9364195c87a91172b8f085f1773641dde1ce21938746234055bc971ce2325f814e3eec60f781dd4faf52afd5be4a6b38656f7e9739f724cb7ccd4e4d01e802add3dc7b83191f894b3ee0ed752ee514d5ec55',
        );
    });

    it('should decode ur with random order', () => {
        const workloads = [
            'ur:bytes/7of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/xf0czn37a3s00qwaf7h49t74he9xkwr9dalfww0hyn9hen2wf5q7sq4d60w8hqcer7y5k0hqa46jaeg56hk92xd0vz4',
            'ur:bytes/4of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/a75mmqaw0fxp8xp47rlq76xx9rsxghy9ynpsmlp3f6p9574pxgjdnr3002w3yxp6nxdmru59f8ye4yrjmxwqtsjwpjzgfrz0c9r6p99t0d57njl2s62jln8325q0hv35llnwumnda4g4eqqkevqhhgm0hyc77fmva38dytq6a52ft5kl8v7wvmqr7kull2zrf0cw37c5',
            'ur:bytes/2of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/vm77csd3pnn5mjljtlq4mq570qcvxfty82v9v86yrdq2qt5r2dynu6huzcvjl6vajrvv5e2nntmhmh4vejy58gm4vw5m4qm8t02afknuvry6zuk0d9qvhu8v3lsyzadx9xfjudgjchf2463uegeydaq2y8lacv7rnp7u0wyqx5frp6eht8lrclw8ktf6yz54n9hlpdaq',
            'ur:bytes/5of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/nh55upgt8ksh3hclwmqq5dnvk2qpl27lrg0fpnfu630vk75npfqtz529tamtwfk42te3cgfjfxfd5ftllz779y3al4ws66u8yvl6ug2llt97ektzfyyeul35yl2n8k6kekcfcar4kn8rx98r8ape2wnnwzrxesgashcqkud325gtgmztf7jfp3nqmhld5r8trwpxtx2l',
            'ur:bytes/3of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/mw5rf7ttadjvzn35ymas2x5ndwjp26dtn8qqv6ndnsrh0fy7f8nvhtfy6u32f376zyjryeujvju6ms9gelua68lqa60wyarldf59xlpcnfes8gd0y0znfmnrj27p0vzv7rauua5fue4kwwjypsz2j32qqkcvwenyvwg3x3vwklgfqthlqng3zwxw928wz65u6lyfyeg5',
            'ur:bytes/6of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/wpcuz4ddrdt5vh7up75p5ule7xdvfpeq982cgnqc8rmn96qrqsm88cnvh3d4z2t6xf8lqz3d94pz9wk426un6f7gudmw8lu0n5mmxpe5zpcgaweafht5w0f8yy33pdc68se6tj8c0azgy3jqulufwr6wm2fkgx2us753zu4c7zzlzaekg8w7rn3pjwr5vg6q2k7fw88z',
            'ur:bytes/1of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/typjqlj2vyu9uf2snqd5k43n4vtcavrh5vzst7748ug8asggre70pj3uphqtl6jm30a4umlujxhazpxr4f6kyy94m0z3rr739jr7uppxnq2m565edzsdp5ah4xmrzwp2x678p2mzd4t8pd953luy8axe59trr2n8c740ptrvul3mlupm9jty8cehter5j0zwp7rr2v5a',
        ];
        expect(decodeUR(workloads)).toBe(
            '7e4a61385e2550981b4b5633ab178eb077a30505fbd53f107ec1081e7cf0ca3c0dc0bfea5b8bfb5e6ffc91afd104c3aa756210b5dbc5118fd12c87ee04269815ba6a9968a0d0d3b7a9b631382a36bc70ab626d5670b4b48ff843f4d9a15631aa67c7aaf0ac6ce7e3bff03b2c9643e3375e47493c4e0f8635329d66fdec41b10ce74dcbf25fc15d829e7830c325643a98561f441b40a02e8353493e6afc16192fe99d90d8ca65539af77ddeaccc8943a37563a9ba83675bd5d4da7c60c9a172cf6940cbf0ec8fe04175a629932e3512c5d2aaea3cca3246f40a21ffdc33c3987dc7b880351230eb3759fe3c7dc7b2d3a20a95996ff0b7a0dba834f96beb64c14e3426fb051a936ba41569ab99c0066a6d9c0777a49e49e6cbad24d722a4c7da112432679264b9adc0a8cff9dd1fe0ee9ee2747f6a68537c389a7303a1af23c534ee6392bc17b04cf0fbce7689e66b673a440c04a9454005b0c76664639113458eb7d0902eff04d11138ce2a8ee16a9cd7c8926514efa9bd83ae7a4c139835f0fe0f68c628e0645c8524c30dfc314e825a7aa13224d98e2f7a9d12183a999bb1f28549c99a9072d99c05c24e0c84848c4fc147a094ab7b69e9cbea86952fccf15500fbb234ffe6ee6e6ded515c8016cb017ba36fb931ef276cec4ed22c1aed1495d2df3b3ce66c03f5b9ffa8434bf0e8fb149de94e050b3da178df1f76c00a366cb2801fabdf1a1e90cd3cd45ecb7a930a40b151455f76b726d552f31c21324992da257ff8bde2923dfd5d0d6b87233fae215ffacbecd96249099e7e3427d533db56cdb09c7475b4ce3314e33f43953a7370866cc11d85f00b71b15510b46c4b4fa490c660ddfeda0ceb1b8265995f7071c155ad1b57465fdc0fa81a73f9f19ac4872029d5844c1838f732e803043673e26cbc5b51297a324ff00a2d2d4222bad556b93d27c8e376e3ff8f9d37b3073410708ebb3d4dd7473d27212310b71a3c33a5c8f87f44824640e7f8970f4eda9364195c87a91172b8f085f1773641dde1ce21938746234055bc971ce2325f814e3eec60f781dd4faf52afd5be4a6b38656f7e9739f724cb7ccd4e4d01e802add3dc7b83191f894b3ee0ed752ee514d5ec55',
        );
    });

    it('should decode ur with single workload', () => {
        expect(decodeUR(['ur:bytes/24ly5cfctcj4pxqmfdtr82ch36c80gc9qhasmxdxs3'])).toStrictEqual(
            '7e4a61385e2550981b4b5633ab178eb077a30505fb',
        );
    });

    it('should throw error with single invalid workload', () => {
        expect(() => {
            decodeUR(['ur:amd/24ly5cfctcj4pxqmfdtr82ch36c80gc9qhasmxdxs3']);
        }).toThrow();
        expect(() => {
            decodeUR(['ur:bytes/digest/24ly5cfctcj4pxqmfdtr82ch36c80gc9qhasmxdxs3']);
        }).toThrow();
    });

    describe('should throw error with multiple invalid workloads', () => {
        it('invalid index', () => {
            expect(() => {
                decodeUR([
                    'ur:bytes/1of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/typjqlj2vyu9uf2snqd5k43n4vtcavrh5vzst7748ug8asggre70pj3uphqtl6jm30a4umlujxhazpxr4f6kyy94m0z3rr739jr7uppxnq2m565edzsdp5ah4xmrzwp2x678p2mzd4t8pd953luy8axe59trr2n8c740ptrvul3mlupm9jty8cehter5j0zwp7rr2v5a',
                    'ur:bytes/1of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/vm77csd3pnn5mjljtlq4mq570qcvxfty82v9v86yrdq2qt5r2dynu6huzcvjl6vajrvv5e2nntmhmh4vejy58gm4vw5m4qm8t02afknuvry6zuk0d9qvhu8v3lsyzadx9xfjudgjchf2463uegeydaq2y8lacv7rnp7u0wyqx5frp6eht8lrclw8ktf6yz54n9hlpdaq',
                    'ur:bytes/3of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/mw5rf7ttadjvzn35ymas2x5ndwjp26dtn8qqv6ndnsrh0fy7f8nvhtfy6u32f376zyjryeujvju6ms9gelua68lqa60wyarldf59xlpcnfes8gd0y0znfmnrj27p0vzv7rauua5fue4kwwjypsz2j32qqkcvwenyvwg3x3vwklgfqthlqng3zwxw928wz65u6lyfyeg5',
                    'ur:bytes/4of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/a75mmqaw0fxp8xp47rlq76xx9rsxghy9ynpsmlp3f6p9574pxgjdnr3002w3yxp6nxdmru59f8ye4yrjmxwqtsjwpjzgfrz0c9r6p99t0d57njl2s62jln8325q0hv35llnwumnda4g4eqqkevqhhgm0hyc77fmva38dytq6a52ft5kl8v7wvmqr7kull2zrf0cw37c5',
                    'ur:bytes/5of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/nh55upgt8ksh3hclwmqq5dnvk2qpl27lrg0fpnfu630vk75npfqtz529tamtwfk42te3cgfjfxfd5ftllz779y3al4ws66u8yvl6ug2llt97ektzfyyeul35yl2n8k6kekcfcar4kn8rx98r8ape2wnnwzrxesgashcqkud325gtgmztf7jfp3nqmhld5r8trwpxtx2l',
                    'ur:bytes/6of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/wpcuz4ddrdt5vh7up75p5ule7xdvfpeq982cgnqc8rmn96qrqsm88cnvh3d4z2t6xf8lqz3d94pz9wk426un6f7gudmw8lu0n5mmxpe5zpcgaweafht5w0f8yy33pdc68se6tj8c0azgy3jqulufwr6wm2fkgx2us753zu4c7zzlzaekg8w7rn3pjwr5vg6q2k7fw88z',
                    'ur:bytes/7of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/xf0czn37a3s00qwaf7h49t74he9xkwr9dalfww0hyn9hen2wf5q7sq4d60w8hqcer7y5k0hqa46jaeg56hk92xd0vz4',
                ]);
            }).toThrow();
        });
        it('missing piece', () => {
            expect(() => {
                decodeUR([
                    'ur:bytes/1of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/typjqlj2vyu9uf2snqd5k43n4vtcavrh5vzst7748ug8asggre70pj3uphqtl6jm30a4umlujxhazpxr4f6kyy94m0z3rr739jr7uppxnq2m565edzsdp5ah4xmrzwp2x678p2mzd4t8pd953luy8axe59trr2n8c740ptrvul3mlupm9jty8cehter5j0zwp7rr2v5a',
                    'ur:bytes/2of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/vm77csd3pnn5mjljtlq4mq570qcvxfty82v9v86yrdq2qt5r2dynu6huzcvjl6vajrvv5e2nntmhmh4vejy58gm4vw5m4qm8t02afknuvry6zuk0d9qvhu8v3lsyzadx9xfjudgjchf2463uegeydaq2y8lacv7rnp7u0wyqx5frp6eht8lrclw8ktf6yz54n9hlpdaq',
                    'ur:bytes/3of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/mw5rf7ttadjvzn35ymas2x5ndwjp26dtn8qqv6ndnsrh0fy7f8nvhtfy6u32f376zyjryeujvju6ms9gelua68lqa60wyarldf59xlpcnfes8gd0y0znfmnrj27p0vzv7rauua5fue4kwwjypsz2j32qqkcvwenyvwg3x3vwklgfqthlqng3zwxw928wz65u6lyfyeg5',
                    'ur:bytes/4of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/a75mmqaw0fxp8xp47rlq76xx9rsxghy9ynpsmlp3f6p9574pxgjdnr3002w3yxp6nxdmru59f8ye4yrjmxwqtsjwpjzgfrz0c9r6p99t0d57njl2s62jln8325q0hv35llnwumnda4g4eqqkevqhhgm0hyc77fmva38dytq6a52ft5kl8v7wvmqr7kull2zrf0cw37c5',
                    'ur:bytes/6of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/wpcuz4ddrdt5vh7up75p5ule7xdvfpeq982cgnqc8rmn96qrqsm88cnvh3d4z2t6xf8lqz3d94pz9wk426un6f7gudmw8lu0n5mmxpe5zpcgaweafht5w0f8yy33pdc68se6tj8c0azgy3jqulufwr6wm2fkgx2us753zu4c7zzlzaekg8w7rn3pjwr5vg6q2k7fw88z',
                    'ur:bytes/7of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/xf0czn37a3s00qwaf7h49t74he9xkwr9dalfww0hyn9hen2wf5q7sq4d60w8hqcer7y5k0hqa46jaeg56hk92xd0vz4',
                ]);
            }).toThrow();
        });
        it('invalid piece', () => {
            expect(() => {
                decodeUR([
                    'ur:bytes/1of7/test/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/typjqlj2vyu9uf2snqd5k43n4vtcavrh5vzst7748ug8asggre70pj3uphqtl6jm30a4umlujxhazpxr4f6kyy94m0z3rr739jr7uppxnq2m565edzsdp5ah4xmrzwp2x678p2mzd4t8pd953luy8axe59trr2n8c740ptrvul3mlupm9jty8cehter5j0zwp7rr2v5a',
                    'ur:bytes/2of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/vm77csd3pnn5mjljtlq4mq570qcvxfty82v9v86yrdq2qt5r2dynu6huzcvjl6vajrvv5e2nntmhmh4vejy58gm4vw5m4qm8t02afknuvry6zuk0d9qvhu8v3lsyzadx9xfjudgjchf2463uegeydaq2y8lacv7rnp7u0wyqx5frp6eht8lrclw8ktf6yz54n9hlpdaq',
                    'ur:bytes/3of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/mw5rf7ttadjvzn35ymas2x5ndwjp26dtn8qqv6ndnsrh0fy7f8nvhtfy6u32f376zyjryeujvju6ms9gelua68lqa60wyarldf59xlpcnfes8gd0y0znfmnrj27p0vzv7rauua5fue4kwwjypsz2j32qqkcvwenyvwg3x3vwklgfqthlqng3zwxw928wz65u6lyfyeg5',
                    'ur:bytes/4of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/a75mmqaw0fxp8xp47rlq76xx9rsxghy9ynpsmlp3f6p9574pxgjdnr3002w3yxp6nxdmru59f8ye4yrjmxwqtsjwpjzgfrz0c9r6p99t0d57njl2s62jln8325q0hv35llnwumnda4g4eqqkevqhhgm0hyc77fmva38dytq6a52ft5kl8v7wvmqr7kull2zrf0cw37c5',
                    'ur:bytes/5of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/nh55upgt8ksh3hclwmqq5dnvk2qpl27lrg0fpnfu630vk75npfqtz529tamtwfk42te3cgfjfxfd5ftllz779y3al4ws66u8yvl6ug2llt97ektzfyyeul35yl2n8k6kekcfcar4kn8rx98r8ape2wnnwzrxesgashcqkud325gtgmztf7jfp3nqmhld5r8trwpxtx2l',
                    'ur:bytes/6of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/wpcuz4ddrdt5vh7up75p5ule7xdvfpeq982cgnqc8rmn96qrqsm88cnvh3d4z2t6xf8lqz3d94pz9wk426un6f7gudmw8lu0n5mmxpe5zpcgaweafht5w0f8yy33pdc68se6tj8c0azgy3jqulufwr6wm2fkgx2us753zu4c7zzlzaekg8w7rn3pjwr5vg6q2k7fw88z',
                    'ur:bytes/7of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/xf0czn37a3s00qwaf7h49t74he9xkwr9dalfww0hyn9hen2wf5q7sq4d60w8hqcer7y5k0hqa46jaeg56hk92xd0vz4',
                ]);
            }).toThrow();
        });
        it('invalid checksum', () => {
            expect(() => {
                decodeUR([
                    'ur:bytes/1of7/eysn6us0yvjdexn9yjkv3k7zjhp2sut478zuwcvgs5clswpfxhm7nyfjma/typjqlj2vyu9uf2snqd5k43n4vtcavrh5vzst7748ug8asggre70pj3uphqtl6jm30a4umlujxhazpxr4f6kyy94m0z3rr739jr7uppxnq2m565edzsdp5ah4xmrzwp2x678p2mzd4t8pd953luy8axe59trr2n8c740ptrvul3mlupm9jty8cehter5j0zwp7rr2v5a',
                    'ur:bytes/2of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/vm77csd3pnn5mjljtlq4mq570qcvxfty82v9v86yrdq2qt5r2dynu6huzcvjl6vajrvv5e2nntmhmh4vejy58gm4vw5m4qm8t02afknuvry6zuk0d9qvhu8v3lsyzadx9xfjudgjchf2463uegeydaq2y8lacv7rnp7u0wyqx5frp6eht8lrclw8ktf6yz54n9hlpdaq',
                    'ur:bytes/3of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/mw5rf7ttadjvzn35ymas2x5ndwjp26dtn8qqv6ndnsrh0fy7f8nvhtfy6u32f376zyjryeujvju6ms9gelua68lqa60wyarldf59xlpcnfes8gd0y0znfmnrj27p0vzv7rauua5fue4kwwjypsz2j32qqkcvwenyvwg3x3vwklgfqthlqng3zwxw928wz65u6lyfyeg5',
                    'ur:bytes/4of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/a75mmqaw0fxp8xp47rlq76xx9rsxghy9ynpsmlp3f6p9574pxgjdnr3002w3yxp6nxdmru59f8ye4yrjmxwqtsjwpjzgfrz0c9r6p99t0d57njl2s62jln8325q0hv35llnwumnda4g4eqqkevqhhgm0hyc77fmva38dytq6a52ft5kl8v7wvmqr7kull2zrf0cw37c5',
                    'ur:bytes/5of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/nh55upgt8ksh3hclwmqq5dnvk2qpl27lrg0fpnfu630vk75npfqtz529tamtwfk42te3cgfjfxfd5ftllz779y3al4ws66u8yvl6ug2llt97ektzfyyeul35yl2n8k6kekcfcar4kn8rx98r8ape2wnnwzrxesgashcqkud325gtgmztf7jfp3nqmhld5r8trwpxtx2l',
                    'ur:bytes/6of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/wpcuz4ddrdt5vh7up75p5ule7xdvfpeq982cgnqc8rmn96qrqsm88cnvh3d4z2t6xf8lqz3d94pz9wk426un6f7gudmw8lu0n5mmxpe5zpcgaweafht5w0f8yy33pdc68se6tj8c0azgy3jqulufwr6wm2fkgx2us753zu4c7zzlzaekg8w7rn3pjwr5vg6q2k7fw88z',
                    'ur:bytes/7of7/0jsmw5retzcecxhpgz2e6pnzw9qy98m0frafzjuwn324w4yf8xdq0h0cmw/xf0czn37a3s00qwaf7h49t74he9xkwr9dalfww0hyn9hen2wf5q7sq4d60w8hqcer7y5k0hqa46jaeg56hk92xd0vz4',
                ]);
            }).toThrow();
        });
    });
});
