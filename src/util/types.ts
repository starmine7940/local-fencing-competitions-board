export type Competition = {
  id: string
  name: string
  site: string
  eventCategory: string[]
  genderCategory: string[]
  ageCategory: string[]
  startDate: Date
  finishDate: Date
  subscriptionDeadlineDate: Date
  url: string
  notes: string
  registrationDate: Date
}

export type CompetitionRegisterForm = Omit<
  Competition,
  'id' | 'registrationDate'
>

export type CompetitionWithoutId = Omit<Competition, 'id'>

export const eventCategories = ['エペ', 'フルーレ', 'サーブル', 'シッティング'] as const
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
