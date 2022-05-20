import { useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    keplr: any;
    getOfflineSigner: any;
  }
}

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  width: 100px;
  height: 30px;
  margin: 10px;
  line-height: 30px;
  background-color: #3550de;
  border-radius: 4px;
  text-align: center;
  color: white;
  cursor: pointer;
`;

const App = () => {

  useEffect(() => {
    ///
  }, []);

  const openWallet = async () => {

    try {

      await window.keplr.experimentalSuggestChain({
        chainId: "colosseum-1",
        chainName: "FirmaChain",
        rpc: "https://lcd-mainnet.firmachain.dev:26657/",
        rest: "https://lcd-mainnet.firmachain.dev:1317/",
        bip44: {
          coinType: 7777777,
        },
        bech32Config: {
          bech32PrefixAccAddr: "firma",
          bech32PrefixAccPub: "firma" + "pub",
          bech32PrefixValAddr: "firma" + "valoper",
          bech32PrefixValPub: "firma" + "valoperpub",
          bech32PrefixConsAddr: "firma" + "valcons",
          bech32PrefixConsPub: "firma" + "valconspub",
        },
        currencies: [
          {
            coinDenom: "FCT",
            coinMinimalDenom: "ufct",
            coinDecimals: 6,
            coinGeckoId: "firmachain",
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "FCT",
            coinMinimalDenom: "ufct",
            coinDecimals: 6,
            coinGeckoId: "firmachain",
          },
        ],
        stakeCurrency: {
          coinDenom: "FCT",
          coinMinimalDenom: "ufct",
          coinDecimals: 6,
          coinGeckoId: "firmachain",
        },
        coinType: 7777777,
        gasPriceStep: {
          low: 0.1,
          average: 0.25,
          high: 0.3,
        },
      });

      // If experimentalSuggestChain method runs well, below alert will be called.
      // If the extension already has firmachain info, same result will be shown.
      alert("success");

      // one more check to connect wallet.
      const chainId = "colosseum-1";
      await window.keplr.enable(chainId);

    } catch (error) {
      // In case, reject to add firmachain info to the extension
      alert("error : " + error);
    }

  };

  const getAddress = async () => {

    const chainId = "colosseum-1";

    try {
      await window.keplr.enable(chainId);

      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      alert("address : " + accounts[0].address);

    } catch (error) {

      alert("error : " + error);
    }
  };

  const signSomething = async () => {

    const chainId = "colosseum-1";

    try {

      var os = require( 'os' );

var networkInterfaces = os.networkInterfaces( );

console.log( networkInterfaces );

      await window.keplr.enable(chainId);

      const result1 = await window.keplr.getKey(chainId);
      let address = result1.bech32Address;

      var os = require("os");
var hostname = os.hostname();

      // you can also get address below code.

      //const offlineSigner = window.getOfflineSigner(chainId);
      //const accounts = await offlineSigner.getAccounts();
      //const addressBasedAccount = accounts[0].address;

      

      const rawCertificate = "3936a4db-1d18-4cb6-8274-bccb1541f021";

      let certificateData = "The signature requested by exchange.\n\nProceed to confirm your own ownership of Kepler's wallet.\nPlease proceed after checking the registered wallet address at the time of deposit and withdrawal.\n\nAddress:\n" + address + "\nCertificate:\n" + rawCertificate;

      let signatureResult = await window.keplr.signArbitrary(chainId, address, certificateData);
      console.log(signatureResult);

      // if you want to modify signatureResult or certificateData, like this.
      //signatureResult.signature += "1";
      //certificateData += "1";

      // true or false
      let isMatched = await window.keplr.verifyArbitrary(chainId, address, certificateData, signatureResult);
      console.log(isMatched);

      if (isMatched) {
        alert("Wallet address registration completed.");
      } else {
        alert("Wallet address registration failed.");
      }

    } catch (error) {
      alert("Wallet address registration failed : " + error);
    }
  };

  return (
    <MainContainer>
      <Button onClick={openWallet}>Connect Kepler Wallet</Button>
      <Button onClick={getAddress}>getAddress</Button>
      <Button onClick={signSomething}>Sign Something</Button>

    </MainContainer>
  );
};

export default App;
