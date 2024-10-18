declare module '@tonconnect/ui' {
  export const THEME: {
    DARK: string;
    LIGHT: string;
  };

  export interface TonConnectUI {
    uiOptions: {
      theme: string;
    };
  }

  export class TonConnectUI {
    constructor(options?: any);
    uiOptions: {
      theme: string;
    };
  }
}
