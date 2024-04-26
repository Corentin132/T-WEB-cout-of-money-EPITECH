import CryptoPositiveIcon from "assets/cryptoPositiveIcon.svg?react";
import CryptoNegativeIcon from "assets/cryptoNegativeIcon.svg?react";
import { useEffect, useState } from "react";

interface CryptoEvolutionProps {
  /**
   * Is the cryptocurrency evolution value.
   * @type {string}
   */

  evolutionValue: string;
  size?: string;
}

function CryptoEvolution({ evolutionValue, size }: CryptoEvolutionProps) {
  const [isPositive, setIsPositive] = useState<boolean>(true);

  useEffect(() => {
    // Parse the string as a float to check if positive
    const parsedValue = parseFloat(evolutionValue);
    setIsPositive(parsedValue >= 0);
  }, [evolutionValue]);

  return (
    <div className={`flex flex-row items-center gap-0.5 font-semibold ${size}`}>
      {isPositive ? <CryptoPositiveIcon /> : <CryptoNegativeIcon />}
      <p
        className={`${
          isPositive ? "text-cryptoPositiveGreen" : "text-cryptoNegativeRed"
        }`}
      >
        {Math.abs(parseFloat(evolutionValue)) + "%"}
      </p>
    </div>
  );
}

export default CryptoEvolution;
