import { useForm, useController } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ageCategories, eventCategories, genderCategories } from '../util/types'

const eventCategoryEnum = z.enum(eventCategories)
const genderCategoryEnum = z.enum(genderCategories)
const ageCategoryEnum = z.enum(ageCategories)

const defaultDate = new Date(2025, 0, 1)

export const competitionSchema = z.object({
  name: z
    .string()
    .min(1, '大会名は必須です')
    .max(100, '100 文字以内で入力してください'),
  site: z
    .string()
    .min(1, '会場は必須です')
    .max(100, '100 文字以内で入力してください'),
  eventCategory: z
    .array(eventCategoryEnum)
    .min(1, '少なくとも 1 つ選んでください'),
  genderCategory: z
    .array(genderCategoryEnum)
    .min(1, '少なくとも 1 つ選んでください'),
  ageCategory: z.array(ageCategoryEnum).min(1, '少なくとも 1 つ選んでください'),
  startDate: z.date().refine((val) => val.getTime() !== defaultDate.getTime(), {
    message: '開始日は必須です',
  }),
  finishDate: z
    .date()
    .refine((val) => val.getTime() !== defaultDate.getTime(), {
      message: '終了日は必須です',
    }),
  subscriptionDeadlineDate: z
    .date()
    .refine((val) => val.getTime() !== defaultDate.getTime(), {
      message: '申込締切日は必須です',
    }),
  url: z
    .string()
    .max(300, '300 文字以内で入力してください')
    .refine(
      (val) => val === '' || z.string().url().safeParse(val).success,
      '有効な URL を入力してください'
    ),
  notes: z.string().max(300, `300 文字以内で入力してください`),
})

export type CompetitionForm = z.infer<typeof competitionSchema>

export const defaultValues: CompetitionForm = {
  name: '',
  site: '',
  eventCategory: [],
  genderCategory: [],
  ageCategory: [],
  startDate: defaultDate,
  finishDate: defaultDate,
  subscriptionDeadlineDate: defaultDate,
  url: '',
  notes: '',
}

export const useCompetitionsRegisterForm = () => {
  const form = useForm<CompetitionForm>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(competitionSchema),
  })
  const reset = () => {
    form.reset(defaultValues)
  }
  const eventCategory = useController({
    control: form.control,
    name: 'eventCategory',
  })
  const genderCategory = useController({
    control: form.control,
    name: 'genderCategory',
  })
  const ageCategory = useController({
    control: form.control,
    name: 'ageCategory',
  })

  return {
    ...form,
    reset,
    eventCategory,
    genderCategory,
    ageCategory,
  }
}
