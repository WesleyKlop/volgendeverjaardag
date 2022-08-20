#!/usr/bin/env sh

set -eu

SRC_DIR="/usr/src/app"

if [ "$PWD" != "$SRC_DIR" ]; then
  echo "Not executing from project dir so skipping sanity checks..."
  exec "$@"
fi

if [ -d ".parcel-cache" ]; then
  >&2 echo "Removing parcel cache..."
  rm -rf .parcel-cache
fi

ARCH_FILE="node_modules/.system-arch"
if [ ! -f "$ARCH_FILE" ] || [ "$(cat $ARCH_FILE)" != "$(uname -m)" ]; then
  >&2 echo "Executing npm ci for a fresh node_modules folder"
  npm ci
  uname -m > "$ARCH_FILE"
fi

exec "$@"