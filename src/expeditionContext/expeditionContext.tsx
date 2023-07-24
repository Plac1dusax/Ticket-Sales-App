"use client"

import axios from "axios"
import React, { useState, useEffect } from "react"

interface ProviderProps {
  children: any
}

export const ExpeditionsContext = React.createContext<any>({})

export default function Provider({ children }: ProviderProps) {
  const [data, setData] = useState<Object>()

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/api/expeditions").then((response) => {
        setData(response)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <ExpeditionsContext.Provider value={{ data }}>
      {children}
    </ExpeditionsContext.Provider>
  )
}
