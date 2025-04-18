// import { createUseStyles } from "react-jss"
import { Firestore } from "firebase/firestore"
import { useGetCompetitions } from "../hooks/useGetCompetions"
import { List } from "./List"
import { Form } from "./Form"

// const useStyles = createUseStyles({})

type BodyArgs = {
  db: Firestore,
}

export const Body = ({db}: BodyArgs) => {
  // const classes = useStyles()

  const {competitions} = useGetCompetitions({db})
  console.log(competitions)

  return (
    <>
      <Form db={db}/>
      <List competitions={competitions}/>
    </>
  )
}