import { Firestore } from 'firebase/firestore'
import { Form } from './Form'

type RegistrationArgs = {
  db: Firestore
}

export const RegistrationPage = ({ db }: RegistrationArgs) => {
  return <Form db={db} />
}
