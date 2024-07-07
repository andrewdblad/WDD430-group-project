import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='min-h-screen flex flex-col'>
            <nav className='bg-seasalt p-4 border-b-2'>
                <div className='container mx-auto text-white'> Nav Bar - Jared Malan</div>
            </nav>
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