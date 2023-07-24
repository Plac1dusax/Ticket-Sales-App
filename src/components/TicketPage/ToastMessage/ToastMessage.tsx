import React from "react"
import { AiOutlineClose } from "react-icons/ai"
import styles from "../../../styles/ticketPage/toastMessage.module.css"

interface ToastMessageProps {
  setShowToastMessage: Function
}

export default function ToastMessage({
  setShowToastMessage,
}: ToastMessageProps) {
  return (
    <div
      onClick={() => setShowToastMessage(false)}
      className={styles.toast_message_wrapper}
    >
      <AiOutlineClose />
      <p>You can't select more than 5 seats.</p>
    </div>
  )
}
