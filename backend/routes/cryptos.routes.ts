import express from "express";
import authenticateToken from "../middleware/authenticate"; // Assurez-vous que ce chemin est correct.
import CryptoController from "../controllers/cryptos.controller";

const router = express.Router();

router.get("/cryptos/candlestick/:symbolCrypto", async (req, res) => {
  const { symbolCrypto } = req.params;
  const controller = new CryptoController();
  const response = await controller.getKlines(symbolCrypto);
  return res.send(response);
});

router.get("/cryptos/prices/:symbolCrypto", async (req, res) => {
  const { symbolCrypto } = req.params;
  const controller = new CryptoController();
  const response = await controller.getPrices(symbolCrypto);
  return res.send(response);
});

router.get("/cryptos/selectedCryptos/:userId", async (req, res) => {
  const { userId } = req.params;
  const controller = new CryptoController();
  const response = await controller.getSelectedCryptos(userId);
  return res.send(response);
});

router.post("/cryptos/add_symbol", authenticateToken, async (req, res) => {
  const controller = new CryptoController();
  const response = await controller.addSymbol(req, req.body);
  return res.send(response);
});

router.get("/cryptos/get_all_symbols", async (req, res) => {
  const controller = new CryptoController();
  const response = await controller.getAllSymbols();
  return res.send(response);
});

router.put(
  "/cryptos/update_symbol/:symbol",
  authenticateToken,
  async (req, res) => {
    const controller = new CryptoController();
    const response = await controller.updateSymbol(
      req,
      req.params.symbol,
      req.body
    );
    return res.send(response);
  }
);

router.delete(
  "/cryptos/delete_symbol/:symbol",
  authenticateToken,
  async (req, res) => {
    const controller = new CryptoController();
    const response = await controller.deleteSymbol(req, req.params.symbol);
    return res.send(response);
  }
);
export default router;
