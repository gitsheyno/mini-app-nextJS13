import getWikiResults from "@/lib/getWikiRes";
import Componentitem from "./components/ComponentItem";
type Props = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;

  const displayTerm = searchTerm.replaceAll("%20", " ");

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} not found`,
    };
  }

  return {
    title: displayTerm,
    description: `Search result for ${displayTerm}`,
  };
}

export default async function SearchResultPage({
  params: { searchTerm },
}: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;

  const resault: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 main-h-screen">
      {resault ? (
        Object.values(resault).map((result) => (
          <Componentitem key={result.pageid} result={result} />
        ))
      ) : (
        <h2>`${searchTerm} is not found`</h2>
      )}
    </main>
  );
  return content;
}
