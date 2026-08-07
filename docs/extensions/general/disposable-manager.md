# Avoiding Unregistration Hell

When your extension is unloaded or uninstalled, you must clean up everything you registered. If you
forget to unregister a command or an event listener, it can lead to memory leaks, weird bugs and
leftover components. This is what we call "unregistration hell".

## DisposableManager

To solve this, Xed-Editor provides a `DisposableManager` to handle this cleanup for you. Instead of manually
unregistering every single item in `onDispose`, you can register them with the manager.

When the extension is unloaded, the manager will automatically go through everything you added and
unregister it correctly.

### Example: Registering a Command

Here is how you register a command using the `DisposableManager`.

```kotlin
class Main(context: ExtensionContext) : ExtensionAPI(context) {
    private val dm = DisposableManager() // 1. Instantiate manager [!code highlight] 

    override fun onLoad() {
        val myCommand = MyAwesomeCommand()

        // 2. Register with the manager [!code highlight:2] 
        CommandProvider.registerCommand(myCommand, dm)
    }

    override fun onDispose() {
        // 3. Just call dispose() and everything is cleaned up! [!code highlight:2]
        dm.dispose()
    }
}
```

Whilst you cannot use the `DisposableManager` for all registrations
(e.g. [Editor Events](/docs/extensions/general/events.md#editor-events)), it can still significantly
reduce the amount of boilerplate code in your extension.