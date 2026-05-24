---
title: Android Activity Lifecycle Hooks
navTitle: Activity Lifecycle
---

# Extension Lifecycle & Activity Hooks

Xed-Editor extensions can react to both the extension's own lifecycle and the standard [Android activity lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle) of the host application.

## Core Extension Hooks

These methods are called when the extension itself is loaded or removed.

```kotlin
class Main(context: ExtensionContext) : ExtensionAPI(context) {
    override fun onExtensionLoaded() {
        // Primary initialization – register commands, load settings, etc.
    }

    override fun onUninstalled() {
        // Final cleanup before extension code is unloaded.
    }

    @Composable override fun SettingsContent() {
        // Optional: Provide a UI for your extension's settings.
    }
}
```

## Activity Lifecycle Hooks

ExtensionAPI implements Application.ActivityLifecycleCallbacks, allowing your extension to react when the app's activities change state.

```kotlin
class Main(context: ExtensionContext) : ExtensionAPI(context) {
    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) { }
    override fun onActivityStarted(activity: Activity) { }
    override fun onActivityResumed(activity: Activity) { }
    override fun onActivityPaused(activity: Activity) { }
    override fun onActivityStopped(activity: Activity) { }
    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) { }
    override fun onActivityDestroyed(activity: Activity) { }
}
```

## Reference Table

| Method                         | Called When                                          | Recommended Use                                      |
|--------------------------------|------------------------------------------------------|------------------------------------------------------|
| onExtensionLoaded            | Extension is first loaded                            | Registering components, initializing state.           |
| onUninstalled                | Extension is being removed                           | Cleanup, releasing global resources.                  |
| onActivityCreated            | An Activity is being created                         | Initializing activity-specific logic.                 |
| onActivityResumed            | Activity is in foreground and interactive            | Resuming timers, UI updates, starting animations.    |
| onActivityPaused             | Activity is losing focus                             | Pausing work, saving temporary state.                 |
| onActivityDestroyed          | Activity is being permanently destroyed              | Releasing activity references to avoid memory leaks. |

::: tip
Extensions load early in the application lifecycle. Most global initialization should happen in onExtensionLoaded. Use the activity hooks only if your extension needs to interact directly with the UI or respond to user presence in specific screens.
:::
