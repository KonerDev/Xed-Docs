---
lang: en-US
title: Built-in Servers
---

# Built-in Servers

Xed-Editor already comes with several **built-in language servers** out of the box.

Before they can be used, make sure they're enabled and installed. Xed-Editor attempts to automatically establish a connection when a corresponding file is opened.

## Manage Servers

You can manage the built-in servers by navigating to:

**Settings → Editor → Manage language servers**

Here you can:

- **Enable/Disable Servers** – Turn language support on or off per language.
- **Install/Update Servers** – Ensure the server is installed and up to date.
- **Configure Settings** – Adjust server-specific options or disable certain features.
- **View status and logs** –  Monitor the state and review logs for troubleshooting.

::: tip
The integrated language servers should work without any problems. If you do encounter any issues, please report them.

👉 [**How to report LSP issues**](report-issues.md)
:::

## Supported Languages

Xed-Editor ships with built-in servers for many common programming languages, including:

- **Python**: [`pyright`](https://github.com/microsoft/pyright)
- **JavaScript & TypeScript**: [`typescript-language-server`](https://github.com/typescript-language-server/typescript-language-server)
- **HTML, CSS, JSON**: [`vscode-langservers-extracted`](https://github.com/hrsh7th/vscode-langservers-extracted)
- **Emmet**: [`emmet-language-server`](https://github.com/olrtg/emmet-language-server)
- **Bash**: [`bash-language-server`](https://github.com/bash-lsp/bash-language-server)
- **XML**: [`LemMinX`](https://github.com/eclipse-lemminx/lemminx)

::: info
Additional language servers can be added manually or via extensions if your preferred language is not listed. To learn more, view the following guides.
:::
