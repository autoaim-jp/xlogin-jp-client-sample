/* /lib.js */
/* debug */
export const getCaller = () => {
  const callerInfo = new Error().stack.replace(/^Error\n.*\n.*\n/, '')
  return callerInfo
}

/* request */
export const getRequest = (_url, param = {}) => {
  const query = param && Object.keys(param).map((key) => { return `${key}=${param[key]}` }).join('&')
  const url = query ? `${_url}?${query}` : _url
  const opt = {
    method: 'GET',
    credentials: 'same-origin',
    timeout: 30 * 1000,
  }
  return fetch(url, opt).then((res) => {
    if (res.error || !res.body || !res.json) {
      return null
    }
    return res.json()
  }).catch((e) => {
    console.error('[fatal] error @getRequest:', e)
    return null
  })
}

export const postRequest = (url, param = {}) => {
  const opt = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30 * 1000,
  }
  if (param) {
    opt.body = JSON.stringify(param)
  }
  return fetch(url, opt).then((res) => {
    if (res.error || !res.body || !res.json) {
      return null
    }
    return res.json()
  }).catch((e) => {
    console.error('[fatal] error @postRequest:', e)
    return null
  })
}

export const fetchSplitPermissionList = (apiEndpoint) => {
  const url = `${apiEndpoint}/session/splitPermissionList`
  return getRequest(url)
}


/* element */
export const applyElmList = (query, f, parent = document) => {
  Object.values(parent.querySelectorAll(query)).forEach((elm) => {
    f(elm)
  })
}

const closeModal = () => {
  applyElmList('[data-id="modal"], #modalBackground', (elm) => {
    elm.classList.add('hidden')
  })
}

export const showModal = (modalElm, cancelButtonIsVisible = false, onConfirm = () => {}) => {
  if (modalElm.id === 'modalTemplate') {
    modalElm.id = ''
  }
  document.body.appendChild(modalElm)
  closeModal()

  setTimeout(() => {
    applyElmList('[data-id="modalClose"], [data-id="modalCancelButton"]', (elm) => {
      elm.onclick = closeModal
    }, document)

    if (cancelButtonIsVisible) {
      modalElm.querySelector('[data-id="modalCancelButton"]').classList.remove('hidden')
    } else {
      modalElm.querySelector('[data-id="modalCancelButton"]').classList.add('hidden')
    }
    modalElm.querySelector('[data-id="modalConfirmButton"]').onclick = () => {
      if (typeof onConfirm === 'function') {
        onConfirm()
      }
      closeModal()
    }
    modalElm.classList.remove('hidden')
    document.querySelector('#modalBackground').classList.remove('hidden')
    modalElm.querySelector('[data-id="modalContent"]').scrollTop = 0
    modalElm.querySelector('[data-id="modalCard"]').onclick = (e) => {
      e.stopPropagation()
    }
    modalElm.onclick = (e) => {
      e.stopPropagation()
      closeModal()
    }
  }, 100)
}

export const getErrorModalElmAndSetter = () => {
  const modalTemplateElm = document.querySelector('#modalTemplate')
  const modalElm = modalTemplateElm.cloneNode(true)

  modalElm.querySelector('[data-id="modalTitle"]').innerText = 'エラー'

  const labelP = document.createElement('p')
  labelP.innerText = 'エラーが発生しました。'
  modalElm.querySelector('[data-id="modalContent"]').appendChild(labelP)

  const setContent = (textStr, errorLabelList) => {
    labelP.innerText = errorLabelList[textStr] || textStr
  }

  return { modalElm, setContent }
}

