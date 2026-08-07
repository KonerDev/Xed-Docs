# Guide: Creating Custom Tabs

If you want to add a new user interface that isn't a text editor and shouldn't be
a [Custom Screen](/docs/extensions/general/custom-screens.md), you can create a custom
`Tab`. This allows your extension to feel like an integrated part of the workspace.

## Step 1: Extend the Tab Class

The `Tab` class is the foundation for all tabs in Xed-Editor. You need to provide a name, a
human-readable title, an icon, and the Compose content.

A tab can also optionally be associated with a file through the file property:

```kotlin
/** Can be null if tab is not file-related. */
override val file: FileObject? = null
```

Most custom tabs won't need to override this property. However, if your tab represents a specific
file (for example, a custom viewer or editor), you should return the corresponding FileObject.
This allows the workspace to treat the tab as being associated with that file.

Optionally, you can provide custom actions for the top toolbar.

```kotlin
class MyCustomTab(override val title: String) : Tab() {
    override val name = "My tool"
    override val icon = Icons.Default.Build

    @Composable
    override fun Content() {
        // Your Compose UI here
        Column {
            Text("This is my custom tab content")
        }
    }

    // Optional: Add actions to the top toolbar
    @Composable
    override fun RowScope.Actions() {
        IconButton(onClick = { /* ... */ }) {
            Icon(Icons.Default.Refresh, contentDescription = "Refresh")
        }
    }
}
```

You can also define a special property called `showGlobalActions` (default is true). It determines
whether the global actions should be shown in the toolbar (additionally to your custom actions).

## Step 2: Handling Lifecycle

You can respond to tab lifecycle events by overriding these methods:

- `onTabAdded()`: Called when the tab is first opened.
- `onTabRemoved()`: Called when the user closes the tab.
- `onTabSelected()`: Called when the tab becomes active.
- `onTabUnselected()`: Called when the user switches to another tab.
- `onDuplicate()`: Called when the tab is focused because it was already open.

## Step 3: Session Restoration

If you want your tab to be restored after the app restarts, you need to implement `getState()`.
This method has to return a `TabState` object that can be serialized and saved to the disk.

```kotlin
override fun getState(): TabState? {
    return MyTabState(title)
}
```

You must also ensure that your `TabState` implementation can reconstruct the tab in its `toTab(): Tab?`
method.

## Opening the Tab

Once your tab class is ready, you can open it using the [`TabManager`](/docs/extensions/general/tabs.md#accessing-the-tab-manager).

```kotlin
val tab = MyCustomTab("My tool instance")
val mainViewModel = MainActivity.instance?.viewModel
mainViewModel?.tabManager?.addTab(tab, switchToTab = true)
```

Custom tabs are perfect for things like terminal views, database browsers, or other workspace-related interfaces.
