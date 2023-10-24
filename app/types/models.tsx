export type User = {
  id: string
  email: string
  username: string
  createdAt: string
  firstName?: string
  lastName?: string
}

export type Skill = {
  id: number
  name: string
  createdAt: string
  UserSkills: UserSkill[]
}

export type UserSkill = {
  id: number
  createdAt: string
  userId: string
  skill: Skill
  typeId: number
  username?: string
}
