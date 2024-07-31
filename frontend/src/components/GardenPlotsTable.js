import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import GardenerSelect from './GardenerSelect';
import UnassignPlotButton from './UnassignPlotButton';

export default function GardenPlotsTable({ plots, gardeners, garden, numPlots, callback }) {
    const length = numPlots;
    let plotOwners = Array.from({ length }).map(() => "");
    plots.forEach((plot) => { plotOwners[plot[2] - 1] = plot[0] })
    const imageListItems = plotOwners.map(
        (owner, idx) =>
            <ImageListItem
                key={idx}
                component={Stack}
                direction="column"
                justifyContent="center"
                sx={{
                    // border: '8px solid #8a7972',
                    backgroundColor: owner === "" ? '#e4dfdd' : '#b7dcc1', // grey if no gardener, green if assigned
                    padding: 1,
                    gap: 2,
                }}
            >
                <Typography
                    align="center"
                    sx={{
                        fontFamily: 'Arial, sans-serif', 
                        fontSize: '8px',
                        color: '#505050', 
                    }}
                >
                    {owner === "" ? idx + 1 : `${idx + 1}: ${owner}`}
                </Typography>
                {owner == "" ?
                    <GardenerSelect
                        key={"sel-" + idx}
                        gardeners={gardeners}
                        garden={garden}
                        plotNum={idx + 1}
                        callback={callback}>
                    </GardenerSelect> :
                    <UnassignPlotButton
                        gardener={owner}
                        garden={garden}
                        plotNum={idx + 1}
                        callback={callback}>
                    </UnassignPlotButton>}
            </ImageListItem>
    )

    return (
        <ImageList cols={6} rowHeight={120} gap={20}>
            {imageListItems}
        </ImageList>
    );
}