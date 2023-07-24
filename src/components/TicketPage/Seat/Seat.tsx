import React, { useState, useEffect, useContext } from "react"
import { MdEventSeat } from "react-icons/md"
import { TotalSeatContext } from "@/totalSeatContext/totalSeatContext"
import { AccountContext } from "@/accountContext/accountContext"
import styles from "../../../styles/ticketPage/seat.module.css"

interface SeatProps {
  isTaken: boolean
  gender: string
  selectedSeats: number
  setSelectedSeats: Function
  seatNumber: number
  occupiedSeatIndexes: number[]
  isValid: boolean
  setShowToastMessage: Function
}

export default function Seat({
  isTaken: isTaken,
  gender: gender,
  selectedSeats: selectedSeats,
  setSelectedSeats: setSelectedSeats,
  seatNumber: seatNumber,
  occupiedSeatIndexes: occupiedSeatIndexes,
  isValid: isValid,
  setShowToastMessage: setShowToastMessage,
}: SeatProps) {
  const [selected, isSelected] = useState<boolean>(false)

  const { totalSeat, setTotalSeat } = useContext(TotalSeatContext)
  const { account } = useContext(AccountContext)

  useEffect(() => {
    setSelectedSeats(0)
    setTotalSeat(0)
  }, [])

  function handleSeatClick(e: any) {
    if (isTaken) return
    if (!isValid) return

    if (selected) {
      isSelected(false)
      setSelectedSeats((prevCount: number) => (prevCount = prevCount - 1))
    } else if (!selected) {
      if (totalSeat <= 4) {
        isSelected(true)
        setSelectedSeats((prevCount: number) => (prevCount = prevCount + 1))
      } else {
        setShowToastMessage(true)
      }
    }
  }

  useEffect(() => {
    setTotalSeat(selectedSeats)
  }, [selectedSeats])

  return (
    <div
      onClick={handleSeatClick}
      className={`
         ${styles.seat}
         ${selected ? styles.seat_selected : null}
         ${isValid ? styles.valid_seat : styles.invalid_seat}
         ${
           isTaken
             ? gender === "male"
               ? `${styles.seat_full} ${styles.male}`
               : `${styles.seat_full} ${styles.female}`
             : styles.empty_seat
         }`}
    >
      <MdEventSeat />
    </div>
  )
}
