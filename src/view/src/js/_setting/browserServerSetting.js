export const apiEndpoint = '/f'
export const labelList = {
  scopeBody: {
    global: {
      notification: {
        label: 'すべての通知',
        summary: 'すべてのサービスの通知に関する権限です。ログイン時刻などを含みます。',
      },
    },
    auth: {
      emailAddress: {
        label: 'メールアドレス',
        summary: 'ログインに使用するメールアドレスに関する権限です。バックアップメールアドレスは含みません。',
      },
      backupEmailAddress: {
        label: 'バックアップメールアドレス',
        summary: 'バックアップメールアドレスに関する権限です。ログインに使用するメールアドレスは含みません。',
      },
      userName: {
        label: 'ユーザー名',
        summary: '一般公開されているユーザーの名前です。',
      },
    },
    service: {
      serviceUserId: {
        label: 'ユーザーID',
        summary: '連携するサービスに提供する、あなたのアカウントのIDです。サービス毎に異なります。',
      },
      notification: {
        label: 'サービス内通知',
        summary: '連携するサービス内で、通知機能を利用するための権限です。',
      },
      file: {
        label: 'ファイル',
        summary: '連携するサービスで、あなたがデータを保存できます。',
      },
    },
  },
  scopeOperation: {
    operation: {
      read: '取得',
      write: '保存',
      append: '追記',
    },
    prefix: {
      isRequired: '必須',
    },
  },
  error: {
    undefined: 'error',
    handle_credential_credential: 'メールアドレスまたはパスワードが違います。',
    handle_user_add_register: 'メールアドレスは既に登録されています。',
    handle_xlogin_code_session: 'セッションが不正です。',
  },
}

export const statusList = {
  OK: 1,
  SUCCESS: 100,
  LOGIN_SUCCESS: 101,

  INVALID: 1000,
  NOT_ENOUGH_PARAM: 1001,
  INVALID_SESSION: 1002,

  API_ERROR: 1100,
  INVALID_OIDC_ISSUER: 1101,

  NOT_FOUND: 1200,
}

export const userReadableDateFormat = {
  full: 'YYYY/MM/DD hh:mm:ss',
  day: 'YYYY/MM/DD',
  hourMinute: 'hh:mm',
  time: 'hh:mm:ss',
}

const settingList = {
  apiEndpoint,
  labelList,
  statusList,
  userReadableDateFormat,
}

/**
 * const { key1, key2 } = browserServerSetting.get('key1', 'key2') のようにして定数を取得できる。
 *
 * @memberof browserServerSetting
 * @param {Array} keyList
 */
export const get = (...keyList) => {
  /* eslint-disable no-param-reassign */
  const constantList = keyList.reduce((prev, curr) => {
    prev[curr] = settingList[curr]
    return prev
  }, {})
  for (const key of keyList) {
    if (!constantList[key]) {
      throw new Error(`[error] undefined setting constant: ${key}`)
    }
  }
  return constantList
}

export default settingList
