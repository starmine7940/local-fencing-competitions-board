import { Alert, List } from '@chakra-ui/react'

export const Caution = () => {
  return (
    <Alert.Root status="warning">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>サイト利用上の注意</Alert.Title>
        <Alert.Description>
          <List.Root>
            <List.Item>
              本サイトは、日本フェンシング協会の協会登録が不要な、フェンシングのローカル大会の情報を検索・公開することを目的とするものです。それ以外のご利用はご遠慮ください。
            </List.Item>
            <List.Item>
              本サイトにより発生したトラブルについて、開発者は一切の責任を負いません。
            </List.Item>
            <List.Item>不適切な大会情報は削除することがあります。</List.Item>
          </List.Root>
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
