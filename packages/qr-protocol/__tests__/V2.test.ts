import { V2 } from '../src/QRProtocolCodec';
import { sync } from './__data__/sync';
import { decodedSync } from './__data__/decodedSync';

const workloads = [
    'UR:BYTES/1OF4/XMJ8QFNR8XQG950YASDVXR9Q8S4FNJV8ZCX5S4SSR34P8K7PW64QKRJC7D/TYRYV8UTPQQQQQQQQQQP8NVKEX82T4SPSE275TZ66AC3GAEK9KHMCUMK2HXTQZENQY8QM9UER5WXDNRSNXU499RPZ9Z3J9537G28NTDUFZ5WADJAVHJSZG43G60LALLMEUUK787705ZLHF8LV6XE0MLXDAHZ8MXNAN4HL0MML0CWUDECS53ZNXJSFZRVV2XXVQ55RFM53GN43R5SPYXLZDYXYJDREG2099XN6Y208RMYGEZYR3FSCZK3S3ST9TLL7027TTC0JUMEESLL7TS7K0EUTJLQPREC70K785LN77HDLPE9YYZ6ESKFZRRKC2D0G5HZCV6WCWFRJPXHJMSL8PRKVCWPPHY2JQENKXKUG6CGUUDG06W5YU8G00860ZH04SK3VD6534E8URR0SJLWZ9QASAHVVHHMKRZAXDDKP22K8EFF08LHP7WMPY3HAP8EU0P7TEE8PNLW6GUFHJSWZ73ESN25ZYT28MA8AZCU4G9W0Y00C37ZDTLNY8E8ETGGF0YLY7TTJ7FE6SRMYPSVV3HHR5YSWV8THXHLPZ2VYMDY64YC54MLJEQ98MDAGDNGGRNZ6CVC5DVW0FC5R87YPGAU5EUEJRT0JNE39VY2XRGNSK6XXHQ75Y282C2NAXVYMCY5RTQFWEW36EQRHXJR4FSME4QXR4R9JSVH5MVDU6QTNCCJ9S3UM2VA5VEPWGDTYNS2DZYZZLZDM2AV0HRW0GGELD8P6NU6HUL303FL607WNC0JU5N35PP8TM3DGQSNSSGZJ3GDKFST9CUFV45S5MR5V2AJ862M',
    'UR:BYTES/2OF4/XMJ8QFNR8XQG950YASDVXR9Q8S4FNJV8ZCX5S4SSR34P8K7PW64QKRJC7D/M25Z9C4G77UK4XKVK3N3ZD54FZ42QDN3DJT8XDWXVR9G8W6R6FJ26XNFSZMGC44WGQ50RNQZPJDA5NTRAYAYSPYELS2VANCY6ET8U988U3U5JGECT5FPFZWEJ0KHSTVT4FJ6DQJJQ7PY973WAWT24HUTMST9FUF29T2TDFY8VQQURM5A2JM64UYXEHY357WDRKDPN4VPG2NA439WWM9CYA5EX4U6NNVCNLHXG2KJGRSEHYLXM9306FCK5VH685TXSED0ZS5UV3WFYXG39LZHU9KAH9H867NY2U8M52J7FAKN5U3CGMU4E4RFWSCARNTU3UJ5HJVC3GEXUA7GHGXJFMXVPQN27RMNELV98PXASS3DN5R95RW3F7PHQMS5AXRLNNGN34C0CM464XZH25VUJ7340W6PAZG79ZNTTWA7XLWYX43XJK3LRC6J47K2AKWNR5906TKCV3VXWZ80P2JCQVL49EMRM5AYXC5H9W88Z3Q4LVKVXZ6TWPKM2CZLWZDU2WH4RQ6NJNTSMJMSLLKTRSZLTAUCE06VSA4665XPAYTZQE2TWW5ZXPQ9659HJN992XH8S329PKLQFFKKTE2XEA9KPGXUTG5WSZQ5QN4JUC498N9ZA4PJEDRKG2NGNCXCCYAQEE4W8T7AA7N4FL3Y2MPVK0FER40KM83JPCJLS7PERT72QGG4W8NEZXPYEG7UCH3N0ZFQH9SX4YWXFDWXK6EE9GG4EDZZ5X72XHNQD3TJ5GHXF60FV29FY9RW34J6R6G35NMRSZS8ZZJJ7CMYKEM2HXH24W7A',
    'UR:BYTES/3OF4/XMJ8QFNR8XQG950YASDVXR9Q8S4FNJV8ZCX5S4SSR34P8K7PW64QKRJC7D/FJNWQ537V69UMAEC2LEJ0V7ZTL3WQXZA9WXUJZAA0QGRT2LQX9FHYUECCFSMGDMEZ4V45FC55W7QNPC6YDLXGRJ32QECYCWV6W6CDJN787CAGX6ZFLQXAYHKZE4TWSVG59YU0SXKFPXDEMCP02HWFP8VM7LMNL8NWNNMW8MVULJ0NU7RU4TE77ZSQMUHC28LFQJMJSFTZXFDHJ97FD4HWZJE0WRUGQQRTGVM8MLW4SAHD8K06WV2R3WKA7XAVEVS40MNFW8ZXCCTPSGFTW36V3TQM7AKQD282MWHWFJ09PMNL89MCGTDK63ZFPP4XDPL2G0UWFT7KQLCM6C8N405D389HXLMS6MER58R3Z3HGEQSKJESR3JFLMCT8TJVVXH8DPX65CQHGAR55D3K5Z89SF62H6R6RWK9MT0GD3TQ937APJYJ5EVZHX5VYGFGSMVQC3W6VC9VX2A789V7S9RJ49AL8N9LECFENL047T503APL7HGN5L7LCXVYPYJXCX5CE3WY2SMFSKKDKZ4XTND84W7DMG55W3QH85LDQDM8KR7QAVD900SR3DZSSTVSCJXJYYNH8Z9R0F82MYDRUPKUZK3CW62QQJU6JZ73ZVK98P33M34W8NPHNNAH64VAQX7DQCNU4MEWDU03LXM93TDLSLUQPP6P5PWP4TD5KAL7F6RYNXE6RFGL5DFA2TW8GFUD32WMF303XVG9XZ6FJPGRF9JJS0TMS3WTF2LZKNW8YM4EZ32W2X24N9YK6M5NFECM4EWTTZA804L7PUZJ7P9X9CSF002AQCKJ',
    'UR:BYTES/4OF4/XMJ8QFNR8XQG950YASDVXR9Q8S4FNJV8ZCX5S4SSR34P8K7PW64QKRJC7D/DSWGNDA5EYNXN6JZAK9Q2C6MAYQWK4CGYKS8TG7U8WUCAZFPKK3M5G6G0S5EJCKGCN2AARV9ML4G9T46HDZ4P2W52MS4JVTF02L8NJKMWW8YTXD9H0GWE42DMELLZU2NLUMN396LLL952L7P8UL6R0Y0FU588M8LP0QW98D025YSQQQ3CU9DN',
];

