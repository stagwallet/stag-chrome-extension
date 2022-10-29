
import { Card } from './card'

class Wallet {

    card: Card | undefined;
}

export async function loadWallet() {

    return new Wallet()

}