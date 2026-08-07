---
title: Manifest File
navTitle: Manifest File
---

# Configure Your Extension Metadata

Before you build, you must update the `manifest.json` file in your project's root. This file tells Xed-Editor what your extension is and how it works.

## Example

Here is a sample `manifest.json` for a Git blame extension.

```json
{
  "id": "com.git.blameviewer",
  "name": "Git Blame Viewer",
  "mainClass": "com.git.blame.Main",
  "version": "1.2.0",
  "description": "Shows Git blame info inline in the editor.",
  "author": {
    "displayName": "DevTools Studio",
    "github": "devtools-studio"
  },
  "minAppVersion": 95,
  "supportedArchitectures": ["arm64-v8a", "x86_64"],
  "dependencies": ["com.git.provider"],
  "localization": ["en", "de"],
  "repository": "https://github.com/Xed-Editor/xed-git-blame-viewer",
  "license": "MIT",
  "tags": ["git", "blame", "editor"],
  "hasSettings": true
}
```

## Field Reference

| Field                    | Required | Type     | Description                                                                          |
|:-------------------------|:---------|:---------|:-------------------------------------------------------------------------------------|
| `id`                     | Yes      | string   | Unique ID for your extension. Use a reverse domain name like `com.yourname.project`. |
| `name`                   | Yes      | string   | The name users see in the extension manager.                                         |
| `mainClass`              | Yes      | string   | The full name of your entry class that extends `ExtensionAPI`.                       |
| `version`                | No       | string   | Version number (like `1.0.0`).                                                       |
| `description`            | No       | string   | A short summary of what the extension does.                                          |
| `author`                 | Yes      | object   | Contains `displayName` and optional `github` handle.                                 |
| `minAppVersion`          | No       | number   | Minimum version code of Xed-Editor required.                                         |
| `supportedArchitectures` | No       | string[] | List of CPU architectures your extension supports (e.g., `arm64-v8a`).               |
| `repository`             | Yes      | string   | URL to your source code repository.                                                  |
| `license`                | No       | string   | The license for your code (e.g., `MIT`).                                             |
| `tags`                   | No       | string[] | Keywords to help users find your extension.                                          |
| `hasSettings`            | No       | boolean  | Set to `true` if you provide a settings screen.                                      |
| `dependencies`           | No       | string[] | IDs of other extensions that must be installed first.                                |
| `recommendations`        | No       | string[] | IDs of extensions that work well with yours.                                         |
| `localization`           | No       | string[] | List of language codes your extension provides translations for (e.g., `en`, `de`).  |

We suggest setting a `minAppVersion`. This prevents users from installing an extension that will not
work on their device. You can find the version code in the app under `Settings > About`.

> [!WARNING]
> ID collisions will cause only one extension to load. Use a unique name to avoid this.

> [!NOTE]
> Always update the `version` before releasing. Xed-Editor uses this to check for updates.
