export type CompetitionRegisterForm = {
  name: string
  site: string
  eventCategory: string[]
  genderCategory: string[]
  ageCategory: string[]
  startDate: Date | null
  finishDate: Date | null
  subscriptionDeadlineDate: Date | null
  url: string
  notes: string
}

export type Competition = {
  id: string
  registrationDate: Date
} & CompetitionRegisterForm

export type CompetitionWithoutId = Omit<Competition, 'id'>

export const eventCategories = ['エペ', 'フルーレ', 'サーブル'] as const
export const genderCategories = ['女性', '男性'] as const
export const ageCategories = [
  '未就学児',
  '小学生',
  '中学生',
  '高校生',
  '大学生',
  '大人',
  'ベテラン',
] as const
