import React, { useEffect, useRef } from "react";
import Box from "@material-ui/core/Box";
import "../styles/Inventory.scss";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({});

const Inventory = () => {
    // const classes = useStyles();
    const [leftDisabled, setLeftDisabled] = React.useState(true);
    const [rightDisabled, setRightDisabled] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const myRef = useRef();

    const handleScroll = (e) => {
        // console.log("scroll event:", e.target.scrollLeft);
        if (e.target.scrollLeft <= 0) {
            setLeftDisabled(true);
        } else {
            setLeftDisabled(false);
        }

        // console.dir(e.target);

        if (e.target.scrollLeft + e.target.clientWidth >= e.target.scrollWidth) {
            setRightDisabled(true);
        } else {
            setRightDisabled(false);
        }
    };

    useEffect(() => {
        const myElement = myRef.current;
        if (myRef.current) {
            myElement.addEventListener("scroll", handleScroll);
        }
        return () => {
            myElement.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleRightClick = (e) => {
        myRef.current.scrollLeft += 100;
    };

    const handleLeftClick = (e) => {
        myRef.current.scrollLeft -= 100;
    };

    const showProductInfo = (e) => {
        setShow(true);
        // console.log(e.target.getAttribute("id"));
    };
    //   console.log(show);
    return (
        <React.Fragment>
            <Box component="span" display={show ? "block" : "none"} p={1} m={1}>
                block
            </Box>
            <div className="showcase">
                <button
                    id="slideleft"
                    type="button"
                    disabled={leftDisabled}
                    onClick={handleLeftClick}
                >
                    left
                </button>
                <div id="container" ref={myRef}>
                    <div className="content" onClick={showProductInfo}>
                        <div id="1">One1</div>
                        <div>One2</div>
                        <div>One3</div>
                        <div>One4</div>
                        <div>One5</div>
                        <div>One6</div>
                        <div>One7</div>
                        <div>One8</div>
                        <div>One9</div>
                        <div>One10</div>
                        <div>One11</div>
                        <div>One12</div>
                        <div>One13</div>
                        <div>One14</div>
                        <div>One15</div>
                        <div>One16</div>
                        <div>One17</div>
                        <div>One18</div>
                        <div>One19</div>
                        <div>One20</div>
                        <div>One21</div>
                        <div>One22</div>
                        <div>One23</div>
                        <div>One24</div>
                        <div>One25</div>
                        <div>One26</div>
                        <div>One27</div>
                        <div>One28</div>
                        <div>One29</div>
                        <div>One30</div>
                        <div>One31</div>
                        <div>One32</div>
                        <div>One33</div>
                    </div>
                </div>
                <button
                    id="slideright"
                    disabled={rightDisabled}
                    type="button"
                    onClick={handleRightClick}
                >
                    {" "}
                    right
                </button>
            </div>
        </React.Fragment>
    );
};

export default Inventory;

//source code https://codesandbox.io/s/material-demo-forked-ohjsu?file=/demo.js:0-3112
