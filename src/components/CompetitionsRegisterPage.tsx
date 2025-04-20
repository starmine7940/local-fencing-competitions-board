import { Firestore } from 'firebase/firestore'
import { CompetitionsRegisterForm } from './CompetitionsRegisterForm'

type CompetitionsRegistrationArgs = {
  db: Firestore
}

export const CompetitionsRegisterPage = ({
  db,
}: CompetitionsRegistrationArgs) => {
  return <CompetitionsRegisterForm db={db} />
}
