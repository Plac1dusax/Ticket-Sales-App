"use client"

import React, { useState, useEffect, useContext } from "react"
import Header from "@/components/Common/Header/Header"
import SelectBox from "@/components/Home/SelectBox/SelectBox"
import DatePicker from "@/components/Common/DatePicker/DatePicker"
import axios from "axios"
import { format, parse } from "date-fns"
import { ExpeditionsContext } from "@/expeditionContext/expeditionContext"
import { FaCalendarAlt } from "react-icons/fa"
import Ticket from "@/components/Home/Ticket/Ticket"
import styles from "../../styles/home/home.module.css"
import CustomButton from "@/components/Common/CustomButton/CustomButton"

export interface TicketType {
  id: string
  arrivalTime: string
  departureTime: string
  from: string
  to: string
  price: number
  seats: Seat[]
  emptySeatCount: number
}

interface Seat {
  setNumber: number
  isTaken: boolean
  gender: string
}

export default function Home() {
  const { data } = useContext(ExpeditionsContext)
  const [from, setFrom] = useState<any>(new Set())
  const [to, setTo] = useState<any>(new Set())
  const [departure, setDeparture] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [dateInputValue, setDateInputValue] = useState<Date>()
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [tickets, setTickets] = useState<TicketType[]>()
  const [emptyDeparture, setEmptyDeparture] = useState<boolean>(true)
  const [emptyDestination, setEmptyDestination] = useState<boolean>(true)
  const [emptyDate, setEmptyDate] = useState<boolean>(true)
  const [errors, setErrors] = useState<boolean>(false)
  const [showEmptyTicket, setShowEmptyTicket] = useState<boolean>(false)

  function handleShowDatePicker() {
    setShowDatePicker(!showDatePicker)
  }

  useEffect(() => {
    if (data) {
      const uniqueFromValues = new Set(data.data.map((info: any) => info.from))
      const uniqueToValues = new Set(data.data.map((info: any) => info.to))

      setTo(uniqueFromValues)
      setFrom(uniqueToValues)
    }
  }, [data])

  function handleTicketSearch() {
    if (emptyDeparture || emptyDestination || emptyDate) {
      setErrors(true)
    } else {
      try {
        axios
          .post("http://localhost:3000/api/expeditions", {
            departure,
            destination,
            dateInputValue,
          })
          .then((response) => {
            if (response.data.length === 0) {
              setShowEmptyTicket(true)
            } else {
              setShowEmptyTicket(false)
            }
            setTickets(response.data)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className={styles.home_page_wrapper}>
      <Header />
      <div>
        <div className={styles.ticket_search_container}>
          <h2 className={styles.header}>Choose destination</h2>
          <div className={styles.ticket_information}>
            <div className={styles.information}>
              <h3 className={styles.information_header}>Departure</h3>
              <SelectBox
                location={"departure"}
                departure={departure}
                setDeparture={setDeparture}
                destination={destination}
                setDestination={setDestination}
                setEmptyDeparture={setEmptyDeparture}
                setEmptyDestination={setEmptyDestination}
                emptyDeparture={emptyDeparture}
                emptyDestination={emptyDestination}
                errors={errors}
                from={from}
                to={to}
              />
            </div>
            <div className={styles.information}>
              <h3 className={styles.information_header}>Destination</h3>
              <SelectBox
                location={"destination"}
                departure={departure}
                setDeparture={setDeparture}
                destination={destination}
                setDestination={setDestination}
                setEmptyDeparture={setEmptyDeparture}
                setEmptyDestination={setEmptyDestination}
                emptyDeparture={emptyDeparture}
                emptyDestination={emptyDestination}
                errors={errors}
                from={from}
                to={to}
              />
            </div>
            <div className={styles.information}>
              <h3 className={styles.information_header}>Dates</h3>
              <div>
                <div
                  className={styles.date_input_wrapper}
                  onClick={handleShowDatePicker}
                >
                  <input
                    type="text"
                    value={
                      dateInputValue ? format(dateInputValue, "dd/MM/yyyy") : ""
                    }
                    className={
                      errors
                        ? emptyDate
                          ? styles.date_input_danger
                          : styles.date_input
                        : styles.date_input
                    }
                    readOnly
                  />
                  <FaCalendarAlt className={styles.calendar_icon} />
                </div>
                {showDatePicker ? (
                  <DatePicker
                    location={"home"}
                    setDateInputValue={setDateInputValue}
                    setEmptyDate={setEmptyDate}
                    setShowDatePicker={setShowDatePicker}
                  />
                ) : null}
              </div>
            </div>
            <div onClick={handleTicketSearch}>
              <CustomButton
                location={"home"}
                type={"button"}
                value={"Search"}
              />
            </div>
          </div>
        </div>
        {errors ? (
          <div className={styles.errors}>
            {emptyDeparture ? <div>Empty departure input</div> : null}
            {emptyDestination ? <div>Empty destination input</div> : null}
            {emptyDate ? <div>Empty date input</div> : null}
          </div>
        ) : null}
        {}
        <div className={styles.tickets}>
          <h2 className={styles.header}>Tickets</h2>
          <div className={styles.tickets_wrapper}>
            {tickets
              ? tickets.map((ticket) => {
                  const ticketDetails: TicketType = {
                    id: ticket.id,
                    to: ticket.to,
                    from: ticket.from,
                    departureTime: ticket.departureTime,
                    arrivalTime: ticket.arrivalTime,
                    seats: ticket.seats,
                    price: ticket.price,
                    emptySeatCount: ticket.emptySeatCount,
                  }

                  return (
                    <Ticket
                      key={ticketDetails.id}
                      ticketDetails={ticketDetails}
                    />
                  )
                })
              : null}
          </div>
        </div>
      </div>
      {showEmptyTicket ? (
        <div className={styles.no_valid_tickets}>
          No tickets were found on the date you selected
        </div>
      ) : null}
    </div>
  )
}
