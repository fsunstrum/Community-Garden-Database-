import * as React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";

export default function GardenPlotsTable({ plantedPlots, numPlots }) {
    const length = numPlots;
    let plotOwners = Array.from({ length }).map(() => "");
    console.log(plotOwners);
    plantedPlots.forEach((plot) => {plotOwners[plot[0] - 1] = plot[1]})
    console.log(plantedPlots);
    const imageListItems = plotOwners.map(
        (owner, idx) => 
        <ImageListItem component={Stack} direction="column" justifyContent="center" sx={{ border: 1 }}>
            <Typography align="center">{owner == "" ? idx + 1 : `${idx + 1}: ${owner}`}</Typography>
        </ImageListItem>
    )

    return (
        <ImageList cols={6} rowHeight={164}>
            {imageListItems}
        </ImageList>
    );
}