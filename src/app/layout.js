import TanstackProvider from "../providers/TanstackProvider";
import AppHeader from "../components/AppHeader";
import { CssBaseline, GlobalStyles } from "@mui/material";


export const metadata = {
  title: "Crypto Explorer",
  description: "Portal to all cryptocurrencies"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#d5d5d5' }}>
        <TanstackProvider>
          <CssBaseline />

          <AppHeader />
          {children}
        </TanstackProvider>
      </body>
    </html >
  );
}
