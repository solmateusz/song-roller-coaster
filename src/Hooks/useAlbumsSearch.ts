import { useEffect, useState } from "react";

export function useAlbumsSearch(searchTerm: string, limit: number) {
  const [albums, setAlbums] = useState<string[]>(["A", "B", "C", "D", "E"]);
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());

  useEffect(() => {
    if (searchTerm.length < 3) return;

    abortController.abort();
    const newAbortController = new AbortController();
    const { signal } = newAbortController;

    async function fetchData() {
      try {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`, { signal });
        const result = await response.json();
        const data: { collectionName: string }[] = result.results;
        const albumTitles = data.map((i) => i.collectionName).filter((value, index, array) => array.indexOf(value) === index);
        albumTitles.sort();
        setAlbums(albumTitles.slice(0, limit));
      } catch (error) {}
    }

    fetchData();
    setAbortController(newAbortController);
  }, [searchTerm]);

  return albums;
}
