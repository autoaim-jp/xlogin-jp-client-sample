(()=>{var __defProp=Object.defineProperty,asocial=(target,all)=>{for(var name in(target=>__defProp(target,"__esModule",{value:!0}))(target),all)__defProp(target,name,{get:all[name],enumerable:!0})},setting_exports={};asocial(setting_exports,{bsc:()=>bsc,get:()=>get2,getBrowserServerSetting:()=>getBrowserServerSetting});var browserServerSetting_exports={};asocial(browserServerSetting_exports,{apiEndpoint:()=>apiEndpoint,default:()=>browserServerSetting_default,get:()=>get,labelList:()=>labelList,statusList:()=>statusList,userReadableDateFormat:()=>userReadableDateFormat});var apiEndpoint="/f",labelList={scopeBody:{global:{notification:{label:"すべての通知",summary:"すべてのサービスの通知に関する権限です。ログイン時刻などを含みます。"}},auth:{emailAddress:{label:"メールアドレス",summary:"ログインに使用するメールアドレスに関する権限です。バックアップメールアドレスは含みません。"},backupEmailAddress:{label:"バックアップメールアドレス",summary:"バックアップメールアドレスに関する権限です。ログインに使用するメールアドレスは含みません。"},userName:{label:"ユーザー名",summary:"一般公開されているユーザーの名前です。"}},service:{serviceUserId:{label:"ユーザーID",summary:"連携するサービスに提供する、あなたのアカウントのIDです。サービス毎に異なります。"},notification:{label:"サービス内通知",summary:"連携するサービス内で、通知機能を利用するための権限です。"},file:{label:"ファイル",summary:"連携するサービスで、あなたがデータを保存できます。"}}},scopeOperation:{operation:{read:"取得",write:"保存",append:"追記"},prefix:{isRequired:"必須"}},error:{undefined:"error",handle_credential_credential:"メールアドレスまたはパスワードが違います。",handle_user_add_register:"メールアドレスは既に登録されています。",handle_xlogin_code_session:"セッションが不正です。"}},statusList={OK:1,SUCCESS:100,LOGIN_SUCCESS:101,INVALID:1e3,NOT_ENOUGH_PARAM:1001,INVALID_SESSION:1002,API_ERROR:1100,INVALID_OIDC_ISSUER:1101,NOT_FOUND:1200},userReadableDateFormat={full:"YYYY/MM/DD hh:mm:ss",day:"YYYY/MM/DD",hourMinute:"hh:mm",time:"hh:mm:ss"},settingList={apiEndpoint:apiEndpoint,labelList:labelList,statusList:statusList,userReadableDateFormat:userReadableDateFormat},get=(...keyList)=>{var constantList=keyList.reduce((prev,curr)=>(prev[curr]=settingList[curr],prev),{});for(const key of keyList)if(!constantList[key])throw new Error(`[error] undefined setting constant: ${key}`);return constantList},browserServerSetting_default=settingList,bsc=browserServerSetting_exports,settingList2={},getBrowserServerSetting=()=>browserServerSetting_exports,get2=(...keyList)=>{var constantList=keyList.reduce((prev,curr)=>(prev[curr]=settingList2[curr],prev),{});for(const key of keyList)if(!constantList[key])throw new Error(`[error] undefined setting constant: ${key}`);return constantList},lib_exports={};asocial(lib_exports,{applyElmList:()=>applyElmList,createTabMenuContainer:()=>createTabMenuContainer,fetchSplitPermissionList:()=>fetchSplitPermissionList,getCaller:()=>getCaller,getErrorModalElmAndSetter:()=>getErrorModalElmAndSetter,getRandomStr:()=>getRandomStr,getRequest:()=>getRequest,getSearchQuery:()=>getSearchQuery,monkeyPatch:()=>monkeyPatch,postRequest:()=>postRequest,redirect:()=>redirect,reloadXloginLoginBtn:()=>reloadXloginLoginBtn,setOnClickNavManu:()=>setOnClickNavManu,showModal:()=>showModal,showNotification:()=>showNotification,showTabButton:()=>showTabButton,switchLoading:()=>switchLoading});var getCaller=()=>{return(new Error).stack.replace(/^Error\n.*\n.*\n/,"")},getRequest=(_url,param={})=>{var query=param&&Object.keys(param).map(key=>`${key}=${param[key]}`).join("&");return fetch(query?`${_url}?${query}`:_url,{method:"GET",credentials:"same-origin",timeout:3e4}).then(res=>!res.error&&res.body&&res.json?res.json():null).catch(e=>(console.error("[fatal] error @getRequest:",e),null))},postRequest=(url,param={})=>{const opt={method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},timeout:3e4};return param&&(opt.body=JSON.stringify(param)),fetch(url,opt).then(res=>!res.error&&res.body&&res.json?res.json():null).catch(e=>(console.error("[fatal] error @postRequest:",e),null))},fetchSplitPermissionList=apiEndpoint2=>{return getRequest(`${apiEndpoint2}/session/splitPermissionList`)},applyElmList=(query,f,parent=document)=>{Object.values(parent.querySelectorAll(query)).forEach(elm=>{f(elm)})},closeModal=()=>{applyElmList('[data-id="modal"], #modalBackground',elm=>{elm.classList.add("hidden")})},showModal=(modalElm,cancelButtonIsVisible=!1,onConfirm=()=>{})=>{"modalTemplate"===modalElm.id&&(modalElm.id=""),document.body.appendChild(modalElm),closeModal(),setTimeout(()=>{applyElmList('[data-id="modalClose"], [data-id="modalCancelButton"]',elm=>{elm.onclick=closeModal},document),cancelButtonIsVisible?modalElm.querySelector('[data-id="modalCancelButton"]').classList.remove("hidden"):modalElm.querySelector('[data-id="modalCancelButton"]').classList.add("hidden"),modalElm.querySelector('[data-id="modalConfirmButton"]').onclick=()=>{"function"==typeof onConfirm&&onConfirm(),closeModal()},modalElm.classList.remove("hidden"),document.querySelector("#modalBackground").classList.remove("hidden"),modalElm.querySelector('[data-id="modalContent"]').scrollTop=0,modalElm.querySelector('[data-id="modalCard"]').onclick=e=>{e.stopPropagation()},modalElm.onclick=e=>{e.stopPropagation(),closeModal()}},100)},getErrorModalElmAndSetter=()=>{const modalTemplateElm=document.querySelector("#modalTemplate"),modalElm=modalTemplateElm.cloneNode(!0);modalElm.querySelector('[data-id="modalTitle"]').innerText="エラー";const labelP=document.createElement("p");labelP.innerText="エラーが発生しました。",modalElm.querySelector('[data-id="modalContent"]').appendChild(labelP);return{modalElm:modalElm,setContent:(textStr,errorLabelList)=>{labelP.innerText=errorLabelList[textStr]||textStr}}},createTabMenuContainer=()=>{const tabMenuContainerElm=document.querySelector("#tabMenuContainerTemplate").cloneNode(!0);return tabMenuContainerElm.id="",tabMenuContainerElm.classList.remove("hidden"),tabMenuContainerElm},_showTabContainer=({activeTabContainerId,tabList})=>{Object.keys(tabList).forEach(tabContainerId=>{const tabContainerElm2=document.querySelector(`#${tabContainerId}`);tabContainerElm2.classList.add("hidden")});const tabContainerElm=document.querySelector(`#${activeTabContainerId}`);tabContainerElm.classList.remove("hidden")},showTabButton=({tabMenuContainerElm,tabList,activeTabContainerId})=>{tabMenuContainerElm.clearChildren(),Object.entries(tabList).forEach(([tabContainerId,value])=>{let tabItemElm=null;var newActiveTabContainerId;tabItemElm=(tabContainerId===activeTabContainerId?document.querySelector("#tabActiveItemTemplate"):document.querySelector("#tabItemTemplate")).cloneNode(!0),tabItemElm.id="",tabItemElm.classList.remove("hidden"),tabItemElm.children[0].innerText=value,tabItemElm.children[0].onclick=(newActiveTabContainerId=[{newActiveTabContainerId:tabContainerId}["newActiveTabContainerId"]][0],e=>{e&&e.preventDefault(),showTabButton({tabMenuContainerElm:tabMenuContainerElm,tabList:tabList,activeTabContainerId:newActiveTabContainerId}),_showTabContainer({tabList:tabList,activeTabContainerId:newActiveTabContainerId})}),tabMenuContainerElm.appendChild(tabItemElm),tabContainerId===activeTabContainerId&&_showTabContainer({tabList:tabList,activeTabContainerId:tabContainerId})})},switchLoading=isVisible=>{const loadingElm=document.querySelector("#loading");loadingElm&&(isVisible?loadingElm.classList.remove("hidden"):loadingElm.classList.add("hidden"))},setOnClickNavManu=()=>{const toggleElm=document.querySelector("#commonNavToggle"),navContentElm=document.querySelector("#commonNavContent");toggleElm.onclick=()=>{0<=[...navContentElm.classList.values()].indexOf("hidden")?navContentElm.classList.remove("hidden"):navContentElm.classList.add("hidden")}},reloadXloginLoginBtn=clientId=>{var onClickXloginButtonHandler2;onClickXloginButtonHandler2=elm=>{const permission=elm.dataset["permission"];let queryPart="";return void 0!==permission&&(queryPart+=`&requestScope=${permission.replace(/\$CLIENT_ID/g,clientId)}`),()=>{window.location.href=`/f/xlogin/connect?redirectAfterAuth=/mypage${queryPart}`}},document.querySelectorAll('[data-id="xloginLoginBtn"]').forEach(elm=>{elm.onclick=onClickXloginButtonHandler2(elm)})},notificationIsVisible=!1,showNotification=async apiEndpoint2=>{if(!notificationIsVisible){notificationIsVisible=!0;var notificationIdList=await getRequest(`${apiEndpoint2}/notification/list`);const notificationContainerElm=document.querySelector("#notificationContainer");notificationContainerElm.clearChildren();const notificationTemplateElm=document.querySelector("#notificationTemplate"),notificationList=Object.values(notificationIdList?.result?.notificationList||{}).reverse();notificationList.forEach((row,i)=>{const notificationElm=notificationTemplateElm.cloneNode(!0);notificationElm.classList.remove("hidden"),notificationElm.querySelector('[data-id="subject"]').innerText=row.subject,notificationElm.onclick=e=>{e.preventDefault(),e.stopPropagation();const modalTemplateElm=document.querySelector("#modalTemplate"),modalElm=modalTemplateElm.cloneNode(!0);modalElm.classList.remove("hidden"),modalElm.querySelector('[data-id="modalTitle"]').innerText=row.subject,modalElm.querySelector('[data-id="modalContent"]').appendChild(document.createTextNode(row.detail)),showModal(modalElm)},setTimeout(()=>{notificationElm.style.transitionDuration="0.5s",notificationElm.style.opacity=0,notificationContainerElm.appendChild(notificationElm),setTimeout(()=>{notificationElm.style.opacity=1},100)},.5*i*1e3),setTimeout(()=>{notificationElm.style.transitionDuration="0.2s",notificationElm.style.opacity=0},.5*notificationList.length*1e3+3e3+.2*i*1e3)}),setTimeout(()=>{notificationContainerElm.clearChildren(),notificationIsVisible=!1},.7*notificationList.length*1e3+3e3);notificationIdList=Object.keys(notificationIdList?.result?.notificationList||{});0!==notificationIdList.length&&await postRequest(`${apiEndpoint2}/notification/open`,{notificationIdList:notificationIdList})}},monkeyPatch=()=>{void 0===Element.prototype.clearChildren&&Object.defineProperty(Element.prototype,"clearChildren",{configurable:!0,enumerable:!1,value(){for(;this.firstChild;)this.removeChild(this.lastChild)}}),void 0===window.argNamed&&(window.argNamed=obj=>{const flattened={};return Object.keys(obj).forEach(key=>{Array.isArray(obj[key])?Object.assign(flattened,obj[key].reduce((prev,curr)=>{if(void 0===curr)throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}
===== maybe you need make func exported like  module.exports = { func, } =====`);if("function"!=typeof curr)throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}`);return prev[curr.name]=curr,prev},{})):"object"==typeof obj[key]&&null!==obj[key]?Object.assign(flattened,obj[key]):flattened[key]=obj[key]}),flattened})},getRandomStr=len=>btoa(crypto.getRandomValues(new Uint8Array(len))).slice(0,len),redirect=response=>{response&&response.redirect&&(window.location.href=response.redirect)},getSearchQuery=()=>{const searchQuery={};return window.location.search.replace(/^\?/,"").split("&").forEach(value=>{var[key,value]=value.split("=");searchQuery[key]=value}),searchQuery},input_exports={};asocial(input_exports,{default:()=>input_default,fetchMessage:()=>fetchMessage,fetchUserProfile:()=>fetchUserProfile,getBackupEmailAddress:()=>getBackupEmailAddress});var fetchUserProfile=({apiEndpoint:apiEndpoint2,getRequest:getRequest2})=>{return getRequest2(`${apiEndpoint2}/user/profile`)},fetchMessage=({apiEndpoint:apiEndpoint2,getRequest:getRequest2})=>{return getRequest2(`${apiEndpoint2}/message/content`)},getBackupEmailAddress=({userInfoResult})=>{return userInfoResult?.userInfo?.public?.["auth:backupEmailAddress"]||""},input_default={},action_exports={};asocial(action_exports,{default:()=>action_default,getOnClickAddTimerButton:()=>getOnClickAddTimerButton,getOnClickDeleteMessageButton:()=>getOnClickDeleteMessageButton,getOnClickSaveMessageButton:()=>getOnClickSaveMessageButton,getOnSubmitBackupEmailAddress:()=>getOnSubmitBackupEmailAddress});var getOnClickAddTimerButton=({addTimer})=>()=>{addTimer()},getOnClickSaveMessageButton=({saveMessage})=>()=>{saveMessage()},getOnClickDeleteMessageButton=({deleteMessage})=>()=>{deleteMessage()},getOnSubmitBackupEmailAddress=({saveBackupEmailAddress})=>()=>{saveBackupEmailAddress()},action_default={},output_exports={};asocial(output_exports,{addTabMenuContainer:()=>addTabMenuContainer,getAddTimer:()=>getAddTimer,getDeleteMessage:()=>getDeleteMessage,getSaveBackupEmailAddress:()=>getSaveBackupEmailAddress,getSaveMessage:()=>getSaveMessage,setOnClickAddTimerButton:()=>setOnClickAddTimerButton,setOnClickDeleteMessageButton:()=>setOnClickDeleteMessageButton,setOnClickSaveMessageButton:()=>setOnClickSaveMessageButton,setOnSubmitBackupEmailAddress:()=>setOnSubmitBackupEmailAddress,showBackupEmailAddress:()=>showBackupEmailAddress,showBackupEmailAddressForm:()=>showBackupEmailAddressForm,showEditor:()=>showEditor,showMessage:()=>showMessage,showUserProfile:()=>showUserProfile});var showUserProfile=({userInfoResult:userInfo,applyElmList:applyElmList2})=>{var userInfo=userInfo["userInfo"];Object.entries(userInfo?.public||{}).forEach(([key,value])=>{applyElmList2(`[data-var='${key}']`,elm=>{elm.clearChildren(),elm.appendChild(document.createTextNode(value))})})},getAddTimer=({apiEndpoint:apiEndpoint2,postRequest:postRequest2})=>{const url=`${apiEndpoint2}/timer/add`;return()=>postRequest2(url)},getSaveMessage=({apiEndpoint:apiEndpoint2,postRequest:postRequest2})=>{const url=`${apiEndpoint2}/message/save`;return()=>{var param={message:document.querySelector("#messageContent").value};return postRequest2(url,param)}},getDeleteMessage=({apiEndpoint:apiEndpoint2,postRequest:postRequest2})=>{const url=`${apiEndpoint2}/message/delete`;return()=>{return postRequest2(url,{})}},getSaveBackupEmailAddress=({apiEndpoint:apiEndpoint2,postRequest:postRequest2})=>{const url=`${apiEndpoint2}/backupEmailAddress/save`;return()=>{var param={backupEmailAddress:document.querySelector("#backupEmailAddressInput").value};return postRequest2(url,param)}},setOnClickAddTimerButton=({onClickAddTimerButton})=>{const addTimerBtn=document.querySelector("#addTimerBtn");addTimerBtn.onclick=e=>{e.preventDefault(),onClickAddTimerButton()}},setOnClickSaveMessageButton=({onClickSaveMessageButton})=>{const saveMessageBtn=document.querySelector("#saveMessageBtn");saveMessageBtn.onclick=e=>{e.preventDefault(),onClickSaveMessageButton()}},setOnClickDeleteMessageButton=({onClickDeleteMessageButton})=>{const deleteMessageBtn=document.querySelector("#deleteMessageBtn");deleteMessageBtn.onclick=e=>{e.preventDefault(),onClickDeleteMessageButton()}},setOnSubmitBackupEmailAddress=({onSubmitBackupEmailAddress})=>{const backupEmailAddressFormElm=document.querySelector("#backupEmailAddressForm");backupEmailAddressFormElm.onsubmit=e=>{e.preventDefault(),onSubmitBackupEmailAddress()}},showBackupEmailAddress=({backupEmailAddress})=>{const backupEmailAddressInputElm=document.querySelector("#backupEmailAddressInput");backupEmailAddressInputElm.value=backupEmailAddress},showMessage=({messageResult})=>{document.querySelector("#messageContent").value=messageResult.result.fileContent},showEditor=({splitPermissionListResult:clientId})=>{var{splitPermissionList,clientId}=clientId.result;(splitPermissionList.optional[`rw:${clientId}:file`]?document.querySelector("#editorContainer"):document.querySelector("#filePermissionRequestContainer")).classList.remove("hidden")},showBackupEmailAddressForm=({splitPermissionListResult:splitPermissionList})=>{var splitPermissionList=splitPermissionList.result["splitPermissionList"];(splitPermissionList.optional["rw:auth:backupEmailAddress"]?document.querySelector("#backupEmailAddressForm"):document.querySelector("#backupEmailAddressPermissionRequestContainer")).classList.remove("hidden")},addTabMenuContainer=({createTabMenuContainer:tabMenuContainerElm,showTabButton:showTabButton2,tabList,activeTabContainerId})=>{tabMenuContainerElm=tabMenuContainerElm();const tabMenuContainerWrapElm=document.querySelector("#tabMenuContainerWrap");tabMenuContainerWrapElm.appendChild(tabMenuContainerElm),showTabButton2({tabMenuContainerElm:tabMenuContainerElm,tabList:tabList,activeTabContainerId:activeTabContainerId})},asocial={};asocial.setting=setting_exports,asocial.lib=lib_exports,asocial.input=input_exports,asocial.action=action_exports,asocial.output=output_exports;var a=asocial;a.app={main:async()=>{a.lib.switchLoading(!0),a.lib.setOnClickNavManu(),a.lib.monkeyPatch();var userInfoResult=await a.app.loadProfile();await a.app.loadBackupEmailAddressForm({userInfoResult:userInfoResult}),a.app.loadTimerBtn(),a.app.loadMessageContent(),a.app.loadMessageBtn(),a.app.loadTabBtn(),a.app.showNotification(),a.app.loadPermission(),setTimeout(()=>{a.lib.switchLoading(!1)},300)},loadProfile:async()=>{var userInfoResult=await a.input.fetchUserProfile(argNamed({browserServerSetting:a.setting.getBrowserServerSetting().get("apiEndpoint"),lib:[a.lib.getRequest]}));return a.lib.redirect(userInfoResult),a.output.showUserProfile(argNamed({lib:[a.lib.applyElmList],other:{userInfoResult:userInfoResult}})),userInfoResult},loadTimerBtn:async()=>{var onClickAddTimerButton=a.output.getAddTimer(argNamed({browserServerSetting:a.setting.getBrowserServerSetting().get("apiEndpoint"),lib:[a.lib.postRequest]})),onClickAddTimerButton=a.action.getOnClickAddTimerButton(argNamed({output:{addTimer:onClickAddTimerButton}}));a.output.setOnClickAddTimerButton(argNamed({onClick:{onClickAddTimerButton:onClickAddTimerButton}}))},showNotification:()=>{setInterval(()=>{a.lib.showNotification(a.setting.bsc.apiEndpoint)},3e4)},loadMessageContent:async()=>{var messageResult=await a.input.fetchMessage(argNamed({browserServerSetting:a.setting.getBrowserServerSetting().get("apiEndpoint"),lib:[a.lib.getRequest]}));a.output.showMessage(argNamed({param:{messageResult:messageResult}}))},loadMessageBtn:()=>{var onClickDeleteMessageButton=a.output.getSaveMessage(argNamed({browserServerSetting:a.setting.getBrowserServerSetting().get("apiEndpoint"),lib:[a.lib.postRequest]})),onClickDeleteMessageButton=a.action.getOnClickSaveMessageButton(argNamed({output:{saveMessage:onClickDeleteMessageButton}}));a.output.setOnClickSaveMessageButton(argNamed({onClick:{onClickSaveMessageButton:onClickDeleteMessageButton}}));onClickDeleteMessageButton=a.output.getDeleteMessage(argNamed({browserServerSetting:a.setting.getBrowserServerSetting().get("apiEndpoint"),lib:[a.lib.postRequest]})),onClickDeleteMessageButton=a.action.getOnClickDeleteMessageButton(argNamed({output:{deleteMessage:onClickDeleteMessageButton}}));a.output.setOnClickDeleteMessageButton(argNamed({onClick:{onClickDeleteMessageButton:onClickDeleteMessageButton}}))},loadPermission:async()=>{var splitPermissionListResult=await a.lib.fetchSplitPermissionList(a.setting.getBrowserServerSetting().apiEndpoint);a.output.showEditor(argNamed({param:{splitPermissionListResult:splitPermissionListResult}})),a.output.showBackupEmailAddressForm(argNamed({param:{splitPermissionListResult:splitPermissionListResult}})),a.lib.reloadXloginLoginBtn(splitPermissionListResult.result.clientId)},loadTabBtn:async()=>{var tabList={editorTabContainer:"エディタ",timerTabContainer:"タイマー",backupEmailAddressFormTabContainer:"バックアップメールアドレス"},activeTabContainerId=Object.keys(tabList)[0];a.output.addTabMenuContainer(argNamed({lib:[a.lib.createTabMenuContainer,a.lib.showTabButton],param:{tabList:tabList,activeTabContainerId:activeTabContainerId}}))},loadBackupEmailAddressForm:async({userInfoResult:onSubmitBackupEmailAddress})=>{onSubmitBackupEmailAddress=a.input.getBackupEmailAddress(argNamed({param:{userInfoResult:onSubmitBackupEmailAddress}}));a.output.showBackupEmailAddress(argNamed({param:{backupEmailAddress:onSubmitBackupEmailAddress}}));onSubmitBackupEmailAddress=a.output.getSaveBackupEmailAddress(argNamed({browserServerSetting:a.setting.getBrowserServerSetting().get("apiEndpoint"),lib:[a.lib.postRequest]})),onSubmitBackupEmailAddress=a.action.getOnSubmitBackupEmailAddress(argNamed({param:{saveBackupEmailAddress:onSubmitBackupEmailAddress}}));a.output.setOnSubmitBackupEmailAddress(argNamed({param:{onSubmitBackupEmailAddress:onSubmitBackupEmailAddress}}))}},a.app.main()})();
