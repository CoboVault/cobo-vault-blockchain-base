import { CoboVaultSDK } from './base';

export class CVXRPSdk extends CoboVaultSDK {
    private chain: string;
    constructor() {
        super();
        this.chain = 'xrp';
    }
}
