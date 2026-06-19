import Search from "../../components/Search/Search";
import CardList from "../../components/CardList/CardList";
import Pagination from "../../components/Pagination/Pagination";
import { fetchPokemons } from "../actions/pokemonActions";
import { ITEMS_ON_PAGE } from "../../common/constants";

type HomeProps = {
  searchParams: Promise<{ page?: string; details?: string }>;
};

const Home = async({ searchParams }: HomeProps) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const detailsId = params.details;
  // const isLoading = false;

  const res = await fetchPokemons('', page);

  if (res.error) {
    // return (
    //   <main className="flex items-center justify-center h-screen p-4 bg-gray-100 dark:bg-teal-950">
    //     <ErrorComponent error={res.error} onRetry={() => refetch()} />
    //   </main>
    // );
    throw new Error('Failed to fetch');
  }
  const pokemons = res.pokemons ?? [];
  const totalPages = Math.ceil((res.pokemonsTotal ?? 0) / ITEMS_ON_PAGE);

  //  const selectedPokemons = useAppSelector(
  //   (state) => state.selectedPokemons.selectedPokemons
  // );

  return (
    <main className="flex flex-col flex-1 bg-gray-100 dark:bg-teal-950 text-center">
       <Search
        initialValue={''}
        savedValue={''}
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
          
          {/* {detailsId && (
           <section className="w-1/4 mr-8">
             <Outlet />
           </section>
         )} */}
      </section> 
       {!res.error && pokemons.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
        />
      )}
       {/* <button
//          className="bg-yellow-500 text-white font-mono m-auto w-fit text-lg px-6 py-3 my-12 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
//          onClick={() => {
//            setHasError(true);
//          }}
//        >
//          Error Button
//        </button>
//        {selectedPokemons.length > 0 && <Flyout />} */}
    </main>
  );
}

export default Home;