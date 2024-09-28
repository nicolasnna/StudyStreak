import { Box, Typography } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import { ColorChar } from "@utils/constants"
import React from "react"
import { useSelector } from "react-redux"

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

const ResumeBot = (props) => {
  const resultGameBot = useSelector(
    (state) => state.stadistic["vsbot"].resultGame
  )

  // if (resultGameBot.length === 0) {
  //   return <Box>No hay información de juegos contra bots</Box>
  // }

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
      data: [resultEasy.win || 0, resultEasy.draw || 0, resultEasy.lose || 0],
      label: "Fácil",
      color: ColorChar.easy,
    },
    {
      data: [
        resultMedium.win || 0,
        resultMedium.draw || 0,
        resultMedium.lose || 0,
      ],
      label: "Intermedio",
      color: ColorChar.medium,
    },
    {
      data: [resultHard.win || 0, resultHard.draw || 0, resultHard.lose || 0],
      label: "Difícil",
      color: ColorChar.hard,
    },
  ]

  return (
    <Box className="resume-bot">
      <Box className="resume-bot__title">
        <Typography>
          Resultados de competencia contra bot según dificultad
        </Typography>
      </Box>
      <BarChart
        slotProps={{
          // Custom loading message
          loadingOverlay: {
            message: "Se esta cargando los datos.",
            style: { fill: "#43275f", fontSize: "1.3rem" },
            fontFamily: "Roboto",
          },
          // Custom message for empty chart
          noDataOverlay: {
            message: "No hay datos de competencia contra bot.",
            style: { fill: "#43275f", fontSize: "1.3rem" },
            fontFamily: "Roboto",
          },
        }}
        series={resultGameBot.length === 0 ? [] : seriesData}
        height={300}
        borderRadius={10}
        xAxis={[
          {
            data: ["Victorias", "Empates", "Derrotas"],
            scaleType: "band",
            tickLabelStyle: { fontSize: "1rem" },
          },
        ]}
        yAxis={[
          {
            label: "Resultados (%)",
            labelStyle: { fontSize: "1rem" },
          },
        ]}
        margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
        sx={{
          "& .MuiChartsAxis-tickLabel": {
            fill: "#43275f",
          },
        }}
      />
    </Box>
  )
}

ResumeBot.propTypes = {}

export default ResumeBot
