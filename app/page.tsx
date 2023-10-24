'use client'

import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import AddSkillForm from './components/AddSkillForm'
import SkillList from './components/SkillList'

export default function Home() {
  let [updated, setUpdated] = useState(Date.now())

  function skillAddedCallback() {
    setUpdated(Date.now())
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Share a skill</Typography>
        <AddSkillForm callback={skillAddedCallback} />
      </Box>

      <Typography variant="h6">All skills</Typography>
      <SkillList updated={updated} />
    </>
  )
}
