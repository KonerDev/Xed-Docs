---
outline: deep
---

# Adding Commands

Commands are the main way users interact with your extension. They show up in the command palette and can be configured to show in the toolbar and the extra key panel.

## Registering a Command

You can use `CommandProvider` to add your command to the app:

```kotlin
override fun onLoad() {
    CommandProvider.registerCommand(myCustomCommand)
}
```

Remember to unregister your commands in `onDispose`:

```kotlin
override fun onDispose() {
    CommandProvider.unregisterCommand(myCustomCommand)
}
```

Better yet, use a `DisposableManager` as explained in the [cleanup guide](/docs/extensions/general/disposable-manager.md).

## Command Types

Xed-Editor provides several base classes for commands. Choosing the right one makes your code
shorter and easier to manage.

### GlobalCommand

Use this for commands that don't depend on the editor, like opening a settings page or starting a
background task.

```kotlin
class MyGlobalCommand : GlobalCommand() {
    override val id = "com.example.mycommand"
    override fun getLabel() = "Do global thing"
    override fun getIcon() = Icon.ExternalResourceIcon(/* ... */)

    override fun action(context: ActionContext) {
        // Perform action
    }
}
```

### EditorCommand

Use this for commands that work with the active editor. Xed-Editor handles checking if a tab is open
and providing the editor instance for you.

```kotlin
class UpperCaseCommand : EditorCommand() {
    override val id = "com.example.uppercase"
    override fun getLabel() = "Convert to Upper Case"
    override fun getIcon() = Icon.ExternalResourceIcon(/* ... */)

    override fun action(context: EditorActionContext) {
        val editor = context.editor
        val text = editor.text.toString().uppercase()
        editor.setText(text)
    }

    override fun isSupported(context: EditorNonActionContext): Boolean {
        return context.editorTab.isEditable
    }
}
```

### EditorFileCommand

Unlike `EditorCommand`, this command is only available when the current editor has an associated
`FileObject`. This means your command will never run on temporary editors, preview tabs, or any
other editor that is not editing a file.

```kotlin
class RevealInExplorerCommand : EditorFileCommand() {

    override val id = "com.example.reveal"

    override fun getLabel() = "Reveal in explorer"

    override fun getIcon() = Icon.ExternalResourceIcon(/* ... */)

    override fun action(context: EditorFileActionContext) {
        val file = context.file
        // Use the file...
    }

    override fun isSupported(context: EditorFileNonActionContext): Boolean {
        return context.file.canRead()
    }
}
```

### LspCommand

Use this if your command requires a language server connection.

```kotlin
class FormatCommand : LspCommand() {
    // ...
    override fun action(context: LspActionContext) {
        val lsp = context.lspConnector
        lsp.lspEditor
            ?.hoverWindow
            ?.dismiss()
    }
}
```

## Command API

Every command must provide a unique `id`, a human-readable label, an icon and an implementation of
`action()`. Beyond that, the command API offers several optional properties that control how and
where a command behaves.

### Basic Properties

```kotlin
override val id = "com.example.mycommand"
override fun getLabel() = "My command"
override fun getIcon() = Icon.ExternalResourceIcon(/* ... */)
```

::: info
The command ID should be globally unique. It is used internally for registration, keybindings,
toolbar configuration and equality checks.
:::

### Enabling and Availability

You can control whether a command is currently usable by overriding `isEnabled()`:

```kotlin
override fun isEnabled(): Boolean {
    return myCondition
}
```

Disabled commands remain visible but cannot be executed and are greyed out.

If a command should not exist in the current environment, override `isSupported()` instead:

```kotlin
override fun isSupported(): Boolean {
    return myCondition
}
```

Unsupported commands are hidden completely.

Editor and LSP commands additionally receive context-aware `isSupported(...)` overloads, allowing
you to check the currently opened editor or language server before exposing the command.

### Toolbar Appearance

Commands are normally displayed as icon buttons when added to the toolbar.

If your command is better represented as text, enable `preferText`:

```kotlin
override val preferText = true
```

This will make your command label appear in the toolbar and extra key panel instead of the icon.

### Nested Commands

A command can act as a container for other commands instead of performing an action directly.

```kotlin
override val childCommands = listOf(
    commandA,
    commandB,
    commandC
)
```

Selecting the command opens another command palette containing the child commands.

You can also customize the search placeholder shown in the submenu:

```kotlin
override fun getChildSearchPlaceholder() =
    "Search formatting commands..."
```

### Keybindings

Commands can define their default keyboard shortcut.

```kotlin
override val defaultKeybinds =
    KeyCombination(
        keyCode = KeyEvent.KEYCODE_O,
        ctrl = true,
        shift = true,
        alt = false
    )
```

Users can later customize these bindings in the application settings.

### Repeat While Held

Some commands, such as cursor movement or scrolling, should execute repeatedly while the toolbar
button is held.

```kotlin
override val repeatOnHold = true
```

When enabled, the command will automatically repeat until the user releases the button.

### Long Click Support

Commands can react to long presses independently of normal clicks.

```kotlin
override fun onLongClick(context: ActionContext): Boolean {
    // Handle long press
    return true
}
```

Return `true` if the long click was handled. Returning `false` allows the default behavior to
continue.

## Command Contexts

Commands receive different context objects depending on the type of command being executed. These
provide access to only the information that is guaranteed to exist.

### ActionContext

`ActionContext` is the base context available to every command.

```kotlin
override fun action(context: ActionContext) {
    val activity = context.currentActivity
}
```

It provides access to the current `Activity`.

### EditorActionContext

Editor commands receive an `EditorActionContext`.

```kotlin
override fun action(context: EditorActionContext) {
    val editor = context.editor
    val tab = context.editorTab
}
```

This includes:

* The current `Activity`
* The active `EditorTab`
* The active `Editor`

### EditorFileActionContext

`EditorFileActionContext` contains everything provided by `EditorActionContext`, plus the current
`FileObject` of the opened tab.

```kotlin
override fun action(context: EditorFileActionContext) {
    val file = context.file
}
```

### LspActionContext

Commands that require a language server receive an `LspActionContext`.

```kotlin
override fun action(context: LspActionContext) {
    val connector = context.lspConnector
}
```

This extends `EditorActionContext` with access to the active `LspConnector`.

### Non-Action Contexts

Support/enable checks receive lightweight context objects that do not contain the current `Activity`.

## Toggle Commands

Some commands represent an on/off state rather than a one-time action. These commands should
implement `ToggleableCommand`.

```kotlin
class WordWrapCommand : EditorCommand(), ToggleableCommand {

    override val id = "com.example.wordwrap"
    override fun getLabel() = "Word Wrap"
    override fun getIcon() = Icon.ExternalResourceIcon(/* ... */)

    override fun isOn(): Boolean {
        return context.editor.isWordwrap
    }

    override fun action(context: EditorActionContext) {
        val editor = context.editor
        editor.setWordwrap(!editor.isWordwrap, true, true)
    }
}
```

The UI automatically queries `isOn()` to determine whether the toggle is currently enabled. This
causes commands to be displayed in color when activated.