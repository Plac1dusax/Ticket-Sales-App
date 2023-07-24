"use client"

import React, { useState } from "react"
import styles from "../../../styles/home/selectBox.module.css"

interface SelectBoxProps {
  location: string
  to: Set<string>
  from: Set<string>
  departure: string
  setDeparture: Function
  destination: string
  setDestination: Function
  setEmptyDeparture: Function
  setEmptyDestination: Function
  emptyDeparture: boolean
  emptyDestination: boolean
  errors: boolean
}

export default function SelectBox({
  location: location,
  to: to,
  from: from,
  departure: departure,
  setDeparture: setDeparture,
  destination: destination,
  setDestination: setDestination,
  setEmptyDeparture: setEmptyDeparture,
  setEmptyDestination: setEmptyDestination,
  emptyDeparture: emptyDeparture,
  emptyDestination: emptyDestination,
  errors: errors,
}: SelectBoxProps) {
  const [showSelectBox, setShowSelectBox] = useState(false)

  function handleSelectBoxClick() {
    setShowSelectBox(!showSelectBox)
  }

  function handleDepartureClick(e: any) {
    const target = e.target.textContent

    setEmptyDeparture(false)
    setDeparture(target)
    setShowSelectBox(true)
  }

  function handleDestinationClick(e: any) {
    const target = e.target.textContent

    setEmptyDestination(false)
    setDestination(target)
    setShowSelectBox(true)
  }

  return (
    <div className={styles.select_box_wrapper}>
      <input
        onClick={handleSelectBoxClick}
        className={
          errors
            ? location === "departure"
              ? emptyDeparture
                ? styles.select_box_input_danger
                : styles.select_box_input
              : emptyDestination
              ? styles.select_box_input_danger
              : styles.select_box_input
            : styles.select_box_input
        }
        type="text"
        defaultValue={location === "departure" ? departure : destination}
        readOnly
      />
      <div
        className={
          showSelectBox ? `${styles.select_box_hidden}` : styles.select_box
        }
      >
        {location === "departure"
          ? Array.from(to).map((location, index) => {
              return (
                <div
                  className={styles.select_box_item}
                  onClick={handleDepartureClick}
                  key={index}
                >
                  {location}
                </div>
              )
            })
          : Array.from(from).map((location, index) => {
              return (
                <div
                  className={styles.select_box_item}
                  onClick={handleDestinationClick}
                  key={index}
                >
                  {location}
                </div>
              )
            })}
      </div>
    </div>
  )
}
