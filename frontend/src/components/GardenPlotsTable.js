import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import GardenerSelect from './GardenerSelect';

export default function GardenPlotsTable({ plots, gardeners, garden, numPlots, callback }) {
    const length = numPlots;
    let plotOwners = Array.from({ length }).map(() => "");
    plots.forEach((plot) => {plotOwners[plot[2] - 1] = plot[0]})
    const imageListItems = plotOwners.map(
        (owner, idx) => 
        <ImageListItem key={idx} component={Stack} direction="column" justifyContent="center" sx={{ border: 1 }}>
            <Typography align="center">{owner == "" ? idx + 1 : `${idx + 1}: ${owner}`}</Typography>
            {owner == "" ? 
            <GardenerSelect 
                key={"sel-" + idx} 
                gardeners={gardeners} 
                garden={garden} 
                plotNum={idx + 1}
                callback={callback}>
            </GardenerSelect> : null}
        </ImageListItem>
    )

    return (
        <ImageList cols={6} rowHeight={164}>
            {imageListItems}
        </ImageList>
    );
}