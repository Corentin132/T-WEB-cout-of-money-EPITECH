import { CryptoAboutData, CryptoTickerData } from "@/types/interfaces/crypto";
import BookmarkIcon from "assets/bookmarkIcon.svg";
import btc from "assets/btc.svg";
import xrp from "assets/xrp.svg";
import sol from "assets/sol.svg";
import eth from "assets/eth.svg";
import bnb from "assets/bnb.svg";

export async function getTickerListData(): Promise<CryptoTickerData[]> {
  // TODO get ticker list data from api and delete following hardcoded values.
  const tickerList: CryptoTickerData[] = [
    {
      identifier: "is the identifier",
      logoUrl: BookmarkIcon,
      name: "Bitcoin",
      trigram: "BTC",
      price: "6 000",
      totalAmount: "10 000 000",
      totalePrice: "200 000 000",
      evolutionOneDay: "-49.30",
      evolutionOneWeek: "89.41",
    },
    {
      identifier: "is also the identifier",
      logoUrl: BookmarkIcon,
      name: "Bitcoin",
      trigram: "BTC",
      price: "6 000",
      totalAmount: "10 000 000",
      totalePrice: "200 000 000",
      evolutionOneDay: "-49.31",
      evolutionOneWeek: "89.41",
    },
  ];
  return await tickerList;
}

const getCryptoPrice = async (symbol: string) => {
  const response = await fetch(
    "http://localhost:4000/cryptos/prices/" + symbol,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Register error : " + response.json());
  }

  return response.json();
};

const getCandleInfoCrypto = async (symbol: string) => {
  const response = await fetch(
    "http://localhost:4000/cryptos/candlestick/" + symbol,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Register error : " + response.json());
  }

  return response.json();
};
const getDefaultCrypto = async () => {
  const response = await fetch(
    "http://localhost:4000/cryptos/get_all_symbols",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Register error : " + response.json());
  }

  return response.json();
};

const getPercentCrypto = async (symbol: string) => {
  const res = await getCandleInfoCrypto(symbol);

  let percent = ((res[res.length - 1].close - res[0].open) / res[0].open) * 100;
  percent = Math.round(percent * 100) / 100;
  const formatedPercent = percent.toString();
  const open = Math.round(res[0].open * 100) / 100;
  const formatedOpen = open.toString();
  const send = { formatedPercent: formatedPercent, formatedOpen: formatedOpen };
  return send;
};

export async function getFavorisListData(): Promise<CryptoTickerData[]> {
  // TODO get ticker list data from api and delete following hardcoded values.
  const favoritList: CryptoTickerData[] = [
    {
      identifier: "is the best identifier",
      logoUrl: BookmarkIcon,
      name: "no data",
      trigram: "ND",
      price: "no data",
      totalAmount: " no data",
      totalePrice: " no data",
      evolutionOneDay: " no data",
      evolutionOneWeek: " no data",
    },
  ];
  const defaultCrypto = await getDefaultCrypto();

  for (let i = 0; i < defaultCrypto.symbols.length - 1; i++) {
    favoritList[i] = {
      identifier: "is the worst identifier",

      logoUrl: BookmarkIcon,
      name: "no data",
      trigram: "ND",
      price: "no data",
      totalAmount: " no data",
      totalePrice: " no data",
      evolutionOneDay: " no data",
      evolutionOneWeek: " no data",
    };
    const crypto = await getCryptoPrice(defaultCrypto.symbols[i]);
    favoritList[i].price = await (
      Math.round(crypto.price * 100) / 100
    ).toString();
    favoritList[i].trigram = await crypto.symbol;

    const resCrypto = await getPercentCrypto(crypto.symbol);

    favoritList[i].evolutionOneDay = resCrypto.formatedPercent;
    favoritList[i].totalePrice = resCrypto.formatedOpen;
  }
  favoritList[0].logoUrl = btc;
  favoritList[1].logoUrl = eth;
  favoritList[2].logoUrl = sol;
  favoritList[3].logoUrl = bnb;
  favoritList[4].logoUrl = xrp;

  favoritList[0].name = "Bitcoin";
  favoritList[1].name = "Ethereum";
  favoritList[2].name = "Solana";
  favoritList[3].name = "BNB";
  favoritList[4].name = "XRP";

  return await favoritList;
}

/**
 * This function fetchs from the api some global informations about cryptocurrencies.
 * @param cryptoId is the crypto identifier
 * @returns a Promise of CryptoAboutData
 */
export const getAboutCryptoData = async (
  cryptoId: string
): Promise<CryptoAboutData> => {
  // TODO: Fetch data from api and remove hardcoded values
  console.log(cryptoId);
  const aboutCrypto: CryptoAboutData = {
    summary:
      "Le Bitcoin est une cryptomonnaie décentralisée présentée en 2008 dans un livre blanc par un individu (ou un groupe d'individus) agissant sous le pseudonyme de Satoshi Nakamoto. Son lancement a lieu en janvier 2009. Le Bitcoin est une cryptomonnaie pair-à-pair, où toutes les transactions se font entre des participants égaux et indépendants, sans qu'elles aient à être autorisées ou facilitées par un intermédiaire. Le Bitcoin a été créé, selon les mots de Nakamoto, pour que les « paiements en ligne soient directement envoyés d'une partie à une autre sans avoir à passer par une institution financière »./n Des concepts similaires à une devise numérique décentralisée précèdent le BTC, mais le Bitcoin a la particularité d'être la toute première cryptomonnaie à entrer en usage.",
    origins:
      "Le créateur du Bitcoin est connu sous le pseudonyme « Satoshi Nakamoto ». La véritable identité de l'individu (ou de l'organisation) qui se cache derrière ce nom reste inconnue à ce jour. Le 31 octobre 2008, M. Nakamoto publie le livre blanc du Bitcoin, qui décrit en détail la manière dont une devise pair-à-pair en ligne pourrait être implémentée. Il propose d'utiliser un « ledger » (ou registre) de transactions regroupé en lots (appelés « blocs ») et sécurisé par des algorithmes cryptographiques. Ce système sera baptisé « blockchain » par la suite. Deux mois plus tard, le 3 janvier 2009, M. Nakamoto mine le premier bloc du réseau Bitcoin, appelé le bloc genèse. Ainsi naît la première cryptomonnaie du monde. Même si Nakamoto est le vrai créateur du Bitcoin et l'auteur de sa toute première mise en application, de nombreuses personnes ont par la suite contribué à l'amélioration du logiciel de cette cryptomonnaie en corrigeant les vulnérabilités et en ajoutant de nouvelles fonctionnalités. Le code source du Bitcoin sur GitHub liste plus de 750 contributeurs, dont les principaux sont Wladimir J. van der Laan, Marco Falke, Pieter Wuille, Gavin Andresen et Jonas Schnelli.",
  };
  return await aboutCrypto;
};
