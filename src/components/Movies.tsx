import { getMovies } from "../api";
import { Loading } from "./Loading";

export async function Movies() {
  const movies = await getMovies();
  return (
    <section className="max-w-screen-md mx-auto">
      <h2 className="uppercase text-xl">
        <strong>Movies</strong>
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {movies.map((movie) => (
          <div key={movie.id} className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
              <p className="text-start">
                <i>{movie.releaseYear}</i>
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">More info</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="movies-loader" className="htmx-indicator">
        <Loading />
      </div>
    </section>
  );
}
