import { Box, Text } from '@chakra-ui/react'

type DetailsToggleCellArgs = {
  text: string
}

export const DetailsToggleCell = ({text}: DetailsToggleCellArgs) => {
  const isLong = text.length > 100
  const preview = isLong ? text.slice(0, 100) + '...' : text

  return (
    <Box>
      <Text>{preview}</Text>
      {isLong && (
        <details>
          <summary>
            全文はこちら
          </summary>
            <Text>{text}</Text>
        </details>
      )}
    </Box>
  )
}
