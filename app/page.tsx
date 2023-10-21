'use client'

import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import AddSkillForm from './components/AddSkillForm'
import SkillSearch from './components/SkillSearch'
import SkillList from './components/SkillList'
import { UserSkill } from './types/models'

export default function Home() {
  let [userSkills, setUserSkills] = useState<UserSkill[]>([])
  let [query, setQuery] = useState<string>("")
  let [isLoading, setIsLoading] = useState(true)

  async function fetchSkills() {
    let response = await fetch('/api?' + new URLSearchParams({ type: 'TEACH' }))
    let json = await response.json()
    setUserSkills(json)
  }

  useEffect(() => {
    fetchSkills().catch(console.error).then(() => {
      setIsLoading(false)
    })
  }, [])

  async function addSkill(name: string) {
    await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type: 'TEACH' }),
    }).catch(console.error)

    fetchSkills().catch(console.error)
  }

  async function deleteSkill(id: number) {
    await fetch('/api', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).catch(console.error)

    fetchSkills().catch(console.error)
  }

  return (
    <>
      <Typography variant="h6">Share a skill</Typography>
      <AddSkillForm addSkill={addSkill} />

      <Typography variant="h6">All skills</Typography>
      { isLoading && <div className="italic font-bold">Loading...</div> }
      { !isLoading &&
        <>
          <SkillSearch query={query} onChange={event => setQuery(event.target.value)} />
          <SkillList userSkills={userSkills} query={query} deleteSkill={deleteSkill} />
        </>
      }
    </>
  )
}
