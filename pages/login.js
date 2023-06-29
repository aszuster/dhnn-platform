import { useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/react"
import LogoDHNN from "components/svg/LogoDHNN"
import SimpleImageCarousel from "components/carousels/SimpleImageCarousel"
import TextButton from "components/buttons/TextButton"

const Login = () => {
  const [state, setState] = useState({
    error: undefined,
    showPass: false,
  })
  const router = useRouter()
  const { status } = useSession()
  const userRef = useRef()
  const passRef = useRef()

  const handleLogin = async () => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: userRef.current.value,
        password: passRef.current.value,
        callbackUrl: `${window.location.origin}`,
      })
      if (res?.error) {
        setState({ ...state, error: res.error })
      }
      if (res?.url) router.push(res.url)
    } catch (error) {
      setState({ ...state, error: error })
    }
  }

  if (status === "authenticated") {
    router.push("/")
  }
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-auto h-screen min-h-[624px] w-screen overflow-y-auto overflow-x-hidden">
        {/* IMAGE */}
        <div className="hidden lg:block h-full w-full bkg-login">
          {/* <Image
            src="/images/login/login.jpg"
            alt="Login DHNN"
            title="Login DHNN"
            objectFit="cover"
            layout="responsive"
            width={2000}
            height={1513}
            className="h-full w-full"
          /> */}
        </div>

        {/* LOGIN */}
        <div className="flex flex-none h-full w-full lg:w-[512px] items-center justify-center bg-blanco1 shadow-2xl z-20">
          <div className="w-full max-w-[350px] px-4">
            <div className="flex justify-center mb-6">
              <LogoDHNN />
            </div>
            <p className="flex justify-center items-center h-8 text-xs text-center text-red-500">
              {state?.error}
            </p>
            {/* <form
              onSubmit={(e) => {
                e.preventDefault()
                handleLogin()
              }}
            >
              <InputText
                placeholder="usuario@dhnn.com"
                label="Email"
                inputRef={userRef}
              />
              <InputText
                type={state.showPass ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                label="Contraseña"
                classes="mt-5"
                inputRef={passRef}
              />
              <div className="flex justify-end h-0">
                <button
                  type="button"
                  onClick={() =>
                    setState({ ...state, showPass: !state.showPass })
                  }
                  className="relative -top-12 right-2 inline-flex items-center justify-center h-6 w-6 text-gris2 hover:text-gris1 hover:bg-gray-100 rounded-full transition"
                >
                  <Icon
                    svg={state.showPass ? "eyeOff" : "eye"}
                    classes="h-4 w-4"
                  />
                </button>
              </div>
              <PrimaryButton
                text="Iniciar sesión"
                classes="my-2"
                type="submit"
              />
            </form> */}
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-2 text-gris1 bg-blanco ring-1 ring-gris2 hover:ring-2 focus:ring-4 rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              <svg
                width="16px"
                height="16px"
                viewBox="-3 0 262 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              Iniciar sesión con Google
            </button>
            <div className="flex justify-center items-center gap-4 mt-8 mb-16">
              <TextButton
                text="Website"
                link="https://dhnn.com"
                color="gris1"
                classes="text-xs"
              />
              <TextButton
                text="Behance"
                link="https://www.behance.net/dhnn"
                color="gris1"
                classes="text-xs"
              />
              <TextButton
                text="Linkedin"
                link="https://www.linkedin.com/company/dhnn-design-has-no-name-/"
                color="gris1"
                classes="text-xs"
              />
              <TextButton
                text="Clutch"
                link="https://clutch.co/profile/dhnn%e2%84%a2"
                color="gris1"
                classes="text-xs"
              />
              <TextButton
                text="Instagram"
                link="https://www.instagram.com/dhnnagency/"
                color="gris1"
                classes="text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