/* tab */
export const createTabMenuContainer = () => {
  const tabMenuContainerElm = document.querySelector('#tabMenuContainerTemplate').cloneNode(true)
  tabMenuContainerElm.id = ''
  tabMenuContainerElm.classList.remove('hidden')
  return tabMenuContainerElm
}
const _showTabContainer = ({ activeTabContainerId, tabList }) => {
  Object.keys(tabList).forEach((tabContainerId) => {
    const tabContainerElm = document.querySelector(`#${tabContainerId}`)
    tabContainerElm.classList.add('hidden')
  })
  const tabContainerElm = document.querySelector(`#${activeTabContainerId}`)
  tabContainerElm.classList.remove('hidden')
}

export const showTabButton = ({ tabMenuContainerElm, tabList, activeTabContainerId }) => {
  const getOnClickTabButton = ({ newActiveTabContainerId }) => {
    return (e) => {
      if (e) {
        e.preventDefault()
      }
      showTabButton({ tabMenuContainerElm, tabList, activeTabContainerId: newActiveTabContainerId })
      _showTabContainer({ tabList, activeTabContainerId: newActiveTabContainerId })
    }
  }
  tabMenuContainerElm.clearChildren()
  Object.entries(tabList).forEach(([tabContainerId, value]) => {
    let tabItemElm = null
    if (tabContainerId === activeTabContainerId) {
      tabItemElm = document.querySelector('#tabActiveItemTemplate').cloneNode(true)
    } else {
      tabItemElm = document.querySelector('#tabItemTemplate').cloneNode(true)
    }
    tabItemElm.id = ''
    tabItemElm.classList.remove('hidden')
    tabItemElm.children[0].innerText = value
    tabItemElm.children[0].onclick = getOnClickTabButton({ newActiveTabContainerId: tabContainerId })
    tabMenuContainerElm.appendChild(tabItemElm)
    if (tabContainerId === activeTabContainerId) {
      _showTabContainer({ tabList, activeTabContainerId: tabContainerId })
    }
  })
}

/* common all page */
export const switchLoading = (isVisible) => {
  const loadingElm = document.querySelector('#loading')
  if (!loadingElm) {
    return
  }

  if (isVisible) {
    loadingElm.classList.remove('hidden')
  } else {
    loadingElm.classList.add('hidden')
  }
}

/* nav */
export const setOnClickNavManu = () => {
  const toggleElm = document.querySelector('#commonNavToggle')
  const navContentElm = document.querySelector('#commonNavContent')
  toggleElm.onclick = () => {
    if ([...navContentElm.classList.values()].indexOf('hidden') >= 0) {
      navContentElm.classList.remove('hidden')
    } else {
      navContentElm.classList.add('hidden')
    }
  }
}


export const reloadXloginLoginBtn = (clientId) => {
  const getOnClickXloginButtonHandler = () => {
    const handler = (elm) => {
      const { permission } = elm.dataset
      let queryPart = ''
      if (permission !== undefined) {
        queryPart += `&requestScope=${permission.replace(/\$CLIENT_ID/g, clientId)}`
      }
      return () => {
        window.location.href = `/f/xlogin/connect?redirectAfterAuth=/mypage${queryPart}`
      }
    }

    return handler
  }

  const setOnClickXloginButton = ({ onClickXloginButtonHandler }) => {
    document.querySelectorAll('[data-id="xloginLoginBtn"]').forEach((elm) => {
      elm.onclick = onClickXloginButtonHandler(elm)
    })
  }

  const onClickXloginButtonHandler = getOnClickXloginButtonHandler()
  setOnClickXloginButton({ onClickXloginButtonHandler })
}


