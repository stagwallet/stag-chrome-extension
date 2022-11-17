console.log('INJECT')

import stag from './stag/test'

interface Window {
    stag: any;
    walletbot: any;
}
  
interface RunUtxo {
    txid: string;
    vout: number;
    script: string;
    satoshis: number;
}

console.log('RUNTIME', chrome.runtime)

window.stag = stag

//window.run = run

if (window.relayone) {

    console.log("RELAYONE ALREADY DEFINED")

    window._relayone = window.relayone

} else {

    console.log("RELAYONE NOT DEFINED")

    attachRelayoneJs().then(function() {

        console.log('relayone.attached', window.relayone)

        console.log(window.relayone)
        console.log(window['relayone'])

        window._relayone = window.relayone

    })
    .catch(function(error) {

        console.log('relayone.load.error', error)
    
    });

}

function attachRelayoneJs(): Promise<void> {

    return new Promise(function (resolve, reject) {

        let scriptEle = document.createElement("script");

        scriptEle.setAttribute("src", "https://one.relayx.io/relayone.js");
    
        document.body.appendChild(scriptEle);

        scriptEle.addEventListener("load", function() {
            resolve()
        });
        
        scriptEle.addEventListener("error", function(ev) {
            reject(ev)
        });
    })

}
