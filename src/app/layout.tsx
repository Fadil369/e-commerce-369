import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Since we're using the `[locale]` folder pattern,
// this layout only renders for requests that don't match any locale
export default function RootLayout({ children }: Props) {
  return children;
}
