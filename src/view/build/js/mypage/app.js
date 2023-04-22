(() => {
    var __defProp = Object.defineProperty;
    var __markAsModule = (target) => __defProp(target, "__esModule", {
        value: true
    });
    var __export = (target, all) => {
        __markAsModule(target);
        for (var name in all)
            __defProp(target, name, {
                get: all[name],
                enumerable: true
            });
    };

    // view/src/js/_setting/index.js
    var setting_exports = {};
    __export(setting_exports, {
        bsc: () => bsc,
        get: () => get2,
        getBrowserServerSetting: () => getBrowserServerSetting
    });

    // view/src/js/_setting/browserServerSetting.js
    var browserServerSetting_exports = {};
    __export(browserServerSetting_exports, {
        apiEndpoint: () => apiEndpoint,
        default: () => browserServerSetting_default,
        get: () => get,
        labelList: () => labelList,
        statusList: () => statusList,
        userReadableDateFormat: () => userReadableDateFormat
    });
    var apiEndpoint = "/f";
    var labelList = {
        scopeBody: {
            global: {
                notification: {
                    label: "\u3059\u3079\u3066\u306E\u901A\u77E5",
                    summary: "\u3059\u3079\u3066\u306E\u30B5\u30FC\u30D3\u30B9\u306E\u901A\u77E5\u306B\u95A2\u3059\u308B\u6A29\u9650\u3067\u3059\u3002\u30ED\u30B0\u30A4\u30F3\u6642\u523B\u306A\u3069\u3092\u542B\u307F\u307E\u3059\u3002"
                }
            },
            auth: {
                emailAddress: {
                    label: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
                    summary: "\u30ED\u30B0\u30A4\u30F3\u306B\u4F7F\u7528\u3059\u308B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306B\u95A2\u3059\u308B\u6A29\u9650\u3067\u3059\u3002\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u542B\u307F\u307E\u305B\u3093\u3002"
                },
                backupEmailAddress: {
                    label: "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
                    summary: "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306B\u95A2\u3059\u308B\u6A29\u9650\u3067\u3059\u3002\u30ED\u30B0\u30A4\u30F3\u306B\u4F7F\u7528\u3059\u308B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u542B\u307F\u307E\u305B\u3093\u3002"
                },
                userName: {
                    label: "\u30E6\u30FC\u30B6\u30FC\u540D",
                    summary: "\u4E00\u822C\u516C\u958B\u3055\u308C\u3066\u3044\u308B\u30E6\u30FC\u30B6\u30FC\u306E\u540D\u524D\u3067\u3059\u3002"
                }
            },
            service: {
                serviceUserId: {
                    label: "\u30E6\u30FC\u30B6\u30FCID",
                    summary: "\u9023\u643A\u3059\u308B\u30B5\u30FC\u30D3\u30B9\u306B\u63D0\u4F9B\u3059\u308B\u3001\u3042\u306A\u305F\u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u306EID\u3067\u3059\u3002\u30B5\u30FC\u30D3\u30B9\u6BCE\u306B\u7570\u306A\u308A\u307E\u3059\u3002"
                },
                notification: {
                    label: "\u30B5\u30FC\u30D3\u30B9\u5185\u901A\u77E5",
                    summary: "\u9023\u643A\u3059\u308B\u30B5\u30FC\u30D3\u30B9\u5185\u3067\u3001\u901A\u77E5\u6A5F\u80FD\u3092\u5229\u7528\u3059\u308B\u305F\u3081\u306E\u6A29\u9650\u3067\u3059\u3002"
                },
                file: {
                    label: "\u30D5\u30A1\u30A4\u30EB",
                    summary: "\u9023\u643A\u3059\u308B\u30B5\u30FC\u30D3\u30B9\u3067\u3001\u3042\u306A\u305F\u304C\u30C7\u30FC\u30BF\u3092\u4FDD\u5B58\u3067\u304D\u307E\u3059\u3002"
                }
            }
        },
        scopeOperation: {
            operation: {
                read: "\u53D6\u5F97",
                write: "\u4FDD\u5B58",
                append: "\u8FFD\u8A18"
            },
            prefix: {
                isRequired: "\u5FC5\u9808"
            }
        },
        error: {
            undefined: "error",
            handle_credential_credential: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u307E\u305F\u306F\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u9055\u3044\u307E\u3059\u3002",
            handle_user_add_register: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u65E2\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
            handle_xlogin_code_session: "\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u4E0D\u6B63\u3067\u3059\u3002"
        }
    };
    var statusList = {
        OK: 1,
        SUCCESS: 100,
        LOGIN_SUCCESS: 101,
        INVALID: 1e3,
        NOT_ENOUGH_PARAM: 1001,
        INVALID_SESSION: 1002,
        API_ERROR: 1100,
        INVALID_OIDC_ISSUER: 1101,
        NOT_FOUND: 1200
    };
    var userReadableDateFormat = {
        full: "YYYY/MM/DD hh:mm:ss",
        day: "YYYY/MM/DD",
        hourMinute: "hh:mm",
        time: "hh:mm:ss"
    };
    var settingList = {
        apiEndpoint,
        labelList,
        statusList,
        userReadableDateFormat
    };
    var get = (...keyList) => {
        const constantList = keyList.reduce((prev, curr) => {
            prev[curr] = settingList[curr];
            return prev;
        }, {});
        for (const key of keyList) {
            if (!constantList[key]) {
                throw new Error(`[error] undefined setting constant: ${key}`);
            }
        }
        return constantList;
    };
    var browserServerSetting_default = settingList;

    // view/src/js/_setting/index.js
    var bsc = browserServerSetting_exports;
    var settingList2 = {};
    var getBrowserServerSetting = () => {
        return browserServerSetting_exports;
    };
    var get2 = (...keyList) => {
        const constantList = keyList.reduce((prev, curr) => {
            prev[curr] = settingList2[curr];
            return prev;
        }, {});
        for (const key of keyList) {
            if (!constantList[key]) {
                throw new Error(`[error] undefined setting constant: ${key}`);
            }
        }
        return constantList;
    };

    // view/src/js/lib.js
    var lib_exports = {};
    __export(lib_exports, {
        applyElmList: () => applyElmList,
        createTabMenuContainer: () => createTabMenuContainer,
        fetchSplitPermissionList: () => fetchSplitPermissionList,
        getCaller: () => getCaller,
        getErrorModalElmAndSetter: () => getErrorModalElmAndSetter,
        getRandomStr: () => getRandomStr,
        getRequest: () => getRequest,
        getSearchQuery: () => getSearchQuery,
        monkeyPatch: () => monkeyPatch,
        postRequest: () => postRequest,
        redirect: () => redirect,
        reloadXloginLoginBtn: () => reloadXloginLoginBtn,
        setOnClickNavManu: () => setOnClickNavManu,
        showModal: () => showModal,
        showNotification: () => showNotification,
        showTabButton: () => showTabButton,
        switchLoading: () => switchLoading
    });
    var getCaller = () => {
        const callerInfo = new Error().stack.replace(/^Error\n.*\n.*\n/, "");
        return callerInfo;
    };
    var getRequest = (_url, param = {}) => {
        const query = param && Object.keys(param).map((key) => {
            return `${key}=${param[key]}`;
        }).join("&");
        const url = query ? `${_url}?${query}` : _url;
        const opt = {
            method: "GET",
            credentials: "same-origin",
            timeout: 30 * 1e3
        };
        return fetch(url, opt).then((res) => {
            if (res.error || !res.body || !res.json) {
                return null;
            }
            return res.json();
        }).catch((e) => {
            console.error("[fatal] error @getRequest:", e);
            return null;
        });
    };
    var postRequest = (url, param = {}) => {
        const opt = {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 30 * 1e3
        };
        if (param) {
            opt.body = JSON.stringify(param);
        }
        return fetch(url, opt).then((res) => {
            if (res.error || !res.body || !res.json) {
                return null;
            }
            return res.json();
        }).catch((e) => {
            console.error("[fatal] error @postRequest:", e);
            return null;
        });
    };
    var fetchSplitPermissionList = (apiEndpoint2) => {
        const url = `${apiEndpoint2}/session/splitPermissionList`;
        return getRequest(url);
    };
    var applyElmList = (query, f, parent = document) => {
        Object.values(parent.querySelectorAll(query)).forEach((elm) => {
            f(elm);
        });
    };
    var closeModal = () => {
        applyElmList('[data-id="modal"], #modalBackground', (elm) => {
            elm.classList.add("hidden");
        });
    };
    var showModal = (modalElm, cancelButtonIsVisible = false, onConfirm = () => {}) => {
        if (modalElm.id === "modalTemplate") {
            modalElm.id = "";
        }
        document.body.appendChild(modalElm);
        closeModal();
        setTimeout(() => {
            applyElmList('[data-id="modalClose"], [data-id="modalCancelButton"]', (elm) => {
                elm.onclick = closeModal;
            }, document);
            if (cancelButtonIsVisible) {
                modalElm.querySelector('[data-id="modalCancelButton"]').classList.remove("hidden");
            } else {
                modalElm.querySelector('[data-id="modalCancelButton"]').classList.add("hidden");
            }
            modalElm.querySelector('[data-id="modalConfirmButton"]').onclick = () => {
                if (typeof onConfirm === "function") {
                    onConfirm();
                }
                closeModal();
            };
            modalElm.classList.remove("hidden");
            document.querySelector("#modalBackground").classList.remove("hidden");
            modalElm.querySelector('[data-id="modalContent"]').scrollTop = 0;
            modalElm.querySelector('[data-id="modalCard"]').onclick = (e) => {
                e.stopPropagation();
            };
            modalElm.onclick = (e) => {
                e.stopPropagation();
                closeModal();
            };
        }, 100);
    };
    var getErrorModalElmAndSetter = () => {
        const modalTemplateElm = document.querySelector("#modalTemplate");
        const modalElm = modalTemplateElm.cloneNode(true);
        modalElm.querySelector('[data-id="modalTitle"]').innerText = "\u30A8\u30E9\u30FC";
        const labelP = document.createElement("p");
        labelP.innerText = "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002";
        modalElm.querySelector('[data-id="modalContent"]').appendChild(labelP);
        const setContent = (textStr, errorLabelList) => {
            labelP.innerText = errorLabelList[textStr] || textStr;
        };
        return {
            modalElm,
            setContent
        };
    };
    var createTabMenuContainer = () => {
        const tabMenuContainerElm = document.querySelector("#tabMenuContainerTemplate").cloneNode(true);
        tabMenuContainerElm.id = "";
        tabMenuContainerElm.classList.remove("hidden");
        return tabMenuContainerElm;
    };
    var _showTabContainer = ({
        activeTabContainerId,
        tabList
    }) => {
        Object.keys(tabList).forEach((tabContainerId) => {
            const tabContainerElm2 = document.querySelector(`#${tabContainerId}`);
            tabContainerElm2.classList.add("hidden");
        });
        const tabContainerElm = document.querySelector(`#${activeTabContainerId}`);
        tabContainerElm.classList.remove("hidden");
    };
    var showTabButton = ({
        tabMenuContainerElm,
        tabList,
        activeTabContainerId
    }) => {
        const getOnClickTabButton = ({
            newActiveTabContainerId
        }) => {
            return (e) => {
                if (e) {
                    e.preventDefault();
                }
                showTabButton({
                    tabMenuContainerElm,
                    tabList,
                    activeTabContainerId: newActiveTabContainerId
                });
                _showTabContainer({
                    tabList,
                    activeTabContainerId: newActiveTabContainerId
                });
            };
        };
        tabMenuContainerElm.clearChildren();
        Object.entries(tabList).forEach(([tabContainerId, value]) => {
            let tabItemElm = null;
            if (tabContainerId === activeTabContainerId) {
                tabItemElm = document.querySelector("#tabActiveItemTemplate").cloneNode(true);
            } else {
                tabItemElm = document.querySelector("#tabItemTemplate").cloneNode(true);
            }
            tabItemElm.id = "";
            tabItemElm.classList.remove("hidden");
            tabItemElm.children[0].innerText = value;
            tabItemElm.children[0].onclick = getOnClickTabButton({
                newActiveTabContainerId: tabContainerId
            });
            tabMenuContainerElm.appendChild(tabItemElm);
            if (tabContainerId === activeTabContainerId) {
                _showTabContainer({
                    tabList,
                    activeTabContainerId: tabContainerId
                });
            }
        });
    };
    var switchLoading = (isVisible) => {
        const loadingElm = document.querySelector("#loading");
        if (!loadingElm) {
            return;
        }
        if (isVisible) {
            loadingElm.classList.remove("hidden");
        } else {
            loadingElm.classList.add("hidden");
        }
    };
    var setOnClickNavManu = () => {
        const toggleElm = document.querySelector("#commonNavToggle");
        const navContentElm = document.querySelector("#commonNavContent");
        toggleElm.onclick = () => {
            if ([...navContentElm.classList.values()].indexOf("hidden") >= 0) {
                navContentElm.classList.remove("hidden");
            } else {
                navContentElm.classList.add("hidden");
            }
        };
    };
    var reloadXloginLoginBtn = (clientId) => {
        const getOnClickXloginButtonHandler = () => {
            const handler = (elm) => {
                const {
                    permission
                } = elm.dataset;
                let queryPart = "";
                if (permission !== void 0) {
                    queryPart += `&requestScope=${permission.replace(/\$CLIENT_ID/g, clientId)}`;
                }
                return () => {
                    window.location.href = `/f/xlogin/connect?redirectAfterAuth=/mypage${queryPart}`;
                };
            };
            return handler;
        };
        const setOnClickXloginButton = ({
            onClickXloginButtonHandler: onClickXloginButtonHandler2
        }) => {
            document.querySelectorAll('[data-id="xloginLoginBtn"]').forEach((elm) => {
                elm.onclick = onClickXloginButtonHandler2(elm);
            });
        };
        const onClickXloginButtonHandler = getOnClickXloginButtonHandler();
        setOnClickXloginButton({
            onClickXloginButtonHandler
        });
    };
    var notificationIsVisible = false;
    var showNotification = async (apiEndpoint2) => {
        if (notificationIsVisible) {
            return;
        }
        notificationIsVisible = true;
        const durationShow = 0.5;
        const durationHide = 0.2;
        const resultFetchGlobalNotification = await getRequest(`${apiEndpoint2}/notification/list`);
        const notificationContainerElm = document.querySelector("#notificationContainer");
        notificationContainerElm.clearChildren();
        const notificationTemplateElm = document.querySelector("#notificationTemplate");
        const notificationList = Object.values(resultFetchGlobalNotification?.result?.notificationList || {}).reverse();
        notificationList.forEach((row, i) => {
            const notificationElm = notificationTemplateElm.cloneNode(true);
            notificationElm.classList.remove("hidden");
            notificationElm.querySelector('[data-id="subject"]').innerText = row.subject;
            notificationElm.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const modalTemplateElm = document.querySelector("#modalTemplate");
                const modalElm = modalTemplateElm.cloneNode(true);
                modalElm.classList.remove("hidden");
                modalElm.querySelector('[data-id="modalTitle"]').innerText = row.subject;
                modalElm.querySelector('[data-id="modalContent"]').appendChild(document.createTextNode(row.detail));
                showModal(modalElm);
            };
            setTimeout(() => {
                notificationElm.style.transitionDuration = `${durationShow}s`;
                notificationElm.style.opacity = 0;
                notificationContainerElm.appendChild(notificationElm);
                setTimeout(() => {
                    notificationElm.style.opacity = 1;
                }, 100);
            }, durationShow * i * 1e3);
            setTimeout(() => {
                notificationElm.style.transitionDuration = `${durationHide}s`;
                notificationElm.style.opacity = 0;
            }, durationShow * notificationList.length * 1e3 + 3 * 1e3 + durationHide * i * 1e3);
        });
        setTimeout(() => {
            notificationContainerElm.clearChildren();
            notificationIsVisible = false;
        }, (durationShow + durationHide) * notificationList.length * 1e3 + 3 * 1e3);
        const notificationIdList = Object.keys(resultFetchGlobalNotification?.result?.notificationList || {});
        if (notificationIdList.length === 0) {
            return;
        }
        const param = {
            notificationIdList
        };
        await postRequest(`${apiEndpoint2}/notification/open`, param);
    };
    var monkeyPatch = () => {
        if (typeof Element.prototype.clearChildren === "undefined") {
            Object.defineProperty(Element.prototype, "clearChildren", {
                configurable: true,
                enumerable: false,
                value() {
                    while (this.firstChild) {
                        this.removeChild(this.lastChild);
                    }
                }
            });
        }
        if (typeof window.argNamed === "undefined") {
            window.argNamed = (obj) => {
                const flattened = {};
                Object.keys(obj).forEach((key) => {
                    if (Array.isArray(obj[key])) {
                        Object.assign(flattened, obj[key].reduce((prev, curr) => {
                            if (typeof curr === "undefined") {
                                throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}
===== maybe you need make func exported like  module.exports = { func, } =====`);
                            } else if (typeof curr === "function") {
                                prev[curr.name] = curr;
                            } else {
                                throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}`);
                            }
                            return prev;
                        }, {}));
                    } else if (typeof obj[key] === "object" && obj[key] !== null) {
                        Object.assign(flattened, obj[key]);
                    } else {
                        flattened[key] = obj[key];
                    }
                });
                return flattened;
            };
        }
    };
    var getRandomStr = (len) => {
        return btoa(crypto.getRandomValues(new Uint8Array(len))).slice(0, len);
    };
    var redirect = (response) => {
        if (response && response.redirect) {
            window.location.href = response.redirect;
        }
    };
    var getSearchQuery = () => {
        const searchQuery = {};
        window.location.search.replace(/^\?/, "").split("&").forEach((row) => {
            const kv = row.split("=");
            const [key, value] = kv;
            searchQuery[key] = value;
        });
        return searchQuery;
    };

    // view/src/js/mypage/input.js
    var input_exports = {};
    __export(input_exports, {
        default: () => input_default,
        fetchMessage: () => fetchMessage,
        fetchUserProfile: () => fetchUserProfile,
        getBackupEmailAddress: () => getBackupEmailAddress
    });
    var fetchUserProfile = ({
        apiEndpoint: apiEndpoint2,
        getRequest: getRequest2
    }) => {
        const url = `${apiEndpoint2}/user/profile`;
        return getRequest2(url);
    };
    var fetchMessage = ({
        apiEndpoint: apiEndpoint2,
        getRequest: getRequest2
    }) => {
        const url = `${apiEndpoint2}/message/content`;
        return getRequest2(url);
    };
    var getBackupEmailAddress = ({
        userInfoResult
    }) => {
        const backupEmailAddress = userInfoResult?.userInfo?.public?.["auth:backupEmailAddress"];
        return backupEmailAddress || "";
    };
    var input_default = {};

    // view/src/js/mypage/action.js
    var action_exports = {};
    __export(action_exports, {
        default: () => action_default,
        getOnClickAddTimerButton: () => getOnClickAddTimerButton,
        getOnClickDeleteMessageButton: () => getOnClickDeleteMessageButton,
        getOnClickSaveMessageButton: () => getOnClickSaveMessageButton,
        getOnSubmitBackupEmailAddress: () => getOnSubmitBackupEmailAddress
    });
    var getOnClickAddTimerButton = ({
        addTimer
    }) => {
        return () => {
            addTimer();
        };
    };
    var getOnClickSaveMessageButton = ({
        saveMessage
    }) => {
        return () => {
            saveMessage();
        };
    };
    var getOnClickDeleteMessageButton = ({
        deleteMessage
    }) => {
        return () => {
            deleteMessage();
        };
    };
    var getOnSubmitBackupEmailAddress = ({
        saveBackupEmailAddress
    }) => {
        return () => {
            saveBackupEmailAddress();
        };
    };
    var action_default = {};

    // view/src/js/mypage/output.js
    var output_exports = {};
    __export(output_exports, {
        addTabMenuContainer: () => addTabMenuContainer,
        getAddTimer: () => getAddTimer,
        getDeleteMessage: () => getDeleteMessage,
        getSaveBackupEmailAddress: () => getSaveBackupEmailAddress,
        getSaveMessage: () => getSaveMessage,
        setOnClickAddTimerButton: () => setOnClickAddTimerButton,
        setOnClickDeleteMessageButton: () => setOnClickDeleteMessageButton,
        setOnClickSaveMessageButton: () => setOnClickSaveMessageButton,
        setOnSubmitBackupEmailAddress: () => setOnSubmitBackupEmailAddress,
        showBackupEmailAddress: () => showBackupEmailAddress,
        showBackupEmailAddressForm: () => showBackupEmailAddressForm,
        showEditor: () => showEditor,
        showMessage: () => showMessage,
        showUserProfile: () => showUserProfile
    });
    var showUserProfile = ({
        userInfoResult,
        applyElmList: applyElmList2
    }) => {
        const {
            userInfo
        } = userInfoResult;
        Object.entries(userInfo?.public || {}).forEach(([key, value]) => {
            applyElmList2(`[data-var='${key}']`, (elm) => {
                elm.clearChildren();
                elm.appendChild(document.createTextNode(value));
            });
        });
    };
    var getAddTimer = ({
        apiEndpoint: apiEndpoint2,
        postRequest: postRequest2
    }) => {
        const url = `${apiEndpoint2}/timer/add`;
        return () => {
            return postRequest2(url);
        };
    };
    var getSaveMessage = ({
        apiEndpoint: apiEndpoint2,
        postRequest: postRequest2
    }) => {
        const url = `${apiEndpoint2}/message/save`;
        return () => {
            const messageContentElm = document.querySelector("#messageContent");
            const param = {
                message: messageContentElm.value
            };
            return postRequest2(url, param);
        };
    };
    var getDeleteMessage = ({
        apiEndpoint: apiEndpoint2,
        postRequest: postRequest2
    }) => {
        const url = `${apiEndpoint2}/message/delete`;
        return () => {
            const param = {};
            return postRequest2(url, param);
        };
    };
    var getSaveBackupEmailAddress = ({
        apiEndpoint: apiEndpoint2,
        postRequest: postRequest2
    }) => {
        const url = `${apiEndpoint2}/backupEmailAddress/save`;
        return () => {
            const backupEmailAddressInputElm = document.querySelector("#backupEmailAddressInput");
            const param = {
                backupEmailAddress: backupEmailAddressInputElm.value
            };
            return postRequest2(url, param);
        };
    };
    var setOnClickAddTimerButton = ({
        onClickAddTimerButton
    }) => {
        const addTimerBtn = document.querySelector("#addTimerBtn");
        addTimerBtn.onclick = (e) => {
            e.preventDefault();
            onClickAddTimerButton();
        };
    };
    var setOnClickSaveMessageButton = ({
        onClickSaveMessageButton
    }) => {
        const saveMessageBtn = document.querySelector("#saveMessageBtn");
        saveMessageBtn.onclick = (e) => {
            e.preventDefault();
            onClickSaveMessageButton();
        };
    };
    var setOnClickDeleteMessageButton = ({
        onClickDeleteMessageButton
    }) => {
        const deleteMessageBtn = document.querySelector("#deleteMessageBtn");
        deleteMessageBtn.onclick = (e) => {
            e.preventDefault();
            onClickDeleteMessageButton();
        };
    };
    var setOnSubmitBackupEmailAddress = ({
        onSubmitBackupEmailAddress
    }) => {
        const backupEmailAddressFormElm = document.querySelector("#backupEmailAddressForm");
        backupEmailAddressFormElm.onsubmit = (e) => {
            e.preventDefault();
            onSubmitBackupEmailAddress();
        };
    };
    var showBackupEmailAddress = ({
        backupEmailAddress
    }) => {
        const backupEmailAddressInputElm = document.querySelector("#backupEmailAddressInput");
        backupEmailAddressInputElm.value = backupEmailAddress;
    };
    var showMessage = ({
        messageResult
    }) => {
        document.querySelector("#messageContent").value = messageResult.result.fileContent;
    };
    var showEditor = ({
        splitPermissionListResult
    }) => {
        const {
            splitPermissionList,
            clientId
        } = splitPermissionListResult.result;
        if (splitPermissionList.optional[`rw:${clientId}:file`]) {
            document.querySelector("#editorContainer").classList.remove("hidden");
        } else {
            document.querySelector("#filePermissionRequestContainer").classList.remove("hidden");
        }
    };
    var showBackupEmailAddressForm = ({
        splitPermissionListResult
    }) => {
        const {
            splitPermissionList
        } = splitPermissionListResult.result;
        if (splitPermissionList.optional["rw:auth:backupEmailAddress"]) {
            document.querySelector("#backupEmailAddressForm").classList.remove("hidden");
        } else {
            document.querySelector("#backupEmailAddressPermissionRequestContainer").classList.remove("hidden");
        }
    };
    var addTabMenuContainer = ({
        createTabMenuContainer: createTabMenuContainer2,
        showTabButton: showTabButton2,
        tabList,
        activeTabContainerId
    }) => {
        const tabMenuContainerElm = createTabMenuContainer2();
        const tabMenuContainerWrapElm = document.querySelector("#tabMenuContainerWrap");
        tabMenuContainerWrapElm.appendChild(tabMenuContainerElm);
        showTabButton2({
            tabMenuContainerElm,
            tabList,
            activeTabContainerId
        });
    };

    // view/src/js/mypage/app.js
    var asocial = {};
    asocial.setting = setting_exports;
    asocial.lib = lib_exports;
    asocial.input = input_exports;
    asocial.action = action_exports;
    asocial.output = output_exports;
    var a = asocial;
    var loadProfile = async () => {
        const userInfoResult = await a.input.fetchUserProfile(argNamed({
            browserServerSetting: a.setting.getBrowserServerSetting().get("apiEndpoint"),
            lib: [a.lib.getRequest]
        }));
        a.lib.redirect(userInfoResult);
        a.output.showUserProfile(argNamed({
            lib: [a.lib.applyElmList],
            other: {
                userInfoResult
            }
        }));
        return userInfoResult;
    };
    var loadTimerBtn = async () => {
        const addTimer = a.output.getAddTimer(argNamed({
            browserServerSetting: a.setting.getBrowserServerSetting().get("apiEndpoint"),
            lib: [a.lib.postRequest]
        }));
        const onClickAddTimerButton = a.action.getOnClickAddTimerButton(argNamed({
            output: {
                addTimer
            }
        }));
        a.output.setOnClickAddTimerButton(argNamed({
            onClick: {
                onClickAddTimerButton
            }
        }));
    };
    var showNotification2 = () => {
        setInterval(() => {
            a.lib.showNotification(a.setting.bsc.apiEndpoint);
        }, 30 * 1e3);
    };
    var loadMessageContent = async () => {
        const messageResult = await a.input.fetchMessage(argNamed({
            browserServerSetting: a.setting.getBrowserServerSetting().get("apiEndpoint"),
            lib: [a.lib.getRequest]
        }));
        a.output.showMessage(argNamed({
            param: {
                messageResult
            }
        }));
    };
    var loadMessageBtn = () => {
        const saveMessage = a.output.getSaveMessage(argNamed({
            browserServerSetting: a.setting.getBrowserServerSetting().get("apiEndpoint"),
            lib: [a.lib.postRequest]
        }));
        const onClickSaveMessageButton = a.action.getOnClickSaveMessageButton(argNamed({
            output: {
                saveMessage
            }
        }));
        a.output.setOnClickSaveMessageButton(argNamed({
            onClick: {
                onClickSaveMessageButton
            }
        }));
        const deleteMessage = a.output.getDeleteMessage(argNamed({
            browserServerSetting: a.setting.getBrowserServerSetting().get("apiEndpoint"),
            lib: [a.lib.postRequest]
        }));
        const onClickDeleteMessageButton = a.action.getOnClickDeleteMessageButton(argNamed({
            output: {
                deleteMessage
            }
        }));
        a.output.setOnClickDeleteMessageButton(argNamed({
            onClick: {
                onClickDeleteMessageButton
            }
        }));
    };
    var loadPermission = async () => {
        const splitPermissionListResult = await a.lib.fetchSplitPermissionList(a.setting.getBrowserServerSetting().apiEndpoint);
        a.output.showEditor(argNamed({
            param: {
                splitPermissionListResult
            }
        }));
        a.output.showBackupEmailAddressForm(argNamed({
            param: {
                splitPermissionListResult
            }
        }));
        a.lib.reloadXloginLoginBtn(splitPermissionListResult.result.clientId);
    };
    var loadTabBtn = async () => {
        const tabList = {
            editorTabContainer: "\u30A8\u30C7\u30A3\u30BF",
            timerTabContainer: "\u30BF\u30A4\u30DE\u30FC",
            backupEmailAddressFormTabContainer: "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"
        };
        const activeTabContainerId = Object.keys(tabList)[0];
        a.output.addTabMenuContainer(argNamed({
            lib: [a.lib.createTabMenuContainer, a.lib.showTabButton],
            param: {
                tabList,
                activeTabContainerId
            }
        }));
    };
    var loadBackupEmailAddressForm = async ({
        userInfoResult
    }) => {
        const backupEmailAddress = a.input.getBackupEmailAddress(argNamed({
            param: {
                userInfoResult
            }
        }));
        a.output.showBackupEmailAddress(argNamed({
            param: {
                backupEmailAddress
            }
        }));
        const saveBackupEmailAddress = a.output.getSaveBackupEmailAddress(argNamed({
            browserServerSetting: a.setting.getBrowserServerSetting().get("apiEndpoint"),
            lib: [a.lib.postRequest]
        }));
        const onSubmitBackupEmailAddress = a.action.getOnSubmitBackupEmailAddress(argNamed({
            param: {
                saveBackupEmailAddress
            }
        }));
        a.output.setOnSubmitBackupEmailAddress(argNamed({
            param: {
                onSubmitBackupEmailAddress
            }
        }));
    };
    var main = async () => {
        a.lib.switchLoading(true);
        a.lib.setOnClickNavManu();
        a.lib.monkeyPatch();
        const userInfoResult = await a.app.loadProfile();
        await a.app.loadBackupEmailAddressForm({
            userInfoResult
        });
        a.app.loadTimerBtn();
        a.app.loadMessageContent();
        a.app.loadMessageBtn();
        a.app.loadTabBtn();
        a.app.showNotification();
        a.app.loadPermission();
        setTimeout(() => {
            a.lib.switchLoading(false);
        }, 300);
    };
    a.app = {
        main,
        loadProfile,
        loadTimerBtn,
        showNotification: showNotification2,
        loadMessageContent,
        loadMessageBtn,
        loadPermission,
        loadTabBtn,
        loadBackupEmailAddressForm
    };
    a.app.main();
})();