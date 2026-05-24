# Themes

Xed-Editor is highly customizable, and its theme system allows you to change almost every aspect of its appearance. From the user interface colors to the syntax highlighting in the editor, you can create a look that is perfect for you.

## Theme Components

A theme in Xed-Editor consists of several components:

- **UI Color Scheme**: Based on Material 3, this defines the colors for buttons, backgrounds, dialogs, and other UI elements.
- **Editor Colors**: Specific colors for the code editor, such as the background color, line number color, and selection color.
- **Terminal Colors**: A set of 16 colors used by the integrated terminal.
- **Token Colors**: Defines how different parts of your code (keywords, comments, strings, etc.) are highlighted. Xed-Editor supports TextMate-compatible token color definitions.

## Built-in Themes

Xed-Editor comes with several pre-installed themes, including:
- **Blueberry**: The default theme.
- **Dark/Light**: Standard Material themes.
- **AMOLED**: A high-contrast dark theme optimized for OLED screens.

## Creating Custom Themes

::: tip
Instead of creating a theme from scratch, you can use the [Theme-Template](https://github.com/Xed-Editor/Theme-Template) repository as a starting point.
:::

You can create your own themes by providing a JSON file with the theme definition. A custom theme file looks like this:

```json
{
  "id": "my-custom-theme",
  "name": "My Custom Theme",
  "targetVersion": 1,
  "inheritBase": true,
  "dark": {
    "baseColors": {
      "primary": "#D0BCFF",
      "background": "#1C1B1F"
    },
    "editorColors": {
      "backgroundColor": "#1C1B1F",
      "gutterColor": "#1C1B1F"
    },
    "tokenColors": {
      "keyword": "#D0BCFF",
      "comment": "#938F99"
    }
  }
}
```

## Installing Themes

To install a custom theme:
1. Save your theme definition as a `.json` file.
2. Go to **Settings → Appearance → Themes**.
3. Click on **Install Theme** and select your JSON file.

## Dynamic Theming (Monet)

On supported Android versions (Android 12+), Xed-Editor can use **Dynamic Colors** (also known as Monet). This feature automatically generates a color scheme based on your device's wallpaper, providing a consistent look across your entire system.

You can enable this in **Settings → Appearance → Use Dynamic Colors**.
