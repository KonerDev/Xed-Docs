# Extension Settings

Extensions often require configurable behavior.

This chapter explains how to define settings, access their values at runtime, and build a
user interface for them. It also covers global settings that appear in the main settings page
instead of the extension-specific view.

[//]: # (## 1. Manifest Configuration)

[//]: # ()
[//]: # (To enable settings UI in your extension, you must declare:)

[//]: # ()
[//]: # (```kotlin)

[//]: # (data class ExtensionManifest&#40;)

[//]: # (    val hasSettings: Boolean)

[//]: # (&#41;)

[//]: # (```)

[//]: # ()
[//]: # (Set:)

[//]: # ()
[//]: # (```json)

[//]: # ("hasSettings": true)

[//]: # (```)

[//]: # ()
[//]: # (Without this, the settings screen will not be shown in the UI.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 2. Settings Entry Point)

[//]: # ()
[//]: # (Each extension can optionally provide a composable settings screen:)

[//]: # ()
[//]: # (```kotlin)

[//]: # (@Composable)

[//]: # (open fun SettingsContent&#40;&#41; {)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (This is rendered inside Xed-Editor’s settings system when `hasSettings = true`.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 3. Extension Settings Storage)

[//]: # ()
[//]: # (Xed-Editor provides a scoped key-value storage system:)

[//]: # ()
[//]: # (```kotlin)

[//]: # (class ExtensionContext&#40;)

[//]: # (    val extension: LocalExtension,)

[//]: # (    val hostContext: Context)

[//]: # (&#41; {)

[//]: # (    val settings = SharedPrefExtensionSettings&#40;extension.id&#41;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (### Usage)

[//]: # ()
[//]: # (```kotlin)

[//]: # (context.settings.putBoolean&#40;"enabled", true&#41;)

[//]: # (val enabled = context.settings.getBoolean&#40;"enabled", false&#41;)

[//]: # (```)

[//]: # ()
[//]: # (All keys are automatically namespaced:)

[//]: # ()
[//]: # (```)

[//]: # (<extensionId>.<key>)

[//]: # (```)

[//]: # ()
[//]: # (So collisions between extensions are impossible.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 4. Settings API)

[//]: # ()
[//]: # (```kotlin)

[//]: # (interface ExtensionSettings {)

[//]: # (    fun getString&#40;key: String, default: String&#41;: String?)

[//]: # (    fun getBoolean&#40;key: String, default: Boolean&#41;: Boolean)

[//]: # (    fun getInt&#40;key: String, default: Int&#41;: Int)

[//]: # ()
[//]: # (    fun putString&#40;key: String, value: String&#41;)

[//]: # (    fun putBoolean&#40;key: String, value: Boolean&#41;)

[//]: # (    fun putInt&#40;key: String, value: Int&#41;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 5. Native-Like Settings UI)

[//]: # ()
[//]: # (Xed-Editor provides Compose components to build settings that match the native UI.)

[//]: # ()
[//]: # (### Example Settings Screen)

[//]: # ()
[//]: # (```kotlin)

[//]: # (@Composable)

[//]: # (fun SettingsAppScreen&#40;activity: SettingsActivity, navController: NavController&#41; {)

[//]: # (    PreferenceLayout&#40;label = "App", backArrowVisible = true&#41; {)

[//]: # ()
[//]: # (        PreferenceGroup {)

[//]: # ()
[//]: # (            SettingsToggle&#40;)

[//]: # (                label = "Language",)

[//]: # (                description = "Change app language",)

[//]: # (                showSwitch = false,)

[//]: # (                endWidget = {)

[//]: # (                    Icon&#40;Icons.AutoMirrored.Rounded.KeyboardArrowRight, null&#41;)

[//]: # (                },)

[//]: # (                sideEffect = {)

[//]: # (                    navController.navigate&#40;"language"&#41;)

[//]: # (                })

[//]: # (            &#41;)

[//]: # ()
[//]: # (            SettingsToggle&#40;)

[//]: # (                label = "Check for updates",)

[//]: # (                description = "Automatically check for updates",)

[//]: # (                default = Settings.check_for_update,)

[//]: # (                sideEffect = { Settings.check_for_update = it })

[//]: # (            &#41;)

[//]: # (        })

[//]: # ()
[//]: # (        PreferenceGroup&#40;heading = "Appearance"&#41; {)

[//]: # ()
[//]: # (            ValueSlider&#40;)

[//]: # (                label = "Text size",)

[//]: # (                min = 10,)

[//]: # (                max = 20,)

[//]: # (                default = Settings.terminal_font_size,)

[//]: # (                onValueChanged = {)

[//]: # (                    Settings.terminal_font_size = it)

[//]: # (                })

[//]: # (            &#41;)

[//]: # ()
[//]: # (            NextScreenCard&#40;)

[//]: # (                label = "Terminal font",)

[//]: # (                description = "Customize terminal font",)

[//]: # (                route = SettingsRoutes.TerminalFontScreen)

[//]: # (            &#41;)

[//]: # (        })

[//]: # (    })

[//]: # (})

[//]: # (```)
