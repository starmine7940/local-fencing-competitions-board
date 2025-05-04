import { Badge, Box } from '@chakra-ui/react'

type BadgesCelArgs = {
  items: string[]
}

export const BadgesCell = ({ items }: BadgesCelArgs) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignContent="center"
      gap="5px"
    >
      {items.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
    </Box>
  )
}
