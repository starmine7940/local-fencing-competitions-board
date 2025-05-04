import {
  Dialog,
  Button,
  Portal,
  CloseButton,
  Text,
  Input,
  Stack,
  Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import { TbTrash } from 'react-icons/tb'

type DeleteButtonAndDialogArgs = {
  selectedCompetitionId: string
  selectedCompetitionName: string
  handleDelete: (id: string, deleteCode: string) => Promise<void>
}

export const DeleteButtonAndDialog = ({
  selectedCompetitionId,
  selectedCompetitionName,
  handleDelete,
}: DeleteButtonAndDialogArgs) => {
  const [inputDeleteCode, setInputDeleteCode] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleDelete(selectedCompetitionId, inputDeleteCode)
  }

  return (
    <Box>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="outline" size="xs">
            <TbTrash />
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <form onSubmit={handleSubmit}>
                <Dialog.Header>
                  <Dialog.Title>確認</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Stack>
                    <Text>
                      大会名「{selectedCompetitionName}
                      」の情報を削除してもよいですか？この処理は元に戻せないのでご注意ください。
                    </Text>
                    <Input
                      placeholder="削除コードを入力してください"
                      value={inputDeleteCode}
                      onChange={(e) => setInputDeleteCode(e.target.value)}
                    />
                  </Stack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button type="submit">削除</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  )
}
