import React from "react";
import {
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  makeStyles
} from "@material-ui/core";
// import AccessibilitySharpIcon from "@material-ui/icons/AccessibilitySharp";
import '../styles/Gym.scss'

const Gym = () => {
  const [state, setState] = React.useState({
    age: "",
    name: "hai"
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="header">
        <p>VIP Member</p>
      </div>
      <div className="flexed">
        <div className="gridded">
          <div className="collectionInput">
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              variant="outlined"
              defaultValue="Small"
              size="small"
            />
          </div>
          <div className="collectionButton">
            <button type="button"> Do </button>
          </div>
          <div className="wrapper">
            <div className="boxHead">Header</div>
            <div className="equipList">
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-native-required">Equipped</InputLabel>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  name="age"
                  inputProps={{
                    id: "age-native-required"
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Dumble</option>
                  <option value={20}>Cardio</option>
                  <option value={30}>Pushup Banch</option>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>{" "}
            </div>
            <div className="description">Description</div>
            <div className="result">Result</div>
          </div>
        </div>
        <div className="gridded">
          <div className="collectionInput">
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              variant="outlined"
              defaultValue="Small"
              size="small"
            />
          </div>
          <div className="collectionButton">
            <button type="button"> Do </button>
          </div>
          <div className="wrapper">
            <div className="boxHead">field three</div>
            <div className="equipList">
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-native-required">Equipped</InputLabel>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  name="age"
                  inputProps={{
                    id: "age-native-required"
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>{" "}
            </div>
            <div className="description">field Five</div>
            <div className="result">field Six</div>
          </div>
        </div>
        <div className="gridded">
          <div className="collectionInput">
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              variant="outlined"
              defaultValue="Small"
              size="small"
            />
          </div>
          <div className="collectionButton">
            <button type="button"> Do </button>
          </div>
          <div className="wrapper">
            <div className="boxHead">field three</div>
            <div className="equipList">
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-native-required">Equipped</InputLabel>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  name="age"
                  inputProps={{
                    id: "age-native-required"
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>{" "}
            </div>
            <div className="description">field Five</div>
            <div className="result">field Six</div>
          </div>
        </div>
        <div className="gridded">
          <div className="collectionInput">
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              variant="outlined"
              defaultValue="Small"
              size="small"
            />
          </div>
          <div className="collectionButton">
            <button type="button"> Do </button>
          </div>
          <div className="wrapper">
            <div className="boxHead">field three</div>
            <div className="equipList">
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-native-required">Equipped</InputLabel>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  name="age"
                  inputProps={{
                    id: "age-native-required"
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>{" "}
            </div>
            <div className="description">field Five</div>
            <div className="result">field Six</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Gym;

//source https://codesandbox.io/s/material-demo-forked-lygbv?file=/gym.css:0-2105