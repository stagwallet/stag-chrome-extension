export {};

declare global {
  interface Window {
    stag: any; // 👈️ turn off type checking
    _relayone: any;
    relayone: any;
    walletbot: any;
    run: any;
  }
}
