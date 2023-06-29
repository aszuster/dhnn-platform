import Hero from "components/heros/Hero"
import DesignLayout from "components/layouts/DesignLayout"
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion"

const People = () => {
  return (
    <DesignLayout>
      <Hero title="Políticas y beneficios" />
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
                  Días chill / Vacaciones
                </h3>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body mb-16">
                  <p className="leading-9">
                    Para pedirte un día chill o las vacaciones, primero hablalo
                    con tu lead de proyecto (que es quien está al tanto de la
                    carga laboral) para que te de la aprobación y luego
                    escribile por mail a Andre del equipo de People para que las
                    puedan registrar.
                  </p>
                  <a
                    href="mailto:people@dhnn.com"
                    target="blank"
                    className="hover:bg-black hover:text-white transition-all border rounded-full my-6 px-12 py-3 inline-block font-bold"
                  >
                    people@dhnn.com
                  </a>
                  <p className="leading-9 font-bold">
                    Una vez que hagas esto, por favor acordate de dejarlo
                    agendado en Google Calendar para que quede a la vista del
                    equipo y sepan que en esas fechas vas a estar disfrutando de
                    tus merecido tiempo de descanso.
                  </p>
                  <br />
                  <p className="leading-9 font-bold">
                    Nuestra política de vacaciones
                  </p>

                  <p>
                    Si querés saber cuál es nuestra política de cursos y
                    capacitaciones hacé{" "}
                    <a href="/docs/dhnn-chill-days.pdf" target="blank">
                      click acá
                    </a>{" "}
                    para descargar el documento
                  </p>
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
                  Cursos
                </h3>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body mb-16">
                  <h3 className="leading-[48px]">Ya elegí mi curso</h3>
                  <p className="leading-9 mb-7">
                    Si ya sabés qué curso tenés ganas de hacer, mandale un mail
                    a People con copia a tu lead contándole el curso que querés
                    hacer y los motivos.
                  </p>
                  <h3 className="leading-[48px]">Necesito orientación</h3>
                  <p className="leading-9 mb-7">
                    Si tenés ganas de aprender algo pero no sabés qué, te
                    aconsejamos que hables con tu lead técnico y con Chinchu,
                    Career lead, para que te orienten sobre cuál sería el mejor
                    paso para tu carrera.
                  </p>
                  <h3 className="leading-[48px]">Nuestra política de Cursos</h3>
                  <p className="leading-9">
                    Si querés saber cuál es nuestra política de cursos y
                    capacitaciones hacé{" "}
                    <a href="/docs/dhnn-cursos.pdf" target="blank">
                      click acá
                    </a>{" "}
                    para descargar el documento.
                  </p>
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
                  Problemas técnicos
                </h3>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body mb-16">
                  <p className="leading-9 mb-7">
                    Si tenés algún problema con la compu o necesitás que te
                    instalen algún programa,&nbsp;
                    <b className="font-bold">
                      contactate por Slack con Leo Ferrara
                    </b>
                    . Importante, Leo sólo está hasta las 14h! Si le escribís
                    después de ese horario podrá responderte al siguiente día
                    hábil.
                  </p>
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </DesignLayout>
  )
}

People.auth = true

export default People
