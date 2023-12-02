import { useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'
import { addSkill } from '../util/api'

type AddSkillFormProps = {
  refreshSkills: () => any
}

export default function AddSkillForm({ refreshSkills }: AddSkillFormProps) {
  let [newSkill, setNewSkill] = useState<string>("")
  let [isValid, setIsValid] = useState<boolean>(true)

  async function handleAddSkill(event) {
    event.preventDefault()

    if (newSkill.length >= 3 && newSkill.length <= 50) {
      await addSkill(newSkill)
      setNewSkill("")
      setIsValid(true)
      refreshSkills()
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