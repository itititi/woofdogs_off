declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    stroke?: string | number;
  }

  export const Menu: FC<IconProps>;
  export const X: FC<IconProps>;
  export const Search: FC<IconProps>;
  export const Calendar: FC<IconProps>;
  // Добавьте другие иконки, которые вы используете
}

declare module 'lucide-react/dist/esm/icons' {
  export * from 'lucide-react';
}

declare module 'lucide-react/dist/esm/icons/chevron-down' {
  import { LucideIcon } from 'lucide-react';
  const ChevronDown: LucideIcon;
  export default ChevronDown;
}

declare module 'lucide-react/dist/esm/icons/user' {
  import { LucideIcon } from 'lucide-react';
  const User: LucideIcon;
  export default User;
}

declare module 'lucide-react/dist/esm/icons/settings' {
  import { LucideIcon } from 'lucide-react';
  const Settings: LucideIcon;
  export default Settings;
}

declare module 'lucide-react/dist/esm/icons/log-out' {
  import { LucideIcon } from 'lucide-react';
  const LogOut: LucideIcon;
  export default LogOut;
}
