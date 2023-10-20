import { useUser } from '@clerk/nextjs'
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
        <div key={userSkill.id} className="p-5 mb-5 border border-gray-400 rounded-md bg-white text-black">
          <div>
            <span className="text-2xl">{userSkill.skill.name}</span>
            { false && <button className="text-sm text-blue-700" onClick={() => deleteSkill(userSkill.id)}>delete</button> }
          </div>
          <div className="text-sm">
            offered by <span className="font-bold">{userSkill.username}</span> on {userSkill.createdAt.split("T")[0]}
          </div>
        </div>
      ))}
    </div>
  )
}