describe('QRProtocolCodec V1', () => {
    it('should construct QRCode', () => {
        const data =
            '1f8b0800000000000013cd96c98ea5d6018655ea2c5ad7711477362dafbc737655ccb00b33010e0d97991d1c66cc7099b95294611145191691f21479adbc48a8eeb65d65e50122b1469ffefffbcf396f1fde7d05fba4ff668d97efe66f6e23ecd3eceb7fbf7bfbf0ee37388522299a504886c628c6602941a7748a27588e90090df13486249a3ca14f294d3d114f38f64464441c530c0ad18460b2affff3d5e5af0f97379cc3fff2e1eb3f3c5cbe008f38f3ede3d3f3f7aedf87252105acc2c910c76c29af452e2c334ec3923904d796e1f38476661c10dc8a90333b1adc46b08e71a87e9d4270e87bcfa78aefac2d1637548d727e0c6f84bee1141d876ec65efbb0c5d335b60a9563e52979ff70f9db09237e84f9e3c3e5e7270cfeed2389bca0e17a3984d541116a3efa7e8b1caa0ae791efc47c26aff321f27cad084bc9f2796b97939d407b2060c646f71d090730ebb9aff0894c26da4d5498a577f964053edbd4366840e62d6198a358e7a71419fc40a3bca679990d6f94f312b08a30d1385b4635c1ea114756153e9984de0941ac09765d1d6403b9a43aa61bcd4061d46594197a6d8de680b9e3122c23cda99da3321721ab24e0a6888217c4ddabac7dc6e7a119fb4e1d4f9abf3f17c53fd3fce9e1f2e5271a04275ee2d40213841029450db260b2e38965690a6c7462bb23e95bdaa822e2a8f7b96a9accb46711369548aaa036716c967335c660ca83bb43d264ad1a6980b68c56ae4028f1cc020c9bda4d63e93a480499fc14cecf04d6567e14e7e4794923385d121489d993ed782d8baa65a68252078242fa2eeb96aadf8bdc1654f12a2ad4b6a4876001c1ee9d54b7aaf086cdc91a79cd1d9a19d58142a7dac4ae76cb8276993579a9cd989fee642ad240e19b93e6d962fd2716a32fa3d166865af1429c645c9219112fc57e16ddb96e7d7a64570fba2a5e4f6d3a723846f95cd4697431d1cd7c8f254bc9988a326e77c8ba0d24eccc0826af0f73cfd85384dd8422d9d065a0dd14f83706e14e987f9cd138d70fc6ebaa98575519c97a357bb41e891e28a6b5bbbe37dc43562695a3f1e352afacaed9d31d0afd2ed864586708ef0aa58033f52e763dd3a4362972b8e714415fb2cc30b4b706db5605f709bc53af51835394d70dcb70ffecb1c05f5f798cbf4c876bad50c1e91620654b73a8230405d50b794ca551ae7845450dbe04a6d65e546cf4b60a0dc5a28e8081404eb2e62a53cca2ed432cb47642a689e0d8c13a0ce6ae3afddefa754fe2456c2cb3d391d5f6d9e320e25f878391afca0211571e7911824ca3dcc5e3378920b9606a91c64b5c6b6b392a115cb442a1bca35e606c572a22e64e9e9628a92146e8d65a1e911a4f6380a0710a52f6364b676ab9aeaabbdd4ca6e0523e668bcdf73857f327b3c25fe2e0185d2b8dc90bbd781035abe03153727338c261b4377915595a2714a3bc09871a237e640e5150338261ccd3b586ca7e3fb1d41b424fc06e92f6166ab74188a149c7c0d6484cdcef017aaee484ecdfbfb9fcf374e7b71f6ce7e4f9f3c3e5579f785006f97c28ff4825b9412b1192dbc8be4b6b770a597b87c400035a19b3efeeac3b769ecfd398a1c5d6ef8dd66590abf734b8e23630b0c1095ba3a64560dfbb60354756dd77264f28773f9cbbc216db6a22484353343f521fc7257eb03f8deb079d5f46c4e5b9bfb86b791d0e388a3746410b4b301c649fef0b3ae4c61ae7684daa601747474a3636a08e58274abe87a1bac5dade86c5602c7dd0c892a6582b9a8c2212886d80c45da660ac32bbe3959e81472a97bf3ccbfce1399fdf5f2e8f8f43ff5d13a7fdfc198409246c1a98cc5c45436985acdb0aa65cda7abbcdda294744173d3ed03767b0fc0eb1a57be038b45082d90c48d221277388a37a4ead91a3e06dc15a387694004b9a90bd1132c538631dc6ae3cc379cfb7d559d01bcd0627caef2e6f1f1f9b658adbf87f8008741a05c1aadb4b77fe4e86499b3a1a51fa353d52dc74278d8a9db4c5f13310530b49905034965283d7b845cb4abe2b4dc726eb91454e5195599496d6e934e71bae5cb58ba77d7fe0f052f04a62e2097bd5d062d26c1c89b7b4c92669ea42ed8a05635be900eb570825a075a3dc3bb98e8921b5a3ba23487c299962c8c4d5de8d85dfea82aebabb4550a9d456e15931697abe79cadb738e4599a5bbd0ecd54dde7ff17153ff3738975fffcb457fc13f3fa1bc8f4f2873ecff0bc0e29daf55090000';
        expect(V2.constructQRCode(data)).toStrictEqual(workloads);
    });
    it('should extract QRCode', () => {
        expect(V2.extractQRCode(workloads)).toBe(
            '1f8b0800000000000013cd96c98ea5d6018655ea2c5ad7711477362dafbc737655ccb00b33010e0d97991d1c66cc7099b95294611145191691f21479adbc48a8eeb65d65e50122b1469ffefffbcf396f1fde7d05fba4ff668d97efe66f6e23ecd3eceb7fbf7bfbf0ee37388522299a504886c628c6602941a7748a27588e90090df13486249a3ca14f294d3d114f38f64464441c530c0ad18460b2affff3d5e5af0f97379cc3fff2e1eb3f3c5cbe008f38f3ede3d3f3f7aedf87252105acc2c910c76c29af452e2c334ec3923904d796e1f38476661c10dc8a90333b1adc46b08e71a87e9d4270e87bcfa78aefac2d1637548d727e0c6f84bee1141d876ec65efbb0c5d335b60a9563e52979ff70f9db09237e84f9e3c3e5e7270cfeed2389bca0e17a3984d541116a3efa7e8b1caa0ae791efc47c26aff321f27cad084bc9f2796b97939d407b2060c646f71d090730ebb9aff0894c26da4d5498a577f964053edbd4366840e62d6198a358e7a71419fc40a3bca679990d6f94f312b08a30d1385b4635c1ea114756153e9984de0941ac09765d1d6403b9a43aa61bcd4061d46594197a6d8de680b9e3122c23cda99da3321721ab24e0a6888217c4ddabac7dc6e7a119fb4e1d4f9abf3f17c53fd3fce9e1f2e5271a04275ee2d40213841029450db260b2e38965690a6c7462bb23e95bdaa822e2a8f7b96a9accb46711369548aaa036716c967335c660ca83bb43d264ad1a6980b68c56ae4028f1cc020c9bda4d63e93a480499fc14cecf04d6567e14e7e4794923385d121489d993ed782d8baa65a68252078242fa2eeb96aadf8bdc1654f12a2ad4b6a4876001c1ee9d54b7aaf086cdc91a79cd1d9a19d58142a7dac4ae76cb8276993579a9cd989fee642ad240e19b93e6d962fd2716a32fa3d166865af1429c645c9219112fc57e16ddb96e7d7a64570fba2a5e4f6d3a723846f95cd4697431d1cd7c8f254bc9988a326e77c8ba0d24eccc0826af0f73cfd85384dd8422d9d065a0dd14f83706e14e987f9cd138d70fc6ebaa98575519c97a357bb41e891e28a6b5bbbe37dc43562695a3f1e352afacaed9d31d0afd2ed864586708ef0aa58033f52e763dd3a4362972b8e714415fb2cc30b4b706db5605f709bc53af51835394d70dcb70ffecb1c05f5f798cbf4c876bad50c1e91620654b73a8230405d50b794ca551ae7845450dbe04a6d65e546cf4b60a0dc5a28e8081404eb2e62a53cca2ed432cb47642a689e0d8c13a0ce6ae3afddefa754fe2456c2cb3d391d5f6d9e320e25f878391afca0211571e7911824ca3dcc5e3378920b9606a91c64b5c6b6b392a115cb442a1bca35e606c572a22e64e9e9628a92146e8d65a1e911a4f6380a0710a52f6364b676ab9aeaabbdd4ca6e0523e668bcdf73857f327b3c25fe2e0185d2b8dc90bbd781035abe03153727338c261b4377915595a2714a3bc09871a237e640e5150338261ccd3b586ca7e3fb1d41b424fc06e92f6166ab74188a149c7c0d6484cdcef017aaee484ecdfbfb9fcf374e7b71f6ce7e4f9f3c3e5579f785006f97c28ff4825b9412b1192dbc8be4b6b770a597b87c400035a19b3efeeac3b769ecfd398a1c5d6ef8dd66590abf734b8e23630b0c1095ba3a64560dfbb60354756dd77264f28773f9cbbc216db6a22484353343f521fc7257eb03f8deb079d5f46c4e5b9bfb86b791d0e388a3746410b4b301c649fef0b3ae4c61ae7684daa601747474a3636a08e58274abe87a1bac5dade86c5602c7dd0c892a6582b9a8c2212886d80c45da660ac32bbe3959e81472a97bf3ccbfce1399fdf5f2e8f8f43ff5d13a7fdfc198409246c1a98cc5c45436985acdb0aa65cda7abbcdda294744173d3ed03767b0fc0eb1a57be038b45082d90c48d221277388a37a4ead91a3e06dc15a387694004b9a90bd1132c538631dc6ae3cc379cfb7d559d01bcd0627caef2e6f1f1f9b658adbf87f8008741a05c1aadb4b77fe4e86499b3a1a51fa353d52dc74278d8a9db4c5f13310530b49905034965283d7b845cb4abe2b4dc726eb91454e5195599496d6e934e71bae5cb58ba77d7fe0f052f04a62e2097bd5d062d26c1c89b7b4c92669ea42ed8a05635be900eb570825a075a3dc3bb98e8921b5a3ba23487c299962c8c4d5de8d85dfea82aebabb4550a9d456e15931697abe79cadb738e4599a5bbd0ecd54dde7ff17153ff3738975fffcb457fc13f3fa1bc8f4f2873ecff0bc0e29daf55090000',
        );
    });
    it('should encode protobuf to QRCode and decode', () => {
        const encoded = V2.encodeProtobufToQRCode(sync, 800);
        const decoded = V2.decodeQRCodeToProtobuf(encoded).toJSON();
        expect(decoded).toStrictEqual(decodedSync);
    });
});
