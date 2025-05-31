import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { IBook, IGoogleBook, IUser, typeStatus } from "../types/types";
import { useUpdateUser } from "./useUpdateUser";

interface ISaveBookParams {
  apiBook?: IGoogleBook;
  userBook?: IBook;
  status: typeStatus;
  rating: number | null;
  review: string;
};

export const useSaveBook = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser } = authContext;

  const {updateUser} = useUpdateUser();

  const saveBook = ({ apiBook, userBook, status, rating, review }: ISaveBookParams) => {

    const book: IBook = userBook
    ? userBook
    : {
        ...apiBook!,
        status: "queroler",
        rating: null,
        review: "",
        favorite: false,
      };


    let bookDetails = {
      id: book.id,
      volumeInfo: {
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        publisher: book.volumeInfo.publisher,
        pageCount: book.volumeInfo.pageCount,
        publishedDate: book.volumeInfo.publishedDate,
        imageLinks: {
          thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        },
      },
      status,
      rating,
      review,
      favorite: book.favorite || false,
    };

    if (!currentUser) return;

    if (apiBook) {
      const updatedUser: IUser = {
        ...currentUser,  
        books: [...(currentUser.books || []), bookDetails],
      };

      updateUser(updatedUser);
    }

    if (userBook) {
      if (bookDetails.status === "queroler") {
        bookDetails = {
          ...bookDetails,
          rating: null,
          review: "",
          favorite: false,
        };
      }

      const updatedUser: IUser = {
        ...currentUser,
        books: [
          ...currentUser.books.map((b) => (b.id === book.id ? bookDetails : b)),
        ],
      };

      updateUser(updatedUser);
    }
  };
  
  

  return { saveBook };
};
