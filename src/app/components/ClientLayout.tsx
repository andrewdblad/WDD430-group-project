"use client";

import React, { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import NavBar from './NavBar';

interface LayoutProps {
    children: ReactNode;
}

const ClientLayout = ({ children }: LayoutProps) => {
    return (
        <SessionProvider>
            <div className='min-h-screen flex flex-col'>
                <NavBar />
                <main className='flex-1'>{children}</main>
                <footer className='bg-gray-800 p-4 text-white text-center'>
                    © 2024 HANDCRAFTED HAVEN™
                </footer>
            </div>
        </SessionProvider>
    );
};

export default ClientLayout;
