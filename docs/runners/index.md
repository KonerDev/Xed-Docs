# Runners

Xed-Editor provides a flexible system for running your code directly from the editor. Whether you are developing a web page, writing a script, or working on a complex project, Runners allow you to execute your files with a single click.

## Built-in Runners

Xed-Editor comes with several built-in runners that are optimized for specific file types:

- **HTML Runner**: Specifically designed for web development. It hosts your HTML and SVG files on a local web server and opens them in an internal web view, allowing for quick previews.
- **Markdown Runner**: Renders Markdown files into HTML and displays them in a previewer.
- **Universal Runner**: A versatile runner that supports a wide range of programming languages including Python, JavaScript, TypeScript, Java, Kotlin, Rust, C/C++, and more. It uses a sandboxed environment to execute your code safely.

## Shell-Based Runners

For maximum flexibility, Xed-Editor allows you to create your own custom runners using shell scripts. This is useful if you have a specific build process or need to use a language not covered by the Universal Runner.

To create a shell-based runner:
1. Go to **Settings → Runners → Custom Runners**.
2. Click on the **+** button to add a new runner.
3. Provide a name and a regex pattern to match the files this runner should handle (e.g., \`.*\.sh\` for shell scripts).
4. Xed-Editor will create a template script for you. You can then edit this script to define how your files should be executed.

Custom runners are executed in the integrated terminal, giving you full access to the shell environment.

## Managing Runners

You can enable or disable specific runners in the settings:

**Settings → Runners**

- **Enable HTML Runner**: Toggle the built-in HTML previewer.
- **Enable Markdown Runner**: Toggle the built-in Markdown previewer.
- **Enable Universal Runner**: Toggle the versatile language runner.

## Extension API

Developers can also register custom runners via the Extension API. This allows for deep integration of specialized tools and languages into Xed-Editor.

Refer to the [Extension Development Guide](../extensions/index.md) for more information on how to register custom runners.
