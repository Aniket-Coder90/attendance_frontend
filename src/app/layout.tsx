"use client";

// import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { MainNav } from "@/components/app/main-nav";
import { Provider } from "react-redux";
import store from "@/redux/store";
// app/layout.tsx or pages/_app.tsx
import "antd/dist/reset.css"; // Ant Design v5
import "@/app/globals.css"; // your global styles

// export const metadata: Metadata = {
//   title: "AttendaSync",
//   description: "An elegant solution to manage employee attendance.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Provider store={store}>
          <SidebarProvider>
            <Sidebar>
              <MainNav />
            </Sidebar>
            <SidebarInset>
              <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
