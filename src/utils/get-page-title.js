import defaultSettings from '@/settings'

const title = defaultSettings.title || '充电链'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
