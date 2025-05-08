import { Ipc } from "@vaguevoid/tools";
import { onBeforeUnmount, onMounted } from "vue";

export function onShow(cb: () => void) {
  if (Ipc.isChildWindow()) {
    let loadTime = -1;
    onMounted(() => {
      cb();
      loadTime = performance.now();
    });
    return Ipc.listenWillShow(() => {
      if (performance.now() - loadTime < 100) {
        console.warn(`Ignoring show event because it was too soon`);
      } else {
        cb();
      }
    });
  } else {
    onMounted(cb);
    return noop;
  }
}

export function onHide(cb: () => void) {
  if (Ipc.isChildWindow()) {
    return Ipc.listenWillHide(cb);
  } else {
    onBeforeUnmount(cb);
    return noop;
  }
}

export function noop() {}
