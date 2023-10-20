import { useState } from 'react'

type AddSkillFormProps = {
  addSkill: (name: string) => void
}

export default function AddSkillForm({ addSkill }: AddSkillFormProps) {
  let [newSkill, setNewSkill] = useState<string>("")
  let [isValid, setIsValid] = useState<boolean>(true)

  function handleAddSkillClick() {
    if (newSkill.length >= 3 && newSkill.length <= 50) {
      addSkill(newSkill)
      setNewSkill("")
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <div className="mb-5">
      <input
        className="block p-5 mb-3 w-full text-gray-900 rounded-lg border border-gray-400"
        placeholder="Enter the name of a new skill here..."
        onChange={event => setNewSkill(event.target.value)}
        value={newSkill}
        />
      <button
        className="inline-block p-2 bg-gray-300 rounded-md text-black border border-gray-400"
        onClick={handleAddSkillClick}>Add Skill</button>
      { !isValid &&
        <div className="inline-block ml-5 text-red font-bold text-red-500">
          Skills must be between 3 and 50 characters long
        </div>
      }
    </div>
  )  
}