import { User } from '../payload-types'

export const missingSettings = ({ name, description, sign }: User): boolean => {
  return !name || !name.length || !description || !description.length || !sign
}
