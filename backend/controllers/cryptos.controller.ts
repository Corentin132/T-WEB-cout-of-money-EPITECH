import { Body, Get, Post, Request, Route, Controller, Delete, Put } from "tsoa";
import {
  PrismaClient,
  CryptoCurrencyUser,
  User,
  CryptoCurrency,
} from "@prisma/client";

const prisma = new PrismaClient();

interface KlineData {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
  ignore: string;
}

interface KlinesResponse {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
  ignore: string;
}

interface ErrorResponse {
  error: string;
  price?: string | undefined;
}

interface PriceResponse {
  symbol: string;
  price: string;
}

interface SelectedCryptoResponse {
  symbol: string;
  price: string;
}

interface CryptoCurrencyWithRelations extends CryptoCurrency {
  is_favorite: boolean;
}

interface UserWithCryptoCurrencies extends User {
  cryptoCurrencies: Array<{
    crypto: CryptoCurrencyWithRelations;
    user_id: string;
    crypto_id: string;
    is_favorite: boolean;
  }>;
}

@Route("cryptos")
export default class CryptoController extends Controller {
  @Get("/candlestick/{symbolCrypto}")
  public async getKlines(
    symbolCrypto: string
  ): Promise<KlinesResponse[] | ErrorResponse> {
    try {
      const cleanedSymbol = symbolCrypto.toUpperCase();
      const interval = "1h";
      const limit = 30;
      const apiUrl = `https://api.binance.com/api/v3/klines?symbol=${cleanedSymbol}&interval=${interval}&limit=${limit}`;
      const response = await fetch(apiUrl);
      const responseData: number[][] = await response.json();

      const klineDataArray: KlineData[] = responseData.map(
        (klineData: number[]) => ({
          timestamp: klineData[0],
          open: klineData[1].toString(),
          high: klineData[2].toString(),
          low: klineData[3].toString(),
          close: klineData[4].toString(),
          volume: klineData[5].toString(),
          closeTime: klineData[6],
          quoteAssetVolume: klineData[7].toString(),
          numberOfTrades: klineData[8],
          takerBuyBaseAssetVolume: klineData[9].toString(),
          takerBuyQuoteAssetVolume: klineData[10].toString(),
          ignore: klineData[11].toString(),
        })
      );

      return klineDataArray;
    } catch (error) {
      console.error("Error fetching klines:", error);
      return { error: "Error fetching klines" };
    }
  }

  @Get("/prices/{symbolCrypto}")
  public async getPrices(
    symbolCrypto: string
  ): Promise<PriceResponse | ErrorResponse> {
    try {
      const symbol = symbolCrypto.toUpperCase();
      const apiUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (typeof data.price !== "undefined") {
        const coursCrypto = data.price;
        return { symbol: symbolCrypto, price: coursCrypto };
      } else {
        console.error('The "price" property is undefined in the response.');
        return { error: "Error fetching crypto price" };
      }
    } catch (error) {
      console.error("Error fetching crypto price:", error);
      return { error: "Error fetching crypto price" };
    }
  }

  @Get("/selectedCryptos/{userId}")
  public async getSelectedCryptos(
    userId: string | null
  ): Promise<SelectedCryptoResponse[] | ErrorResponse> {
    try {
      if (!userId) {
        const defaultCryptos: CryptoCurrency[] =
          await prisma.cryptoCurrency.findMany({
            where: { is_default: true },
          });

        const pricesPromises = defaultCryptos.map(async (crypto) => {
          const priceResponse = await this.getPrices(crypto.symbol);
          return { symbol: crypto.symbol, price: priceResponse.price || "N/A" };
        });

        const prices = await Promise.all(pricesPromises);
        return prices;
      } else {
        const userWithCryptoCurrencies: UserWithCryptoCurrencies | null =
          await prisma.user.findUnique({
            where: { id: userId },
            include: {
              cryptoCurrencies: {
                include: {
                  crypto: true as any,
                },
              },
            },
          });

        const userCryptos = userWithCryptoCurrencies?.cryptoCurrencies || [];

        const pricesPromises = userCryptos.map(async (userCrypto) => {
          const priceResponse = await this.getPrices(userCrypto.crypto.symbol);
          return {
            symbol: userCrypto.crypto.symbol,
            price: priceResponse.price || "N/A",
          };
        });

        const prices = await Promise.all(pricesPromises);
        return prices;
      }
    } catch (error) {
      console.error("Error fetching selected cryptos:", error);
      return { error: "Error fetching selected cryptos" };
    }
  }

