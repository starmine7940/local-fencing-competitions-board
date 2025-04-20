// import { useEffect } from "react"
import { Body } from './components/Body'
import { Header } from './components/Header'
import { useFirebaseApp } from './hooks/useFirebaseApp'
import { useFirebaseDb } from './hooks/useFirebaseDb'

export const App = () => {
  const { app } = useFirebaseApp()
  const { db } = useFirebaseDb({ app })

  // useEffect(() => {
  //   console.log('app', app)
  // }, [app])

  return (
    <>
      <Header />
      <Body db={db} />
    </>
  )
}
