import {
  collection,
  deleteDoc,
  doc,
  documentId,
  Firestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { useGetCompetitions } from '../hooks/useGetCompetions'
import { CompetitionsTable } from './CompetitionsTable'
import { Box, Flex } from '@chakra-ui/react'
import { Caution } from './Caution'
import { toaster, Toaster } from './ui/toaster'

type CompetitionsViewPageArgs = {
  db: Firestore
}

export const CompetitionsViewPage = ({ db }: CompetitionsViewPageArgs) => {
  const { competitions } = useGetCompetitions({ db })

  const createSuccessToast = () => {
    toaster.create({
      title: `削除に成功しました。`,
      type: 'success',
    })
  }

  const createWrongDeleteCodeErrorToast = () => {
    toaster.create({
      title: `削除コードが違います。`,
      type: 'error',
    })
  }

  const createDeleteErrorToast = () => {
    toaster.create({
      title: `削除に失敗しました。`,
      type: 'error',
    })
  }

  const handleDelete = async (id: string, deleteCode: string) => {
    try {
      // deleteCode が存在するか確認
      const deleteCodesRef = collection(db, 'deleteCodes')
      const getDeleteCodeQuery = query(
        deleteCodesRef,
        where(documentId(), '==', id),
        where('deleteCode', '==', deleteCode)
      )
      console.log(getDeleteCodeQuery)
      const deleteCodeSnap = await getDocs(getDeleteCodeQuery)
      console.log(deleteCodeSnap)
      if (deleteCodeSnap.empty) {
        createWrongDeleteCodeErrorToast()
        return
      }

      // competition を削除
      await deleteDoc(doc(db, 'competitions', id))

      // deleteCode を削除
      await deleteDoc(doc(db, 'deleteCodes', id))

      createSuccessToast()
    } catch (error) {
      console.error('handleDelete error: ', error)
      createDeleteErrorToast()
    }
  }

  return (
    <Box padding="10px">
      <Flex direction="column" gap="10px">
        <Caution />
        <CompetitionsTable
          competitions={competitions}
          handleDelete={handleDelete}
        />
      </Flex>
      <Toaster />
    </Box>
  )
}
