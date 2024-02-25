import React from "react";
import Box from '@mui/material/Box';


export default function AnimatedScrollDiv({ className, items, style, delayTime }) {
  return (
    <React.Fragment>
      <style>
        {`
        @keyframes verticalMarquee {
          0% {
            top: 100%;
            transform: translateY(0);
          }
          50% {
            top: 0;
            transform: translateY(-100%);
          }
          100% {
            top: 100%;
            transform: translateY(0);
          }
        }
      `}
      </style>
      <Box
        className={"animated-scroll-div " + (className || "")}
        style={{
          position: "relative",
          top: "100%",
          overflow: "hidden",
          ...style
        }}
      >
        <Box
          className="inner"
          style={{
            width: "100%",
            position: "absolute",
            animation: `verticalMarquee 20s linear infinite ${delayTime || 0}s`
          }}
        >
          {items.map((i, idx) => (
            <Box key={idx} sx={{ color: "red", fontSize: "1.5em", borderTop: "1px dashed yellowgreen" }}>{i}</Box>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
}
