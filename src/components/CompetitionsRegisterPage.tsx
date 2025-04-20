import { Firestore } from 'firebase/firestore'
import { CompetitionsRegisterForm } from './CompetitionsRegisterForm'
import { Box, Flex } from '@chakra-ui/react'
import { Caution } from './Caution'
import { RegisterCaution } from './RegisterCaution'

type CompetitionsRegistrationArgs = {
  db: Firestore
}

export const CompetitionsRegisterPage = ({
  db,
}: CompetitionsRegistrationArgs) => {
  return (
    <Box padding="10px">
      <Flex direction="column" gap="10px">
        <Caution />
        <RegisterCaution />
        <CompetitionsRegisterForm db={db} />
      </Flex>
    </Box>
  )
}
