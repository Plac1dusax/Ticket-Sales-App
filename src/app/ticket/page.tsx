"use client"

import React, { useState, useContext, useEffect } from "react"
import { parseISO, format } from "date-fns"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import Seat from "@/components/TicketPage/Seat/Seat"
import Header from "@/components/Common/Header/Header"
import { TotalSeatContext } from "@/totalSeatContext/totalSeatContext"
import { AccountContext } from "@/accountContext/accountContext"
import CustomButton from "@/components/Common/CustomButton/CustomButton"
import { useRouter } from "next/navigation"
import ToastMessage from "@/components/TicketPage/ToastMessage/ToastMessage"
import styles from "../../styles/ticketPage/ticketPage.module.css"

interface Seat {
  isTaken: boolean
  gender: string
  seatNumber: number
  isValid: boolean
}

export default function Page() {
  const [ticket, setTicket] = useState<any>()
  const [totalPrice, setTotalPrice] = useState(0)
  const [departureTime, setDepartureTime] = useState<string>("")
  const [arrivalTime, setArrivalTime] = useState<string>("")
  const [occupiedSeatIndexes, setOccupiedSeatIndexes] = useState<number[]>([])
  const [price, setPrice] = useState<number>(0)
  const [selectedSeats, setSelectedSeats] = useState<number>(0)
  const [seats, setSeats] = useState<Seat[]>()
  const [showToastMessage, setShowToastMessage] = useState<boolean>(false)
  const params = useSearchParams()
  const ticketId = params?.get("id")

  const router = useRouter()

  const { totalSeat } = useContext(TotalSeatContext)
  const { account } = useContext(AccountContext)

  useEffect(() => {
    axios
      .get(` http://localhost:3000/api/expeditions?id=${ticketId}`)
      .then((response) => {
        setTicket(response.data)
      })
  }, [])

  useEffect(() => {
    totalSeat ? setTotalPrice(totalSeat * ticket?.[0]?.price) : setTotalPrice(0)
  }, [totalSeat])

  useEffect(() => {
    if (ticket) {
      const departureTime = ticket[0].departureTime
      const arrivalTime = ticket[0].arrivalTime
      const parsedDepartureTime = parseISO(departureTime)
      const parsedArrivalTime = parseISO(arrivalTime)
      const formattedDepartureTime = format(parsedDepartureTime, "HH:mm")
      const formattedArrivalTime = format(parsedArrivalTime, "HH:mm")

      setDepartureTime(formattedDepartureTime)
      setArrivalTime(formattedArrivalTime)
      setPrice(ticket[0].price)
    }
  }, [ticket])

  useEffect(() => {
    if (ticket && ticket[0]?.seats && account) {
      const accountGender = account[0]?.newGender
      const updatedSeats = ticket[0].seats.map((seat: any, index: number) => {
        if (!seat.isTaken) {
          const nextSeat = ticket[0].seats[index + 1]
          const prevSeat = ticket[0].seats[index - 1]

          if (seat.seatNumber % 2 === 0) {
            if (
              prevSeat &&
              prevSeat.isTaken &&
              prevSeat.gender !== accountGender
            ) {
              return { ...seat, isValid: false }
            } else {
              return { ...seat, isValid: true }
            }
          } else {
            if (
              nextSeat &&
              nextSeat.isTaken &&
              nextSeat.gender !== accountGender
            ) {
              return { ...seat, isValid: false }
            } else {
              return { ...seat, isValid: true }
            }
          }
        } else {
          return { ...seat, isValid: false }
        }
      })

      setSeats(updatedSeats)
    }
  }, [ticket, account])

  useEffect(() => {
    const occupiedSeats = ticket?.[0]?.seats?.filter(
      (seat: any) => seat.isTaken
    )
    const occupiedSeatIndexes = occupiedSeats?.map(
      (seat: any, index: number) => {
        return seat.seatNumber
      }
    )

    setOccupiedSeatIndexes(occupiedSeatIndexes)
  }, [ticket])

  function handlePurchase() {
    if (totalPrice === 0) return

    router.push("/purchase")
  }

  return (
    <div className={styles.ticket_page_wrapper}>
      <Header />
      <div className={styles.ticket}>
        <div className={styles.bus_container}>
          <div className={styles.seats_grid_container}>
            <div className={styles.seats_grid}>
              {seats &&
                seats
                  .slice(0, 10)
                  .map((seat: any) => (
                    <Seat
                      key={seat.seatNumber}
                      isTaken={seat.isTaken}
                      gender={seat.gender}
                      seatNumber={seat.seatNumber}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                      occupiedSeatIndexes={occupiedSeatIndexes}
                      isValid={seat.isValid}
                      setShowToastMessage={setShowToastMessage}
                    />
                  ))}
            </div>
            <div className={styles.seats_grid}>
              {seats &&
                seats.slice(10, 20).map((seat: any) => {
                  return (
                    <Seat
                      key={seat.seatNumber}
                      isTaken={seat.isTaken}
                      gender={seat.gender}
                      seatNumber={seat.seatNumber}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                      occupiedSeatIndexes={occupiedSeatIndexes}
                      isValid={seat.isValid}
                      setShowToastMessage={setShowToastMessage}
                    />
                  )
                })}
            </div>
            <div className={styles.seats_grid}>
              {seats &&
                seats
                  .slice(20, 30)
                  .map((seat: any) => (
                    <Seat
                      key={seat.seatNumber}
                      isTaken={seat.isTaken}
                      gender={seat.gender}
                      seatNumber={seat.seatNumber}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                      occupiedSeatIndexes={occupiedSeatIndexes}
                      isValid={seat.isValid}
                      setShowToastMessage={setShowToastMessage}
                    />
                  ))}
            </div>
            <div className={styles.seats_grid}>
              {seats &&
                seats.slice(30).map((seat: any) => {
                  return (
                    <Seat
                      key={seat.seatNumber}
                      isTaken={seat.isTaken}
                      gender={seat.gender}
                      seatNumber={seat.seatNumber}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                      occupiedSeatIndexes={occupiedSeatIndexes}
                      isValid={seat.isValid}
                      setShowToastMessage={setShowToastMessage}
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <div className={styles.ticket_information_container}>
          <h2>Ticket information</h2>
          <div className={styles.location_information}>
            <div className={styles.location_data}>
              <div className={styles.data_header}>From:</div>
              <div className={styles.data}>{ticket?.[0]?.from}</div>
            </div>
            <div className={styles.location_data}>
              <div className={styles.data_header}>To:</div>
              <div className={styles.data}>{ticket?.[0]?.to}</div>
            </div>
          </div>
          <div className={styles.time_information}>
            <div className={styles.time_data}>
              <div className={styles.data_header}>Departure time:</div>
              <div className={styles.data}>{departureTime}</div>
            </div>
            <div className={styles.time_data}>
              <div className={styles.data_header}>Arrival time:</div>
              <div className={styles.data}>{arrivalTime}</div>
            </div>
          </div>
          <div className={styles.price_information}>
            <div className={styles.data_header}>Price:</div>
            <div className={styles.data}>{`${price}$`}</div>
          </div>
        </div>
      </div>
      <div className={styles.overall_information}>
        <div className={styles.price_information}>
          <div className={styles.data_header}>Total price:</div>
          <div className={styles.data}>{`${totalPrice}$`}</div>
        </div>
        <div onClick={handlePurchase}>
          <CustomButton
            location={"ticket"}
            type={"button"}
            value={"Purchase"}
            totalPrice={totalPrice}
          />
        </div>
      </div>
      {showToastMessage ? (
        <ToastMessage setShowToastMessage={setShowToastMessage} />
      ) : null}
    </div>
  )
}
