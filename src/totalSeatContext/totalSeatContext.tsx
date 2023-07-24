"use client"

import axios from "axios"
import React, { useState, useEffect } from "react"

interface ProviderProps {
  children: any
}

export const TotalSeatContext = React.createContext<any>({})

export default function TotalSeatProvider({ children }: ProviderProps) {
  const [totalSeat, setTotalSeat] = useState<number>(0)

  return (
    <TotalSeatContext.Provider value={{ totalSeat, setTotalSeat }}>
      {children}
    </TotalSeatContext.Provider>
  )
}
