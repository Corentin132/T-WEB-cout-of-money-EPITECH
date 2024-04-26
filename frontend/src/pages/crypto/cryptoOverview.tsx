import CryptoAbout from "@/components/crypto/CryptoAbout";
import CategoryNews from "@/components/news/CategoryNews";
import NoArticlesFound from "@/components/news/NoArticlesFound";
import { routesParamsName } from "@/constants/routes";
import { getAboutCryptoData } from "@/middlewares/crypto";
import { getCryptoOverviewNewsFeed } from "@/middlewares/news";
import { CryptoAboutData } from "@/types/interfaces/crypto";
import { NewsCardData } from "@/types/interfaces/news";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CryptoOverview() {
  const [newsFeed, setNewsFeed] = useState<NewsCardData[] | null>(null);
  const [aboutCrypto, setAboutCrypto] = useState<CryptoAboutData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Get crypto identifier from url
  const { [routesParamsName.cryptoId]: cryptoId } = useParams();

  // Fetch data from api

  const getCryptoRestrictedNewsFeed = async () => {
    const data = await getCryptoOverviewNewsFeed(cryptoId!);
    setNewsFeed(data);
  };

  const getAboutCrypto = async () => {
    const data = await getAboutCryptoData(cryptoId!);
    setAboutCrypto(data);
  };

  useEffect(() => {
    // Check crypto id is defined
    if (!cryptoId) {
      setIsLoading(false);
      navigate(-1);
    }

    setIsLoading(true);
    try {
      getCryptoRestrictedNewsFeed();
      getAboutCrypto();
    } catch (error) {
      console.error("error while fetching crypto data"); // TODO: Handle errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading || !aboutCrypto) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Use CandleStick component */}
      <div></div>

      {/* About */}
      {/* TODO: get name from candlestick request */}
      <CryptoAbout about={aboutCrypto!} name="Bitcoin" />

      {/* News */}
      {newsFeed ? (
        <div className="h-full">
          <CategoryNews
            categoryNewsFeed={newsFeed!}
            displayCategorySeeMoreButton={true}
          />
        </div>
      ) : (
        <NoArticlesFound />
      )}
    </div>
  );
}

export default CryptoOverview;
