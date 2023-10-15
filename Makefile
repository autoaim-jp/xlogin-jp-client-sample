SHELL=/bin/bash
PHONY=default app-rebuild app-build app-up app-up-d app-down test-build test-up test-down view-build view-compile view-compile-minify view-watch init lint lint-fix doc-generate doc-publish clean help

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

init: init-submodule init-xdevkit

lint: init-xdevkit docker-compose-up-lint
lint-fix: init-xdevkit docker-compose-up-lint-fix
doc-generate: docker-compose-up-doc-generate
doc-publish: docker-compose-up-doc-publish

clean: app-down test-down

help:
	@echo "Usage: make (app|test)-(rebuild|build|up|down)"
	@echo "Usage: make view-(build|compile|compile-minify|watch)"
	@echo "Usage: make doc-(generate|publish)"
	@echo "Usage: make (init|lint|lint-fix|clean)"
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
	@echo "  make lint-fix 		          # lint and fix"
	@echo "------------------------------"
	@echo "  make clean                 # Clean app, test container/volume"


# init
init-submodule:
	git submodule update --init
	pushd ./xdevkit/ && git submodule update --init && popd

init-xdevkit:
	cp ./xdevkit/common/xdevkit-setting/browserServerSetting.js ./service/webServer/src/view/src/js/_setting/browserServerSetting.js
	cp ./xdevkit/common/xdevkit-setting/browserServerSetting.js ./service/webServer/src/setting/browserServerSetting.js
	
	rm -rf ./service/webServer/src/xdevkit-auth-router
	cp -r ./xdevkit/common/xdevkit-auth-router ./service/webServer/src/
	rm -rf ./service/webServer/src/xdevkit-auth-router/.git
	
	cp -r ./xdevkit/common/xdevkit-view-component/src/js/_xdevkit ./service/webServer/src/view/src/js/_lib/
	cp -r ./xdevkit/common/xdevkit-view-component/src/ejs ./service/webServer/src/view/src/ejs/_xdevkit

# build
docker-compose-build-app:
	docker compose -p xljp-sample-app -f ./app/docker/docker-compose.app.yml build
docker-compose-build-test:
	docker compose -p xljp-sample-test -f ./docker/docker-compose.test.yml build
docker-compose-build-view:
	docker compose -p xljp-sample-view -f ./app/docker/docker-compose.view.yml build

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
	BUILD_COMMAND="compile" docker compose -p xljp-sample-view -f ./xdevkit/standalone/xdevkit-view-compiler/docker/docker-compose.view.yml up --abort-on-container-exit
docker-compose-up-view-compile-minify:
	BUILD_COMMAND="compile-minify" docker compose -p xljp-sample-view -f ./xdevkit/standalone/xdevkit-view-compiler/docker/docker-compose.view.yml up --abort-on-container-exit
docker-compose-up-view-watch:
	BUILD_COMMAND="watch" docker compose -p xljp-sample-view -f ./xdevkit/standalone/xdevkit-view-compiler/docker/docker-compose.view.yml up --abort-on-container-exit

# down
docker-compose-down-app:
	docker compose -p xljp-sample-app -f ./app/docker/docker-compose.app.yml down --volumes
docker-compose-down-test:
	docker compose -p xljp-sample-test -f ./docker/docker-compose.test.yml down --volumes

# devtool
docker-compose-up-lint:
	docker compose -p xljp-sample-lint -f ./xdevkit/standalone/xdevkit-eslint/docker/docker-compose.eslint.yml up --abort-on-container-exit
docker-compose-up-lint-fix:
	FIX_OPTION="--fix" docker compose -p xljp-sample-lint -f ./xdevkit/standalone/xdevkit-eslint/docker/docker-compose.eslint.yml up --abort-on-container-exit
docker-compose-up-doc-generate:
	GIT_USER_NAME="autoaim_jp" GIT_USER_EMAIL="git@autoaim.jp" JSDOC_COMMAND="generate" docker compose -p xljp-sample-doc -f ./xdevkit/standalone/xdevkit-jsdoc/docker/docker-compose.jsdoc.yml up --abort-on-container-exit
docker-compose-up-doc-publish:
	GIT_USER_NAME="autoaim_jp" GIT_USER_EMAIL="git@autoaim.jp" JSDOC_COMMAND="generate-publish" docker compose -p xljp-sample-doc -f ./xdevkit/standalone/xdevkit-jsdoc/docker/docker-compose.jsdoc.yml up --abort-on-container-exit


%:
	@echo "Target '$@' does not exist."
	@make -s help

