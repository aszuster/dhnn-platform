import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { allUsers } from "services/Users"
import Hero from "components/heros/Hero"
import DesignLayout from "components/layouts/DesignLayout"
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion"

const Recursos = () => {
  const query = useQuery(["users"], allUsers)
  const { data, isLoading, isError } = query

  return (
    <DesignLayout>
      <Hero title="Recursos" small="People @ DHNN™" />
      <div className="w-full mb-16">
        <div className="xl:max-w-[1195px] px-6 mx-auto mb-14">
          <Accordion className="accord">
            <AccordionItem>
              <AccordionHeader>
                <h3
                  className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
                >
                  <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                    01
                  </small>
                  Herramientas de diseño
                </h3>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body mb-16">
                  <h3 className="leading-9 mb-4">Figma</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      En DHNN trabajamos con Figma, podés descargarlo desde{" "}
                      <a
                        href="https://www.figma.com/downloads/"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        acá
                      </a>{" "}
                      e ingresar con tu usuario de gmail.
                    </li>
                    <li>
                      Todos los diseñadores y devs tendrán acceso de edición a
                      los tableros de los proyectos a los que pertenezcan.
                    </li>
                    <li>Los PMs sólo tendrán acceso de vista y comentarios.</li>
                  </ul>

                  <h3 className="leading-9 mb-4">Paquete adobe</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      En el caso de los diseñadores visual podrán pedir la
                      instalación del paquete Adobe a Leo Ferrara (nuestro
                      experto en IT) por slack o por mail a{" "}
                      <a
                        href="mailto:leandro.ferrara@dhnn.com"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        leandro.ferrara@dhnn.com
                      </a>
                    </li>
                  </ul>

                  <h3 className="leading-9 mb-4">Banco de imágenes</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      En DHNN usamos el banco de imágenes de{" "}
                      <a
                        href="https://www.envato.com/"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        Envato.
                      </a>{" "}
                      Para acceder deberás instalar onepassword (indicaciones
                      más abajo)
                    </li>
                  </ul>
                </div>
              </AccordionBody>
            </AccordionItem>

            <AccordionItem>
              <AccordionHeader>
                <h3
                  className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
                >
                  <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                    02
                  </small>
                  Herramientas de project management y organización
                </h3>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body mb-16">
                  <h3 className="leading-9 mb-4">Clickup</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      Usamos la plataforma Clickup como herramienta de
                      seguimiento de proyectos. Podés descargarla desde{" "}
                      <a
                        href="https://app.clickup.com"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        acá
                      </a>{" "}
                      e ingresar con tu usuario de gmail de DHNN.
                    </li>
                    <li>
                      Acá te dejamos un{" "}
                      <a
                        href="https://www.figma.com/file/0KBq5aDdVRuIydxSYQUYyd/ClickUp-Onboarding?node-id=2%3A4&t=rh8jNWaHbhyvMyWe-0"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        Onboarding
                      </a>{" "}
                      para que aprendas fácil y rápido cómo usar la herramienta.
                    </li>
                  </ul>
                  <h3 className="leading-9 mb-4">Loom</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      Usamos Loom para grabar videos y presentaciones para
                      entregas a clientes si no las hacemos en una llamada o
                      para grabar feedbacks o explicaciones internas si no
                      podemos coincidir para hablar. La encontramos muy útil
                      para facilitar el trabajo remoto.{" "}
                    </li>
                    <li>
                      Podés acceder desde{" "}
                      <a
                        href="https://www.loom.com/home"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        acá
                      </a>{" "}
                      e ingresar con tu cuenta de gmail personal de DHNN (donde
                      tendrás limitación de 5 minutos para tus videos) o desde
                      la cuenta general de{" "}
                      <a
                        href="mailto:design@dhnn.com"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        design@dhnn.com
                      </a>
                      . Para acceder a esta cuenta deberás instalar onepassword
                      (indicaciones más abajo).
                    </li>
                  </ul>
                  <h3 className="leading-9 mb-4">Notion</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      También tenemos cuenta en Notion para algunas actividades
                      específicas. No lo solemos usar en la diaria, pero si lo
                      necesitás usar por algún motivo podés acceder desde{" "}
                      <a
                        href="https://app.clickup.com/"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        acá
                      </a>{" "}
                      e ingresar con la cuenta de gmail de DHNN.
                    </li>
                  </ul>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader>
                <h3
                  className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
                >
                  <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                    03
                  </small>
                  Herramientas de comunicación y organización diaria
                </h3>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body mb-16">
                  <h3 className="leading-9 mb-4">Slack</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      Para todas las comunicaciones diarias usamos Slack, podés
                      descargarlo{" "}
                      <a
                        href="https://slack.com"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        acá
                      </a>{" "}
                      y también acceder con tu usuario de gmail.
                    </li>
                    <li>
                      ¡Tenemos un theme propio para slack con nuestros colores!
                      Para configurarlo solo copiá y pegá esto en un chat (puede
                      ser el tuyo propio) y automáticamente te aparecerá un
                      botón para reemplazar el tema que ya tengas.
                      <blockquote className="my-2">
                        #C4C4C4,#F8F8FA,#FFDD00,#424141,#9C9C9C,#181B1F,#FFFFFF,#000000,#ABABAB,#22272B
                      </blockquote>
                    </li>
                    <li>
                      Notificaciones: Para las notificaciones sugerimos tenerlas
                      configuradas para que te suenen cuando te escriben
                      directamente o te etiquetan, así no se pierde ningún
                      mensaje. Cuando entramos en reunión sugerimos silenciarlas
                      para no tener ruidos molestos.
                    </li>
                  </ul>
                  <h3 className="leading-9 mb-4">Google Calendar</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      En DHNN trabajamos con las herramientas de Google
                      Workspace. Todas nuestras reuniones se hacen por Google
                      Meet y están agendadas en el Calendar de Google.{" "}
                    </li>
                    <li>
                      Algunas categorías y consejos para tener en cuenta:
                      <ul className="list-decimal pl-[40px] mt-6 mb-6">
                        <li>
                          Cuando tengas un compromiso en horario laboral como un
                          turno médico o ir al banco te pedimos por favor que lo
                          agendes en el calendario dentro de la categoría
                          Médico/trámite que vas a encontrar dentro de las
                          opciones al crear un evento nuevo.
                        </li>
                        <li>
                          Cuando te tomes tus días chill, el día de cumple o tus
                          vacaciones, agendalo en el Calendar como días OOO (Out
                          of Office) así ya todo el equipo sabe que en esas
                          fechas no vas a estar y nos podemos organizar mejor
                          para no molestarte.
                        </li>
                        <li>
                          Ante cualquier duda de cómo configurar esto podés
                          preguntar a tu PM para que te ayude.
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <h3 className="leading-9 mb-4">Google Drive</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      Al acceder a tu Google Drive vas a encontrar una carpeta
                      de Shared Drives y, dentro de esta, una con los proyectos{" "}
                      <a
                        href="https://drive.google.com/drive/u/0/folders/0ANg0TVFOFLcRUk9PVA"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        On Going
                      </a>
                      . Cualquier archivo que se cree deberá guardarse dentro de
                      este file en una nueva carpeta con el nombre del cliente
                      sin modificar los permisos de edición (antes de crear una
                      fijate si ya no está creada). Si por alguna razón
                      necesitás modificar los permisos de edición hablalo con tu
                      PM.
                    </li>
                  </ul>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader>
                <h3
                  className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
                >
                  <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                    04
                  </small>
                  Contraseñas
                </h3>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body mb-16">
                  <h3 className="leading-9 mb-4">Onepassword</h3>
                  <ul className="list-disc pl-[40px] mb-6">
                    <li>
                      Todas las contraseñas de acceso a las plataformas a las
                      que no podés acceder con gmail las manejamos con
                      onepassword.
                    </li>
                    <li>
                      Para tener acceso necesitás descargarte la app desde{" "}
                      <a
                        href="https://1password.com/downloads/mac/ "
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        acá
                      </a>{" "}
                      y pedirle el usuario y contraseña únicos a Leo por slack o
                      por mail a{" "}
                      <a
                        href="mailto:leandro.ferrara@dhnn.com"
                        className="text-[16px] underline font-bold"
                        target="blank"
                      >
                        leandro.ferrara@dhnn.com
                      </a>
                    </li>
                  </ul>
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </DesignLayout>
  )
}

Recursos.auth = true

export default Recursos
