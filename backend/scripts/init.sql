CREATE TABLE "users" (
                         "user_id"  SERIAL PRIMARY KEY NOT NULL,
                         "username" VARCHAR(255) NOT NULL,
                         "first_name" VARCHAR(255) NOT NULL,
                         "last_name" VARCHAR(255) NOT NULL,
                         "email" VARCHAR(255) NOT NULL,
                         "password_hash" VARCHAR(255) NOT NULL,
                         "oauth" BOOLEAN DEFAULT false NOT NULL,
                         "created_at" TIMESTAMP DEFAULT current_timestamp NULL
);

CREATE TABLE "cryptocurrencies" (
                                    "cryptocurrency_id"  SERIAL PRIMARY KEY NOT NULL,
                                    "code" VARCHAR(10) NOT NULL,
                                    "name" VARCHAR(20) NOT NULL,
                                    "image_url" VARCHAR(255) NOT NULL,
                                    "created_at" TIMESTAMP DEFAULT current_timestamp NOT NULL,
                                    "is_default" BOOLEAN DEFAULT false NOT NULL,
                                    "is_favorite" BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE "articles" (
                            "article_id"  SERIAL PRIMARY KEY NOT NULL,
                            "title" VARCHAR(255) NOT NULL,
                            "summary" TEXT NULL,
                            "source" VARCHAR(255) NULL,
                            "date_published" TIMESTAMP NULL,
                            "url" VARCHAR(255) NOT NULL,
                            "image_url" VARCHAR(255) NULL,
                            "created_at" TIMESTAMP DEFAULT current_timestamp NULL
);

CREATE TABLE "users_cryptocurrencies" (
                                          "users_cryptocurrencies_id"  SERIAL PRIMARY KEY NOT NULL,
                                          "user_id" INT NOT NULL,
                                          "cryptocurrencies_id" INT NOT NULL,
                                          CONSTRAINT "fk_users_cryptocurrencies_user_id" FOREIGN KEY("user_id") REFERENCES "users" ("user_id"),
                                          CONSTRAINT "fk_users_cryptocurrencies_cryptocurrencies_id" FOREIGN KEY("cryptocurrencies_id") REFERENCES "cryptocurrencies" ("cryptocurrency_id")
);

CREATE TABLE "users_articles" (
                                  "user_articles_id"  SERIAL PRIMARY KEY NOT NULL,
                                  "user_id" INT NOT NULL,
                                  "articles_id" INT NOT NULL,
                                  CONSTRAINT "fk_users_articles_user_id" FOREIGN KEY("user_id") REFERENCES "users" ("user_id"),
                                  CONSTRAINT "fk_users_articles_articles_id" FOREIGN KEY("articles_id") REFERENCES "articles" ("article_id")
);

CREATE TABLE "Feed" (
                                    "id" SERIAL NOT NULL,
                                    "url" TEXT NOT NULL,
                                    "name" TEXT NOT NULL,
                                    "active" BOOLEAN NOT NULL DEFAULT true,
                                    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    "updatedAt" TIMESTAMP(3) NOT NULL,
                                    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);
