export async function fetchAuthor(name: string) {
    const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${name}`);
    const data = await res.json();
    return data;
}