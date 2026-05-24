# Icon Packs

Icon packs allow you to customize the icons used in the file explorer and tabs. Xed-Editor supports custom icon packs that can be easily installed and managed.

## Creating Icon Packs

::: tip
Instead of creating an icon pack from scratch, you can use the [Icon-Template](https://github.com/Xed-Editor/Icon-Template) repository as a starting point.
:::

## Icon Pack Structure

An icon pack is a ZIP file containing a manifest.json file and the icon images (usually in SVG or PNG format).

### manifest.json

The manifest.json file defines the metadata for the icon pack and the mapping between file/folder names and the icon images.

```json
{
  "id": "my-icon-pack",
  "name": "My Custom Icons",
  "applyTint": false,
  "icons": {
    "defaultFile": "icons/file.svg",
    "defaultFolder": "icons/folder.svg",
    "defaultFolderExpanded": "icons/folder-open.svg",
    "folderNames": {
      "src": "icons/folder-src.svg",
      "test": "icons/folder-test.svg"
    },
    "fileExtensions": {
      "kt": "icons/kotlin.svg",
      "py": "icons/python.svg"
    },
    "fileNames": {
      "package.json": "icons/npm.svg",
      ".gitignore": "icons/git.svg"
    }
  }
}
```

### Properties

- **id**: A unique identifier for the icon pack.
- **name**: The display name of the icon pack.
- **applyTint**: If set to true, Xed-Editor will attempt to tint the icons based on the current theme colors.
- **icons**:
    - **defaultFile**: Fallback icon for files.
    - **defaultFolder**: Fallback icon for folders.
    - **defaultFolderExpanded**: Fallback icon for expanded folders.
    - **folderNames**: Map of folder names to icon paths.
    - **fileExtensions**: Map of file extensions to icon paths.
    - **fileNames**: Map of specific file names to icon paths.

## Installing Icon Packs

To install an icon pack:
1. Create a ZIP file containing your manifest.json and icons.
2. Go to Settings -> Appearance -> Icon Packs.
3. Click on Install Icon Pack and select your ZIP file.

## Managing Icon Packs

You can switch between installed icon packs or uninstall them in:

**Settings -> Appearance -> Icon Packs**
