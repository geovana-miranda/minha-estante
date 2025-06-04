export async function fetchAuthor(name: string) {
  const res = await fetch(
    `https://pt.wikipedia.org/api/rest_v1/page/summary/${name}`
  );

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("NotFound");
    }
    throw new Error(`Erro: ${res.status}`);
  }
  
  const data = await res.json();
  return data;
}
