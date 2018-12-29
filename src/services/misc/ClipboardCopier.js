import { Singleton } from "src/context/steriotypes/Singleton";

@Singleton
export class ClipboardCopier {
  copy(text) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  clear() {
    const el = document.createElement("textarea");
    el.value = "";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}
