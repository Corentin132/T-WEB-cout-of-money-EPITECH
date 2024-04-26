import CandlestickChart from "@/components/crypto/CanddlestickChart";
import CryptoTickerList from "@/components/crypto/CryptoTickerList";
import LittleCoinInfoList from "@/components/little-coin-info";

import { getTickerListData, getFavorisListData } from "@/middlewares/crypto";
import { CryptoTickerData } from "@/types/interfaces/crypto";
import { useEffect, useState } from "react";

function Dashboard() {
  const [tickerList, setTicketList] = useState<CryptoTickerData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorisList, setFavorisList] = useState<CryptoTickerData[] | null>(
    null
  );
  const getTickerList = async () => {
    const data = await getTickerListData();
    setTicketList(data);
  };
  const getFavorisList = async () => {
    const data = await getFavorisListData();
    setFavorisList(data);
  };
  useEffect(() => {
    setIsLoading(true);
    try {
      getTickerList();
      getFavorisList();
    } catch (error) {
      console.error("error while fetching crypto data"); // TODO: Handle errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading || tickerList === null || favorisList === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col">
      {/* Crypto Cards */}
      <div></div>
      <LittleCoinInfoList cryptoTickerList={favorisList}></LittleCoinInfoList>
      {/* Crypto Selection */}
      <div></div>
      <CandlestickChart symbol="btceur"></CandlestickChart>
      {/* Crypto Ticker List */}
      <CryptoTickerList cryptoTickerList={favorisList} />
    </div>
  );
}

export default Dashboard;
