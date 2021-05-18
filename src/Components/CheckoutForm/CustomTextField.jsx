import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
           <Controller 
            render={({ field }) => <TextField {...field} label={label}/>}
            control={control} 
            fullWidth 
            name={name}
            required/>
    </Grid>
  );
}

export default FormInput;