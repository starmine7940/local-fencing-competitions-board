import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './components/organisms/Header'
import { CompetitionsViewPage } from './components/pages/CompetitionsViewPage'
import { CompetitionsRegisterPage } from './components/pages/CompetitionsRegisterPage'
import { useFirebaseApp } from './hooks/useFirebaseApp'
import { useFirebaseDb } from './hooks/useFirebaseDb'
import { Box, ChakraProvider, defaultSystem } from '@chakra-ui/react'

export const App = () => {
  const { app } = useFirebaseApp()
  const { db } = useFirebaseDb({ app })

  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Box colorPalette="orange">
          <Header />
          <Routes>
            <Route path="/" element={<CompetitionsViewPage db={db} />} />
            <Route path="/new" element={<CompetitionsRegisterPage db={db} />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  )
}
