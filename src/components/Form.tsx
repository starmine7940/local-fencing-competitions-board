import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  Fieldset,
  Input,
  Textarea,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { addDoc, collection, Firestore } from 'firebase/firestore'
import { ageCategories, CompetitionForm, CompetitionWithoutId, eventCategories, genderCategories } from '../util/types'
import { useCompetitionForm } from '../hooks/useCompetitionForm'

type FormArgs = {
  db: Firestore
}

const toLabelValueItems = <T extends readonly string[]>(items: T) => {
  return items.map((item) => ({ label: item, value: item }))
}

const eventCategoryItems = toLabelValueItems(eventCategories)
const genderCategoryItems = toLabelValueItems(genderCategories)
const ageCategoryItems = toLabelValueItems(ageCategories)

export const Form = ({ db }: FormArgs) => {
  const {
    handleSubmit,
    control,
    register,
    formState,
    eventCategory,
    genderCategory,
    ageCategory,
  } = useCompetitionForm()

  const onSubmit = async (formData: CompetitionForm) => {
    const competionWithoutId: CompetitionWithoutId = {
      ...formData,
      registrationDate: new Date(),
    }
    const docRef = await addDoc(
      collection(db, 'competitions'),
      competionWithoutId
    )
    console.log('Document written with ID: ', docRef.id)
  }

  return (
    <Box borderWidth="1px" borderColor="red">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root invalid={!!formState.errors.name}>
          <Field.Label>大会名</Field.Label>
          <Input {...register('name')} />
        </Field.Root>
        <Field.Root invalid={!!formState.errors.site}>
          <Field.Label>会場</Field.Label>
          <Input {...register('site')} />
        </Field.Root>

        <Fieldset.Root invalid={!!formState.errors.eventCategory}>
          <Fieldset.Legend>種目</Fieldset.Legend>
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
        </Fieldset.Root>

        <Fieldset.Root invalid={!!formState.errors.genderCategory}>
          <Fieldset.Legend>性別</Fieldset.Legend>
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
        </Fieldset.Root>

        <Fieldset.Root invalid={!!formState.errors.ageCategory}>
          <Fieldset.Legend>年齢</Fieldset.Legend>
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
        </Fieldset.Root>

        <Field.Root invalid={!!formState.errors.startDate}>
          <Field.Label>開始日</Field.Label>
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
        </Field.Root>
        <Field.Root invalid={!!formState.errors.finishDate}>
          <Field.Label>終了日</Field.Label>
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
        </Field.Root>
        <Field.Root invalid={!!formState.errors.subscriptionDeadlineDate}>
          <Field.Label>申込締切日</Field.Label>
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
        </Field.Root>
        <Field.Root invalid={!!formState.errors.url}>
          <Field.Label>大会ページURL</Field.Label>
          <Input {...register('url')} />
        </Field.Root>
        <Field.Root invalid={!!formState.errors.notes}>
          <Field.Label>備考</Field.Label>
          <Textarea {...register('notes')} />
        </Field.Root>
        <Button size="sm" type="submit" alignSelf="flex-start" disabled={!formState.isValid}>
          登録
        </Button>
      </form>
    </Box>
  )
}
