import { Alert, List } from '@chakra-ui/react'

export const Information = () => {
  return (
    <Alert.Root status="info">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>開発者からのお知らせ</Alert.Title>
        <Alert.Description>
          <List.Root>
            <List.Item>
              本サイトはしばらく試験運用します。常識の範囲内で自由に触っても構いません。
            </List.Item>
            <List.Item>
              保存されたデータは削除することがあります。ご了承ください。
            </List.Item>
          </List.Root>
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
