import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Bamboo Leaf'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
