// import { createUseStyles } from "react-jss"
import { Firestore } from "firebase/firestore"
import { useGetCompetitions } from "../hooks/useGetCompetions"
import { Table } from "@chakra-ui/react"

// const useStyles = createUseStyles({})

type BodyArgs = {
  db: Firestore,
}

export const Body = ({db}: BodyArgs) => {
  // const classes = useStyles()

  const {competitions} = useGetCompetitions({db})

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>大会名</Table.ColumnHeader>
          <Table.ColumnHeader>登録日</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {competitions.map((competition) => (
          <Table.Row key={competition.name}>
            <Table.Cell>{competition.name}</Table.Cell>
            <Table.Cell>{competition.createdAt.toLocaleString()}</Table.Cell>

          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}