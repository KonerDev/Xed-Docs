# The Tab System

Xed-Editor uses a flexible tab system to manage open files and tools. You can interact with tabs to
open new files, switch between documents, or add custom views.

## Accessing the Tab Manager

The `TabManager` is responsible for the lifecycle of all open tabs. You can access it via the [
`MainViewModel`](/docs/extensions/general/activities.md#viewmodels).

```kotlin
val mainViewModel = MainActivity.instance?.viewModel
val tabManager = mainViewModel?.tabManager
```

## Managing Tabs

The `TabManager` provides several methods to control the open tabs.

### Reading State

- `tabs`: A list of all open `Tab` objects.
- `currentTab`: The tab that the user is currently looking at (can be null).
- `currentTabIndex`: The index of the active tab in the list.

### Adding Tabs

- `addTab(tab, switchToTab, checkDuplicate = true)`: Adds a new tab to the app.
    - `switchToTab`: If true, the app immediately focuses the new tab.
    - `checkDuplicate`: If true, the manager checks if the tab is already open using the `equals()`
      method. If a duplicate is found, the existing tab is focused instead of adding a new one.

> [!NOTE]
> `EditorTab` overrides `equals()` to compare the underlying file (or in some cases the title). This
> means if you try to open the same file twice with `checkDuplicate = true`, Xed-Editor will simply
> switch to the existing tab.

### Removing Tabs

- `removeTab(index: Int)`: Closes the tab at the specific position.
- `removeTab(tab: Tab)`: Closes the specific tab instance.

### Other Operations

- `moveTab(from, to)`: Switches the position of two tabs in the list.
- `setCurrentTab(index)`: Programmatically switches the active tab.
- `removeOtherTabs()`: Closes everything except the current tab.
- `removeAllTabs()`: Closes every single open tab.

## Types of Tabs

There are several built-in tab types:

- **EditorTab**: The most common tab, used for editing/viewing text files.
- **ImageTab**: Used for viewing images.
- [**Custom Tab**](/docs/extensions/guides/custom-tabs.md): Any tab that extends the `Tab` abstract
  class.

### EditorTab Variants

`EditorTab` itself can behave differently depending on how it was created:

- **File-based Tab**: Linked to a physical file on the device. Changes can be saved back to the
  file.
- **Temporary Tab**: Not linked to a file. Used for "Untitled" documents or quick notes. Asks for a
  location on save.
- **Preview Tab**: A read-only tab used to show content like Markdown or HTML previews.

## Editor Manager

For specifically opening files or editor tabs, use the `EditorManager`. It provides
shortcuts for creating and adding `EditorTab` instances.

```kotlin
val mainViewModel = MainActivity.instance?.viewModel
val editorManager = mainViewModel.editorManager
```

### Reading Editor Tabs

If you only care about tabs that contain a code editor, use the `tabs` property on the
`EditorManager`:

```kotlin
val editorTabs: List<EditorTab> = editorManager.tabs
```

### Opening and Managing Editors

The `EditorManager` offers several ways to handle editor-specific tasks:

- `openFile(file, projectRoot, switchToTab, checkDuplicate)`: The standard way to open a file. It
  automatically handles things like large file warnings and prevents opening the same file twice if
  `checkDuplicate` is true.
- `addEditorTab(...)`: Creates and adds a new editor tab in one call.
- `createEditorTab(...)`: A factory method to create an `EditorTab` without adding it to the UI yet.
  This is useful if you want to configure the tab before showing it.
- `jumpToPosition(file, projectRoot, lineStart, charStart, lineEnd, charEnd)`: A very useful method
  that opens a file (or switches to it if already open) and highlights a specific text range.
- `addPreviewTab(title, content, extension, isReadOnly = true)`: Opens a temporary tab (by default
  also read-only) with the given text. Great for showing build logs or generated documentation.
