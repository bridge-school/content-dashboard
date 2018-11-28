import * as React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import ChipInput from 'material-ui-chip-input';
import { Teacher } from '../../state/reducers/teacher';


export const CohortDesigner = ({cohortName, teachers = []}: { cohortName?: string, teachers: Teacher[] }) => (
  <Grid container spacing={16} className="flex-auto h-inherit">

    <Grid item xs={12}>
      <Typography variant={cohortName ? 'h3' : 'h5'} color={cohortName ? 'primary' : 'secondary'} gutterBottom>
        {cohortName || '...Enter a Cohort Name'}
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <TextField label="Cohort Name..." style={{marginBottom: '10px', marginRight: '20px', width: '50%'}}/>
    </Grid>

    <Grid item xs={6}>
      <DatePicker
        style={{marginRight: '20px', width: '50%'}}
        keyboard
        value={new Date()}
        clearable
        label="Start Date"
        onChange={(e) => console.log(e)}
        animateYearScrolling={false}
      />
    </Grid>

    <Grid item xs={6}>
      <DatePicker
        keyboard
        style={{width: '50%'}}
        value={new Date()}
        clearable
        label="End Date"
        onChange={(e) => console.log(e)}
        animateYearScrolling={false}
      />
    </Grid>

    <Grid item xs={6}>
      <ChipInput
        label="Teachers"
        style={{marginRight: '20px', width: '100%'}}
        value={[]}
        dataSource={teachers.map(t => t.name)}
        onAdd={(ta) => console.log(ta)}
        onDelete={(chip, index) => console.log(chip, index)}
      />
    </Grid>
    <Grid item xs={6}>
      <ChipInput
        label="TAs"
        style={{width: '100%'}}
        value={[]}
        dataSource={teachers.map(t => t.name)}
        onAdd={(ta) => console.log(ta)}
        onDelete={(chip, index) => console.log(chip, index)}
      />
    </Grid>

  </Grid>);