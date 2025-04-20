import { Firestore } from 'firebase/firestore'
import { useGetCompetitions } from '../hooks/useGetCompetions'
import { CompetitionsTable } from './CompetitionsTable'
import { Box, Flex } from '@chakra-ui/react'
import { Caution } from './Caution'

type CompetitionsViewPageArgs = {
  db: Firestore
}

export const CompetitionsViewPage = ({ db }: CompetitionsViewPageArgs) => {
  const { competitions } = useGetCompetitions({ db })

  return (
    <Box padding="10px">
      <Flex direction="column" gap="10px">
        <Caution />
        <CompetitionsTable competitions={competitions} />
      </Flex>
    </Box>
  )
}
