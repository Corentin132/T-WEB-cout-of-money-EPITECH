import { CryptoTickerData } from "@/types/interfaces/crypto";
import CryptoEvolution from "./CryptoEvolution";

interface CryptoTickerProps {
  /**
   * Is the CryptoTickerData needed to create the ticker
   */
  cryptoTicker: CryptoTickerData;
}

function CryptoTicker({ cryptoTicker }: CryptoTickerProps) {
  return (
    <div className="w-full flex flex-row justify-between items-center  p-3 mobile:p-1 bg-white mobile:bg-bgGrey rounded-xl mobile:text-sm  ">
      {/* Crypto Name */}
      <div className="flex flex-row gap-4 laptop:gap-2 mobile:gap-1">
        <img
          className="w-8 h-8"
          src={cryptoTicker.logoUrl}
          alt="Cryptocurrency logo"
        />
        <div className="flex flex-row mobile:flex-col gap-1 items-center mobile:items-start mobile:gap-0">
          <p>{cryptoTicker.name}</p>
          <p className="text-grey">{cryptoTicker.trigram}</p>
        </div>
      </div>
      {/* Crypto Evolution & ammount */}
      <div className="flex flex-row justify-evenly gap-12 laptop:gap-5 tablet:gap-4 mobile:gap-1">
        {/* Price */}
        <p>{cryptoTicker.price + "€"}</p>

        {/* Evolution 24h*/}
        <CryptoEvolution evolutionValue={cryptoTicker.evolutionOneDay} />

        {/* Evolution 7j */}

        {/* Total money */}
        <p className="tablet:hidden">open :{cryptoTicker.totalePrice + "€"}</p>

        {/* Quantity crypto */}
      </div>
    </div>
  );
}

export default CryptoTicker;
