import { collection, Firestore, getDocs, } from "firebase/firestore"
import { Competition } from "../util/type"
import { useEffect, useState } from "react"

type UseGetCompetitionsArgs = {
  db: Firestore
}

type UseGetCompetitions = {
  competitions: Competition[]
}

export const useGetCompetitions = ({ db }: UseGetCompetitionsArgs): UseGetCompetitions => {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  
  const fetchCompetitions = async (db: Firestore) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'competitions'))
      const data = querySnapshot.docs.map(doc => doc.data() as Competition)
      setCompetitions(data)
    } catch (error) {
      console.error('getCompetitions error: ', error)
    }
  }

  useEffect(() => {
    fetchCompetitions(db)
  }, [db])

  return { competitions }
}