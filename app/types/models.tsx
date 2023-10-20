// export type User = {
//   id: string
//   name: string
//   createdAt: string
//   UserSkills: UserSkill[]
// }

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
