# Material Design 3

Xed-Editor follows the [Material Design 3](https://m3.material.io/) (M3) guidelines to provide a
modern and consistent user experience. If you are building UI for your extension, we highly
recommend following these same guidelines.

## Why Material 3?

By using M3, your extension feels like a native part of the app. You also benefit from great
accessibility out of the box as well as access to powerful features, such as easy access to the
[app's color scheme](#theming).

## Jetpack Compose

All UI in Xed-Editor is built with Jetpack Compose. If you are new to Compose, you can find the
official documentation [here](https://developer.android.com/jetpack/compose).

## Theming

Xed-Editor provides a global theme that your extension should use. You can access the current color
scheme directly in your composables:

```kotlin
val colors = MaterialTheme.colorScheme

Text(
    text = "Hello",
    color = colors.primary
)
```

By using `MaterialTheme.colorScheme`, your UI will automatically update when the user changes the
app theme or when dynamic colors change.

### Common Colors

- `primary`: The main brand color.
- `surface`: The background color for cards and screens.
- `onSurface`: The color for text on top of the surface.
- `error`: Used for error messages and destructive actions.

> Read more at [M3 Colors](https://m3.material.io/styles/color/roles)

> [!TIP]
> Always prefer these theme colors over hardcoded HEX values. This makes your extension accessible
> and compatible with dark mode.
