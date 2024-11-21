import { Providers } from "./providers";
import { ThemeProvider } from "@/context/theme";
import { DM_Sans } from 'next/font/google'

 const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export default async function RootLayout({ children }) {
  return (
    <html className={dmSans.className}>
       <head>
        <title>RoboClaim</title>
      </head>
      <body>
        <main>
    
            <ThemeProvider>
              <Providers>{children}</Providers>
            </ThemeProvider>
        </main>
      </body>
    </html>
  );
}