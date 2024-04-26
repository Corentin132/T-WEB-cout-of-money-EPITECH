import { CryptoTickerData } from "@/types/interfaces/crypto";
import CryptoTicker from "./CryptoTicker";
import { useNavigate } from "react-router-dom";
import { complexRoutePath, routesParamsName } from "@/constants/routes";

interface CryptoTickerListProps {
  /**
   * Is the list of crypto tickers to create
   */
  cryptoTickerList: CryptoTickerData[];
}

function CryptoTickerList({ cryptoTickerList }: CryptoTickerListProps) {
  const navigate = useNavigate();

  const handleClick = (cryptoId: string) => {
    navigate(
      complexRoutePath.cryptoOverviewPath.replace(
        `:${routesParamsName.cryptoId}`,
        cryptoId
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 mobile:gap-2 mx-4 mobile:mx-1">
      <h2 className="text-xl font-bold">All Cryptocurrencies</h2>
      {cryptoTickerList.map((ticker) => (
        <button
          key={ticker.identifier}
          type="button"
          onClick={() => handleClick(ticker.identifier)}
          className="font-normal"
        >
          <CryptoTicker cryptoTicker={ticker} />
        </button>
      ))}
    </div>
  );
}

export default CryptoTickerList;
