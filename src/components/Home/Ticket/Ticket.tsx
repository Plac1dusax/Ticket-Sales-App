import React from "react"
import { TicketType } from "@/app/home/page"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import styles from "../../../styles/home/ticket.module.css"

interface TicketProps {
  ticketDetails: TicketType
}

const Ticket: React.FC<TicketProps> = ({ ticketDetails }) => {
  const departureDate = parseISO(ticketDetails.departureTime)
  const arrivalDate = parseISO(ticketDetails.arrivalTime)
  const departureDateFormatted = format(departureDate, "dd.MM.yyyy HH:mm")
  const arrivalDateFormatted = format(arrivalDate, "dd.MM.yyyy HH:mm")

  return (
    <div className={styles.ticket_wrapper}>
      <Link href={`/ticket?id=${ticketDetails.id}`}>
        <div className={styles.ticket_information_wrapper}>
          <div className={styles.ticket_information_header}>Departure</div>
          <div className={styles.ticket_information}>
            {departureDateFormatted}
          </div>
        </div>
        <div className={styles.ticket_information_wrapper}>
          <div className={styles.ticket_information_header}>Arrival</div>
          <div className={styles.ticket_information}>
            {arrivalDateFormatted}
          </div>
        </div>
        <div className={styles.ticket_information_wrapper}>
          <div className={styles.ticket_information_header}>From</div>
          <div className={styles.ticket_information}>{ticketDetails.from}</div>
        </div>
        <div className={styles.ticket_information_wrapper}>
          <div className={styles.ticket_information_header}>To</div>
          <div className={styles.ticket_information}>{ticketDetails.to}</div>
        </div>
        <div className={styles.ticket_information_wrapper}>
          <div className={styles.ticket_information_header}>Price</div>
          <div className={styles.ticket_information}>{ticketDetails.price}</div>
        </div>
        <div className={styles.ticket_information_wrapper}>
          <div className={styles.ticket_information_header}>Empty seats</div>
          <div className={styles.ticket_information}>
            {ticketDetails.emptySeatCount}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Ticket
