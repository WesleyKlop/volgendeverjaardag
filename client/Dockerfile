FROM node:18-alpine AS builder

RUN apk add --no-cache python3 make gcc g++

COPY package-lock.json package.json .

RUN --mount=type=cache,target=/root/.npm \
  npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]

FROM nginx:1.23-alpine

EXPOSE 8080

COPY nginx/templates /etc/nginx/templates

COPY --from=builder /usr/src/app/dist /srv/app
