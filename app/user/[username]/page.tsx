'use client'

import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import SkillList from '../../components/SkillList'
import { User } from '../../types/models'
import { fetchUser } from '../../util/api'

type UserPageProps = {
  params: {
    username: string
  }
}

export default function UserPage({ params: { username } }: UserPageProps) {
  let [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUser(username).then(json => setUser(json))
  }, [])

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">User: {username}</Typography>
        { user &&
          <Typography variant="body1">
            <div>email: {user.email}</div>
            { (user.firstName || user.lastName) && <div>name: {user.firstName} {user.lastName}</div> }
          </Typography>
        }
      </Box>

      { user &&
        <>
          <Typography variant="h6">All skills</Typography>
          <SkillList filterByUserId={user.id} />
        </>
      }
    </>
  )
}