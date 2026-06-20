import Search from "../../components/Search/Search";
import CardList from "../../components/CardList/CardList";
import Pagination from "../../components/Pagination/Pagination";
import { fetchPokemons } from "../../actions/pokemonActions";
import { ITEMS_ON_PAGE } from "../../common/constants";
import { redirect } from "next/navigation";
import Details from "../../components/Details/Details";
import Flyout from "../../components/Flyout/Flyout";

type HomeProps = {
  searchParams: Promise<{ page?: string; details?: string; search?: string}>;
};

const Home = async({ searchParams }: HomeProps) => {
  const params = await searchParams;
  const search = params.search || '';
  const detailsId = params.details;

   if (!params.page) {
    const searchParams = new URLSearchParams();
    if (search) {
      searchParams.set('search', search);
    }
    
    searchParams.set('page', '1');
    redirect(`/?${searchParams.toString()}`);
  }

  const page = Number(params.page);

  const res = await fetchPokemons(search, page);

  if (res.error) {
    // return (
    //   <main className="flex items-center justify-center h-screen p-4 bg-gray-100 dark:bg-teal-950">
    //     <ErrorComponent error={res.error} onRetry={() => refetch()} />
    //   </main>
    // );
    throw new Error(res.error);
  }
  const pokemons = res.pokemons ?? [];
  const totalPages = Math.ceil((res.pokemonsTotal ?? 0) / ITEMS_ON_PAGE);

  return (
    <main className="flex flex-col flex-1 bg-gray-100 dark:bg-teal-950 text-center">
       <Search
        initialValue={search}
      />
      <section className="flex flex-1">
        <section
          className={
            detailsId
            ? 'flex flex-col w-3/4 h-full items-center'
            : 'flex flex-col w-full h-full px-24 items-center'
          }
        >
          <CardList pokemons={pokemons}/>
        </section>
         {detailsId && (
          <section className="w-1/4 mr-8">
            <Details pokemonId={detailsId} />
          </section>
        )}
      </section> 
       {!res.error && pokemons.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
        />
      )}
      {/* <button
          className="bg-yellow-500 text-white font-mono m-auto w-fit text-lg px-6 py-3 my-12 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
          onClick={() => {
            setHasError(true);
          }}
        >
          Error Button
        </button>  */}
        <Flyout />
    </main>
  );
}

export default Home;