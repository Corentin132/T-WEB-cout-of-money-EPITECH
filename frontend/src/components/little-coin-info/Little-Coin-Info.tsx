import CryptoEvolution from "../crypto/CryptoEvolution";
import { CryptoTickerData } from "@/types/interfaces/crypto";

interface CryptoFavoriteProps {
  /**
   * Is the CryptoTickerData needed to create the ticker
   */

  cryptoTicker: CryptoTickerData;
}

function LittleCoinInfo({ cryptoTicker }: CryptoFavoriteProps) {
  return (
    <div className=" bg-white mobile:bg-bgGrey w-80  h-48  p-2 pl-4 m-2  font-sans rounded-lg">
      <div className="flex justify-between  w-full py-4">
        <CryptoEvolution
          size="text-3xl"
          evolutionValue={cryptoTicker.evolutionOneDay}
        />

        <img className="px-3 w-16 h-16" src={cryptoTicker.logoUrl} alt="" />
      </div>
      <div className="flex  text-xl ">
        <p>Price {cryptoTicker.name}</p>
        <p className="font-semibold text-grey pl-4">{cryptoTicker.trigram}</p>
      </div>
      <div className=" py-4">
        <span className="font-bold text-3xl ">${cryptoTicker.price}</span>
      </div>
    </div>
  );
}

export default LittleCoinInfo;
