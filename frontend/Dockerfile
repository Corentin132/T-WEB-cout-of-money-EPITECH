FROM node:21

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY ./entrypoint.sh ./entrypoint.sh
EXPOSE 5173

CMD ["bash","entrypoint.sh"]