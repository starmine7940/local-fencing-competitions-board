import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  Fieldset,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { collection, doc, Firestore, setDoc } from 'firebase/firestore'
import {
  ageCategories,
  CompetitionRegisterForm,
  CompetitionWithoutId,
  eventCategories,
  genderCategories,
} from '../util/types'
import { useCompetitionsRegisterForm } from '../hooks/useCompetitionsRegisterForm'
import { Toaster, toaster } from './ui/toaster'

type CompetitionsRegisterFormArgs = {
  db: Firestore
}

const toLabelValueItems = <T extends readonly string[]>(items: T) => {
  return items.map((item) => ({ label: item, value: item }))
}

const eventCategoryItems = toLabelValueItems(eventCategories)
const genderCategoryItems = toLabelValueItems(genderCategories)
const ageCategoryItems = toLabelValueItems(ageCategories)

export const CompetitionsRegisterForm = ({
  db,
}: CompetitionsRegisterFormArgs) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState,
    eventCategory,
    genderCategory,
    ageCategory,
  } = useCompetitionsRegisterForm()

  const createSuccessToast = (deleteCode: string) => {
    toaster.create({
      title: (
        <>
          大会の登録に成功しました。
          <br />
          登録した大会の削除コードは「{deleteCode}」です。大切にお控えください。
          <br />
          このトーストは 5 分後に自動的に閉じます。
        </>
      ),
      type: 'success',
      duration: 1000 * 60 * 1,
    })
  }

  const createErrorToast = () => {
    toaster.create({
      title: `大会の登録に失敗しました。`,
      type: 'error',
    })
  }

  const onSubmit = async (formData: CompetitionRegisterForm) => {
    try {
      const competionWithoutId: CompetitionWithoutId = {
        ...formData,
        registrationDate: new Date(),
      }

      // 削除コードの生成
      // const deleteCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0') // 6 桁のランダムな整数を生成
      const deleteCode = '123456' // 動作確認用
      const deleteCodeObject = {
        deleteCode: deleteCode,
      }

      // ドキュメント ID の生成
      const newCompetitionDoc = doc(collection(db, 'competitions'))
      const newDocId = newCompetitionDoc.id

      // 登録
      await Promise.all([
        setDoc(doc(db, 'competitions', newDocId), competionWithoutId),
        setDoc(doc(db, 'deleteCodes', newDocId), deleteCodeObject),
      ])
      reset()
      createSuccessToast(deleteCode)
    } catch (error) {
      console.error(error)
      createErrorToast()
    }
  }

  return (
    <Box colorPalette="orange">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="30px">
          <Field.Root invalid={!!formState.errors.name}>
            <Field.Label>大会名 (必須)</Field.Label>
            <Input {...register('name')} />
            {!!formState.errors.name && (
              <Field.ErrorText>大会名は必須です</Field.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Field.Root>
          <Field.Root invalid={!!formState.errors.site}>
            <Field.Label>会場 (必須)</Field.Label>
            <Input {...register('site')} />
            {!!formState.errors.site && (
              <Field.ErrorText>会場は必須です</Field.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Field.Root>

          <Fieldset.Root invalid={!!formState.errors.eventCategory}>
            <Fieldset.Legend>種目 (必須)</Fieldset.Legend>
            <CheckboxGroup
              invalid={!!formState.errors.eventCategory}
              value={eventCategory.field.value}
              onValueChange={eventCategory.field.onChange}
            >
              <Fieldset.Content>
                {eventCategoryItems.map((item) => (
                  <Checkbox.Root key={item.value} value={item.value}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{item.label}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Fieldset.Content>
            </CheckboxGroup>
            {!!formState.errors.eventCategory && (
              <Fieldset.ErrorText>
                少なくとも1つ選んでください
              </Fieldset.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Fieldset.Root>

          <Fieldset.Root invalid={!!formState.errors.genderCategory}>
            <Fieldset.Legend>性別 (必須)</Fieldset.Legend>
            <CheckboxGroup
              invalid={!!formState.errors.genderCategory}
              value={genderCategory.field.value}
              onValueChange={genderCategory.field.onChange}
            >
              <Fieldset.Content>
                {genderCategoryItems.map((item) => (
                  <Checkbox.Root key={item.value} value={item.value}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{item.label}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Fieldset.Content>
            </CheckboxGroup>
            {!!formState.errors.genderCategory && (
              <Fieldset.ErrorText>
                少なくとも1つ選んでください
              </Fieldset.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Fieldset.Root>

          <Fieldset.Root invalid={!!formState.errors.ageCategory}>
            <Fieldset.Legend>年齢 (必須)</Fieldset.Legend>
            <CheckboxGroup
              invalid={!!formState.errors.ageCategory}
              value={ageCategory.field.value}
              onValueChange={ageCategory.field.onChange}
            >
              <Fieldset.Content>
                {ageCategoryItems.map((item) => (
                  <Checkbox.Root key={item.value} value={item.value}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{item.label}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Fieldset.Content>
            </CheckboxGroup>
            {!!formState.errors.ageCategory && (
              <Fieldset.ErrorText>
                少なくとも1つ選んでください
              </Fieldset.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Fieldset.Root>

          <Field.Root invalid={!!formState.errors.startDate}>
            <Field.Label>開始日 (任意)</Field.Label> {/* TODO: 必須にする */}
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="日付を選択"
                />
              )}
            />
            {!!formState.errors.startDate && (
              <Field.ErrorText>開始日は必須です</Field.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Field.Root>
          <Field.Root invalid={!!formState.errors.finishDate}>
            <Field.Label>終了日 (任意)</Field.Label> {/* TODO: 必須にする */}
            <Controller
              name="finishDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="日付を選択"
                />
              )}
            />
            {!!formState.errors.finishDate && (
              <Field.ErrorText>終了日は必須です</Field.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Field.Root>
          <Field.Root invalid={!!formState.errors.subscriptionDeadlineDate}>
            <Field.Label>申込締切日 (任意)</Field.Label>{' '}
            {/* TODO: 必須にする */}
            <Controller
              name="subscriptionDeadlineDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="日付を選択"
                />
              )}
            />
            {!!formState.errors.subscriptionDeadlineDate && (
              <Field.ErrorText>申込締切日は必須です</Field.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Field.Root>
          <Field.Root invalid={!!formState.errors.url}>
            <Field.Label>大会ページURL (任意)</Field.Label>
            <Input {...register('url')} />
            {!!formState.errors.url && (
              <Field.ErrorText>有効なURLを入力してください</Field.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Field.Root>
          <Field.Root invalid={!!formState.errors.notes}>
            <Field.Label>備考 (任意)</Field.Label>
            <Textarea {...register('notes')} />
            {!!formState.errors.notes && (
              <Field.ErrorText>300文字以内で入力してください</Field.ErrorText> // TODO: 固定のエラー文言を使う
            )}
          </Field.Root>
          <Button
            size="sm"
            type="submit"
            disabled={!formState.isValid}
            loading={formState.isSubmitting}
          >
            登録
          </Button>
        </Stack>
      </form>
      <Toaster />
    </Box>
  )
}
