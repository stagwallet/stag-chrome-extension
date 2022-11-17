
import axios from 'axios'

import Run from 'run-sdk'

export async function broadcast (rawtx: string) {

  const { data } = await axios.post(`https://api.run.network/v1/main/tx`, {
    rawtx
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return data
}

const blockchain = new Run.plugins.WhatsOnChain({ network: 'main' })

export const run = new Run({ blockchain })

export interface RunUtxo {
  txid: string;
  vout: number;
  script: string;
  satoshis: number;
}
