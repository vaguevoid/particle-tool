import { ref, computed } from "vue";
import * as flatbuffers from "flatbuffers";
import { editor_messages } from "../generated/editor_messages";

export const connectionState = ref<
  "disconnected" | "connecting" | "connected" | "closed" | "error"
>("disconnected");
export const lastRoundTripTime = ref<number | null>(null);
export const lastMessage = ref<string | null>(null);
export const lastTimestamp = ref<bigint | null>(null);
export const socket = ref<WebSocket | null>(null);
export const lastSendTime = ref<number>(0);
export const aspectRatio = ref<{ width: number; height: number } | null>(null);

export const isConnected = computed(
  () => connectionState.value === "connected"
);

export function connectWebSocket(
  url: string = "ws://127.0.0.1:9002"
): WebSocket {
  if (
    socket.value &&
    (socket.value.readyState === WebSocket.OPEN ||
      socket.value.readyState === WebSocket.CONNECTING)
  ) {
    return socket.value;
  }

  connectionState.value = "connecting";
  const ws = new WebSocket(url);
  ws.binaryType = "arraybuffer";

  ws.onopen = () => {
    console.log("WebSocket connection opened to Editor module");
    connectionState.value = "connected";
  };

  ws.onmessage = (event) => {
    const elapsed = performance.now() - lastSendTime.value;
    lastRoundTripTime.value = elapsed;
    console.log(`Round trip time: ${elapsed.toFixed(2)} ms`);

    if (event.data instanceof ArrayBuffer) {
      try {
        const bytes = new Uint8Array(event.data);
        const buf = new flatbuffers.ByteBuffer(bytes);
        const message = editor_messages.Message.getRootAsMessage(buf);
        handleMessage(message.messageType(), message);
      } catch (error) {
        console.error("Error parsing FlatBuffer message:", error);
      }
    } else {
      console.log("Received non-binary message:", event.data);
    }
  };

  ws.onclose = () => {
    connectionState.value = "closed";
    aspectRatio.value = null;
  };

  ws.onerror = () => {
    connectionState.value = "error";
    aspectRatio.value = null;
  };

  socket.value = ws;
  return ws;
}

export function closeConnection(): void {
  if (socket.value) {
    socket.value.close();
    socket.value = null;
  }
}

function handleMessage(
  messageType: editor_messages.MessageType,
  message: editor_messages.Message
): void {
  switch (messageType) {
    case editor_messages.MessageType.PingMessage: {
      // Access the PingMessage contained in the Message
      const pingMsg = message.message(new editor_messages.PingMessage());
      if (pingMsg) {
        const timestamp = pingMsg.timestamp();
        const messageText = pingMsg.message();

        lastTimestamp.value = timestamp;
        lastMessage.value = messageText || "";

        console.log(`Received ping response with timestamp: ${timestamp}`);
      }
      break;
    }
    case editor_messages.MessageType.SpawnMessage: {
      const spawnMsg = message.message(new editor_messages.SpawnMessage());

      if (spawnMsg) {
        lastMessage.value = "Received spawn confirmation";

        const transform = spawnMsg.transform();
        const position = transform?.position();
        if (position) {
          console.log(
            `Spawn position: (${position.x()}, ${position.y()}, ${position.z()})`
          );
        }
      }
      break;
    }
    case editor_messages.MessageType.AspectRatioMessage: {
      const aspectRatioMsg = message.message(
        new editor_messages.AspectRatioMessage()
      );

      // TODO: Typechecking on message accessor functions
      if (aspectRatioMsg) {
        const width = aspectRatioMsg.aspectRatio().width();
        const height = aspectRatioMsg.aspectRatio().height();

        aspectRatio.value = { width, height };
        lastMessage.value = `Aspect ratio updated: ${width}x${height}`;

        console.log(`Received aspect ratio update: ${width}x${height}`);
      }
      break;
    }
    default:
      console.error(`Unknown message type: ${messageType}`);
      break;
  }
}
