FROM node:14-alpine

ENV APP /docs
RUN mkdir -p $APP

COPY package.json $APP/package.json
COPY package-lock.json $APP/package-lock.json

WORKDIR $APP

RUN npm install
CMD ["npm", "run", "start"]
