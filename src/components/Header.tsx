import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Box>
      <Flex direction="column" align="center">
        <Heading>フェンシング ローカル大会掲示板</Heading>
        <Flex gap="10px">
          <Button>
            <Link to="/">大会を探す</Link>
          </Button>
          <Button>
            <Link to="/new">大会を登録する</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
