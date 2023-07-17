import { Inter } from "next/font/google";
import Provider from "@/context/Provider";
import Navbar from "@/components/navbar";
import "@/styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <div className={"container"}>
            <Navbar />
            {children}
          </div>
        </body>
      </Provider>
    </html>
  );
}
