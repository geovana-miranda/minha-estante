export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
  profileTitle: string;
  profileQuote: string;
}

export interface IFoundBooks {
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
