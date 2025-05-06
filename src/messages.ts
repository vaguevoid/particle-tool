import { editor_messages } from "./generated/editor_messages";
import { socket, lastSendTime } from "./services/websocket";
import * as flatbuffers from "flatbuffers";

interface TransformData {
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number };
  skew: { x: number; y: number };
  pivot: { x: number; y: number };
  rotation: number;
}

interface ColorData {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface ColorRenderData {
  visible: boolean;
}

export function sendSpawnMessage(
  transform: TransformData,
  color: ColorData,
  colorRender: ColorRenderData
): void {
  if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
    console.error("WebSocket is not connected");
    return;
  }

  console.log("Sending FlatBuffer spawn message");
  lastSendTime.value = performance.now();

  // Create a FlatBuffer builder
  const builder = new flatbuffers.Builder(1024);

  // Create the Transform component
  editor_messages.Transform.startTransform(builder);
  // Add position - create Vec3 inline
  editor_messages.Transform.addPosition(
    builder,
    editor_messages.Vec3.createVec3(
      builder,
      transform.position.x,
      transform.position.y,
      transform.position.z
    )
  );

  // Add scale - create Vec2 inline
  editor_messages.Transform.addScale(
    builder,
    editor_messages.Vec2.createVec2(
      builder,
      transform.scale.x,
      transform.scale.y
    )
  );

  // Add skew - create Vec2 inline
  editor_messages.Transform.addSkew(
    builder,
    editor_messages.Vec2.createVec2(builder, transform.skew.x, transform.skew.y)
  );

  // Add pivot - create Vec2 inline
  editor_messages.Transform.addPivot(
    builder,
    editor_messages.Vec2.createVec2(
      builder,
      transform.pivot.x,
      transform.pivot.y
    )
  );

  editor_messages.Transform.addRotation(builder, transform.rotation);
  const transformOffset = editor_messages.Transform.endTransform(builder);

  // Create the Color component
  editor_messages.Color.startColor(builder);
  // Add color value - create ColorRGBA inline
  editor_messages.Color.addValue(
    builder,
    editor_messages.ColorRGBA.createColorRGBA(
      builder,
      color.r,
      color.g,
      color.b,
      color.a
    )
  );
  const colorOffset = editor_messages.Color.endColor(builder);

  // Create the ColorRender component
  editor_messages.ColorRender.startColorRender(builder);
  editor_messages.ColorRender.addVisible(builder, colorRender.visible);
  const colorRenderOffset = editor_messages.ColorRender.endColorRender(builder);

  // Create the SpawnMessage
  editor_messages.SpawnMessage.startSpawnMessage(builder);
  editor_messages.SpawnMessage.addTransform(builder, transformOffset);
  editor_messages.SpawnMessage.addColor(builder, colorOffset);
  editor_messages.SpawnMessage.addColorRender(builder, colorRenderOffset);
  const spawnOffset = editor_messages.SpawnMessage.endSpawnMessage(builder);

  // Create the Message wrapper with SpawnMessage as the payload
  editor_messages.Message.startMessage(builder);
  editor_messages.Message.addMessageType(
    builder,
    editor_messages.MessageType.SpawnMessage
  );
  editor_messages.Message.addMessage(builder, spawnOffset);
  const messageOffset = editor_messages.Message.endMessage(builder);

  // Finish the FlatBuffer
  builder.finish(messageOffset);

  // Get the binary data
  const bytes = builder.asUint8Array();

  console.log("Sending spawn message");

  // Send over WebSocket
  socket.value.send(bytes);
}
