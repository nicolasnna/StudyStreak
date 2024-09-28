export const FontSize = Object.freeze({
  TITLE: "3em",
  SUBTITLE: "2.3em",
  BIG: "1.7em",
  HIGH: "1.3em",
  NORMAL: "1em",
  SMALL: "0.8em",
})

export const PaddingSize = Object.freeze({
  NORMAL: "1em",
  SMALL: "0.7em",
})

export const CardKeys = [
  "id",
  "question",
  "answer",
  "tags",
  "difficulty",
  "created_at",
  "updated_at",
  "comments",
  "revision_frequency",
]

export const ColorChar = Object.freeze({
  easy: "#893cee",
  medium: "#a6aaac75",
  hard: "#551aa2",
})

export const ColorOption = Object.freeze({
  DEFAULT: "#d2dee470",
  CORRECT: "rgb(0,220,0,0.5)",
  INCORRECT: "rgb(220,0,0,0.5)",
})

export const BotLevelProb = Object.freeze({
  0: 0.3,
  1: 0.5,
  2: 0.7,
})

export const CardLinkContent = [
  {
    key: "card link 1",
    title: "Maneja tus tarjetas de estudio",
    contentText: "Crea, modifíca y elimina tus tarjetas de estudio.",
    urlLink: "/gestionar-tarjetas",
  },
  {
    key: "card link 2",
    title: "Importa y exporta tarjetas",
    contentText:
      "Importa y exporta tus tarjetas en formato JSON. Guárdalas de forma local.",
    urlLink: "/gestionar-tarjetas",
  },
  {
    key: "card link 3",
    title: "Estudia con distintos modos",
    contentText:
      "Distintos modos de estudio: básico, selección múltiple, selección inverso, contra bot.",
    urlLink: "/modos-de-juego",
  },
]

export const CardLinkGameMode = [
  {
    key: "card link mode basic",
    title: "Modo básico",
    contentText:
      "Realiza una revisión de las tarjetas barajadas, permite revisar el lado frontal y posterior.",
    urlLink: "/modos-de-juego/basico",
  },
  {
    key: "card link mode multiple selection",
    title: "Modo seleccion múltiple",
    contentText:
      "Selecciona la opción correcta acorde a la tarjeta para avanzar a la siguiente.",
    urlLink: "/modos-de-juego/seleccion-multiple",
  },
  {
    key: "card link mode multiple selection inverse",
    title: "Modo seleccion múltiple inveso",
    contentText:
      "Selecciona la opción correcta acorde al reveso de la tarjeta para avanzar a la siguiente.",
    urlLink: "/modos-de-juego/seleccion-multiple-inverso",
  },
  {
    key: "card link mode vs bot",
    title: "Modo competencia contra bot",
    contentText:
      "Enfrentate contra un bot en una competencia de selección múltiple con tres modos de dificultad.",
    urlLink: "/modos-de-juego/competencia-vs-bot",
  },
]
