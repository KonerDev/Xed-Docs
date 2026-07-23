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

- **Extension lifecycle** → controlled by Xed-Editor, with each extension having its own lifecycle
- **Android activity lifecycle** → forwarded from the host app (`Activity` callbacks)

## Available Lifecycle Methods

All lifecycle methods are defined in your extension's **main entry class**, which inherits from
`ExtensionAPI`.
Ignore the annotations and the context parameter for now. This will be covered on the next page.

```kotlin
@Keep
@Suppress("unused")
class Main(context: ExtensionContext) : ExtensionAPI(context) {
    override fun onLoad() {} // [!code focus:15]
    override fun onDispose() {}
  
    override fun onInstalled() {}
    override fun onUninstalled() {}
    override fun beforeUpdate() {}
    override fun afterUpdate() {}

    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {}
    override fun onActivityStarted(activity: Activity) {}
    override fun onActivityResumed(activity: Activity) {}
    override fun onActivityPaused(activity: Activity) {}
    override fun onActivityStopped(activity: Activity) {}
    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}
    override fun onActivityDestroyed(activity: Activity) {}
}
```

Only the `onLoad` methods must be overridden in your entry class. The other lifecycle methods
default to empty implementations and only need to be overridden if you want to provide custom
behavior.

## Lifecycle Reference Table

### Extension Lifecycle Hooks

| Method          | Called When                                                                              | Recommended Use in Extensions                                                                                                                                                                                                                        |
|-----------------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onLoad`        | Extension is loaded into memory                                                          | Primary initialization: Register commands/listeners, load persistent state, initialize services, and prepare extension resources.                                                                                                                    |
| `onDispose`     | Extension is unloaded from memory                                                        | Release resources created by the extension, stop services, unregister commands/listeners, and perform general cleanup.                                                                                                                               |
| `onInstalled`   | Extension is installed for the first time                                                | Initial setup tasks such as creating default configuration, preparing files, or validating prerequisites.                                                                                                                                            |
| `onUninstalled` | Extension is removed from the application                                                | Final cleanup such as deleting extension-specific files, removing cached data, or unregistering persistent resources.                                                                                                                                |
| `beforeUpdate`  | Extension is about to be updated to a newer version (before the old version is replaced) | Perform pre-update tasks such as backing up important state or cleaning up resources that are incompatible with the new version. Timing-wise, it is analogous to onUninstalled, as it runs before the current extension version is removed/replaced. |
| `afterUpdate`   | Extension has been updated to a newer version (after the new version is installed)       | Perform post-update tasks such as migrating stored data, applying new defaults, rebuilding caches or notifying users about changes. Timing-wise, it is analogous to onInstalled, as it runs after the new extension version is installed.            |

### Android Activity Lifecycle Hooks

| Method                        | Called When                       |
|-------------------------------|-----------------------------------|
| `onActivityCreated`           | An activity is created            |
| `onActivityStarted`           | An activity becomes visible       |
| `onActivityResumed`           | An activity enters the foreground |
| `onActivityPaused`            | An activity is paused             |
| `onActivityStopped`           | An activity is no longer visible  |
| `onActivitySaveInstanceState` | An activity state is saved        |
| `onActivityDestroyed`         | An activity is destroyed          |

## `onLoad()` vs `onActivityCreated()`

`onLoad()` is the primary entry point for extensions and should be used for all
initialization such as registering commands, loading state, or starting services. It is guaranteed
to run when the extension is loaded, independent of the current UI state.

In contrast, `onActivityCreated()` is tied to the Android activity lifecycle and may already have
been triggered before the extension is loaded. Because of this timing, it is not reliable for
initialization and should only be used when reacting to UI creation events that happen after the
extension is active (for example when editor or terminal screens are opened).