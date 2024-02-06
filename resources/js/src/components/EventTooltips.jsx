import React, { useEffect, useState, useRef } from 'react'

import { Box } from '@mui/material';

const BOX_HEIGHT = 40; // lets guess about 40px high :-P

const TOOLTIP_MIN_DELAY = 1000
const TOOLTIP_MAX_DELAY = 4000
const TOOLTIP_DISAPPEAR_DELAY = 8000

let idCounter = 1

const HtmlTooltip = ({ sx, title }) => (
    <div style={{ background: 'black', borderRadius: 20, color: 'white', fontSize: 12, padding: '5px 10px', whiteSpace: 'nowrap' }}>
        {title}
    </div>
)
function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))
}

function isOverlap(boxA, boxB) {
    // this is currently not working because BOX_WIDTH and BOX_HEIGHT are 0
    // we don't know how wide the tooltip will be, so we will detect overlap only on vertical position

    return (
        /*Math.max(boxA.left, boxB.left) < Math.min(boxA.left + BOX_WIDTH, boxB.left + BOX_WIDTH)
        &&*/ Math.max(boxA.top, boxB.top) < Math.min(boxA.top + BOX_HEIGHT, boxB.top + BOX_HEIGHT)
    );
}
// 9911464112 Nitesh
function EventTooltips({ fieldWidth, fieldHeight, events }) {
    // console.log("** fieldWidth **", fieldWidth, "** fieldHeight **", fieldHeight, "events", events);
    const [tooltips, setTooltips] = useState([]);
    const timeoutIdRef = useRef(0)
    const tooltipsRef = useRef(tooltips)
    tooltipsRef.current = tooltips

    useEffect(() => {
        // start new cycle when width, height or events array changes
        displayNextTooltip(0);

        // clear previous cycle
        return () => clearTimeout(timeoutIdRef.current)
    }, [fieldWidth, fieldHeight, events])

    function createNonOverlappingTooltip(tooltipData, id) {
        while (true /* until return */) {
            const isLeftSide = Math.random() < 0.5
            const offsetX = Math.floor(Math.random() * (fieldWidth / 2/*- BOX_WIDTH*/));
            const top = Math.floor(Math.random() * (fieldHeight - BOX_HEIGHT));
            const tooltip = {
                id,
                event: tooltipData.event,
                top,
                [(isLeftSide ? 'left' : 'right')]: offsetX
            }
            const tooltips = tooltipsRef.current
            if (tooltips.find((t) => isOverlap(tooltip, t)) == null)
                return tooltip;
        }
    }

    function displayNextTooltip(index) {
        if (index >= events.length) return

        // display new tooltip
        const tooltipData = events[index]
        const tooltip = createNonOverlappingTooltip(tooltipData, idCounter++)
        setTooltips(tooltips => [...tooltips, tooltip])

        // set timeout to remove this tooltip
        setTimeout(() => {
            setTooltips(tooltips => tooltips.filter(t => t !== tooltip))
        }, TOOLTIP_DISAPPEAR_DELAY)

        // set timeout for next tooltip (wrap index on end of array)
        // we save the timeout id in a ref so we can cancel it later
        var delayBeforeNextTooltip = getRandom(TOOLTIP_MIN_DELAY, TOOLTIP_MAX_DELAY)
        timeoutIdRef.current = setTimeout(() => {
            const nextIndex = index + 1
            displayNextTooltip(nextIndex < events.length ? nextIndex : 0)
        }, delayBeforeNextTooltip)
    }
    // console.log("tooltips having this data", tooltips);
    return (
        tooltips.map((box, idx) => (
            <Box
                sx={{
                    zIndex: 1030,
                    position: "absolute",
                    //height: 0,
                    top: box.top,
                    left: box.left,
                    right: box.right,
                    overflow: "hidden"
                }}
                key={box.id}
            >
                <HtmlTooltip sx={{ top: box.top, left: box.left }} title={box.event} placement='top' open={true} arrow={true}>
                    <Box sx={{ top: box.top, left: box.left }}></Box>
                </HtmlTooltip>
            </Box>
        ))
    )
}

export default EventTooltips
