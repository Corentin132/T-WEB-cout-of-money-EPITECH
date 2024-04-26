-- CreateTable
CREATE TABLE "CryptoCurrency" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_favorit" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CryptoCurrency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoCurrencyUser" (
    "user_id" TEXT NOT NULL,
    "crypto_id" TEXT NOT NULL,

    CONSTRAINT "CryptoCurrencyUser_pkey" PRIMARY KEY ("user_id","crypto_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CryptoCurrency_symbol_key" ON "CryptoCurrency"("symbol");

-- AddForeignKey
ALTER TABLE "CryptoCurrencyUser" ADD CONSTRAINT "CryptoCurrencyUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoCurrencyUser" ADD CONSTRAINT "CryptoCurrencyUser_crypto_id_fkey" FOREIGN KEY ("crypto_id") REFERENCES "CryptoCurrency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
