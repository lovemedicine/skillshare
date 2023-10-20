import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"
 
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skillshare App',
  description: 'An app that allows people to share their skills',
}

function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
      <SignedIn>
        <h1 className="mb-5 text-3xl font-bold">Skillshare App</h1>
        <UserButton />
      </SignedIn>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
