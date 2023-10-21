import { Card, CardContent, Typography } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import TimeAgo from 'react-timeago'
import { UserSkill } from '../types/models'
import { useAuth } from '@clerk/nextjs'

type SkillListProps = {
  userSkills: UserSkill[]
  query: string
  deleteSkill: (index: number) => void
}

export default function SkillList({ userSkills, query = "", deleteSkill }: SkillListProps) {
  const { userId } = useAuth()

  const filteredSkills = query.length === 0 ?
    userSkills : 
    userSkills.filter(userSkill => userSkill.skill.name.toLowerCase().search(query.toLowerCase()) >= 0)
 
  const timeFormatter = (value: number, unit: TimeAgo.Unit, suffix: TimeAgo.Suffix) => {
    if (unit === 'second') return 'just now';
    const plural: string = value !== 1 ? 's' : '';
    return `${value} ${unit}${plural} ${suffix}`;
  }

  return (
    <div>
      {filteredSkills.map(userSkill => (
        <Card key={userSkill.id} variant="outlined" sx={{ mt: 1 }}>
          <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">
                {userSkill.skill.name}
              </Typography>
              { userSkill.userId === userId &&
                <DeleteForever sx={{ color: 'grey' }} onClick={() => deleteSkill(userSkill.id)} />
              }
            </div>
            <Typography variant="body2">
              offered by <strong>{userSkill.username}</strong>
              &nbsp;<TimeAgo date={userSkill.createdAt} live={false} formatter={timeFormatter} />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

