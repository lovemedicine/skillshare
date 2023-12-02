'use client'

import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import AddSkillForm from './components/AddSkillForm'
import SkillList from './components/SkillList'
import { UserSkill } from './types/models'
import { fetchSkills } from './util/api'

export default function Home() {
  let [updated, setUpdated] = useState(Date.now())
  let [userSkills, setUserSkills] = useState<UserSkill[]>([])
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSkills().then(result => {
      setUserSkills(result)
      setIsLoading(false)
    })
  }, [])

  async function refreshSkills() {
    const result = await fetchSkills()
    setUserSkills(result)
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Share a skill</Typography>
        <AddSkillForm refreshSkills={refreshSkills} />
      </Box>

      <Typography variant="h6">All skills</Typography>
      <SkillList userSkills={userSkills} isLoading={isLoading} refreshSkills={refreshSkills} />
    </>
  )
}
