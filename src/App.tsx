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
      alert("success")

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

  return (
    <MainContainer>
      <Button onClick={openWallet}>Connect Kepler Wallet</Button>
      <Button onClick={getAddress}>getAddress</Button>
    </MainContainer>
  );
};

export default App;
