// Этот файл пока не используется, поэтому мы можем его закомментировать или удалить
/*
import { TonConnectUI } from '@tonconnect/ui';

export const tonConnectUI = new TonConnectUI();

export async function getTonConnectUI() {
  if (typeof window === 'undefined') {
    return null;
  }

  return tonConnectUI;
}

export async function setTonConnectUIOptions(options: Partial<TonConnectUI['uiOptions']>) {
  const ui = await getTonConnectUI();
  if (ui) {
    ui.uiOptions = { ...ui.uiOptions, ...options };
  }
}
*/

import { TonConnectUI } from '@tonconnect/ui';

let tonConnectUI: TonConnectUI | null = null;

export async function getTonConnectUI(): Promise<TonConnectUI | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!tonConnectUI) {
    tonConnectUI = new TonConnectUI();
  }

  return tonConnectUI;
}

export async function setTonConnectUIOptions(options: Partial<TonConnectUI['uiOptions']>) {
  const ui = await getTonConnectUI();
  if (ui) {
    ui.uiOptions = { ...ui.uiOptions, ...options };
  }
}
