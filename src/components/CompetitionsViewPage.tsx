import { Firestore } from 'firebase/firestore'
import { useGetCompetitions } from '../hooks/useGetCompetions'
import { CompetitionsTable } from './CompetitionsTable'

type CompetitionsViewPageArgs = {
  db: Firestore
}

export const CompetitionsViewPage = ({ db }: CompetitionsViewPageArgs) => {
  const { competitions } = useGetCompetitions({ db })

  return <CompetitionsTable competitions={competitions} />
}
