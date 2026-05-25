# External Servers

Xed-Editor allows you to connect to language servers that are not built-in. This is useful if you want to use a specific version of a language server, or if you want to use a language that is not yet supported out of the box.

## Types of External Servers

You can connect to external servers in two ways:

### 1. Process-based Servers

A process-based server is started by Xed-Editor as a background process. You provide the shell command required to start the server.

- **Command**: The full shell command to launch the language server.
- **File Extensions**: A list of file extensions that this server should handle.

### 2. Socket-based Servers

A socket-based server must already be running, and Xed-Editor connects to it via a network socket.

- **Host**: The hostname or IP address of the server.
- **Port**: The port number the server is listening on.
- **File Extensions**: A list of file extensions that this server should handle.

## Adding an External Server

To add an external server:

1. Go to **Settings → Editor → Manage language servers**.
2. Click on the **+** (Add) button.
3. Choose between **Process** or **Socket**.
4. Fill in the required details.
5. Save the configuration.
