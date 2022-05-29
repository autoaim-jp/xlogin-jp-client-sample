const statusList = {}
statusList.OK = 1
statusList.SUCCESS = 100
statusList.LOGIN_SUCCESS = 101

statusList.INVALID = 1000
statusList.NOT_ENOUGH_PARAM = 1001
statusList.INVALID_SESSION = 1002

statusList.API_ERROR = 1100
statusList.INVALID_OIDC_ISSUER = 1101

module.exports = statusList

