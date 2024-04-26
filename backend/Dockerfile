FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Install dependencies including ts-node
RUN npm install -g ts-node
RUN npm install --save-dev @types/node
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD [ "npm", "start" ]