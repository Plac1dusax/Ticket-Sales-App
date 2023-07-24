import React from "react"
import Link from "next/link"
import CustomButton from "@/components/Common/CustomButton/CustomButton"
import styles from "../../styles/purchaseConfirmed/purchaseConfirmed.module.css"

export default function page() {
  return (
    <div className={styles.purchase_confirmed_wrapper}>
      <h1>Thank you for your purchase!</h1>
      <Link href={"/home"}>
        <CustomButton
          location={"purchaseConfirmed"}
          totalPrice={null}
          value={"Return to home page"}
        />
      </Link>
    </div>
  )
}
