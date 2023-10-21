import { Card, CardContent, Typography } from '@mui/material'
import { UserSkill } from '../types/models'

type SkillListProps = {
  userSkills: UserSkill[]
  query: string
  deleteSkill: (index: number) => void
  hideUser?: boolean
}

export default function SkillList({ userSkills, query = "", hideUser = false, deleteSkill }: SkillListProps) {
  let filteredSkills = query.length === 0 ? 
    userSkills : 
    userSkills.filter(userSkill => userSkill.skill.name.toLowerCase().search(query.toLowerCase()) >= 0)
 
  return (
    <div>
      {filteredSkills.map(userSkill => (
        <Card key={userSkill.id} variant="outlined" sx={{ mt: 1 }}>
          <CardContent>
            <Typography variant="h5">
              <span className="text-2xl">{userSkill.skill.name}</span>
              { false && <button className="text-sm text-blue-700" onClick={() => deleteSkill(userSkill.id)}>delete</button> }
            </Typography>
            <Typography variant="body1">
              offered by <span className="font-bold">{userSkill.username}</span> on {userSkill.createdAt.split("T")[0]}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

