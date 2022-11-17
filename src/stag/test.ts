
class Wallet {
    async getBalance(): Promise<number> {
        console.log('get wallet balance')

        return 0
    }
}

interface Utxo {
    chain: number;
    index: number;
    outputIndex: number;
    satoshis: number;
    confirmations: number;
    txid: string;
    script: string;
}

class Client {
    async utxo(address: string): Promise<Utxo[]> {
        return []
    }
}

interface Relayone {
    alpha: {
        dex: any;
        run: any;
    };
    auth: Function;
    authBeta: Function;
    authRedirectUrl: Function;
    decrypt: Function;
    encrypt: Function;
    errors: {
        isLowFunds: Function;
    };
    getBalance: Function;
    getBalance2: Function;
    getEntropy: Function;
    getNextAddress: Function;
    isApp: Function;
    isLegacy: Function;
    isLinked: Function;
    logout: Function;
    p2p: boolean;
    quote: Function;
    render: Function;
    requestIdentity: Function;
    send: Function;
    sign: Function;
}

const wallet = new Wallet()

export default wallet
