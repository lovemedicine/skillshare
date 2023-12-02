import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Card, CardContent, Typography } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { deleteSkill } from '../util/api'
import { UserSkill } from '../types/models'

type SkillProps = {
  isOwnSkill: boolean
  userSkill: UserSkill
  refreshSkills: () => any
}

export default function Skill({ isOwnSkill, userSkill, refreshSkills }: SkillProps) {
  const timeFormatter = (value: number, unit: TimeAgo.Unit, suffix: TimeAgo.Suffix) => {
    if (unit === 'second') return 'just now';
    const plural: string = value !== 1 ? 's' : '';
    return `${value} ${unit}${plural} ${suffix}`;
  }

  async function handleDelete(id: number) {
    await deleteSkill(id)
    refreshSkills()
  }

  return (
    <Card key={userSkill.id} variant="outlined" sx={{ mt: 1 }}>
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">
            {userSkill.skill.name}
          </Typography>
          { isOwnSkill &&
            <DeleteForever sx={{ color: 'grey' }} onClick={() => handleDelete(userSkill.id)} />
          }
        </div>
        <Typography variant="body2">
          offered by&nbsp;
          <Link href={`/user/${userSkill.username}`}>
            <strong>{userSkill.username}</strong>
          </Link>
          &nbsp;
          <TimeAgo date={userSkill.createdAt} live={false} formatter={timeFormatter} />
        </Typography>
      </CardContent>
    </Card>
  )
}