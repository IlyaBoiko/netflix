'use client'

import React from 'react';
import Image from 'next/image';
import NavbarItem from './NavbarItem';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'

type NavbarProps = {
    username?: string
}
enum NavbarLinks {
    '/home' = 'Головна',
    '/movies' = 'Фільми',
    '/favorites' = 'Улюблені'
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleNavClick = (newPath: string) => {
        router.push(newPath)
    }


    return (
        <nav className='w-full fixed z-40'>
            {username ? (
                <div className='px-4 md:px-16 py-6 flex flex-row items-center justify-between transition duration-500'>
                    <Image
                        onClick={() => router.push('/home')}
                        src='/images/logo.svg'
                        width={100}
                        height={100}
                        className='h-24 w-36 cursor-pointer'
                        alt='logo'
                    />
                    <div className='flex-row ml-8 gap-6 hidden lg:flex'>
                        {Object.entries(NavbarLinks).map(([path, label]) => (
                            <NavbarItem
                                key={path}
                                path={path}
                                label={label}
                                active={pathname === path}
                                handleClick={handleNavClick}
                            />
                        ))}
                    </div>

                    <div className='flex flex-row ml-auto gap-7 items-center'>
                        <div className='flex flex-row items-center'>
                            <Image
                                src='/images/devbro.png'
                                width={100}
                                height={100}
                                className='h-12 w-12 rounded-full mr-4'
                                alt='avatar'
                            />
                            <button className='
                                flex 
                                flex-row 
                                items-center
                                bg-red-600
                                py-1
                                px-4
                                text-white
                                font-semibold
                                rounded-[4px]
                                hover:bg-red-700
                                transition' onClick={() => signOut({callbackUrl: '/'})}>
                                Вийти
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='px-4 md:px-16 py-6 flex flex-row items-center justify-between transition duration-500'>
                    <Image
                        src='/images/logo.svg'
                        width={100}
                        height={100}
                        className='h-24 w-36 cursor-pointer'
                        alt='logo'
                    />
                    <button className='
                        flex 
                        flex-row 
                        items-center
                        bg-red-600
                        py-1
                        px-4
                        text-white
                        font-semibold
                        rounded-[4px]
                        hover:bg-red-700
                        transition'
                        onClick={() => router.push('/auth')}>
                        Увійти
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar;