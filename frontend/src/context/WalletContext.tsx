import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { isConnected, getPublicKey, setAllowed } from '@stellar/freighter-api'

interface WalletContextType {
  address: string | null
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
  isLoading: boolean
  error: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const connected = await isConnected()
      if (connected) {
        const addr = await getPublicKey()
        if (addr) {
          setAddress(addr)
        }
      }
    } catch (err) {
      console.error('Failed to check Freighter connection:', err)
    } finally {
      setLoading(false)
    }
  }

  const connect = async () => {
    setLoading(true)
    setError(null)
    try {
      const connected = await isConnected()
      if (!connected) {
        throw new Error('Freighter extension not found')
      }

      const allowed = await setAllowed()
      if (!allowed) {
        throw new Error('Access denied to Freighter')
      }

      const addr = await getPublicKey()
      if (addr) {
        setAddress(addr)
      } else {
        throw new Error('Failed to retrieve address from Freighter')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
      console.error('Wallet connection error:', err)
    } finally {
      setLoading(false)
    }
  }

  const disconnect = () => {
    setAddress(null)
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        connect,
        disconnect,
        isLoading: loading,
        error
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
