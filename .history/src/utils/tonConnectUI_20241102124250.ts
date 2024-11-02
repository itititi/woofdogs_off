import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';

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

export async function setTonConnectUIOptions(options: Partial<TonConnectUiOptions>) {
  const ui = await getTonConnectUI();
  if (ui) {
    ui.uiOptions = { ...ui.uiOptions, ...options };
  }
}

const getUIOptions = (): TonConnectUiOptions => {
  return {
    manifestUrl: 'https://...',
    buttonRootId: 'ton-connect-button',
    // ... остальные опции ...
  };
};