---
title: Extension Entry Class & Runtime Requirements
navTitle: Entry Class
---

# Entry Class and Extension Context

Every Xed-Editor extension is executed through a single entry class, usually named `Main`. This is
the class that you previously specified in the [manifest](/docs/extensions/manifest-file.md).

This class is the runtime bridge between your extension and the host system.

## Role of the Entry Class

The entry class serves as the starting point for your extension. It defines all lifecycle callbacks,
as you learned on the previous page.

Furthermore, it has access to the extension context and much more, which we will cover later.

It is instantiated by Xed-Editor when the extension is loaded.

## Required Structure

```kotlin
@Keep // [!code focus:3]
@Suppress("unused")
class Main(context: ExtensionContext) : ExtensionAPI(context) {
    override fun onLoad() {}
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
} // [!code focus]
```

### `ExtensionAPI` inheritance

Your main entry class must inherit from `ExtensionAPI`. `ExtensionAPI` is an abstract base class
that implements `Application.ActivityLifecycleCallbacks`, which is how the host application forwards
Android lifecycle events into your extension.

The host application instantiates your entry class and forwards lifecycle events to it
automatically.

### Extension Context

Each extension receives an `ExtensionContext` instance as a constructor parameter in its main class.

It works similarly to the Android `Context`, but is scoped to the extension and provides access to
extension-specific resources and host integration features.

This context is passed into `ExtensionAPI`, making it available throughout the main entry class.

It currently provides access to:

- `extension` → metadata and runtime representation of the loaded extension (e.g. id, apk file,
  version)
- `appContext` → the original Android application context provided by Xed-Editor
- `scope` → coroutine scope tied to the extension lifecycle
- `settings` → persistent key-value storage scoped to the extension
- `extensionFiles` → reference to the extension's private storage directory (For extension-specific files)
- `currentActivity` → currently active Activity (may be null)
- `appResources` → access to host application resources
- `assets` → access to the extension APK assets
- `resources` → access to the extension APK resources
- `logDebug/logInfo/logWarn/logError` → logging utilities forwarded to Logcat and Xed-Editor log page

### Annotations

These annotations are required for correct runtime behavior.

#### `@Keep`

Prevents Android build tools (R8 / ProGuard) from removing or renaming the class.

Xed-Editor loads extensions dynamically using reflection, so the class name must remain unchanged.

---

#### `@Suppress("unused")`

Suppresses compiler warnings for the entry class being reported as unused.

The entry class is invoked by Xed-Editor at runtime, so it is not referenced directly in your code.