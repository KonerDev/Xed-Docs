---
title: Android Activity Lifecycle Hooks
navTitle: Activity Lifecycle
---

# Lifecycle Hooks

Xed-Editor extensions can react to both the extension's own lifecycle and the
standard [Android activity lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle)
of the host application.

## Extension vs Activity Lifecycle

There are two different layers you must understand:

- **Extension lifecycle** → controlled by Xed-Editor, with each extension having its own lifecycle (
  `onExtensionLoaded`, `onUninstalled`)
- **Android activity lifecycle** → forwarded from the host app (`Activity` callbacks)

Both are available, but they serve different purposes.

## Available Lifecycle Methods
All lifecycle methods are defined in your extension's **main entry class**, which inherits from
`ExtensionAPI`.
Ignore the annotations and the context parameter for now. This will be covered on the next page.

```kotlin
@Keep
@Suppress("unused")
class Main(context: ExtensionContext) : ExtensionAPI(context) {
    override fun onExtensionLoaded() {} // [!code focus:7]
    override fun onUninstalled() {}

    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {}
    override fun onActivityResumed(activity: Activity) {}
    override fun onActivityPaused(activity: Activity) {}
    override fun onActivityDestroyed(activity: Activity) {}
}
```

All lifecycle methods must be overridden in your entry class. The implementations can be empty, but they have to be defined.

## Lifecycle Reference Table

| Method                | Called When                     | Recommended Use in Extensions                                              |
|-----------------------|---------------------------------|----------------------------------------------------------------------------|
| `onExtensionLoaded`   | Extension is loaded into memory | Primary initialization (register commands, load state)                     |
| `onUninstalled`       | Extension is removed            | Final cleanup (remove cached files)                                        |
| `onActivityCreated`   | Activity is created             | React to UI being created (e.g. terminal/editor opened, initialize panels) |
| `onActivityResumed`   | App enters foreground           | Resume active work (refresh UI overlays, continue polling)                 |
| `onActivityPaused`    | App goes to background          | Pause ongoing work (stop polling, save state, pause animations or updates) |
| `onActivityDestroyed` | Activity is destroyed           | Cleanup UI-related resources, unregister receivers                         |

## `onExtensionLoaded()` vs `onActivityCreated()`

`onExtensionLoaded()` is the primary entry point for extensions and should be used for all
initialization such as registering commands, loading state, or starting services. It is guaranteed
to run when the extension is loaded, independent of the current UI state.

In contrast, `onActivityCreated()` is tied to the Android activity lifecycle and may already have
been triggered before the extension is loaded. Because of this timing, it is not reliable for
initialization and should only be used when reacting to UI creation events that happen after the
extension is active (for example when editor or terminal screens are opened).