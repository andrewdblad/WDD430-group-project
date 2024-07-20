import React, { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='min-h-screen flex flex-col'>
            <NavBar />
            <main>{children}</main>
            <main className='flex-1'>
                {children}
            </main>
            <footer className='bg-gray-800 p4 text-white text-center'>
                Footer
            </footer>
        </div>
    );
};

export default Layout;