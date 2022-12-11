const breadcrumbAllList = {
  '/': 'ホーム',
  '/mypage': 'マイページ',
  '/error': 'エラー',
}

const getBreadcrumbList = (pathList) => {
  return pathList.map((path) => { return { path, label: breadcrumbAllList[path] } })
}


export const ejsConfig = {
  _common: {
    componentPath: './view/src/ejs/component/',
  },
  index: {
    title: 'sample.xlogin.jp',
    description: 'simple login client sample',
    author: 'autoaim_jp',
    breadcrumbList: getBreadcrumbList(['/']),

    inlineCssList: [],
    externalCssList: ['/css/tailwind.css'],
    inlineScriptList: [],
    externalScriptList: ['/js/index/app.js'],
  },
  mypage: {
    title: 'mypage | sample.xlogin.jp',
    description: 'mypage',
    author: 'autoaim_jp',
    breadcrumbList: getBreadcrumbList(['/', '/mypage']),

    inlineCssList: [],
    externalCssList: ['/css/tailwind.css'],
    inlineScriptList: [],
    externalScriptList: ['/js/mypage/app.js'],
  },
  error: {
    title: 'error | sample.xlogin.jp',
    description: 'error',
    author: 'autoaim_jp',
    breadcrumbList: getBreadcrumbList(['/', '/error']),

    inlineCssList: [],
    externalCssList: ['/css/tailwind.css'],
    inlineScriptList: [],
    externalScriptList: ['/js/error/app.js'],
  },
}

