import React from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { BarChart } from "@mui/x-charts"

function getPercentajes(result) {
  const winFilter = result.filter((r) => r.userCorrect > r.botCorrect)
  const drawFilter = result.filter((r) => r.userCorrect === r.botCorrect)
  const loseFilter = result.filter((r) => r.userCorrect < r.botCorrect)

  return {
    win: (winFilter.length / result.length).toFixed(4) * 100,
    draw: (drawFilter.length / result.length).toFixed(4) * 100,
    lose: (loseFilter.length / result.length).toFixed(4) * 100,
  }
}

const ResumeCards = (props) => {
  const resultGameBot = useSelector(
    (state) => state.stadistic["vsbot"].resultGame
  )

  if (resultGameBot.length === 0) {
    return <Box>No hay información de juegos contra bots</Box>
  }

  const resultEasy = getPercentajes(
    resultGameBot.filter((r) => r.difficulty === 0)
  )
  const resultMedium = getPercentajes(
    resultGameBot.filter((r) => r.difficulty === 1)
  )
  const resultHard = getPercentajes(
    resultGameBot.filter((r) => r.difficulty === 2)
  )

  const seriesData = [
    {
      data: [resultEasy.win, resultEasy.draw, resultEasy.lose],
      label: "Fácil",
    },
    {
      data: [resultMedium.win, resultMedium.draw, resultMedium.lose],
      label: "Intermedio",
    },
    {
      data: [resultHard.win, resultHard.draw, resultHard.lose],
      label: "Difícil",
    },
  ]

  return (
    <Box>
      <BarChart
        series={seriesData}
        height={300}
        xAxis={[
          { data: ["Victorias", "Empates", "Derrotas"], scaleType: "band" },
        ]}
        margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
      />
    </Box>
  )
}

ResumeCards.propTypes = {}

export default ResumeCards
