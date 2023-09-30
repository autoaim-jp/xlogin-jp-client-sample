#! /bin/bash

# using docker, git, yarn

XDEVKIT_VERSION=v0.17

if [ $# != 2 ]; then
  echo "run.sh (app | test) (build | config | up | up-d | down | xdevkit)"
  exit 1
fi

fileId=${1:-test}
op=${2:-config}


if [ $op = "build" ] || [ $op = "xdevkit" ]; then
  # init-xdevkit
  git submodule update -i && pushd src/xdevkit/ && git checkout master && git pull && git checkout $XDEVKIT_VERSION && git pull origin $XDEVKIT_VERSION && yarn install && popd && cp ./src/xdevkit/server/browserServerSetting.js ./src/setting/browserServerSetting.js && cp ./src/xdevkit/server/browserServerSetting.js ./src/view/src/js/_setting/browserServerSetting.js && cp -r ./src/xdevkit/view/src/js/_xdevkit ./src/view/src/js/_lib/
fi

export COMPOSE_FILE=./docker-compose.${fileId}.yml

# docker compose config
# docker compose build
# docker compose up
# docker compose down

if [ $op = "up-d" ]; then
  docker compose up -d
elif [ ! $op = "xdevkit" ]; then
  docker compose $op
fi

