# Built-in Activities

Extensions run at the application level rather than within an `Activity`. This allows them
to continue operating independently of the current UI. Since this is not the standard
approach for Android application development, Android does not provide a dedicated API for
dynamically accessing activities at runtime.

To address this, Xed-Editor internally provides several helper classes and static properties
that let you safely access the current `Activity` or a specific one.

This is often needed to display a dialog, launch another activity, request permissions, or
interact with other Android APIs that require an activity context.

## Current Activity

`ActivityProvider` always exposes the activity that is currently in the foreground.

```kotlin
val activity = ActivityProvider.currentActivity
```

`currentActivity` may be `null` if no activity is currently available, so always handle this case
before using it:

```kotlin
ActivityProvider.currentActivity?.let { activity ->
    // ...
}
```

## Specific Activity

Sometimes an extension needs access to a specific Xed-Editor activity rather than just the currently
visible one. For these cases, Xed-Editor exposes static activity instances that can be accessed
directly.

You can access the `MainActivity`, `SettingsActivity` and `Terminal` activity like this:

```kotlin
val mainActivity = MainActivity.instance
val settingsActivity = SettingsActivity.instance
val terminal = Terminal.instance
```

These instances may be `null` if the activity has not been created yet or has already been
destroyed.

However, keep in mind that an activity not being visible does not necessarily mean it is
unavailable. Android often keeps activities alive in the back stack, allowing them to be reused when
the user returns to them.

## ViewModels

Accessing the `MainActivity` instance is particularly useful when you need to interact with the main
app state. For example, you can get the `MainViewModel` to [manage tabs or the editor](/docs/extensions/general/tabs.md):

```kotlin
val viewModel = MainActivity.instance?.viewModel
val tabManager = viewModel?.tabManager
```
