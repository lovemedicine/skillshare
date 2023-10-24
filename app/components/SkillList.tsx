import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { Card, CardContent, Typography } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import TimeAgo from 'react-timeago'
import SkillSearch from './SkillSearch'
import { UserSkill } from '../types/models'

type SkillListProps = {
  updated?: number
  filterByUserId?: string
}

type fetchSkillsParams = {
  type: string
  userId?: string
}

export default function SkillList({ updated, filterByUserId }: SkillListProps) {
  const { userId } = useAuth()
  let [userSkills, setUserSkills] = useState<UserSkill[]>([])
  let [query, setQuery] = useState<string>("")
  let [isLoading, setIsLoading] = useState(true)

  async function fetchSkills(filterByUserId?: string) {
    let params: fetchSkillsParams = { type: 'TEACH' }

    if (filterByUserId != null) {
      params.userId = filterByUserId
    }

    const response = await fetch('/api?' + new URLSearchParams(params))
    const json = await response.json()
    setUserSkills(json)
  }

  async function deleteSkill(id: number) {
    await fetch('/api', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    fetchSkills()
  }

  useEffect(() => {
    fetchSkills(filterByUserId).then(() => {
      setIsLoading(false)
    })
  }, [updated])

  const filteredSkills = query.length === 0 ?
    userSkills : 
    userSkills.filter(userSkill => userSkill.skill.name.toLowerCase().search(query.toLowerCase()) >= 0)
 
  const timeFormatter = (value: number, unit: TimeAgo.Unit, suffix: TimeAgo.Suffix) => {
    if (unit === 'second') return 'just now';
    const plural: string = value !== 1 ? 's' : '';
    return `${value} ${unit}${plural} ${suffix}`;
  }

  return (
    <>
      { isLoading && <div>Loading...</div> }
      { !isLoading &&
        <>
          <SkillSearch query={query} onChange={event => setQuery(event.target.value)} />

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
                  offered by&nbsp;
                  <Link href={`/user/${userSkill.username}`}>
                    <strong>{userSkill.username}</strong>
                  </Link>
                  &nbsp;
                  <TimeAgo date={userSkill.createdAt} live={false} formatter={timeFormatter} />
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      }
    </>
  )
}

