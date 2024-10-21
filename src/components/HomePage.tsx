import { Hero } from "./Hero";
import { Layout } from "./Layout";
import { Loading } from "./Loading";

export function HomePage() {
  const title = "Hello Bun!";
  return (
    <Layout title={title}>
      <div className="flex flex-col gap-8">
        <Hero title={title}>
          <div
            hx-trigger="load"
            hx-get="/movies"
            hx-swap="innerHTML"
            className="flex items-center justify-center"
          >
            <Loading />
          </div>
        </Hero>

        {/* The delay is to show the loading indicator, otherwise it would probably render to fast to notice */}
        <div
          hx-trigger="load delay:2s"
          hx-get="/time"
          hx-swap="innerHTML"
          className="flex items-center justify-center h-64"
        >
          <Loading />
        </div>
      </div>
    </Layout>
  );
}
