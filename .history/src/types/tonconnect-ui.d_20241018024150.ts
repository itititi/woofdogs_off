declare module '@tonconnect/ui' {
  export const THEME: {
    DARK: string;
    LIGHT: string;
  };

  export interface TonConnectUIOptions {
    theme: string;
  }

  export class TonConnectUI {
    constructor(options?: Partial<TonConnectUIOptions>);
    uiOptions: TonConnectUIOptions;
  }
}
