const { format, parseISO } = require("date-fns")
const { v4 } = require("uuid")

const today = new Date()
const nextDay = new Date(today)
nextDay.setDate(today.getDate() + 1)

const nextNextDay = new Date(nextDay)
nextNextDay.setDate(nextDay.getDate() + 1)

const expeditions = [
  {
    id: 1,
    from: "İstanbul",
    to: "Ankara",
    departureTime: formatDateWithTime(today, 9, 0),
    arrivalTime: formatDateWithTime(today, 12, 0),
    price: 100,
    ...generateRandomSeats(),
  },
  {
    id: 2,
    from: "İstanbul",
    to: "Ankara",
    departureTime: formatDateWithTime(today, 17, 0),
    arrivalTime: formatDateWithTime(today, 20, 0),
    price: 100,
    ...generateRandomSeats(),
  },
  {
    id: 3,
    from: "Antalya",
    to: "İzmir",
    departureTime: formatDateWithTime(today, 13, 30),
    arrivalTime: formatDateWithTime(today, 17, 0),
    price: 80,
    ...generateRandomSeats(),
  },
  {
    id: 4,
    from: "Antalya",
    to: "İzmir",
    departureTime: formatDateWithTime(today, 17, 30),
    arrivalTime: formatDateWithTime(today, 21, 0),
    price: 80,
    ...generateRandomSeats(),
  },
  {
    id: 5,
    from: "İstanbul",
    to: "Ankara",
    departureTime: formatDateWithTime(nextDay, 9, 0),
    arrivalTime: formatDateWithTime(nextDay, 12, 0),
    price: 120,
    ...generateRandomSeats(),
  },
  {
    id: 6,
    from: "İstanbul",
    to: "Ankara",
    departureTime: formatDateWithTime(nextDay, 17, 0),
    arrivalTime: formatDateWithTime(nextDay, 20, 0),
    price: 120,
    ...generateRandomSeats(),
  },
  {
    id: 7,
    from: "Antalya",
    to: "İzmir",
    departureTime: formatDateWithTime(nextDay, 13, 30),
    arrivalTime: formatDateWithTime(nextDay, 17, 0),
    price: 90,
    ...generateRandomSeats(),
  },
  {
    id: 8,
    from: "Antalya",
    to: "İzmir",
    departureTime: formatDateWithTime(nextDay, 17, 30),
    arrivalTime: formatDateWithTime(nextDay, 21, 0),
    price: 90,
    ...generateRandomSeats(),
  },
  {
    id: 9,
    from: "İstanbul",
    to: "Ankara",
    departureTime: formatDateWithTime(nextNextDay, 9, 0),
    arrivalTime: formatDateWithTime(nextNextDay, 12, 0),
    price: 120,
    ...generateRandomSeats(),
  },
  {
    id: 10,
    from: "İstanbul",
    to: "Ankara",
    departureTime: formatDateWithTime(nextNextDay, 17, 0),
    arrivalTime: formatDateWithTime(nextNextDay, 20, 0),
    price: 120,
    ...generateRandomSeats(),
  },
  {
    id: 11,
    from: "Antalya",
    to: "İzmir",
    departureTime: formatDateWithTime(nextNextDay, 13, 30),
    arrivalTime: formatDateWithTime(nextNextDay, 17, 0),
    price: 90,
    ...generateRandomSeats(),
  },
  {
    id: 12,
    from: "Antalya",
    to: "İzmir",
    departureTime: formatDateWithTime(nextNextDay, 17, 30),
    arrivalTime: formatDateWithTime(nextNextDay, 21, 0),
    price: 90,
    ...generateRandomSeats(),
  },
]

export default function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case "GET":
      const selectedTicketId = req.query.id

      if (selectedTicketId) {
        const selectedTicket = expeditions.filter((ticket) => {
          return parseInt(ticket.id) === parseInt(selectedTicketId)
        })

        res.status(200).json(selectedTicket)
      } else {
        res.status(200).json(expeditions)
      }

      break
    case "POST":
      const { departure, destination, dateInputValue } = body
      const parseDateInput = parseISO(dateInputValue)
      const userDateInput = format(parseDateInput, "dd/MM/yyyy")

      const validSchedules = expeditions.filter((y) => {
        const parseScheduleDepartureTime = parseISO(y.departureTime)
        const departureTime = format(parseScheduleDepartureTime, "dd/MM/yyyy")

        return (
          departure === y.from &&
          destination === y.to &&
          userDateInput === departureTime
        )
      })

      res.status(200).json(validSchedules)
      break
  }
}

function generateRandomSeats() {
  const seats = []
  const totalSeats = 40
  let emptySeatCount = 0

  for (let seatNumber = 1; seatNumber <= totalSeats; seatNumber++) {
    const isTaken = Math.random() < 0.5
    const gender = isTaken ? (Math.random() < 0.5 ? "male" : "female") : null

    if (!isTaken) {
      emptySeatCount++
    }

    seats.push({ seatNumber, isTaken, gender })
  }

  return { seats, emptySeatCount }
}

function formatDateWithTime(date, hours, minutes) {
  const formattedDate = new Date(date)
  formattedDate.setHours(hours)
  formattedDate.setMinutes(minutes)
  return formattedDate.toISOString()
}
