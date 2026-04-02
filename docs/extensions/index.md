# Extension Development Guide

Xed-Editor is designed to be extensible. Instead of limiting functionality to what is built in, it allows developers to create custom extensions that integrate directly into the editor.

The possibilities of extensions are almost limitless. Here are some examples of what you can achieve with the Extension API:
- Register new language servers
- Add syntax highlighting or code intelligence features
- Introduce custom commands
- Extend the user interface with new components

This guide will walk you through the process of building your own extension.

## Prerequisites

Before you begin, make sure you are comfortable with the following technologies and concepts:

* [Kotlin](https://kotlinlang.org/docs/home.html) – for implementing core extension logic
* [Android fundamentals](https://developer.android.com/guide/components/fundamentals) – e.g. Activities, Services, Context, ...
* [Jetpack Compose](https://developer.android.com/compose) – for building modern Android UIs
* [Terminal usage](https://www.freecodecamp.org/news/how-to-learn-linux-terminal-as-a-beginner/) – Bash (Linux/macOS) or CMD/PowerShell (Windows)
