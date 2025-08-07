import { ReactNode } from "react";

type Props = {
  readonly children: ReactNode;
};

export const metadata = {
  title: "E-Commerce 369 - Saudi Women's Fashion",
  description:
    "Leading e-commerce platform for women's fashion in Saudi Arabia",
};

// Root layout that provides basic HTML structure
// The middleware will handle locale redirects
export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
