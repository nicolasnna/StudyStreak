import Header from "@components/Header"
import { Box } from "@mui/material"
import React from "react"
import CardLink from "./components/CardLink"
import { CardLinkContent } from "@utils/constants"

const Home = (props) => {
  return (
    <Box>
      <Header Title="Study Streak" SubTitle="Mejora tus sesiones de estudio" />
      <Box className="home__card-links">
        {CardLinkContent.map((c) => (
          <CardLink
            key={c.key}
            title={c.title}
            urlLink={c.urlLink}
            contentText={c.contentText}
          />
        ))}
      </Box>
    </Box>
  )
}

Home.propTypes = {}

export default Home
