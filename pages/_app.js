import { useRouter } from "next/router"
import Head from "next/head"
import { SessionProvider, useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"
import { ProjectProvider } from "components/context/ProjectsContext"
import "styles/globals.css"

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
      />
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
      <ProjectProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            {Component.auth ? (
              <Auth auth={Component.auth}>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
            <Toaster position="top-right" reverseOrder={false} />
          </SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ProjectProvider>
    </>
  )
}

function Auth({ auth, children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  // console.log(session)
  if (status === "loading") {
    return <div className="p-4">Espere...</div>
  }

  if (status === "authenticated") {
    if (auth !== true) {
      if (session?.user?.role.toLowerCase() === auth.toLowerCase()) {
        return children
      }
      router.push("/")
      return null
    }
    return children
  }
}
