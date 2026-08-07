---
outline: deep
---

# Adding Language Servers (LSP)

Xed-Editor supports the Language Server Protocol as described [here](/docs/lsp), allowing your
extension to provide support for custom language servers out of the box.

## Registering an LSP Server

To add support for a new language, you need to register an `LspServer` with the `LspRegistry`.

```kotlin
override fun onLoad() {
    LspRegistry.registerServer(myServer)
}
```

Don't forget to clean up with `LspRegistry.unregisterServer` when your extension is disposed.
## LSP Server Types

Xed-Editor provides two ways to implement a language server.

### ScriptedLspServer

`ScriptedLspServer` automatically handles installation, uninstallation and updates by running an
installation script.

You only need to provide the script and a unique installation ID (used for naming the terminal
session of your installation script).

```kotlin
class MyLanguageServer(context: ExtensionContext) : ScriptedLspServer() {
    override val installScript = context.extensionFiles.resolve("lsp-install.sh")
    override val installId = "my-language-server"
    // ...
}
```

The installation script is executed using Bash and receives the following flags depending on the target action:
- No flag means the server should be installed.
- `--update` means the server should be updated.
- `--uninstall` means the server should be uninstalled.

### LspServer

Use `LspServer` directly if you don't want to manage the language server installation through Bash scripts:

```kotlin
class MyLanguageServer : LspServer() {
    override fun install(activity: Activity) {}
    override fun uninstall(activity: Activity) {}
    override fun update(activity: Activity) {}
    // ...
}
```

## Implementing an LspServer
### Basic Properties

Every language server must provide a few basic properties.

```kotlin
override val id = "com.example.mylanguage"
override val languageName = "My language"
override val serverName = "lingua"
override val supportedExtensions = listOf("my")
override val icon = Icon.ExternalResourceIcon(/* ... */)
```

- `id` is the unique identifier of the language server.
- `languageName` is the name of the language the server is for (human-readable).
- `serverName` is the name of the underlying language server (also displayed to the user).
- `supportedExtensions` determines which file extensions (without dot) this language server supports.
- `icon` is displayed in the language server settings.

Regardless of whether you use `ScriptedLspServer` or not, you must implement these methods manually.
`isInstalled` should check if the binary language server file exists, while `hasUpdate` could, for
example, fetch information about new versions from the internet.

You can use `GithubReleasesApi`, `NpmUtils`, `PipxUtils`, or your own logic for this (or return
false if you don't want to support automatic updates).

```kotlin
override suspend fun isInstalled(context: Context): Boolean {
    return context.extensionFiles.resolve(serverName).exists()
}
override suspend fun hasUpdate(context: Context): Boolean {
    return false
}
```

### Connection Configuration

Every language server must provide a connection configuration. This specifies how Xed-Editor starts or connects to your language server.

```kotlin
override fun getConnectionConfig(): LspConnectionConfig
```

Xed-Editor provides several built-in configuration types:

#### Process Connection
This is the most common configuration. It runs the language server inside the **Ubuntu PRoot sandbox**. It behaves like a standard Linux process and has access to all installed Linux tools.

```kotlin
override fun getConnectionConfig() = LspConnectionConfig.Process(
    command = arrayOf("/home/my-lsp/server", "--stdio")
)
```

#### Android Process Connection
Use this if you want to run the server in the **native Android shell** instead of the Ubuntu sandbox. This is faster but much more restricted.

```kotlin
override fun getConnectionConfig() = LspConnectionConfig.AndroidProcess(
    command = arrayOf("/system/bin/my-android-lsp", "--stdio")
)
```

#### Socket Connection
If your language server runs as a separate service or doesn't support standard I/O (stdio), you can connect to it via a TCP socket.

```kotlin
override fun getConnectionConfig() = LspConnectionConfig.Socket(
    host = "localhost",
    port = 5005
)
```

#### Custom Connection
If none of the built-in types fit your needs, you can create a completely custom connection by providing a `ConnectionProviderFactory`.

```kotlin
override fun getConnectionConfig() = LspConnectionConfig.Custom { instance ->
    object : BaseLspConnectionProvider(instance) {
        override val inputStream: InputStream = // ...
        override val outputStream: OutputStream = // ...
        override val isClosed: Boolean = // ...
        
        override fun start() {
            // Your custom startup logic
        }
        
        override fun close() {
            // Your custom cleanup logic
        }
    }
}
```

### Optional Overrides

Override these methods only if needed.

```kotlin
override suspend fun beforeConnect() {
    // Runs before connecting
}

override suspend fun onInitialize(connector: LspConnector) {
    // Runs after initialization
}

override fun getInitializationOptions(uri: URI?): Any? {
    // Return default initialization options that will be used (user can override them in settings)
    return null
}
```

You can also override `isSupported()` if file extension checks are not sufficient.

```kotlin
override fun isSupported(file: FileObject): Boolean {
    return file.getName() == "package.json"
}
```

### Custom Timeouts

Some language servers require longer startup or request timeouts.
You should only set them if you notice that your server is frequently timing out.

```kotlin
override val customTimeouts = mapOf(Timeouts.INIT to 60_000, /* ... */)
```

### Expected Capabilities

This is rarely needed, we're just mentioning it for completeness.
Some servers do not properly return their capabilities on the first request.
If this is the case for your server, and you know that it certainly supports a certain capability,
you can declare it here:

```kotlin
override val expectedCapabilities = ServerCapabilities(/* ... */)
```