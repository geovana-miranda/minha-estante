export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
  profileTitle: string;
  profileQuote: string;
  books: IBook[];
}

export interface IGoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    publisher?: string;
    pageCount?: number;
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export interface IBook extends IGoogleBook {
  status: string;
  rating: number | null;
  review: string | null;
}
