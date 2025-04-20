import { Firestore } from 'firebase/firestore'
import { useGetCompetitions } from '../hooks/useGetCompetions'
import { List } from './List'

type ViewPageArgs = {
  db: Firestore
}

export const ViewPage = ({db}: ViewPageArgs) => {
  const { competitions } = useGetCompetitions({ db })

  return <List competitions={competitions} />
}
