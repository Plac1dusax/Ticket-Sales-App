"use client"

import React from "react"
import styles from "../../../styles/common/customButton.module.css"

interface CustomButtonProps {
  location: string
  type: "button" | "submit"
  value: string
  totalPrice: number | null
}

export default function CustomButton({
  location: location,
  type: type,
  value: value,
  totalPrice: totalPrice,
}: CustomButtonProps) {
  return (
    <button
      className={`
        ${
          totalPrice === 0
            ? styles.custom_button_disabled
            : location === "ticket" || "purchaseConfirmed"
            ? `${styles.custom_button} ${styles.custom_button_green}`
            : styles.custom_button
        }

        `}
      type={type}
    >
      {value}
    </button>
  )
}
