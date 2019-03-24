import { Singleton } from 'src/context/steriotypes/Singleton';
import { config } from 'src/config';

@Singleton
export class ClipboardCopier {
  copy(text) {
    const el = document.createElement('textarea');
    el.value = text;

    const maybeClipboardElement = document.getElementById('clipboard');

    if (maybeClipboardElement) {
      document.body.removeChild(maybeClipboardElement);
    }

    if (config.keepLastClipboardValue) {
      el.id = 'clipboardValue';
      el.setAttribute('data-test-id', text);
    }

    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    if (!config.keepLastClipboardValue) {
      document.body.removeChild(el);
    }
  }

  clear() {
    const value = ' ';

    const maybeClipboardElement = document.getElementById('clipboard');

    if (maybeClipboardElement) {
      document.body.removeChild(maybeClipboardElement);
    }

    const el = document.createElement('textarea');
    el.value = value;

    if (config.keepLastClipboardValue) {
      el.id = 'clipboardValue';
      el.setAttribute('data-test-id', value);
    }

    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    if (!config.keepLastClipboardValue) {
      document.body.removeChild(el);
    }
  }
}
