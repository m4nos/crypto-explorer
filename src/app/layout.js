import { Inter } from "next/font/google";
import TanstackProvider from "../providers/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Explorer",
  description: "Portal to all cryptocurrencies"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
