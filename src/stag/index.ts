
import { Card } from './card'

export class Wallet {

    card: Card | undefined;
}

var wallet: Wallet;

export async function loadWallet() {

    if (wallet) { return wallet }

    wallet = new Wallet()

    wallet.card = new Card({
        asset: 'BSV',
        privatekey: 'Kyt5YPG3hXM5KXy3sPRwkM7S8ZCt2q7HsuVWQXhoDpy9iiUf3Uo8',
        address: '1Pe19tKDGa9an8iVTgT8Pqda8cXhqiHZnQ'
    })

    return wallet

}
