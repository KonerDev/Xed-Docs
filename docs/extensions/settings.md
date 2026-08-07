---
outline: deep
---

# Settings

Extensions often need ways for users to change how they behave. You can build a settings page that
shows up in the extension detail screen or even add items to the main app settings.

## Extension vs Global Settings

In most cases, you should prefer extension settings over app settings. Otherwise, the settings
screen would quickly become cluttered. Only if your extension adds a major feature or requires
frequent changes to the settings might it make sense to include it in the app's main settings.

## Extension Settings

### Manifest Setup

If you want to define extension-specific settings, you must first tell Xed-Editor by adding this to
your `manifest.json`:

```json
"hasSettings": true
```

### Creating a Settings UI

In your main class that extends `ExtensionAPI`, you can override `SettingsContent`. This is where
you build your UI using Jetpack Compose.

```kotlin
class Main(context: ExtensionContext) : ExtensionAPI(context) {
    @Composable
    override fun SettingsContent() {
        // Build your UI here
        Text("Hello from settings!")
    }
}
```

::: tip
It is strongly recommended to use the provided UI components for settings rather than creating your
own, in order to ensure consistency with the app's native user interface. For more information,
please refer to the [Settings UI Components](/docs/extensions/ui-components/settings.md) guide.
:::

## Settings Storage API

Xed-Editor gives you a simple way to save and load settings. All extension settings are separated
from other extensions, so you don't have to worry about them messing with your data.

### Manual Usage

You can read and write values directly through the context:

```kotlin
// Save a value
context.settings.putBoolean("show_line_numbers", true)

// Read a value
val show = context.settings.getBoolean("show_line_numbers", false)
```

For each of the 5 supported data types there are dedicated methods:

- `putString`/`getString`
- `putBoolean`/`getBoolean`
- `putInt`/`getInt`
- `putFloat`/`getFloat`
- `putLong`/`getLong`

### The Delegate Pattern (Best Practice)

For a cleaner code, you can use delegates. Create a dedicated settings object and use
`context.settings.delegate`.

```kotlin
object MySettings {
    var showLineNumbers by context.settings.delegate("show_line_numbers", true)
    var themeName by context.settings.delegate("theme_name", "Dark")
}
```

```kotlin
// Now you can use them like normal variables:
// Save a value
MySettings.showLineNumbers = true

// Read a value
if (MySettings.showLineNumbers) {
    // ...
}
```

## Global Settings

In order to add your own categories and screens to the main app settings, you can use the
`SettingsRegistry`.

You first need to register a category, which is then shown in the main settings page.
The `route` property is used to navigate to your implemented screen.

In order for it to work, you must also register a route in the Settings.
Analog to
the [NavGraphBuilder Compose API](https://developer.android.com/reference/kotlin/androidx/navigation/NavGraphBuilder#(androidx.navigation.NavGraphBuilder).composable(kotlin.String,kotlin.collections.List,kotlin.collections.List,kotlin.Function1,kotlin.Function1,kotlin.Function1,kotlin.Function1,kotlin.Function1,kotlin.Function2)),
a `DynamicRoute` has three possible arguments:

- `route`: **String** The id of the route you want to register (has to match the `route` property of
  the category).
- `arguments`: **List&lt;NamedNavArgument&gt;** A list of arguments that the route accepts (
  optional, for settings often not necessary).
- `content`: **@Composable (NavController, NavBackStackEntry) -> Unit** The composable content of
  the route, taking the `NavController` and the `NavBackStackEntry` as parameters.

```kotlin
override fun onLoad() {
    val category = SettingsCategory(
        label = context.resources.getString(R.string.my_extension_label),
        description = context.resources.getString(R.string.my_extension_desc),
        icon = Icon.ExternalResource(R.drawable.ic_extension, context.resources),
        route = "my_extension_settings"
    )
    SettingsRegistry.registerCategory(category)

    val route = DynamicRoute(
        route = "my_extension_settings",
        content = { navController, backStackEntry ->
            MySettingsScreen()
        }
    )
    SettingsRegistry.registerRoute(route)
}
```

Similarly to the extension-specific settings, you can also use
the [Settings Storage API](#settings-storage-api) to save and load values in `MySettingsScreen()`.

:::info
Remember to unregister these in `onDispose` with `unregisterCategory` and `unregisterRoute` to keep
the app clean.
:::