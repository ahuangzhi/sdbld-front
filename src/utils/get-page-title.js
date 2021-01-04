import defaultSettings from '@/settings'

const title = defaultSettings.title || '充电站设备智能管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
