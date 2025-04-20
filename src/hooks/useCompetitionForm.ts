import { useForm, useController } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const competitionSchema = z.object({
  name: z.string().min(1, '大会名は必須です'),
  site: z.string().min(1, '会場は必須です'),
  eventCategory: z.array(z.string()).min(1, '少なくとも1つ選んでください'),
  genderCategory: z.array(z.string()).min(1, '少なくとも1つ選んでください'),
  ageCategory: z.array(z.string()).min(1, '少なくとも1つ選んでください'),
  startDate: z.date({ required_error: '開始日は必須です' }),
  finishDate: z.date({ required_error: '終了日は必須です' }),
  subscriptionDeadlineDate: z.date(),
  url: z
    .string()
    .refine(
      (val) => val === '' || z.string().url().safeParse(val).success,
      '有効なURLを入力してください'
    ),
  notes: z.string(),
})

export type CompetitionForm = z.infer<typeof competitionSchema>

export const defaultValues: CompetitionForm = {
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

export const useCompetitionForm = () => {
  const form = useForm<CompetitionForm>({
    defaultValues,
    resolver: zodResolver(competitionSchema),
  })

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

  const invalidEventCategory = !!form.formState.errors.eventCategory
  const invalidGenderCategory = !!form.formState.errors.genderCategory
  const invalidAgeCategory = !!form.formState.errors.ageCategory

  return {
    ...form,
    eventCategory,
    genderCategory,
    ageCategory,
    invalidEventCategory,
    invalidGenderCategory,
    invalidAgeCategory,
  }
}
