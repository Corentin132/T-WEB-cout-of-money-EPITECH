
CREATE TABLE "users" (
                         "user_id"  SERIAL NOT NULL,
                         "username" VARCHAR(255) NOT NULL,
                         "first_name" VARCHAR(255) NOT NULL,
                         "last_name" VARCHAR(255) NOT NULL,
                         "email" VARCHAR(255) NOT NULL,
                         "password_hash" VARCHAR(255) NOT NULL,
                         "oauth" BOOLEAN DEFAULT false NOT NULL,
                         "created_at" TIMESTAMP DEFAULT current_timestamp NULL
);

-- Création de la table des Crypto-monnaies
CREATE TABLE "cryptocurrencies" (
                                    "cryptocurrency_id" SERIAL NOT NULL,
                                    "code" VARCHAR(10) NOT NULL,
                                    "name" VARCHAR(20) NOT NULL,
                                    "image_url" VARCHAR(255) NOT NULL,
                                    "created_at" TIMESTAMP DEFAULT current_timestamp NOT NULL,
                                    "is_default" BOOLEAN DEFAULT false NOT NULL,
                                    "is_favorite" BOOLEAN DEFAULT false NOT NULL
);

-- Création de la table des Articles de Presse
CREATE TABLE "articles" (
                            "article_id"  SERIAL NOT NULL,
                            "title" VARCHAR(255) NOT NULL,
                            "summary" TEXT NULL,
                            "source" VARCHAR(255) NULL,
                            "date_published" TIMESTAMP NULL,
                            "url" VARCHAR(255) NOT NULL,
                            "image_url" VARCHAR(255) NULL,
                            "created_at" TIMESTAMP DEFAULT current_timestamp NULL
);

-- création de la table de liaison entre les users et les crypto-monnaies
CREATE TABLE "users_cryptocurrencies" (
                                          "users_cryptocurrencies_id"  SERIAL NOT NULL,
                                          "user_id" INT NOT NULL,
                                          "cryptocurrencies_id" INT NOT NULL
);

-- création de la table de liaison entre les users et les articles
CREATE TABLE "users_articles" (
                                  "user_articles_id" SERIAL NOT NULL,
                                  "user_id" INT NOT NULL,
                                  "articles_id" INT NOT NULL
);

ALTER TABLE "users_cryptocurrencies" ADD CONSTRAINT "fk_users_cryptocurrencies_user_id" FOREIGN KEY("user_id")
    REFERENCES "users" ("user_id");

ALTER TABLE "users_cryptocurrencies" ADD CONSTRAINT "fk_users_cryptocurrencies_cryptocurrencies_id" FOREIGN KEY("cryptocurrencies_id")
    REFERENCES "cryptocurrencies" ("cryptocurrency_id");

ALTER TABLE "users_articles" ADD CONSTRAINT "fk_users_articles_user_id" FOREIGN KEY("user_id")
    REFERENCES "users" ("user_id");

ALTER TABLE "users_articles" ADD CONSTRAINT "fk_users_articles_articles_id" FOREIGN KEY("articles_id")
    REFERENCES "articles" ("article_id");

