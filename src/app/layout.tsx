import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from "react";
import ClientAppWrapper from "@/components/ClientAppWrapper";
import "react-chat-elements/dist/main.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Lectorie',
    description: 'Be the best you can be: Lectorie is a platform for learning and teaching languages. Find a tutor or become a tutor.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <AppRouterCacheProvider>
                    <ClientAppWrapper>
                        {children}
                    </ClientAppWrapper>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
