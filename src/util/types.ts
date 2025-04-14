export type Competition = {
  id: string,
  name: string,
  site: string,
  eventCategory: string[],
  genderCategory: string[],
  ageCategory: string[],
  date: Date,
  subscriptionDeadlineDate: Date,
  url: string,
  notes: string,
  registrationDate: Date,
}
