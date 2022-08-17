permissions := "--allow-net --allow-env --allow-read"
importMap := "--import-map=./import-map.json"

start-server:
    cd server && deno run \
      {{ importMap }} \
      {{ permissions }} \
        src/bin/server.ts

compile-server: clean-server
    cd server && deno compile \
      {{ importMap }} \
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