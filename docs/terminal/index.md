# Terminal

Xed-Editor includes a powerful integrated terminal that allows you to interact with the underlying system directly. It is based on the robust Termux terminal engine, providing a familiar and capable environment.

## Features

- **Full Terminal Emulation**: Support for a wide range of terminal sequences and features.
- **Sandboxed Environment**: By default, the terminal can run in a proot-based sandbox, providing a safe and isolated environment for running scripts and tools.
- **Virtual Keys**: A dedicated row of virtual keys (Ctrl, Alt, Shift, Fn, etc.) makes it easy to use terminal applications that require special key combinations, even on a mobile keyboard.
- **Session Management**: Open multiple terminal sessions and switch between them easily.
- **Customizable Appearance**: Adjust the font size, cursor style, and colors to suit your preferences.

## Usage

You can open the terminal by:
- Clicking the terminal icon in the main toolbar.
- Using a global command or keybinding (if configured).
- Running a file using a shell-based runner.

## Configuration

Terminal settings can be found in:

**Settings → Terminal**

- **Font Size**: Change the size of the text in the terminal.
- **Cursor Style**: Choose between Block, Bar, or Underline cursors.
- **Cursor Blinking**: Enable or disable cursor blinking.
- **Virtual Keys**: Configure the layout and visibility of the virtual key row.

## Sandbox Environment

The sandbox environment is a key feature of Xed-Editor's terminal. It allows you to run a Linux-like environment without needing root access. You can install packages (if a package manager is available in the rootfs) and run complex tools in isolation from the rest of your device.

::: tip
The sandbox is particularly useful for the **Universal Runner**, which relies on it to execute code for various programming languages safely.
:::
