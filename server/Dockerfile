FROM lukechannings/deno:v1.24.3 AS builder

WORKDIR /usr/src/app

COPY . .

RUN --mount=type=cache,target=/deno-dir/deps \
  deno compile \
    --import-map ./import-map.json \
    --allow-net --allow-env --allow-read \
    --output /usr/local/bin/server \
      src/bin/server.ts

EXPOSE 8080
CMD ["run", "--import-map=./import-map.json","--allow-net", "--allow-env", "--allow-read", "--watch", "src/bin/server.ts"]

FROM gcr.io/distroless/cc

EXPOSE 8080
STOPSIGNAL SIGINT
ENTRYPOINT ["/server"]

COPY --from=builder /usr/src/app/migrations /migrations
COPY --from=builder /usr/local/bin/server /server
