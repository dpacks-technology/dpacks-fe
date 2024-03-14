import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CardTemp from './Card';


export default function GridView(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 2, md: 12 }}>
        {props.data.map((value) => (
          <Grid item xs={2} sm={4} md={4} key={value}>
            <CardTemp title={value.title} secondDes={value.secondaryDescription} description={value.tertiaryDescription} buttons={value.buttons} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
