permissions := "--allow-net --allow-env"
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

start-client:
    cd client && npm start

build-client: clean-client
    cd client && npm run build

clean-client:
    rm -rf ./client/dist

build: compile-server build-client

clean: clean-server clean-client
