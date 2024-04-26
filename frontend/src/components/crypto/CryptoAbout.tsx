import { CryptoAboutData } from "@/types/interfaces/crypto";
import CryptoAboutText from "./CryptoAboutText";
interface CryptoAboutProps {
  /**
   * Is the selected crypto main informations
   */
  about: CryptoAboutData;

  /**
   * Is the selected crypto's name
   */
  name: string;
}

function CryptoAbout({ about, name }: CryptoAboutProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      <h2 className="font-bold text-3xl">About {name}</h2>
      {/* Summary */}
      <CryptoAboutText title={`What is ${name} ?`} text={about.summary} />

      {/* Origins */}
      <CryptoAboutText
        title={`Who discovered ${name} ?`}
        text={about.origins}
      />

      <div></div>
    </div>
  );
}

export default CryptoAbout;