/* notification */
let notificationIsVisible = false
export const showNotification = async (apiEndpoint) => {
  if (notificationIsVisible) {
    return
  }
  notificationIsVisible = true
  const durationShow = 0.5
  const durationHide = 0.2
  const resultFetchGlobalNotification = await getRequest(`${apiEndpoint}/notification/list`)

  const notificationContainerElm = document.querySelector('#notificationContainer')
  notificationContainerElm.clearChildren()
  const notificationTemplateElm = document.querySelector('#notificationTemplate')
  const notificationList = Object.values(resultFetchGlobalNotification?.result?.notificationList || {}).reverse()
  notificationList.forEach((row, i) => {
    const notificationElm = notificationTemplateElm.cloneNode(true)
    notificationElm.classList.remove('hidden')
    notificationElm.querySelector('[data-id="subject"]').innerText = row.subject
    notificationElm.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const modalTemplateElm = document.querySelector('#modalTemplate')
      const modalElm = modalTemplateElm.cloneNode(true)
      modalElm.classList.remove('hidden')
      modalElm.querySelector('[data-id="modalTitle"]').innerText = row.subject
      modalElm.querySelector('[data-id="modalContent"]').appendChild(document.createTextNode(row.detail))
      showModal(modalElm)
    }
    setTimeout(() => {
      notificationElm.style.transitionDuration = `${durationShow}s`
      notificationElm.style.opacity = 0
      notificationContainerElm.appendChild(notificationElm)
      setTimeout(() => {
        notificationElm.style.opacity = 1
      }, 100)
    }, durationShow * i * 1000)
    setTimeout(() => {
      notificationElm.style.transitionDuration = `${durationHide}s`
      notificationElm.style.opacity = 0
    }, durationShow * notificationList.length * 1000 + 3 * 1000 + durationHide * i * 1000)
  })

  setTimeout(() => {
    notificationContainerElm.clearChildren()
    notificationIsVisible = false
  }, (durationShow + durationHide) * notificationList.length * 1000 + 3 * 1000)

  const notificationIdList = Object.keys(resultFetchGlobalNotification?.result?.notificationList || {})
  if (notificationIdList.length === 0) {
    return
  }
  const param = { notificationIdList }
  await postRequest(`${apiEndpoint}/notification/open`, param)
}

export const setOnClickNotification = (apiEndpoint) => {
  applyElmList('[data-id="notificationBtn"]', (notificationBtn) => {
    notificationBtn.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (notificationIsVisible) {
        return
      }
      notificationIsVisible = true
      showNotification(apiEndpoint)
    }
  })
}

/* misc */
export const monkeyPatch = () => {
  if (typeof Element.prototype.clearChildren === 'undefined') {
    Object.defineProperty(Element.prototype, 'clearChildren', {
      configurable: true,
      enumerable: false,
      value() {
        while (this.firstChild) {
          this.removeChild(this.lastChild)
        }
      },
    })
  }

  if (typeof window.argNamed === 'undefined') {
    /*
     * asocialの考え方ではどうしても引数が多くなる。
     * そのため、action, core, modなどのパーツのオブジェクトに分けて引数を渡す。
     * argNamedはその入れ子のArray, Objectをflatにする。
     * Arrayの中に含められるのは関数だけ。関数以外はObjで渡す。
     * { a: { param, obj, string, }, b: [ func, ], c: {}, } => { param, obj, string, func, }
     */
    window.argNamed = (obj) => {
      const flattened = {}

      Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
          Object.assign(flattened, obj[key].reduce((prev, curr) => {
            if (typeof curr === 'undefined') {
              throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}\n===== maybe you need make func exported like  module.exports = { func, } =====`)
            } else if (typeof curr === 'function') {
              prev[curr.name] = curr
            } else {
              throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}`)
            }
            return prev
          }, {}))
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(flattened, obj[key])
        } else {
          flattened[key] = obj[key]
        }
      })

      return flattened
    }
  }
}

/* crypto */
export const getRandomStr = (len) => {
  return btoa(crypto.getRandomValues(new Uint8Array(len))).slice(0, len)
}

/* url */
export const redirect = (response) => {
  if (response && response.redirect) {
    window.location.href = response.redirect
  }
}

export const getSearchQuery = () => {
  const searchQuery = {}
  window.location.search.replace(/^\?/, '').split('&').forEach((row) => {
    const kv = row.split('=')
    const [key, value] = kv
    searchQuery[key] = value
  })
  return searchQuery
}

