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
  review: string;
  favorite: boolean;
}

export type typeStatus = "queroler" | "lido";

export interface IAuthor {
  title: string;
  thumbnail?: {
    source: string;
  };
  extract_html: string;
}


export interface IBooksByAuthor {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}