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
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
}
