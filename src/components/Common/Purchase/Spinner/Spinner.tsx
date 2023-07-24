import React from "react"
import styles from "../../../../styles/purchase/spinner.module.css"

export default function Spinner() {
  return (
    <div className={styles.spinner_wrapper}>
      <div className={styles.spinner}>Loading..</div>
    </div>
  )
}
