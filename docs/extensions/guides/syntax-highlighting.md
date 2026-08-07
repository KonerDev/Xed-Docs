# Syntax Highlighting Guide

This guide explains how to add support for syntax highlighting for a new language to Xed-Editor.

Xed-Editor uses TextMate grammars for syntax highlighting. To add support for a new language, you
need to:

1. Register a `FileResolver` for your grammar files.
2. Load your grammar.
3. Register a `FileType`.

## Step 1: Register a FileResolver

Grammar files should usually be bundled within your extension's assets. Before they can be loaded,
Xed-Editor needs to know where to find them.

```kotlin
override fun onLoad() {
    val fileResolver = AssetsFileResolver(context.assets)
    FileProviderRegistry.getInstance().addFileProvider(fileResolver)
    // ...
}
```

## Step 2: Load the Grammar

After registering the file provider, load your grammar definition:

```kotlin
override fun onLoad() {
    // ...
    GrammarRegistry.getInstance().loadGrammars("languages.json")
}
```

A grammar definition file is a JSON file with the following structure:
::: code-group
```jsonc [languages.json]
{
  "languages": [
    {
      "grammar": "Dart.tmLanguage.json", // (1) [!code highlight] 
      "name": "Dart",
      "scopeName": "source.dart", // (2) [!code highlight] 
      "languageConfiguration": "Dart.config.json" // (3) [!code highlight] 
    }
  ]
}
```
```jsonc [Dart.tmLanguage.json]
// See example file at:
// https://github.com/microsoft/vscode/blob/4f2ff19ecacffa0aa4874db4d63ed4e899d98431/extensions/dart/language-configuration.json
```
```jsonc [Dart.config.json]
// See example file at:
// https://github.com/microsoft/vscode/blob/4f2ff19ecacffa0aa4874db4d63ed4e899d98431/extensions/dart/syntaxes/dart.tmLanguage.json
```
:::

- (1) The `grammar` property defines the path to the TextMate rule file (aka `syntax`) used for later
  tokenizing the source code, so that the editor can apply colors based on the chosen theme.
  Xed-Editor supports `*.tmLanguage` PLIST files or `*.tmLanguage.json` JSON files.
- (2) The grammar definition's `scopeName` should match the `scopeName` of your `tmLanguage` file.
- (3) The `languageConfiguration` property (optional) references an additional JSON config file that
  defines indentation rules, comment toggling and bracket matching.

If you don't want to write these TextMate files yourself, you can find already written grammars in:
- [TM4E Language Packs](https://github.com/eclipse-tm4e/tm4e/tree/25e7fbe39c02644ca5d541d20a2c601791af7b8d/org.eclipse.tm4e.language_pack/syntaxes)
- [VSCode Extensions](https://github.com/microsoft/vscode/tree/4f2ff19ecacffa0aa4874db4d63ed4e899d98431/extensions)

## Step 3: Register a FileType

A `FileType` tells Xed-Editor how to recognize a language and which metadata belongs to it.
Read more about it in the [File Types](/docs/extensions/general/file-type.md) guide.

```kotlin
class MyLanguage(resources: Resources) : FileType {
    override val extensions = listOf("ml", "mylang")
    override val textmateScope = "source.mylang"
    override val icon = Icon.ExternalResourceIcon(R.drawable.ic_language, resources)
    override val name = "mylang"
    override val title = "My Language"
}
```

Then register it during initialization:

```kotlin
override fun onLoad() {
    FileTypeManager.register(MyLanguage)
}
```

## Complete Example

```kotlin
class MyLanguage(resources: Resources) : FileType {
    override val extensions = listOf("ml", "mylang")
    override val textmateScope = "source.mylang"
    override val icon = Icon.ExternalResourceIcon(R.drawable.ic_language, resources)
    override val name = "mylang"
    override val title = "My Language"
}

class Main(context: ExtensionContext) : ExtensionAPI(context) {
    private var fileResolver: AssetsFileResolver? = null
    private var myLanguage: MyLanguage? = null

    override fun onLoad() {
        // Register the asset provider
        fileResolver = AssetsFileResolver(context.assets)
        FileProviderRegistry.getInstance().addFileProvider(fileResolver)

        // Load the grammar
        GrammarRegistry.getInstance().loadGrammars("languages.json")

        // Register the language
        myLanguage = MyLanguage(context.resources)
        FileTypeManager.register(myLanguage)
    }

    override fun onDispose() {
        fileResolver?.let {
            FileProviderRegistry.getInstance().removeFileProvider(it)
        }
        myLanguage?.let {
            FileTypeManager.unregister(it)
        }
    }
}
```