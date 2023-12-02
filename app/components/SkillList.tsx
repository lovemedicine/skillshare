import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import SkillSearch from './SkillSearch'
import Skill from './Skill'
import { UserSkill } from '../types/models'

type SkillListProps = {
  userSkills: UserSkill[]
  isLoading: boolean
  refreshSkills: () => any
}

export default function SkillList({ userSkills, isLoading, refreshSkills }: SkillListProps) {
  const { userId } = useAuth()
  let [query, setQuery] = useState<string>("")

  const filteredSkills = query.length === 0 ?
    userSkills :
    userSkills.filter(userSkill => userSkill.skill.name.toLowerCase().search(query.toLowerCase()) >= 0)

  function isOwnSkill(userSkill: UserSkill) {
    return userSkill.userId === userId
  }

  return (
    <>
      { isLoading && <div>Loading...</div> }
      { !isLoading &&
        <>
          <SkillSearch query={query} onChange={event => setQuery(event.target.value)} />

          { filteredSkills.map(userSkill => (
            <Skill isOwnSkill={isOwnSkill(userSkill)} userSkill={userSkill} refreshSkills={refreshSkills} />
          )) }
        </>
      }
    </>
  )
}

