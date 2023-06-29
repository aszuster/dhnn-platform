import { useState, useEffect } from "react"
import MemberId from "../../components/cards/cardMember"
import Hero from "components/heros/Hero"
import DesignLayout from "components/layouts/DesignLayout"
import { useFilteredTeam } from "hooks/useTeam"
import DropdownFilter from "components/form/DropdownFilter"
import Pill from "components/pills/Pill"
import SkeletonEquipo from "components/skeletons/equipo/SkeletonEquipo"

const Users = () => {
  const [area, setArea] = useState("Todos")
  const { data, isLoading } = useFilteredTeam(area)

  return (
    <DesignLayout>
      <Hero title="El drim tim" small="Equipo @ DHNN™" />
      <div className="w-full mb-16">
        <div className="flex flex-col items-center justify-center mb-10 lg:hidden relative filter-select">
          <p className="font-secondary">Filter by</p>
          <DropdownFilter
            options={[
              { label: "Position", setValue: () => setArea("Todos") },
              {
                label: "Diseño",
                setValue: () => setArea("diseño"),
              },
              {
                label: "Desarrollo",
                setValue: () => setArea("dev"),
              },
              {
                label: "Project Management",
                setValue: () => setArea("pm"),
              },
              {
                label: "people",
                setValue: () => setArea("People"),
              },
              {
                label: "managment",
                setValue: () => setArea("Management team"),
              },
              {
                label: "finanzas",
                setValue: () => setArea("Finanzas"),
              },
              {
                label: "it",
                setValue: () => setArea("I.T"),
              },
            ]}
            label="Area"
            value={area}
          />
        </div>
        <div className="max-w-2xl px-6 mx-auto mb-14 hidden lg:block">
          <Pill
            area="Todos"
            label="Todos"
            selectedArea={area}
            setSelectedArea={setArea}
          />
          <Pill
            area="diseño"
            label="Diseño"
            selectedArea={area}
            setSelectedArea={setArea}
          />
          <Pill
            area="dev"
            label="Desarrollo"
            selectedArea={area}
            setSelectedArea={setArea}
          />
          <Pill
            area="people"
            label="People"
            selectedArea={area}
            setSelectedArea={setArea}
          />
          <Pill
            area="pm"
            label="Project Managers"
            selectedArea={area}
            setSelectedArea={setArea}
          />
          <Pill
            area="managment"
            label="Management team"
            selectedArea={area}
            setSelectedArea={setArea}
          />
          <Pill
            area="finanzas"
            label="Finanzas"
            selectedArea={area}
            setSelectedArea={setArea}
          />
          <Pill
            area="it"
            label="IT"
            selectedArea={area}
            setSelectedArea={setArea}
          />
        </div>

        {!isLoading ? (
          <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-12 max-w-2xl px-6 mx-auto">
            <>
              {data?.map((user) => {
                return <MemberId key={user._id} user={user} />
              })}
            </>
          </div>
        ) : (
          <SkeletonEquipo />
        )}
      </div>
    </DesignLayout>
  )
}

Users.auth = true

export default Users
