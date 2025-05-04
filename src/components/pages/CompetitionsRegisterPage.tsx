import { Box, Flex } from "@chakra-ui/react"
import { Firestore } from "firebase/firestore"
import { Caution } from "../organisms/Caution"
import { CompetitionsRegisterForm } from "../organisms/CompetitionsRegisterForm"
import { Information } from "../organisms/Information"
import { RegisterCaution } from "../organisms/RegisterCaution"

type CompetitionsRegistrationArgs = {
  db: Firestore
}

export const CompetitionsRegisterPage = ({
  db,
}: CompetitionsRegistrationArgs) => {
  return (
    <Box padding="10px">
      <Flex direction="column" gap="10px">
        <Information />
        <Caution />
        <RegisterCaution />
        <CompetitionsRegisterForm db={db} />
      </Flex>
    </Box>
  )
}
