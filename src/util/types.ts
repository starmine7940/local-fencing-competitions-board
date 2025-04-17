export type CompetitionForm = {
  name: string,
  site: string,
  eventCategory: string[],
  genderCategory: string[],
  ageCategory: string[],
  startDate: Date,
  finishDate: Date,
  subscriptionDeadlineDate: Date,
  url: string,
  notes: string,
}

export type Competition = {
  id: string,
  registrationDate: Date,
} & CompetitionForm

export type CompetitionWithoutId = Omit<Competition, "id">