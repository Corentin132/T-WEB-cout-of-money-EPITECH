import LittleCoinInfo from "./Little-Coin-Info";
import { CryptoTickerData } from "@/types/interfaces/crypto";

interface CryptoTickerListProps {
  /**
   * Is the list of crypto tickers to create
   */
  cryptoTickerList: CryptoTickerData[];
}
function LittleCoinInfoList({ cryptoTickerList }: CryptoTickerListProps) {
  return (
    <div className="flex overflow-auto gap-4 mobile:gap-2 mx-4 mobile:mx-1 mobile:overflow-auto">
      {cryptoTickerList.map((ticker) => (
        <div key={ticker.identifier}>
          <LittleCoinInfo cryptoTicker={ticker} />
        </div>
      ))}
    </div>
  );
}

export default LittleCoinInfoList;
