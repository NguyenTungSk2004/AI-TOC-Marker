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
    16: 'img/icon-16.png',
    32: 'img/icon-32.png',
    48: 'img/icon-48.png',
    128: 'img/icon-128.png',
  },
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
      resources: [
        'img/icon-16.png',
        'img/icon-32.png',
        'img/icon-48.png',
        'img/icon-128.png',
      ],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage', 'tabs'],
})
