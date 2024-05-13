import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_context/cart";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`overflow-y-scroll [&::-webkit-scrollbar]:hidden ${inter.className}`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
