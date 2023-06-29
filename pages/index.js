import Head from "next/head"
import DesignLayout from "components/layouts/DesignLayout"
import SliderNews from "./home/SliderNews"
import News from "./home/News"
import Activities from "./home/Activities"
import Birthdays from "./home/Birthdays"

export default function Home() {
  const { data, isLoading, isError } = true

  return (
    <DesignLayout>
      <div>
        <Head>
          <title>Plataforma ^ DHNN Creative Agency</title>
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
          /> */}
          <meta
            name="description"
            content="Plataforma de contenido oficial DHNN Creative Agency"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className=" max-w-2xl px-6 mx-auto">
            {isLoading && (
              <>
                <p className="py-4">Cargando...</p>
              </>
            )}
          </div>
          <SliderNews />
          <div className="max-w-2xl mx-auto px-6 mt-[62px] lg:mt-0 lg:my-14 lg:mb-0">
            <section className="w-full overflow-hidden relative">
              <News />
            </section>
          </div>
          <Activities />
          <Birthdays />
        </main>
      </div>
    </DesignLayout>
  )
}

Home.auth = true
