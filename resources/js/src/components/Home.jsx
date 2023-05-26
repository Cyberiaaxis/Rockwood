import React from "react";
import "../styles/Home.css";

export default function Home() {
  return (
    <React.Fragment>
      <div className="">
        <table>
          <tbody>
            <tr>
              <th colSpan="2">General Info</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Name :</td>
                      <td>Rockwood</td>
                    </tr>
                    <tr>
                      <td>Money :</td>
                      <td>$3,711,433,647</td>
                    </tr>
                    <tr>
                      <td>Points :</td>
                      <td>10000</td>
                    </tr>
                    <tr>
                      <td>Level :</td>
                      <td>202</td>
                    </tr>
                    <tr>
                      <td>Rank :</td>
                      <td>#19 Celebrity Felon</td>
                    </tr>
                    <tr>
                      <td>Gang :</td>
                      <td>Gang of Wasypur</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Age :</td>
                      <td>20 years</td>
                    </tr>
                    <tr>
                      <td>Partner :</td>
                      <td>Rockwood</td>
                    </tr>
                    <tr>
                      <td>Property :</td>
                      <td>Private Island</td>
                    </tr>
                    <tr>
                      <td>Life:</td>
                      <td>100/100</td>
                    </tr>
                    <tr>
                      <td>Current Location :</td>
                      <td>New Delhi</td>
                    </tr>
                    <tr>
                      <td>Networth :</td>
                      <td>$3,711,433,647</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th colSpan="2">Economical Info</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Eranings :</td>
                      <td>$3,711,433,647</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Total Mugs Collection :</td>
                      <td>$3,711,433,647</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>Stats</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Strength</td>
                      <td>Defense</td>
                      <td>Speed</td>
                      <td>Dexterity</td>
                      <td>Total</td>
                    </tr>
                    <tr>
                      <td>100</td>
                      <td>100</td>
                      <td>100</td>
                      <td>100</td>
                      <td>100</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>Fight Stats</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr className="equalcols">
                      <td>Attack Won</td>
                      <td>Attack Lost</td>
                      <td>Settelment</td>
                      <td>Tie</td>
                      <td>Run Away</td>
                      <td>Total</td>
                    </tr>
                    <tr>
                      <td>100</td>
                      <td>100</td>
                      <td>100</td>
                      <td>100</td>
                      <td>100</td>
                      <td>100</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
