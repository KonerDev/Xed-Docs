# Utilities and Helpers

Xed-Editor provides several utility classes and methods to help you interact with the app and build your UI quickly.

## UI Helpers

Instead of writing complex Android code, you can use these simple helper methods for common UI tasks.

### Toasts

Show a quick message at the bottom of the screen.

```kotlin
toast("Settings saved!")
// or better:
toast(context.resources.getString(R.string.save_success))
```

### Dialogs

Xed-Editor has built-in support for Material 3 dialogs.

```kotlin
// Simple error dialog
errorDialog(title = "Error", msg = "Something went wrong")
errorDialog(title = "Crash", throwable = e)

// Custom dialog with buttons
dialog(
    title = "Confirm action",
    msg = "Are you sure you want to delete this?",
    cancelText = "No",
    okText = "Yes",
    onOk = { /* ... */ },
    onCancel = null,
    cancelable = true,
)

// Custom dialog with Composable content
composableDialog(
    title = "Confirm Action",
    content = {
        Text("Are you sure you want to delete this?")
        
        /* ... */
    },
    cancelable = true,
)
```

### Clipboard

Copy text to the system clipboard:

```kotlin
copyToClipboard("Hello, world!")
```
