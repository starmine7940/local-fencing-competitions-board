import { Box, Link } from '@chakra-ui/react'
import { LuExternalLink } from 'react-icons/lu'

type UrlCellArgs = {
  url: string
}

export const UrlCell = ({ url }: UrlCellArgs) => {
  const isLong = url.length > 100
  const preview = isLong ? url.slice(0, 100) + '...' : url

  return (
    <Box wordBreak="break-word" whiteSpace="normal">
      <Link href={url} target="_blank">
        {preview} <LuExternalLink />
      </Link>
      {isLong && (
        <details>
          <summary>全文はこちら</summary>
          <Link href={url} target="_blank">
            {url} <LuExternalLink />
          </Link>
        </details>
      )}
    </Box>
  )
}
