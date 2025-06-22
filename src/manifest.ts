import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-32.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    // default_popup: 'sidepanel.html',
    default_icon: {
      16: 'img/icon_chatgpt_toc.jpg'
    },
  },
  options_page: 'options.html',
  devtools_page: 'devtools.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['*://chat.openai.com/*', '*://chatgpt.com/*'],
      js: ['src/contentScript/index.ts'],
      run_at: "document_idle"
    },
  ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-32.png', 'img/logo-48.png', 'img/logo-128.png', 'img/icon_chatgpt_toc.jpg'],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage', 'tabs'],
  chrome_url_overrides: {
    newtab: 'newtab.html',
  },
})
