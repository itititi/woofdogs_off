declare module '@tonconnect/ui-react' {
  export function useTonConnectUI(): [unknown, boolean];
  export function TonConnectButton(): JSX.Element;
}

interface TonConnectUI {
  // Добавьте здесь необходимые свойства и методы
  // Например:
  connected: boolean;
  account?: {
    address: string;
    network: string;
  };
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
