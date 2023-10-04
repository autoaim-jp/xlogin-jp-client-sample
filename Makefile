include setting/version.conf
SHELL=/bin/bash
PHONY=default app-rebuild app-build app-up app-up-d app-down test-build test-up test-down view-build view-compile view-compile-minify view-watch init lint doc-generate doc-publish clean help

.PHONY: $(PHONY)

default: app-up

app-rebuild: app-down app-build
app-build: init-xdevkit docker-compose-build-app
app-up: docker-compose-up-app
app-up-d: docker-compose-up-app-d
app-down: docker-compose-down-app

test-build: init-xdevkit docker-compose-build-test
test-up: docker-compose-up-test
test-down: docker-compose-down-test

view-build: init-xdevkit docker-compose-build-view
view-compile: docker-compose-up-view-compile
view-compile-minify: docker-compose-up-view-compile-minify
view-watch: docker-compose-up-view-watch

init: init-xdevkit init-common

lint: init-xdevkit docker-compose-up-lint
doc-generate: docker-compose-up-doc-generate
doc-publish: docker-compose-up-doc-publish

clean: app-down test-down

help:
	@echo "Usage: make (app|test)-(rebuild|build|up|down)"
	@echo "Usage: make view-(build|compile|compile-minify|watch)"
	@echo "Usage: make doc-(generate|publish)"
	@echo "Usage: make (init|lint|clean)"
	@echo "Example:"
	@echo "  make app-rebuild           # Recreate image"
	@echo "  make app-build             # Create image"
	@echo "  make app-up                # Start server"
	@echo "  make app-up-d              # Start server and detatch"
	@echo "  make app-down              # Clean app container/volume"
	@echo "------------------------------"
	@echo "  make test-build            # Recreate test image"
	@echo "  make test-up               # Start test"
	@echo "  make test-down             # Clean test container/volume"
	@echo "------------------------------"
	@echo "  make view-build            # build view compiler image"
	@echo "  make view-compile          # compile"
	@echo "  make view-compile-minify   # compile minify"
	@echo "  make view-watch            # watch"
	@echo "------------------------------"
	@echo "  make doc-generate     		  # doc-generate"
	@echo "  make doc-deploy     		    # doc-deploy"
	@echo "------------------------------"
	@echo "  make init                  # Update xdevkit, common"
	@echo "------------------------------"
	@echo "  make lint     		          # lint"
	@echo "------------------------------"
	@echo "  make clean                 # Clean app, test container/volume"


# init
init-xdevkit:
	git submodule update -i && pushd ./common/xdevkit-setting/ && git checkout master && git pull && git checkout ${XDEVKIT_SETTING_VERSION} && git pull origin ${XDEVKIT_SETTING_VERSION} && yarn install && popd
	cp ./common/xdevkit-setting/browserServerSetting.js ./service/webServer/src/view/src/js/_setting/browserServerSetting.js
	cp ./common/xdevkit-setting/browserServerSetting.js ./service/webServer/src/setting/browserServerSetting.js
	git submodule update -i && pushd ./common/xdevkit/ && git checkout master && git pull && git checkout ${XDEVKIT_VERSION} && git pull origin ${XDEVKIT_VERSION} && yarn install && popd
	cp -r ./common/xdevkit/view/src/js/_xdevkit ./service/webServer/src/view/src/js/_lib/
 
# build
docker-compose-build-app:
	docker compose -p xljp-sample-app -f ./app/docker/docker-compose.app.yml build
docker-compose-build-test:
	docker compose -p xljp-sample-test -f ./docker/docker-compose.test.yml build
docker-compose-build-view:
	docker compose -p xljp-sample-view -f ./docker/docker-compose.view.yml build

# up
docker-compose-up-app:
	docker compose -p xljp-sample-app -f ./app/docker/docker-compose.app.yml up
docker-compose-up-app-d:
	docker compose -p xljp-sample-app -f ./app/docker/docker-compose.app.yml up -d
docker-compose-up-test:
	docker compose -p xljp-sample-test -f ./docker/docker-compose.test.yml down 
	docker volume rm xljp-sample_xl-client-sample-rc-redis
	docker compose -p xljp-sample-test -f ./docker/docker-compose.test.yml up --abort-on-container-exit

docker-compose-up-view-compile:
	BUILD_COMMAND="compile" docker compose -p xljp-sample-view -f ./docker/docker-compose.view.yml up --abort-on-container-exit
docker-compose-up-view-compile-minify:
	BUILD_COMMAND="compile-minify" docker compose -p xljp-sample-view -f ./docker/docker-compose.view.yml up --abort-on-container-exit
docker-compose-up-view-watch:
	BUILD_COMMAND="watch" docker compose -p xljp-sample-view -f ./docker/docker-compose.view.yml up --abort-on-container-exit

# down
docker-compose-down-app:
	docker compose -p xljp-sample-app -f ./app/docker/docker-compose.app.yml down --volumes
docker-compose-down-test:
	docker compose -p xljp-sample-test -f ./docker/docker-compose.test.yml down --volumes

# devtool
docker-compose-up-lint:
	docker compose -p xljp-sample-lint -f ./standalone/docker/docker-compose.eslint.yml up --abort-on-container-exit
docker-compose-up-doc-generate:
	BUILD_COMMAND="doc-generate" docker compose -p xljp-sample-doc -f ./docker/docker-compose.doc.yml up
docker-compose-up-doc-publish:
	BUILD_COMMAND="doc-publish" docker compose -p xljp-sample-doc -f ./docker/docker-compose.doc.yml up



%:
	@echo "Target '$@' does not exist."
	@make -s help

