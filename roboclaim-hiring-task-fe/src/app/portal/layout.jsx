import React from "react";
import NavBar from "@/components/nav-bar/nav-bar";

export default async function PortalLayout({ children }) {
  return (
    <html >
      <body>
        <main>
            <NavBar/>
            {children}
        </main>
      </body>
    </html>
  );
}