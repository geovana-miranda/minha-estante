export async function fetchBooks(query: string) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&key=AIzaSyCrpquZTODiJvdC_Jre-UeO-homfFS3FnU`
  );
  const data = await res.json();
  return data.items;
}

export async function fetchBookByID(id: string) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  const data = await res.json();
  return data;
}
