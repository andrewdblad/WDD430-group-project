"use client";

import React, { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const ClientLayout = ({ children }: LayoutProps) => {
    console.log('Rendering ClientLayout');
    return (
        <SessionProvider>
            <div className='min-h-screen flex flex-col'>
                <NavBar />
                <main className='flex-1'>{children}</main>
                <Footer />
            </div>
        </SessionProvider>
    );
};

export default ClientLayout;
