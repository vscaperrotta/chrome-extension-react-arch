import fs from 'fs-extra';
import path from 'path';

export async function getManifest() {
  const pkg = await fs.readJSON(path.resolve('package.json'));

  const manifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_popup: "src/popup/index.html",
      default_icon: "icon.png"
    },
    icons: {
      16: "icon.png",
      48: "icon.png",
      128: "icon.png"
    },
    permissions: [],
    host_permissions: [
      "<all_urls>"
    ],
    background: {
      "service_worker": "assets/background.js"
    },
    content_scripts: [
      {
        matches: [
          "<all_urls>"
        ],
        match_origin_as_fallback: true,
        js: [
          "assets/content.js"
        ],
        css: [
          "assets/content.css"
        ]
      }
    ],
    options_ui: {
      page: "src/options/index.html",
      open_in_tab: true
    }
  }

  return manifest
}
