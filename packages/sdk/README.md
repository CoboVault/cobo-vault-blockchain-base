# `@cvbb/sdk`

`@cvbb/sdk` is library for helping developer to do integration with Cobo Vault.

the main purpose is to encode and decode data for QR Code usage.

currently we use UR to encode data. check this for detail info about [UR](https://github.com/CoboVault/Research/blob/master/papers/bcr-0005-ur.md) 

this library is designed by chain

## Usage
this is an example for XRP
```
const {CVXRPSdk} = require('@cvbb/sdk');

const sdk = new CVXRPSdk()

const txdata= '{"TransactionType":"Payment","Account":"rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn","Destination":"ra5nK24KXen9AHvsdFTKHSANinZseWnPcX","Amount":{"currency":"USD","value":"1","issuer":"rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"},"Fee":"12","Flags":2147483648,"Sequence":2}'

const dataFragmets = sdk.encodeDataForQR(txData)
// [ 'ur:bytes/tyqsq7ez23exzmnnv93hg6t0de28jur9ygazy5rp09kk2mn5ygkzystrvdhh2mn5ygazyunxx9pxj3m9tpmhw5t0dyu95vn4v4r9j4z9tpfhwa22t9n9vvj2wphzytpzg3jhxarfdeshg6t0dc3r5gnjvy6kujejx394setw89q5sannv3r9gj6g2dq5u6twtfek24mw2p34sg3vyfqk6mm4de6zywnmyf3h2unjv4hxx7fz8g39256yygkzyanpd36k2g36ygcjytpzd9ehxat9wg3r5gnjvcc5y628v4v8wa63da5nsk3jw4j5vk25g4v9xam4ffvkv43jffcxugna9s3yvet9ygazyvfjygkzy3nvv9nhxg36xgcngde58qenvdpc9s39xet3w4jkucm9ygarylgjvkpch' ]
// each item in the list should be put into one QRCode image.

```
