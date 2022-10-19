FROM node:19-alpine AS base

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make gcc g++


FROM base AS builder

COPY package-lock.json package.json ./

RUN --mount=type=cache,target=/root/.npm \
  npm ci

COPY . .

RUN npm run build


FROM base as dev

VOLUME /usr/src/app
COPY --chmod=554 .docker/dev-entrypoint.sh /bin/entrypoint.sh

ENV PORT 8080

ENTRYPOINT ["/bin/entrypoint.sh"]
CMD ["npm", "start" ]


FROM nginx:1.23-alpine

EXPOSE 8080

COPY .docker/nginx /etc/nginx/templates

COPY --from=builder /usr/src/app/dist /srv/app
