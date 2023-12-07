import React from 'react'
import getCurrentUser from '@/app/actions/getCurrentUser'
import Navbar from '@/app/components/Navbar';
import getAllMovies from '@/app/actions/getAllMovies';
import MoviesList from '@/app/components/MoviesList';

const Movies = async () => {
    const currentUser = await getCurrentUser();
    const movies = await getAllMovies();
    


    return (
        <>
            <Navbar username={currentUser?.name} />
            <div className='pb-40 pt-72'>
                <MoviesList movies={movies} title='Фільми' />
            </div>
        </>
    )
}

export default Movies;