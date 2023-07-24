import React, { useState, useEffect, useRef } from "react"
import styles from "../../../styles/common/customCheckbox.module.css"

interface CustomCheckboxProps {
  gender: string | null
  newGender: string | null
  setNewGender: Function
}

export default function CustomCheckbox({
  gender: gender,
  newGender: newGender,
  setNewGender: setNewGender,
}: CustomCheckboxProps) {
  const [checked, setChecked] = useState(false)
  const checkboxRef = useRef<HTMLDivElement>(null)

  function handleCheckboxClick(e: any) {
    const container = checkboxRef.current
    if (container) {
      const label = container.querySelector("label")?.textContent?.toLowerCase()

      setNewGender(label)
    }
  }

  useEffect(() => {
    const container = checkboxRef.current

    if (container) {
      const checkbox = container.querySelector("input")
      const label = container.querySelector("label")
      const labelText = label?.textContent?.toLowerCase() || ""

      if (checkbox && label) {
        checkbox.checked = newGender === labelText
      }
    }
  }, [newGender])

  return (
    <div
      onClick={handleCheckboxClick}
      ref={checkboxRef}
      className={styles.checkbox_wrapper}
    >
      <input
        className={styles.custom_checkbox}
        type="checkbox"
        defaultChecked={checked}
      />
      <label className={styles.custom_checkbox_label}>{gender}</label>
    </div>
  )
}
