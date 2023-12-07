import Navbar from '@/app/components/Navbar';
import React from 'react'
import getCurrentUser from '@/app/actions/getCurrentUser';
import Billboard from '@/app/components/Billboard';



const Home = async () => {


    const currentUser = await getCurrentUser();
    



    return (
        <>
            <Navbar username={getCurrentUser?.name} />
            <Billboard />
        </>
    )
}

export default Home;