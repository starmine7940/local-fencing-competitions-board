import { Box, Table } from '@chakra-ui/react'
import { Competition } from '../util/types'
import { formatDateWithoutTime, formatDateWithTime } from '../util/functions'
import { useMemo, useState } from 'react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'
import { DeleteButtonAndDialog } from './DeleteButtonAndDialog'
import { DetailsToggleCell } from './DetailsToggleCell'
import { BadgesCell } from './BadgesCell'
import { UrlCell } from './UrlCell'

type CompetitionsTableArgs = {
  competitions: Competition[]
  handleDelete: (id: string, deleteCode: string) => Promise<void>
}

export const CompetitionsTable = ({
  competitions,
  handleDelete,
}: CompetitionsTableArgs) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Competition>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '大会名',
        cell: (info) => <DetailsToggleCell text={info.getValue<string>()} />,
      },
      {
        accessorKey: 'site',
        header: '会場',
        cell: (info) => <DetailsToggleCell text={info.getValue<string>()} />,
      },
      {
        accessorKey: 'eventCategory',
        header: '種目',
        cell: (info) => <BadgesCell items={info.getValue<string[]>()} />,
      },
      {
        accessorKey: 'genderCategory',
        header: '性別',
        cell: (info) => <BadgesCell items={info.getValue<string[]>()} />,
      },
      {
        accessorKey: 'ageCategory',
        header: '年齢区分',
        cell: (info) => <BadgesCell items={info.getValue<string[]>()} />,
      },
      {
        accessorKey: 'startDate',
        header: '大会開始日',
        cell: (info) => (
          <Box>{formatDateWithoutTime(info.getValue<Date | null>())}</Box>
        ),
        sortingFn: 'datetime',
      },
      {
        accessorKey: 'finishDate',
        header: '大会終了日',
        cell: (info) => (
          <Box>{formatDateWithoutTime(info.getValue<Date | null>())}</Box>
        ),
        sortingFn: 'datetime',
      },
      {
        accessorKey: 'subscriptionDeadlineDate',
        header: '申込締切日',
        cell: (info) => (
          <Box>{formatDateWithoutTime(info.getValue<Date | null>())}</Box>
        ),
        sortingFn: 'datetime',
      },
      {
        accessorKey: 'url',
        header: 'URL',
        cell: (info) => {
          const url = info.getValue<string>()
          return url && <UrlCell url={url} />
      },
      },
      {
        accessorKey: 'notes',
        header: '備考',
        cell: (info) => <DetailsToggleCell text={info.getValue<string>()} />,
      },
      {
        accessorKey: 'registrationDate',
        header: '登録日',
        cell: (info) => formatDateWithTime(info.getValue<Date>()),
        sortingFn: 'datetime',
      },
      {
        id: 'delete',
        header: '削除',
        cell: (info) => (
          <DeleteButtonAndDialog
            selectedCompetitionId={info.row.original.id}
            selectedCompetitionName={info.row.original.name}
            handleDelete={handleDelete}
          />
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: competitions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Table.ScrollArea borderWidth="1px">
      <Table.Root showColumnBorder>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row bg="bg.subtle" id={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort()
                return (
                  <Table.ColumnHeader
                    key={header.id}
                    minW="200px"
                    textAlign="center"
                    onClick={
                      isSortable
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? ''}
                  </Table.ColumnHeader>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row id={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id} textAlign="center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}
