---
title: Manifest File
navTitle: Manifest File
---

# Configure Your Extension Metadata

Before you build, you must update the core metadata within the `manifest.json` file located in the
root of the project directory.

## Example

Below, you can see what a `manifest.json` file might look like, using a Git blame viewer extension
as an example.

```json
{
  "id": "com.git.blameviewer",
  "name": "Git Blame Viewer",
  "mainClass": "com.git.blame.Main",
  "version": "1.2.0",
  "description": "Displays Git blame information inline in the editor, showing last author, commit hash, and timestamp for each line of code.",
  "author": {
    "displayName": "DevTools Studio",
    "github": "devtools-studio"
  },
  "minAppVersion": 95,
  "targetAppVersion": 95,
  "repository": "https://github.com/Xed-Editor/xed-git-blame-viewer",
  "license": "MIT",
  "tags": [
    "git",
    "blame",
    "vsc",
    "editor"
  ],
  "hasSettings": true
}
```

## Field Reference

| Field           | Required | Type            | Description                                                                                                                                                                                                                 |
|-----------------|----------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`            | Yes      | string          | **Unique identifier** for your extension (like a Java package name).<br>**Must be globally unique across all extensions.**<br>Recommended format: reverse domain (`com.author.extensionname`)                               |
| `name`          | Yes      | string          | Human-readable name shown in the extension list inside Xed-Editor.                                                                                                                                                          |
| `mainClass`     | Yes      | string          | Full class name of your extension's entry point.<br>**Must exactly match** the package + class name of the file that extends `ExtensionAPI()`.<br>Example: if your file is `src/com/rk/demo/Main.kt` → `"com.rk.demo.Main"` |
| `version`       | No       | string (SemVer) | Extension version (e.g. `"1.0.0"`, `"2.3.1"`). Used for updates and display.                                                                                                                                                |
| `description`   | No       | string \| null  | Short description shown in the extension manager. Keep it under 150 characters.                                                                                                                                             |
| `author`        | Yes      | object          | Extension author information containing `displayName` and optional `github` handle.                                                                                                                                         |
| `minAppVersion` | No       | number \| null  | Minimum Xed-Editor version code your extension supports.<br>If the user's app is older, the extension will fail an error message.<br>`null` means no minimum restriction.                                                   |
| `maxAppVersion` | No       | number \| null  | The Xed-Editor version code you developed and tested against.<br>Helps users know which version is fully supported.<br>`null` means no maximum restriction.                                                                 |
| `repository`    | Yes      | string (URL)    | Link to your GitHub/GitLab/etc. repository. Shown as "Source" button in the extension details screen.                                                                                                                       |
| `license`       | No       | string \| null  | License identifier for the extension (e.g. `"MIT"`).                                                                                                                                                                        |
| `tags`          | No       | string[]        | Optional tags to categorize the extension.                                                                                                                                                                                  |
| `hasSettings`   | No       | boolean         | Indicates whether the extension provides a [settings UI](/docs/extensions/settings) inside Xed-Editor.<br>If it's set to true, a settings icon will show in the extension's detail page.<br>Default is `false`.             |

We recommend setting a `minAppVersion` to avoid requiring users to install the extension when it is
already certain that it will not work on the device.

You can find the version code of your Xed-Editor installation under
`Settings > About > Version code`.

> [!WARNING]
> If two extensions have the same `id`, only one will load (usually the first one found). Use your
> domain or GitHub username to avoid collisions.

> [!NOTE]
> Use semantic versioning for the `version` property. Before every release, you must increment the
> version number. Otherwise, users will not be able to update the extension.
