export async function fetchBooks(query: string) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&key=AIzaSyCrpquZTODiJvdC_Jre-UeO-homfFS3FnU`
  );

  if (!res.ok) {
    throw new Error(`Erro: ${res.status}`);
  }

  const data = await res.json();

  if (!data.items) return [];
  return data.items;
}

export async function fetchBookByID(id: string) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);

  if (!res.ok) {
    throw new Error(`Erro: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export async function fetchBooksByAuthor(author: string) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${author}"&maxResults=40`
  );

  if (!res.ok) {
    throw new Error(`Erro: ${res.status}`);
  }

  const data = await res.json();
  return data.items;
}
