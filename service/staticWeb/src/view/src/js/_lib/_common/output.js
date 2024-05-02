/* /_common/output.js */

/* request */
const _request = (url, opt) => {
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
  return _request(url, opt)
}

export const postFormRequest = (url, formData) => {
  const opt = {
    method: 'POST',
    body: formData,
  }

  return _request(url, opt)
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

