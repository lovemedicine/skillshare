import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from "@clerk/nextjs"
import { Grid, Typography } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skillshare App',
  description: 'An app that allows people to share their skills',
}

function Header() {
  return (
    <header style={{ backgroundColor: "#eee", display: "flex", justifyContent: "space-between", padding: 10 }}>
      <SignedIn>
        <Typography variant="h4">Skillshare App</Typography>
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
        <body className={inter.className} style={{ margin: 0 }}>
          <Header />
          <div style={{ padding: 10 }}>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
