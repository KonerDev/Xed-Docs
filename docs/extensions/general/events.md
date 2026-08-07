---
outline: deep
---

# The Event System

Xed-Editor uses a powerful event system to let extensions respond to what is happening in the app.
You can listen for existing events or even create and publish your own.

## Subscribing to Events

To listen for an event, use `Events.subscribe`. You specify the type of event you want to hear.

```kotlin
val subscription = Events.subscribe<TabEvent.Opened> { event ->
    context.logInfo("A new tab was opened: ${event.tab.title}")
}
```

### Unsubscribing

Always unregister your listeners when they are no longer needed. The `subscribe` method returns a
subscription object that you can use to stop listening.

```kotlin
override fun onDispose() {
    subscription.unsubscribe()
}
```

## Editor Events

Events related to the editor view are handled slightly differently, because they are managed by a
library we are using: [sora-editor](https://project-sora.github.io/sora-editor-docs/guide/editor-overview).

First, you listen for a new editor instance being created, and then you subscribe to that specific
instance.

```kotlin
val editorSubscriptions = mutableListOf<SubscriptionReceipt<*>>()

val subscription =
    Events.subscribe<EditorEvent.InstanceCreated> { event ->
        val editor = event.editor

        // Listen to events on this specific editor
        editorSubscriptions.add(
            editor.subscribeAlways<ContentChangeEvent> { editorEvent ->
                println("Text changed: ${editorEvent.changedText}")
            }
        )
    }
```

As you can see, you should always store the subscriptions in variables to be able to unsubscribe later
when they're no longer needed:

```kotlin
override fun onDispose() {
    subscription.unsubscribe()
    editorSubscriptions.forEach { it.unsubscribe() }
}
```

## Event Inheritance
Events support inheritance, allowing you to subscribe to a whole category of events instead of
individual event types.

For example, subscribing to `FileEvent` receives all file-related events:

```kotlin
Events.subscribe<FileEvent> { event ->
    // Receives Created, Deleted, Renamed, Moved and Copied
}
```

You could theoretically also subscribe to the base `Event` type to receive every event.

## List of Events

Here is a list of almost all events you can listen for:

### Drawer Events

| Event                              | When it happens                            |
|:-----------------------------------|:-------------------------------------------|
| `DrawerEvent.TabAdded`             | A drawer tab is added.                     |
| `DrawerEvent.TabRemoved`           | A drawer tab is removed.                   |
| `DrawerEvent.TabSelected`          | The active drawer tab changes.             |
| `DrawerEvent.ServicesInitialized`  | Service tabs are initialized.              |
| `DrawerEvent.ServiceTabSelected`   | The active service tab changes.            |

### File Tree Events

| Event                               | When it happens                                                                     |
|:------------------------------------|:------------------------------------------------------------------------------------|
| `FileTreeEvent.Opened`              | A file tree drawer is opened.                                                       |
| `FileTreeEvent.Closed`              | A file tree drawer is closed.                                                       |
| `FileTreeEvent.NodeExpanded`        | A folder is expanded.                                                               |
| `FileTreeEvent.NodeCollapsed`       | A folder is collapsed.                                                              |
| `FileTreeEvent.Focused`             | A file tree node gains focus.                                                       |
| `FileTreeEvent.SelectionChanged`    | The file tree selection changes.                                                    |
| `FileTreeEvent.TreeSynchronized`    | The file tree is synchronized with file system (after file creation, refresh, ...). |

### File Events

| Event                  | When it happens                      |
|:-----------------------|:-------------------------------------|
| `FileEvent.Created`    | A file or directory is created.      |
| `FileEvent.Deleted`    | A file or directory is deleted.      |
| `FileEvent.Renamed`    | A file or directory is renamed.      |
| `FileEvent.Moved`      | A file or directory is moved.        |
| `FileEvent.Copied`     | A file or directory is copied.       |

### Tab Events

#### General Tabs

| Event                 | When it happens                 |
|:----------------------|:--------------------------------|
| `TabEvent.Opened`     | A tab is opened.                |
| `TabEvent.Closed`     | A tab is closed.                |
| `TabEvent.Selected`   | A tab is selected.              |
| `TabEvent.Reordered`  | Tabs are reordered.             |

#### Editor Tabs

| Event                        | When it happens                    |
|:-----------------------------|:-----------------------------------|
| `EditorTabEvent.Opened`      | An editor tab is opened.           |
| `EditorTabEvent.Closed`      | An editor tab is closed.           |
| `EditorTabEvent.Selected`    | An editor tab is selected.         |
| `EditorTabEvent.Reordered`   | Editor tabs are reordered.         |
| `EditorTabEvent.Refreshed`   | An editor tab is refreshed.        |
| `EditorTabEvent.Saved`       | An editor tab is saved.            |

### Editor Events

| Event                           | When it happens                    |
|:--------------------------------|:-----------------------------------|
| `EditorEvent.InstanceCreated`   | A new editor is created.           |
| `EditorEvent.InstanceDestroyed` | An editor is destroyed.            |

### Language Server Events

| Event                           | When it happens                          |
|:--------------------------------|:-----------------------------------------|
| `LSPEvent.InstanceCreated`      | An LSP instance is created.              |
| `LSPEvent.StatusChanged`        | An LSP connection status changes.        |
| `LSPEvent.LogEntryWritten`      | An LSP writes a log entry.               |
| `LSPEvent.ConnectionCompleted`  | LSP connection finishes for a file.      |

### Application Events

| Event                         | When it happens                     |
|:------------------------------|:------------------------------------|
| `AppEvent.ThemeChanged`       | The app theme changes.              |
| `AppEvent.IconPackChanged`    | The icon pack changes.              |
| `AppEvent.LanguageChanged`    | The app language changes.           |
| `AppEvent.LogEntryWritten`    | The app writes a log entry.         |

### Extension Events

| Event                          | When it happens                      |
|:-------------------------------|:-------------------------------------|
| `ExtensionEvent.Installed`     | An extension is installed.           |
| `ExtensionEvent.Loaded`        | An extension is loaded.              |
| `ExtensionEvent.Crashed`       | An extension crashes.                |
| `ExtensionEvent.Uninstalled`   | An extension is uninstalled.         |

### Git Events

| Event                                | When it happens                    |
|:-------------------------------------|:-----------------------------------|
| `GitEvent.RepositoryInitialized`     | A repository is initialized.       |
| `GitEvent.RepositoryCloned`          | A repository is cloned.            |
| `GitEvent.BranchCreated`             | A branch is created.               |
| `GitEvent.BranchDeleted`             | A branch is deleted.               |
| `GitEvent.BranchCheckedOut`          | A branch is checked out.           |
| `GitEvent.BranchRenamed`             | A branch is renamed.               |
| `GitEvent.Merged`                    | A branch is merged.                |
| `GitEvent.Rebased`                   | A branch is rebased.               |
| `GitEvent.CommitCreated`             | A commit is created.               |
| `GitEvent.CommitAmended`             | A commit is amended.               |
| `GitEvent.FetchCompleted`            | A fetch completes.                 |
| `GitEvent.PullCompleted`             | A pull completes.                  |
| `GitEvent.PushCompleted`             | A push completes.                  |
| `GitEvent.WorkingTreeUpdated`        | The working tree changes.          |

### Runner Events

| Event                    | When it happens          |
|:-------------------------|:-------------------------|
| `RunnerEvent.RunnerRun`  | A runner is started.     |

## Custom Events

You can also create your own events to communicate between different parts of your extension or even
with other extensions (dependants).

1. Define your event class:

```kotlin
data class MyCustomEvent(val message: String) : Event
```

2. Publish the event:

```kotlin
Events.publish(MyCustomEvent("Hello World!"))
```

3. Subscribe to it elsewhere:

```kotlin
Events.subscribe<MyCustomEvent> { event ->
    context.logInfo("Received: ${event.message}")
}
```

This is a great way to keep your extension's components decoupled and easy to manage.
