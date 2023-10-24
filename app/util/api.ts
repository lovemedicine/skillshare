type fetchSkillsParams = {
  type: string
  userId?: string
}

export async function fetchSkills(filterByUserId?: string) {
  let params: fetchSkillsParams = { type: 'TEACH' }

  if (filterByUserId != null) {
    params.userId = filterByUserId
  }

  const response = await fetch('/api?' + new URLSearchParams(params))
  return await response.json()
}

export async function addSkill(name: string) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, type: 'TEACH' }),
  })

  return await response.json()
}

export async function deleteSkill(id: number) {
  await fetch('/api', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
}

export async function fetchUser(username: string) {
  const response = await fetch(`/api/user?username=${username}`)
  return await response.json()
}
