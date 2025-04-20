// import { createUseStyles } from "react-jss"
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CompetitionWithoutId } from '../util/types'
import { addDoc, collection, Firestore } from 'firebase/firestore'
// import { CompetitionForm } from '../util/types'

// const useStyles = createUseStyles({})

const competitionSchema = z.object({
  name: z.string().min(1, '大会名は必須です'),
  site: z.string().min(1, '会場は必須です'),
  eventCategory: z.array(z.string()).min(1, '少なくとも1つ選んでください'),
  genderCategory: z.array(z.string()).min(1, '少なくとも1つ選んでください'),
  ageCategory: z.array(z.string()).min(1, '少なくとも1つ選んでください'),
  startDate: z.date(),
  finishDate: z.date(),
  subscriptionDeadlineDate: z.date(),
  url: z
    .string()
    .refine(
      (val) => val === '' || z.string().url().safeParse(val).success,
      '有効なURLを入力してください'
    ),
  notes: z.string(),
})

type CompetitionForm = z.infer<typeof competitionSchema>

const defaultValues: CompetitionForm = {
  name: '',
  site: '',
  eventCategory: [],
  genderCategory: [],
  ageCategory: [],
  startDate: new Date(),
  finishDate: new Date(),
  subscriptionDeadlineDate: new Date(),
  url: '',
  notes: '',
}

const eventCategoryItems = [
  { label: 'エペ', value: 'エペ' },
  { label: 'フルーレ', value: 'フルーレ' },
  { label: 'サーブル', value: 'サーブル' },
]

const genderCategoryItems = [
  { label: '女性', value: '女性' },
  { label: '男性', value: '男性' },
]

const ageCategoryItems = [
  { label: '未就学児', value: '未就学児' },
  { label: '小学生', value: '小学生' },
  { label: '中学生', value: '中学生' },
  { label: '高校生', value: '高校生' },
  { label: '大学生', value: '大学生' },
  { label: '大人', value: '大人' },
  { label: 'ベテラン', value: 'ベテラン' },
]

type FormArgs = {
  db: Firestore
}

export const Form = ({ db }: FormArgs) => {
  // const classes = useStyles()

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<CompetitionForm>({
    defaultValues,
    resolver: zodResolver(competitionSchema),
  })

  const eventCategory = useController({ control, name: 'eventCategory' })
  const genderCategory = useController({ control, name: 'genderCategory' })
  const ageCategory = useController({ control, name: 'ageCategory' })
  // const date = useController({ control, name: "date" })
  // const subscriptionDeadlineDate = useController({ control, name: "subscriptionDeadlineDate" })

  const invalidEventCategory = !!errors.eventCategory
  const invalidGenderCategory = !!errors.eventCategory
  const invalidAgeCategory = !!errors.eventCategory

  const onSubmit = async (competitionForm: CompetitionForm) => {
    const competionWithoutId: CompetitionWithoutId = {
      ...competitionForm,
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
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Field.Root>
          <Field.Label>大会名</Field.Label>
          <Input {...register('name')} />
        </Field.Root>
        <Field.Root>
          <Field.Label>会場</Field.Label>
          <Input {...register('site')} />
        </Field.Root>
        <Fieldset.Root invalid={invalidEventCategory}>
          <Fieldset.Legend>種目</Fieldset.Legend>
          <CheckboxGroup
            invalid={invalidEventCategory}
            value={eventCategory.field.value}
            onValueChange={eventCategory.field.onChange}
            name={eventCategory.field.name}
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
        <Fieldset.Root invalid={invalidGenderCategory}>
          <Fieldset.Legend>性別</Fieldset.Legend>
          <CheckboxGroup
            invalid={invalidEventCategory}
            value={genderCategory.field.value}
            onValueChange={genderCategory.field.onChange}
            name={genderCategory.field.name}
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
        <Fieldset.Root invalid={invalidAgeCategory}>
          <Fieldset.Legend>年齢</Fieldset.Legend>
          <CheckboxGroup
            invalid={invalidAgeCategory}
            value={ageCategory.field.value}
            onValueChange={ageCategory.field.onChange}
            name={ageCategory.field.name}
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
        <Field.Root>
          <Field.Label>開始日</Field.Label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) => field.onChange(value)}
                dateFormat="yyyy/MM/dd"
              />
            )}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>終了日</Field.Label>
          <Controller
            name="finishDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) => field.onChange(value)}
                dateFormat="yyyy/MM/dd"
              />
            )}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>申込締切日</Field.Label>
          <Controller
            name="subscriptionDeadlineDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) => field.onChange(value)}
                dateFormat="yyyy/MM/dd"
              />
            )}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>大会ページURL</Field.Label>
          <Input {...register('url')} />
        </Field.Root>
        <Field.Root>
          <Field.Label>備考</Field.Label>
          <Textarea {...register('notes')} />
        </Field.Root>
        <Button size="sm" type="submit" alignSelf="flex-start">
          登録
        </Button>
      </form>
    </Box>
  )
}
