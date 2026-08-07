# Debugging Your Extension

When things don't work as expected, logging is your best friend. Xed-Editor provides a built-in
logging system that you can use to track what is happening inside your extension.

## Logging API

The `ExtensionContext` has several methods for logging different types of information.

```kotlin
context.logDebug("Current file path: $path")
context.logInfo("A new update is available")
context.logWarn("API responded with a warning")
context.logError("Failed to save file: ${e.message}")
```

When logging errors, you can optionally include the exception. This allows you to view the stack
trace later in the logs:
```kotlin
context.logError(throwable = e, msg = "Unable to save file")
```

::: info
These logs are tagged with your extension ID, making it easy to filter them.
:::

::: tip
Use `logDebug` for information that is only useful during development. For important status
changes, use `logInfo`.
:::

## Viewing Logs

You can see these logs directly inside Xed-Editor.

1. Go to **Settings**.
2. Turn on the debug feature (under `Application` -> `Feature toggles`) if it is not already on.
3. Open **Debug options**.
4. Tap on **View logs**.

Here you will see a list of logs from the app and all installed extensions. You can filter by log
level and search for your extension ID to find exactly what you are looking for.

## Extension Crashes

If your extension crashes while executing one of
its [lifecycle hooks](/docs/extensions/lifecycle-hooks#available-lifecycle-methods), the application
will not terminate completely. A crash report will still be displayed, featuring a button that
directs the user to your extension's repository to submit the stack trace. You can use this for
troubleshooting too.