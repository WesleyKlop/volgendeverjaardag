permissions := "--allow-net --allow-env --allow-read --allow-write"

dev:
  docker compose up -d

start-server:
    cd server && deno run \
      {{ permissions }} \
        src/bin/server.ts

compile-server: clean-server
    cd server && deno compile \
      {{ permissions }} \
      --output bin/server \
        src/bin/server.ts

clean-server:
    rm -rf ./server/bin

fmt-server:
    cd server && deno fmt

start-client:
    cd client && npm start

build-client: clean-client
    cd client && npm run build

clean-client:
    rm -rf ./client/dist

fmt-client:
    cd client && npm run fmt

build: compile-server build-client

clean: clean-server clean-client

fmt: fmt-server fmt-client

write-lock-server:
  cd server && deno cache --lock=lock.json --lock-write src/deps.ts

reload-lock-server:
  cd server && deno cache --reload --lock=lock.json src/deps.ts