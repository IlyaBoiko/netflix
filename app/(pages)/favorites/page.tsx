import React from 'react'
import getCurrentUser from '@/app/actions/getCurrentUser'
import Navbar from '@/app/components/Navbar';
import getFavoritesMovies from '@/app/actions/getFavoritesMovies';
import MoviesList from '@/app/components/MoviesList';

const FavoritesMovies = async () => {
    const currentUser = await getCurrentUser();
    const favoritesMovies = await getFavoritesMovies();
    


    return (
        <>
            <Navbar username={currentUser?.name} />
            <div className='pb-40 pt-72 '>
                <MoviesList movies={favoritesMovies} title='Улюблені' />
            </div>
        </>
    )
}

export default FavoritesMovies;