  @Post("/add_symbol")
  public async addSymbol(
    @Request() request: any,
    @Body()
    body: { symbol: string; is_default?: boolean; is_favorite?: boolean }
  ): Promise<CryptoCurrency | ErrorResponse> {
    const userId = request.user?.id;
    const role = request.user?.role;

    if (!userId) {
      return { error: "User is not authenticated or authorized." };
    }

    try {
      if (!userId) {
        return { error: "User not authentified." };
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return { error: "User does not exist" };
      }

      const existingSymbol = await prisma.cryptoCurrency.findUnique({
        where: { symbol: body.symbol },
      });
      if (existingSymbol) {
        return { error: "Symbol already exists" };
      }

      const newSymbol = await prisma.cryptoCurrency.create({
        data: {
          symbol: body.symbol,
          is_default: body.is_default || false,
          is_favorite: body.is_favorite || false,
        },
      });

      await prisma.cryptoCurrencyUser.create({
        data: {
          user_id: userId,
          crypto_id: newSymbol.id,
          is_favorite: body.is_favorite || false,
        },
      });

      return newSymbol;
    } catch (error) {
      console.error("Error adding new crypto symbol:", error);
      return { error: "Error adding new crypto symbol" };
    }
  }

  @Get("/get_all_symbols")
  public async getAllSymbols(): Promise<{ symbols: string[] } | ErrorResponse> {
    try {
      const allCryptoCurrencies = await prisma.cryptoCurrency.findMany();
      const allSymbols = allCryptoCurrencies.map((c) => c.symbol);
      return { symbols: allSymbols };
    } catch (error) {
      console.error("Error fetching all symbols:", error);
      return { error: "Error fetching all symbols" };
    }
  }

  @Put("/update_symbol/{symbol}")
  public async updateSymbol(
    @Request() request: any,
    @Route() symbol: string,
    @Body()
    body: { newSymbol: string; is_default?: boolean; is_favorite?: boolean }
  ): Promise<CryptoCurrency | ErrorResponse> {
    const userId = request.user?.id;
    const role = request.user?.role;
    if (!userId || (role !== "admin" && role !== "superadmin")) {
      return { error: "User is not authenticated or not authorized." };
    }

    const existingSymbol = await prisma.cryptoCurrency.findUnique({
      where: { symbol: symbol },
    });
    if (!existingSymbol) {
      return { error: "Symbol not found." };
    }

    let symbolValue;
    if (body.newSymbol !== undefined) {
      symbolValue = body.newSymbol;
    } else {
      symbolValue = existingSymbol.symbol;
    }

    if (symbol !== symbolValue) {
      const existingNewSymbol = await prisma.cryptoCurrency.findUnique({
        where: { symbol: symbolValue },
      });
      if (existingNewSymbol) {
        return { error: "New symbol already exists." };
      }
    }

    try {
      const updatedSymbol = await prisma.cryptoCurrency.update({
        where: { symbol: symbol },
        data: {
          symbol: symbolValue,
          is_default: body.is_default || false,
          is_favorite: body.is_favorite || false,
        },
      });

      return updatedSymbol;
    } catch (err) {
      console.error(`Error updating symbol ${symbol}: ${err}`);
      return { error: `Error updating symbol ${symbol}: ${err}` };
    }
  }

  @Delete("/delete_symbol/{symbol}")
  public async deleteSymbol(
    @Request() request: any,
    @Route() symbol: string
  ): Promise<ErrorResponse | { message: string }> {
    const userId = request.user?.id;

    if (!userId) {
      return { error: "User is not authenticated." };
    }

    if (request.user?.role !== "admin" && request.user?.role !== "superadmin") {
      return { error: "Only admin users can delete a symbol." };
    }

    try {
      const deleteResult = await prisma.cryptoCurrency.deleteMany({
        where: { symbol: symbol },
      });

      if (deleteResult.count > 0) {
        return { message: `Symbol ${symbol} successfully deleted.` };
      } else {
        return { error: `Failed to delete symbol ${symbol}.` };
      }
    } catch (err) {
      console.error(`Error deleting symbol ${symbol}: ${err}`);
      return { error: `Error deleting symbol ${symbol}: ${err}` };
    }
  }
}
