import { format } from 'date-fns'

export const formatDateWithoutTime = (date: Date | null) =>
  date ? format(date, 'yyyy/MM/dd') : ''

export const formatDateWithTime = (date: Date | null) =>
  date ? format(date, 'yyyy/MM/dd HH:mm') : ''
