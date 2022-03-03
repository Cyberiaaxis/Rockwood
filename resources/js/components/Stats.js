import React, { useState } from "react";
import "../styles/Stats.scss";

const Stats = () => {
    return (
        <React.Fragment>
<div className="StatsBox">
    <div>
        <ul className="statsDetails">
            <li>
              <p>First Stat</p>
                <ul>
                    <li>second item first subitem</li>
                    <li>second item second subitem</li>
                    <li>second item third subitem</li>
                </ul>
            </li>
          <li>Total</li>
          <li>Total</li>
          <li>Total</li>
          <li>Total</li>

        </ul>
    </div>
    <div>
        <ul class="statsDetails">
            <li>
               <p> Second Stat </p>
                <ul>
                    <li>second item first subitem</li>
                    <li>second item second subitem</li>
                    <li>second item third subitem</li>
                </ul>
            </li>
          <li>Total</li>
          <li>Total</li>
          <li>Total</li>
          <li>Total</li>
        </ul>
    </div>
</div>

        </React.Fragment>
    );
};

export default Stats;
