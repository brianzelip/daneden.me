import cxs from "cxs/component"
import * as Fathom from "fathom-client"
import { useRouter } from "next/router"
import React, { ReactElement } from "react"
import Atoms from "./designSystem/atoms"
import PlainLink from "./designSystem/PlainLink"
import PlainList from "./designSystem/PlainList"

interface HeaderProps {
  siteTitle: string
}

const StyledHeader = cxs("header")({
  borderBottom: "1px solid",
  display: "grid",
  gridTemplateColumns: `calc(${Atoms.widths.content} - ${Atoms.spacing.medium}) 1fr`,
  gridGap: Atoms.spacing.xsmall,
  flexWrap: "wrap",
  marginBottom: Atoms.spacing.small,
  paddingTop: Atoms.spacing.small,
  [`@media (max-width: ${Atoms.breakpoints.medium})`]: {
    gridTemplateColumns: "1fr",
  },
})

const StyledLi = cxs("li")({
  [`@media (max-width: ${Atoms.breakpoints.medium})`]: {
    display: "inline-block",
    marginRight: "1em",
  },
})

const links = [
  {
    to: "/blog",
    label: "Blog",
  },
  {
    to: "/portfolio",
    label: "Portfolio",
  },
  {
    to: "/books",
    label: "Library",
  },
]

const Header = ({
  siteTitle,
}: HeaderProps): ReactElement<typeof StyledHeader> => {
  const location = useRouter().pathname
  return (
    <StyledHeader>
      <PlainLink href="/">{siteTitle}</PlainLink>

      <nav>
        <PlainList>
          {links.map(({ to, label }) => (
            <StyledLi key={to}>
              <PlainLink
                href={to}
                onClick={() => {
                  Fathom.trackGoal("QSDYWCAL", 0)
                }}
              >
                {label}
                {location.includes(to) ? " ☚" : ""}
              </PlainLink>
            </StyledLi>
          ))}
        </PlainList>
      </nav>
    </StyledHeader>
  )
}

export default Header
