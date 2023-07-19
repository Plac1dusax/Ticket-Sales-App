import React from "react"
import styles from "../../../styles/common/formInput.module.css"

interface FormInputProps {
  type: string
  attribute: string
  value: string
  placeholder: string
}

export default function FormInput({
  type: type,
  attribute: attribute,
  value: value,
  placeholder: placeholder,
}: FormInputProps) {
  return (
    <div className={styles.form_input_container}>
      <label htmlFor={attribute}>{value}</label>
      <input
        type={type}
        id={attribute}
        name={attribute}
        placeholder={placeholder}
      />
    </div>
  )
}
