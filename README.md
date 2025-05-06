# IPC Test tool

A tool for testing IPC communication between Editor and native game.

## Usage

1. Clone [Engine](https://github.com/vaguevoid/engine) and check out the
   `mrc/websockets-with-editor-module` branch.
2. In the Engine repo, run `bash build-with-editor-module-mac.sh`. You should
   see a window launch. It should have a black background.
3. Launch the Fiasco Editor and open the IPC Test tool.
4. Check you see a green dot and "Connected to game".
5. Click on the gray rectangle to spawn an entity. Check an entity appears in
   the game window.

<img src="public/images/Fiasco IPC Test.png">

## Features

- Connect to a WebSocket server running on the Fiasco Engine
- Send and receive responses from the engine.

## Development

The IPC Test tool uses the following technologies:

- Vue 3 for the UI
- WebSockets for communication
- FlatBuffers for binary serialization

### Setup

```bash
# Install dependencies
bun install

# Start the development server
bun run dev
```

### FlatBuffers

This tool uses FlatBuffers for efficient binary serialization. The schema is
defined in `src/schema/editor_messages.fbs`. The IPC Test tool vite config will
regenerate the necessary TypeScript files when the schema is changed.

```bash
bun generate-flatbuffers
```

### WebSocket Server

The tool connects to a WebSocket server running on `ws://127.0.0.1:9002`. This should be provided by the Fiasco Engine running in editor mode.
