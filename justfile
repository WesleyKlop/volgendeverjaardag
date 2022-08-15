permissions := "--allow-net --allow-env"
importMap := "--import-map=./import-map.json"

start:
    deno run \
      {{ importMap }} \
      {{ permissions }} \
        src/bin/server.ts

compile: clean
    deno compile \
      {{ importMap }} \
      {{ permissions }} \
      --output bin/server \
        src/bin/server.ts

clean:
    rm -rf ./bin