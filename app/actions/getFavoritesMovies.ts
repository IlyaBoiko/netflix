import prisma from "@/app/utils/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoritesMovies() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            throw new Error('You must logged in')
        }

        const favoritesmovies = await prisma.movie.findMany({
            where: {
                id: { in: currentUser?.favoriteIds },
            },
        });

        return favoritesmovies;
    } catch (error: any) {
        throw new Error(error);
    }
}
