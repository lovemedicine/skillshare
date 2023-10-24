import { useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'

type AddSkillFormProps = {
  callback: () => any
}

export default function AddSkillForm({ callback }: AddSkillFormProps) {
  let [newSkill, setNewSkill] = useState<string>("")
  let [isValid, setIsValid] = useState<boolean>(true)

  async function addSkill(name: string) {
    await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type: 'TEACH' }),
    })

    callback()
  }

  function handleAddSkill(event) {
    event.preventDefault()

    if (newSkill.length >= 3 && newSkill.length <= 50) {
      addSkill(newSkill)
      setNewSkill("")
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <form onSubmit={handleAddSkill}>
      <Grid container>
        <Grid item>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Name of skill"
            onChange={event => setNewSkill(event.target.value)}
            value={newSkill}
            error={!isValid}
            helperText={isValid ? "" : "Skills must be between 3 and 50 characters long"}
            />
        </Grid>
        <Grid item alignItems="stretch" style={{ display: "flex" }}>
          &nbsp;
          <Button
            sx={{ textTransform: 'none' }}
            variant="outlined"
            type="submit"
          >Share</Button>
        </Grid>
      </Grid>
    </form>
  )  
}