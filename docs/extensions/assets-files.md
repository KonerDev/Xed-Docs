# Assets and Files

Extensions often need to bundle extra files like scripts, templates, or binary tools. You might also
need a place to store custom user data or temporary files.

## Assets

Assets are read-only files bundled inside your extension APK. You can access them using
`context.assets`. This property returns a standard Android `AssetManager` object:

```kotlin
val scriptStream = context.assets.open("scripts/setup.sh")
val scriptText = scriptStream.bufferedReader().use { it.readText() }
```

Assets are great for files that never change or are need for initial setup/configuration.

However, to write or execute them, you must move them to another folder. This brings us to the next
concept.

## Persistent Storage

If you need to save files that persist across app restarts, use `context.extensionFiles`. This gives
you a directory on the device that belongs solely to your extension.

```kotlin
val myFolder = context.extensionFiles.resolve("my_data")
if (!myFolder.exists()) {
    myFolder.mkdirs()
}

val dataFile = myFolder.resolve("hello_world.txt")
dataFile.writeText("Hello, World!")
```

::: warning
When managing settings, please use the [Settings Storage API](settings.md#settings-storage-api) rather than developing a custom solution.
:::

::: info
In contrast to the [Settings Storage API](settings.md#settings-storage-api), the files you store in the `context.extensionFiles` folder
will be removed when the extension is uninstalled.
:::

## The Files Folder

When building your extension, you can create a folder named `files` in your source structure.
Everything you put in this folder will be copied to `context.extensionFiles` automatically when the
user installs your extension.

This is the perfect way to provide "start files" without having to manually copy the
files from the read-only assets folder.
