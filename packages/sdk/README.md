# `@cvbb/sdk`

`@cvbb/sdk` is library for helping developer to do integration with Cobo Vault.

the main purpose is to encode and decode data for QR Code usage.

currently we use UR to encode data. check this for detail info about [UR](https://github.com/CoboVault/Research/blob/master/papers/bcr-0005-ur.md)

## Usage

```
import sdk from '@cvbb/sdk';
const read = async () => {
    const result = await sdk.read();
}

const play = async () => {
    await sdk.play("any data string");
}

```

## API

| Name | Parameters                                      | result                                                                      | Description                                                                        |
| ---- | ----------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| read |                                                 | Promise<{type: 'text' &#124; 'json' &#124; 'ur', data: string} &#124; null> | Open a modal and read qrcode with camera, will return null when click Close button |
| play | data: string, options?: {refreshSpeed?: number} | Promise<void>                                                               | Open a modal and display a dynamic qrcode, will resolve when click Finish button   |
