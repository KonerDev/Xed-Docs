---
outline: deep
---

# Filesystem and FileObject

When working with files in Xed-Editor, you might be tempted to use the standard `java.io.File` API.
While this works for local files, Xed-Editor often deals with files from other sources like network
drives, ZIP archives, or Android's Content Providers.

To handle all these different sources with a single, consistent API, Xed-Editor uses the
`FileObject` wrapper.

## Why use FileObject?

The main benefit of `FileObject` is that it hides the complexity of where a file is actually stored.
Whether a file is on your SD card, inside a ZIP file, or on a remote server, you can use the exact
same methods to read, write, and manage it.

Xed-Editor includes several built-in implementations:

- **FileWrapper**: Used for standard local files.
- **UriWrapper**: Used for files accessed through Android's `DocumentFile` (SAF).
- **NetWrapper**: Used for managing files over a network connection.
- **ZipFileObject**: Used for the built-in ZIP file preview and navigation.

Because `FileObject` is an interface, it is also completely extensible. You can create your own
implementation to support any custom storage backend you need.

## The FileObject API

Every `FileObject` provides a wide range of methods for filesystem operations. Most of these methods
are `suspend` functions because filesystem access can be slow or involve network requests.

### Basic Metadata

These methods let you check what the object represents and get its basic properties.

```kotlin
// Check if it's a directory or a file
val isDir = fileObject.isDirectory()
val isFile = fileObject.isFile()

// Get the name (e.g., "README.md")
val name = fileObject.getName()

// Get the extension without the dot (e.g., "md")
val ext = fileObject.getExtension()

// Get the size in bytes
val size = fileObject.length()

// Get the absolute or canonical path
val path = fileObject.getAbsolutePath()
val canonical = fileObject.getCanonicalPath()
```

### State and Permissions

Use these methods to check if a file exists and what you are allowed to do with it.

```kotlin
// Check if the file/folder exists
val exists = fileObject.exists()

// Check permissions
val readable = fileObject.canRead()
val writable = fileObject.canWrite()
val executable = fileObject.canExecute()

// Check if it's a symbolic link
val isLink = fileObject.isSymlink()

// Get the last modified timestamp (in milliseconds)
val time = fileObject.lastModified()

// Get the MIME type (useful for Android intents)
val mime = fileObject.getMimeType(context)
```

### Directory Operations

If the `FileObject` is a directory, you can manage its children.

```kotlin
// List all files and folders inside
val children = fileObject.listFiles()

// Check if a specific child exists by name
val hasChild = fileObject.hasChild("config.json")

// Get a specific child instance (returns null if it doesn't exist)
val child: FileObject? = fileObject.getChild("assets")
```

### File Operations

These methods are for creating, renaming, and deleting files or folders.

```kotlin
// Create a new empty file
val created = fileObject.createNewFile()

// Create a child (file or folder) inside this directory
val newChild = fileObject.createChild(createFile = true, name = "new_file.txt")

// Rename the current file or folder
val success = fileObject.renameTo("NewName.md")

// Delete the file or folder
val deleted = fileObject.delete()
```

### Reading and Writing

There are several ways to work with the content of a file.

#### Simple Text Operations

For small files, you can read or write the entire text at once.

```kotlin
// Read all text using UTF-8
val content = fileObject.readText()

// Read text with a specific charset
val customContent = fileObject.readText(Charsets.UTF_16)

// Write text to the file
fileObject.writeText("Hello Xed!")
```

#### Stream Operations

For large files or binary data, use streams.

```kotlin
// Get an input stream for reading
val inputStream = fileObject.getInputStream()

// Best practice: Use the wrapper that closes the stream automatically
fileObject.useInputStream { stream ->
    val bytes = stream.readBytes()
    // Process bytes...
}

// Get an output stream for writing
// The boolean parameter decides if you want to append to the existing content
val outputStream = fileObject.getOutputStream(append = false)
```

### Helper Extensions

Xed-Editor also provides some useful extension methods for `FileObject`:

```kotlin
// Resolve a relative path (e.g., "src/main/java")
val file = fileObject.resolve("src/main/java")

// Resolve a path and create the directories if they are missing
val folder = fileObject.resolveOrCreateDirectory("data/logs")

// Copy the file to the app's temporary directory
val tempFile = fileObject.copyToTempDir()
```

### Converting URIs

If you have an Android `Uri`, you can easily convert it to a `FileObject` using the `toFileObject`
extension.

```kotlin
val uri: Uri = /* ... */
val fileObject = uri.toFileObject(expectedIsFile = true)
```

This method is smart: it checks if it can use direct file access or if it
needs to fall back to the `UriWrapper` for compatibility with Android's storage rules.
