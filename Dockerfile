FROM node:7.9

ENV APP /docs
RUN mkdir -p $APP

COPY package.json $APP/package.json
COPY yarn.lock $APP/yarn.lock

WORKDIR $APP

RUN yarn install --pure-lockfile
