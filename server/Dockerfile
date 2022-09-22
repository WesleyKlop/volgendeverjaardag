FROM lukechannings/deno:v1.25.4 AS base

WORKDIR /usr/src/app


FROM base AS builder

COPY . .

RUN --mount=type=cache,target=/deno-dir/deps \
  deno compile \
  --allow-net --allow-env --allow-read --allow-write \
  --output /usr/local/bin/server \
  src/bin/server.ts


FROM base as dev

EXPOSE 8080
CMD ["run","--allow-net", "--allow-env", "--allow-read", "--allow-write", "--watch", "src/bin/server.ts"]

FROM gcr.io/distroless/cc

EXPOSE 8080
STOPSIGNAL SIGINT
ENTRYPOINT ["/server"]

COPY --from=builder /usr/src/app/migrations /migrations
COPY --from=builder /usr/local/bin/server /server
