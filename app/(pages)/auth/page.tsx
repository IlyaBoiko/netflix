'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import BgProvider from '@/app/components/BgProvider'
import {FaGoogle, FaGithub} from 'react-icons/fa'
import Input from '@/app/components/Input';
import {signIn, signOut} from 'next-auth/react';
import axios from 'axios';


type VariantType = 'login' | 'register'

const AuthPage: React.FC = () => {
    const router = useRouter();
    const [variant, setVariant] = useState<VariantType>('login')

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleVariantChange = () => {
        setVariant((prevVariant) => (prevVariant === 'login' ? 'register' : 'login'))
    }

    const login = async () => {
        try {
            await signIn('credentials',{
                email,
                password,
                redirect: true,
                callbackUrl: '/home',
            })

        } catch (error) {
            console.log('login error', error)
        }

    }
    const register = async() => {
        try {
            await axios.post('/api/register', {
                name,
                email,
                password,
            });

            login();

        } catch (error) {
            console.log('login error', error)
        }
    }

    return (
        <BgProvider removeBgOnMobile>
            <nav className='px-4 md:px-16 py-6'>
                <Image
                    onClick={() => router.push('/')}
                    src='/images/logo.svg'
                    width={100}
                    height={100}
                    className='h-24 w-36 cursor-pointer'
                    alt='logo'
                />
            </nav>

            <div className='flex justify-center'>
                <div className='bg-black/90 p-16 self-center mt-2 lg:w2/5 lg:max-w-md rounded-md w-full'>
                    <h2>{variant === 'login' ? 'Увійти' : 'Зареєструватися'}</h2>
                    <div className='flex flex-col gap-4'>
                        {variant === 'register' && (
                            <Input
                                id='name'
                                label='Імя'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}
                        <Input
                            type='email'
                            label='Email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type='password'
                            label='Password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className='bg-red-600 w-full flex-row py-3 mt-10 text-white rounded-md hover:bg-red-700 transition'
                        onClick={variant === 'login' ? login : register}>
                        {variant === 'login' ? 'Увійти' : 'Зареєструватися'}
                    </button>

                    <div className='flex flex-row gap-4 items-center mt-8 justify-center'>
                        <div onClick={() => signIn('google', { callbackUrl: '/home' })}
                        className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                            <FaGoogle size={32} />
                        </div>
                        <div onClick={() => signIn('github', {callbackUrl: '/home'})}
                            className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                            <FaGithub size={32} />
                        </div>
                    </div>

                    <p className='text-neutral-500 mt-12'>
                        {variant === 'login' ? 'Уперше на Netflix?' : 'Вже маєш акаунт?'}
                        <span onClick={handleVariantChange}
                        className='text-white ml-1 cursor-pointer hover:underline transition'
                        >{variant === 'login' ? 'Зареєструватися' : 'Увійти'}</span>
                    </p>
                </div>
            </div>
        </BgProvider>
    )
}

export default AuthPage