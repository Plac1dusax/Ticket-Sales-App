"use client"

import React, { useState } from "react"
import CustomForm from "@/components/Common/CustomForm/CustomForm"
import Spinner from "@/components/Common/Purchase/Spinner/Spinner"
import styles from "../../styles/purchase/purchase.module.css"

export default function page() {
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  return (
    <div className={styles.purchase_page_wrapper}>
      <CustomForm location={"purchase"} setShowSpinner={setShowSpinner} />
      {showSpinner ? <Spinner /> : null}
    </div>
  )
}
