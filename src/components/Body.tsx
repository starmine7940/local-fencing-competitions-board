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
  console.log(competitions)

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>大会名</Table.ColumnHeader>
          <Table.ColumnHeader>年齢区分</Table.ColumnHeader>
          <Table.ColumnHeader>種目</Table.ColumnHeader>
          <Table.ColumnHeader>開催日</Table.ColumnHeader>
          <Table.ColumnHeader>申込締切日</Table.ColumnHeader>
          <Table.ColumnHeader>URL</Table.ColumnHeader>
          <Table.ColumnHeader>備考</Table.ColumnHeader>
          <Table.ColumnHeader>登録日</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {competitions.map((competition) => (
          <Table.Row key={competition.id}>
            <Table.Cell>{competition.name}</Table.Cell>
            <Table.Cell>{competition.ageCategory}</Table.Cell>
            <Table.Cell>{competition.eventCategory}</Table.Cell>
            <Table.Cell>{competition.date.toDateString()}</Table.Cell>
            <Table.Cell>{competition.subscriptionDeadlineDate.toDateString()}</Table.Cell>
            <Table.Cell>{competition.url}</Table.Cell>
            <Table.Cell>{competition.notes}</Table.Cell>
            <Table.Cell>{competition.registrationDate.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}