import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { Header } from './components/Header'
import { CompetitionsViewPage } from './components/CompetitionsViewPage'
import { CompetitionsRegisterPage } from './components/CompetitionsRegisterPage'
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
          <Route path="/" element={<CompetitionsViewPage db={db} />} />
          <Route path="/new" element={<CompetitionsRegisterPage db={db} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}
