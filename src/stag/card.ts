
import BigNumber from 'bignumber.js'

import * as bitcore from 'bsv'

export interface Utxo {
    txid: string;
    vout: number;
    value: number;
    scriptPubKey?: string;
  }

export class Card {

    asset: string;
    privatekey: string;
    address: string;
    unspent: Utxo[];
  
    constructor(params: {
      asset: string,
      privatekey: string,
      address?: string;
    }) {
      this.unspent = []
      this.asset = params.asset
      this.privatekey = params.privatekey

      if (params.address) {
        this.address = params.address
      }
    
      if (bitcore.PrivateKey) {
        this.address = new bitcore.PrivateKey(this.privatekey).toAddress().toString();
      }
      
    }
    
    async getUnspent() {
  
      const blockchairUnspent = await blockchair.listUnspent(this.asset, this.address)
  
      this.unspent = blockchairUnspent
    }
  
    async listUnspent(): Promise<Utxo[]> {
  
      let rpc: RPC = getRPC(this.asset)
  
      if (rpc['listUnspent']) {
  
        this.unspent = await rpc['listUnspent'](this.address)
  
      } else {
  
        try {
  
          this.unspent = await blockchair.listUnspent(this.asset, this.address)
  
  
        } catch(error) {
  
          error.asset = this.asset
          error.address = this.address
  
          log.error('blockchair.listUnspent.error', error)
  
        }
        
      }
  
      return this.unspent
  
    }
  
    async balance(): Promise<Balance> {
  
      const asset = this.asset
  
      let rpc = getRPC(this.asset)
  
      var value;
  
      const errors = []
  
      if (rpc['getBalance']) {
  
        value = await rpc['getBalance'](this.address)
  
      } else {
  
        try {
  
          value = await blockchair.getBalance(this.asset, this.address)
  
        } catch(error) {
  
          errors.push(error)
  
          error.asset = this.asset
          error.address = this.address
  
          log.error('blockchair.getBalance.error', error)
  
        }
        
      }
  
      const { amount: value_usd } = await convertBalance({
        currency: this.asset,
        amount: this.asset === 'XMR' ? value : value / 100000000
      }, 'USD')
  
      try {
  
        this.unspent = await this.listUnspent()
  
        if (!value) {
  
          value = this.unspent.reduce((sum, output) => {
  
            return sum.plus(output.value)
      
          }, new BigNumber(0)).toNumber()
  
        }
  
        if (errors.length > 0 && !value) {
  
          value = false
        }
  
        return {
          asset: this.asset,
          value: value,
          value_usd,
          address: this.address,
          errors
        }
  
      } catch(error) {
  
        return {
          asset: this.asset,
          value: value,
          value_usd,
          address: this.address,
          errors
        }
  
      }
  
  
    }
  
  }
  