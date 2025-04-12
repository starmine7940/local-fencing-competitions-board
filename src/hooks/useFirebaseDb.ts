import { FirebaseApp } from "firebase/app"
import { Firestore, getFirestore } from "firebase/firestore"

type UseFirebaseDbArgs = {
  app: FirebaseApp,
}

type UseFirebaseDb = {
  db: Firestore,
}

export const useFirebaseDb = ({app}: UseFirebaseDbArgs): UseFirebaseDb => {
  const db = getFirestore(app)
  return {db}
}