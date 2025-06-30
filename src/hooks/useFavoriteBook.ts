import React, { useEffect, useState } from 'react'
import type { IBook, IUser } from '../types/types';
import { useAuthContext } from './useAuthContext';
import { useUpdateUser } from './useUpdateUser';

const useFavoriteBook = (book: IBook) => {
  const { currentUser } = useAuthContext();
  const { updateUser } = useUpdateUser();

  const [favorited, setFavorited] = useState<boolean>(
    book.favorite || false
  );
    const favoriteBook = (
        e: React.MouseEvent<SVGElement, globalThis.MouseEvent>
      ) => {
        e.stopPropagation();
        setFavorited(!favorited);
      };
    
      const updateBook = () => {
        if (!currentUser) return;
    
        const updatedBook = { ...book, favorite: favorited };
    
        const updatedUser: IUser = {
          ...currentUser,
          books: [
            ...currentUser.books.map((b) => (b.id === book.id ? updatedBook : b)),
          ],
        };
    
        updateUser(updatedUser);
      };
    
      useEffect(() => {
        updateBook();
      }, [favorited]);

  return {favorited, favoriteBook}
}

export default useFavoriteBook