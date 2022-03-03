import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import AddIcon from '@material-ui/icons/Add';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  // console.log(props);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  headInfo: {
    marginBottom: '20px',
    '& ul': {
      display: 'flex',
      listStyle: 'none',
      paddingLeft: '0px'
    },
    '& ul > li': {
      textTransform: 'uppercase',
      color: 'gold',
      backgroundColor: 'blue',
      width: '100%',
      borderRadius: '0.5em',
      textAlign: 'center',
      boxShadow: '0px 0px 5px  red'
    }
  },
  flexed: {
    display: 'flex',
    height: '100%'
  },
  infoPanel: {
    paddingLeft: '4%',
    width: '65%'
  },
  imagePanel: {
    height: '400px',
    width: '250px',
    position: 'relative',
    border: 'thick double #32a1ce',
    marginLeft: '3%',
    backgroundImage:
      "url('https://i.picsum.photos/id/938/1080/600.jpg?hmac=p8IV6lRZ5b_Qsh0qT5cJoQtQHKJtUI4T9tDtKyPmyhA')",
    backgroundSize: 'auto min(100%)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  imageHeader: {
    textAlign: 'center',
    color: 'red'
  },
  ratingButtons: {
    width: '100%',
    display: 'flex',
    height: '6%',
    flexFlow: 'row no-wrap',
    position: 'absolute',
    fontSize: '1.2em',
    bottom: 0,
    color: 'green',
    marginLeft: '0',
    justifyContent: 'center'
  },
  playerinfo: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    '& div ul': {
      listStyle: 'none',
      marginBottom: '0'
    },
    '& div': {
      width: '50%',
      textAlign: 'center'
    },
    '& div ul > li:first-child ': {
      border: 'dashed black',
      textTransform: 'uppercase',
      width: '100%',
      color: 'red',
      backgroundColor: 'green',
      width: '100%',
      borderRadius: '1em',
      textAlign: 'center',
      height: '2em'
    },
    '& div ul > li': {
      textAlign: 'left'
    },
    '& div ul > li:not(li:first-child):hover': {
      backgroundColor: 'yellow'
    },
    '& div ul > li > span': {
      fontWeight: 'bold'
    },
    '& div ul > li > img': {
      width: '100%',
      height: '100%'
    },
    '& div ul > li > b': {
      textAlign: 'center'
    }
  }
}));
function timer() {
  const t1 = performance.now();
  // console.log(`Call to doSomething took ${t1} milliseconds.`);
}
// console.log(timer());
const Profile = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <div className={classes.headInfo}>
        <ul>
          <li>one</li>
          <li>one</li>
          <li>one</li>
          <li>one</li>
          <li>one</li>
        </ul>
      </div>
      <div className={classes.flexed}>
        <div className={classes.imagePanel}>
          <div className={classes.imageHeader}>Name Here</div>
          <div className={classes.ratingButtons}>
            <AddIcon />
            hello
            <IndeterminateCheckBoxIcon />
          </div>
        </div>
        <div className={classes.infoPanel}>
          <AppBar position="static" color="default">
            <Tabs
              xs={12}
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable force tabs example"
            >
              <Tab
                label="General Infomation"
                icon={<PhoneIcon />}
                {...a11yProps(0)}
              />
              <Tab
                label="Communication"
                icon={<FavoriteIcon />}
                {...a11yProps(1)}
              />
              <Tab
                label="PLayer Signature"
                icon={<PersonPinIcon />}
                {...a11yProps(2)}
              />
              <Tab label="Display" icon={<HelpIcon />} {...a11yProps(3)} />
              <Tab
                label="Item Five"
                icon={<ShoppingBasket />}
                {...a11yProps(4)}
              />
              <Tab label="Report" icon={<ThumbDown />} {...a11yProps(5)} />
              <Tab label="Comment" icon={<ThumbUp />} {...a11yProps(6)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <div className={classes.playerinfo}>
              <div>
                <ul>
                  <li>
                    <b>heading</b>
                  </li>
                  <li>
                    <img
                      src="images/dinosaur.jpg"
                      alt="The head and torso of a dinosaur  skeleton; it has a large head with long sharp teeth"
                    />
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>
                    <b>heading</b>
                  </li>
                  <li>
                    <span>Part-1 : </span> Part-2
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>
                    <b>heading</b>
                  </li>
                  <li>
                    <span>Part-1 : </span> Part-2
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>
                    <b>heading</b>
                  </li>
                  <li>
                    <span>Part-1 : </span> Part-2
                  </li>
                </ul>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="">player personal infomation come here</div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="communication">
              player personal infomation come here
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className="comment">player personal infomation come here</div>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <div className="signature">
              player personal infomation come here
            </div>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <div className="itemdisplay">
              player personal infomation come here
            </div>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <div className="report">player personal infomation come here</div>
          </TabPanel>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;