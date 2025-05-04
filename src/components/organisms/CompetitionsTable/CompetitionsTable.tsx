import { Box, Flex, Table } from '@chakra-ui/react'
import { ageCategories, Competition, eventCategories, genderCategories } from '../../../util/types'
import {
  formatDateWithoutTime,
  formatDateWithTime,
} from '../../../util/functions'
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
import {
  TbCaretUpDownFilled,
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from 'react-icons/tb'

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
        enableSorting: false,
        cell: (info) => <DetailsToggleCell text={info.getValue<string>()} />,
      },
      {
        accessorKey: 'site',
        header: '会場',
        enableSorting: false,
        cell: (info) => <DetailsToggleCell text={info.getValue<string>()} />,
      },
      {
        accessorKey: 'eventCategory',
        header: '種目',
        enableSorting: false,
        cell: (info) => {
          const value = info.getValue<string[]>()
          const sorted = eventCategories.filter((item) => value.includes(item))
          return <BadgesCell items={sorted} />
        },
      },
      {
        accessorKey: 'genderCategory',
        header: '性別',
        enableSorting: false,
        cell: (info) => {
          const value = info.getValue<string[]>()
          const sorted = genderCategories.filter((item) => value.includes(item))
          return <BadgesCell items={sorted} />
        },
      },
      {
        accessorKey: 'ageCategory',
        header: '年齢区分',
        enableSorting: false,
        cell: (info) => {
          const value = info.getValue<string[]>()
          const sorted = ageCategories.filter((item) => value.includes(item))
          return <BadgesCell items={sorted} />
        },
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
        enableSorting: false,
        cell: (info) => {
          const url = info.getValue<string>()
          return url && <UrlCell url={url} />
        },
      },
      {
        accessorKey: 'notes',
        header: '備考',
        enableSorting: false,
        cell: (info) => <DetailsToggleCell text={info.getValue<string>()} />,
      },
      {
        accessorKey: 'registrationDate',
        header: '大会情報の登録日',
        cell: (info) => formatDateWithTime(info.getValue<Date>()),
        sortingFn: 'datetime',
      },
      {
        id: 'delete',
        header: '削除',
        enableSorting: false,
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
            <Table.Row bg="bg.subtle" id={headerGroup.id} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort()
                const sortState = header.column.getIsSorted()
                return (
                  <Table.ColumnHeader
                    key={header.id}
                    minW="200px"
                    onClick={
                      isSortable
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <Flex justify="center" align="center" gap="1px">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {isSortable &&
                        (sortState === 'asc' ? (
                          <TbTriangleFilled size={10} />
                        ) : sortState === 'desc' ? (
                          <TbTriangleInvertedFilled size={10} />
                        ) : (
                          <TbCaretUpDownFilled size={16} />
                        ))}
                    </Flex>
                  </Table.ColumnHeader>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row id={row.id} key={row.id}>
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
