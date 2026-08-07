# File Types

A `FileType` tells Xed-Editor how to recognize a language and which metadata belongs to it.
You will encounter this as soon as you want to add support for a new language.

It is used to implement new [syntax highlighting](/docs/extensions/guides/syntax-highlighting.md),
determine the default file icon for display in the drawer or tabs, and much more.

## Registering a FileType

You can create a new class/object that implements the `FileType` interface:

```kotlin
class MyLanguage(resources: Resources) : FileType {
    override val extensions = listOf("ml", "mylang")
    override val textmateScope = "source.mylang"
    override val icon = Icon.ExternalResourceIcon(R.drawable.ic_language, resources)
    override val name = "mylang"
    override val title = "My language"
}
```

Then register it during initialization:

```kotlin
override fun onLoad() {
    FileTypeManager.register(MyLanguage)
}
```

Don't forget to clean up with `FileTypeManager.unregister` when your extension is disposed.

## FileType properties

| Property        | Description                                                                                                                                               |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `extensions`    | File extensions associated with this file type, without the leading `.`.                                                                                  |
| `names`         | Optional list of exact file names, such as `CMakeLists.txt` or `Dockerfile`.                                                                              |
| `textmateScope` | The TextMate scope used to select the correct grammar (for example `source.kt`). Set to `null` if no grammar exists.                                      |
| `icon`          | Default icon displayed for this file type.                                                                                                                |
| `iconOverride`  | Optional map of file extensions to different icons. Useful when several extensions belong to the same language but should have different icons.           |
| `name`          | Unique identifier of the file type.                                                                                                                       |
| `title`         | Human-readable language name shown in the UI.                                                                                                             |
| `markdownNames` | Additional language identifiers that should match fenced Markdown code blocks. Only include identifiers that are **not** already present in `extensions`. |

## BuiltinFileType

`BuiltinFileType` is an enum containing all `FileType`s built into Xed-Editor.

Use it whenever you want to access information about one of the existing language definitions.

For example:

```kotlin
@Composable
fun KotlinIcon() {
    XedIcon(
        icon = BuiltinFileType.KOTLIN.icon!!,
        modifier = Modifier.size(48.dp)
    )
}
```
