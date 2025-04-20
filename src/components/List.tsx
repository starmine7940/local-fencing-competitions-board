// import { createUseStyles } from "react-jss"
import { Table } from '@chakra-ui/react'
import { Competition } from '../util/types'

// const useStyles = createUseStyles({})

type ListArgs = {
  competitions: Competition[]
}

export const List = ({ competitions }: ListArgs) => {
  // const classes = useStyles()

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>大会名</Table.ColumnHeader>
          <Table.ColumnHeader>大会名</Table.ColumnHeader>
          <Table.ColumnHeader>種目</Table.ColumnHeader>
          <Table.ColumnHeader>性別</Table.ColumnHeader>
          <Table.ColumnHeader>年齢区分</Table.ColumnHeader>
          <Table.ColumnHeader>大会開始日</Table.ColumnHeader>
          <Table.ColumnHeader>大会終了日</Table.ColumnHeader>
          <Table.ColumnHeader>申込締切日</Table.ColumnHeader>
          <Table.ColumnHeader>URL</Table.ColumnHeader>
          <Table.ColumnHeader>備考</Table.ColumnHeader>
          <Table.ColumnHeader>登録日</Table.ColumnHeader>
          <Table.ColumnHeader>削除</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {competitions.map((competition) => (
          <Table.Row key={competition.id}>
            <Table.Cell>{competition.name}</Table.Cell>
            <Table.Cell>{competition.site}</Table.Cell>
            <Table.Cell>{competition.eventCategory}</Table.Cell>
            <Table.Cell>{competition.genderCategory}</Table.Cell>
            <Table.Cell>{competition.ageCategory}</Table.Cell>
            <Table.Cell>{competition.startDate.toDateString()}</Table.Cell>
            <Table.Cell>{competition.finishDate.toDateString()}</Table.Cell>
            <Table.Cell>
              {competition.subscriptionDeadlineDate.toDateString()}
            </Table.Cell>
            <Table.Cell>{competition.url}</Table.Cell>
            <Table.Cell>{competition.notes}</Table.Cell>
            <Table.Cell>
              {competition.registrationDate.toDateString()}
            </Table.Cell>
            <Table.Cell>🗑️</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}