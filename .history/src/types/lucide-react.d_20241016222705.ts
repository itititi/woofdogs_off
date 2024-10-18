declare module 'lucide-react/dist/esm/icons' {
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
