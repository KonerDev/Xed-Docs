---
outline: deep
---

# The Editor API

The core text editor in Xed-Editor is powered by
the [sora-editor](https://github.com/Rosemoe/sora-editor) library. While Xed-Editor wraps it in an
`Editor` class, you have full access to the underlying engine.

## Working with Editor Instances

Since there can be multiple editor tabs open, you should always interact with editor instances
through the event system. This ensures you catch every new editor that is created.

```kotlin
Events.subscribe<EditorEvent.InstanceCreated> { event ->
    val editor = event.editor

    // Configure the editor
    editor.setCursorAnimationEnabled(false)
}
```

## Key Methods and Properties

Here are some of the most important things you can do with an `Editor` instance:

### Reading and Writing Content

The `text` property gives you access to the editor's content. It is a special `Content` object that
is optimized for large files.

You _could_ read and write like this:

```kotlin
val currentText = editor.text.toString() // (*) Dangerous!
editor.setText("New content")
```

::: warning
(*) Avoid calling `toString()` on the `Content` object, as this will create a new copy of the content in
memory. If the content is large, this can lead to a memory overflow.
:::

### The Content Class

The `Content` object is the heart of the editor. It stores text as a list of lines, which makes it
very fast even for files with millions of lines. You should use its methods to perform surgical
edits instead of reading/replacing the entire text.

#### Modifying Text

```kotlin
val text = editor.text

// Insert text at a specific position 
text.insert(5, 2, "Hello!") // line 5, column 2

// Delete characters between two indices
text.delete(10, 20) // index 10 to index 20

// Delete a range using line and column coordinates
text.delete(2, 0, 4, 10) // line 2, col 0 to line 4, col 10

// Replace a range with new text
text.replace(0, 0, 0, 5, "Xed-Editor") // From line 0, col 0 to line 0, col 5
```

::: info
In contrast to what the line numbers in the editor show, the editor internally uses a 0-based index system.
:::

#### Reading Information

```kotlin
// Total number of lines in the document
val count = text.lineCount

// Number of characters on line 10
val cols = text.getColumnCount(10)

// Get the text of a specific line as a string
val line = text.getLineString(5)
```

#### Indexer

The `Indexer` class is used to convert between character and line/column coordinates:

```kotlin
// Convert line/column to a character index
val index = text.indexer.getCharIndex(5, 2) // or short: text.getCharIndex(...)

// Convert a character index back to line/column
val pos = text.indexer.getCharPosition(index)
context.logDebug("Line: ${pos.line}, Column: ${pos.column}")
```

### Batch Edits

When making many changes at once, always wrap them in a batch edit. This ensures that all changes
are treated as a single "Undo" action for the user and improves performance by preventing unnecessary
UI updates.

```kotlin
val text = editor.text

text.batchEdit {
    text.insert(0, 0, "// Header\n")
    text.replace(5, 0, 5, 10, "Updated line")
    text.insert(text.lineCount, 0, "\n// Footer")
}
```

### Diagnostics and Inlay Hints

You can provide real-time feedback to the user by registering providers.

- **registerDiagnosticProvider**: Add squiggly lines for errors/warnings/....
- **registerInlayHintProvider**: Add small hints between lines or words (like parameter names).
- **registerExtraStylesProvider**: Add custom styling (like background colors) to specific text
  ranges.

> [!TIP]
> Always check the [sora-editor source code](https://github.com/Rosemoe/sora-editor/blob/main/editor/src/main/java/io/github/rosemoe/sora/widget/CodeEditor.java#L412) for advanced
> features like custom line renderers or complex text manipulation.


## Cleanup

When an editor is destroyed, Xed-Editor automatically cleans up registered providers. You don't need
to listen for an `InstanceDestroyed` event unless you have custom resources outside the editor that
need to be released.

However, you do still need to unregister them in your extension's `onDispose()` method. This ensures
that there are no leftover providers after the uninstallation of your extension.

The [`DisposableManager`](/docs/extensions/general/disposable-manager.md) does not support cleaning up
sora-editor related registrations.
