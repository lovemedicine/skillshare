import { useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'

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
          onClick={handleAddSkillClick}
        >Share</Button>
      </Grid>
    </Grid>
  )  
}