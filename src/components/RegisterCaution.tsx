import { Alert, List, Span } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const RegisterCaution = () => {
  return (
    <Alert.Root status="warning">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>大会の情報を登録する際の注意</Alert.Title>
        <Alert.Description>
          <List.Root>
            <List.Item>
              本サイトに大会の情報を登録する際は、必ず主催者の許可を得てください。
            </List.Item>
            <List.Item>
              大会の情報が重複して登録されないよう、「
              <Span color="blue.solid">
                <Link to="/">大会を探す</Link>
              </Span>
              」から既に大会が登録済みでないことを確認してください。
            </List.Item>
            <List.Item>
              大会の情報は修正できません。修正する際は一度削除してから再登録してください。（予定）
            </List.Item>
            <List.Item>
              大会の情報を削除する際は、登録時に発行される「削除コード」が必要になります。忘れずに控えておいてください。（予定）
            </List.Item>
          </List.Root>
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
