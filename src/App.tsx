import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { Header } from './components/Header'
import { ViewPage } from './components/ViewPage'
import { RegistrationPage } from './components/RegistrationPage'
import { useFirebaseApp } from './hooks/useFirebaseApp'
import { useFirebaseDb } from './hooks/useFirebaseDb'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

export const App = () => {
  const { app } = useFirebaseApp()
  const { db } = useFirebaseDb({ app })

  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/view" element={<ViewPage db={db} />} />
          <Route path="/registration" element={<RegistrationPage db={db} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}
