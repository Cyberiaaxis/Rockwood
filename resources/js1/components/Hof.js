import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { DataGrid } from "@material-ui/data-grid";
// import { useDemoData } from "@material-ui/x-grid-data-generator";
import Http from '../libraries/gameServerApi';

// const useStyles = makeStyles({});

function loadServerRows(page, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.rows.slice(page * 5, (page + 1) * 5));
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

const Hof = () => {
//   const { data } = useDemoData({
//     dataSet: "",
//     rowLength: 100,
//     maxColumns: 6
//   });

  // const classes = useStyles();
  const [value, setValue] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handlePageChange = (params) => {
    // console.log(params);
    setPage(params.page);
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(page, data);
      // console.log(newRows);
      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, data]);
  // console.log(data);
  return (
    <React.Fragment>
      <BottomNavigation
        value={value}
        onChange={async (event, newValue) => {

          const  result =  Http(newValue,{method: 'post',data}); //data will be come from here
          // console.log(result);
          // console.log(result);
          // console.log(newValue);
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="List1" value="List1" icon={<RestoreIcon />} />
        <BottomNavigationAction label="List2" value="List2" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="List3" value="List3" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="List4" value="List4" icon={<RestoreIcon />} />
        <BottomNavigationAction label="List5" value="List5" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="List6" value="List6" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="List7" value="List7" icon={<RestoreIcon />} />
        <BottomNavigationAction label="List8" value="List8" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="List9" value="List9" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={data.columns}
          pagination
          pageSize={5}
          rowCount={100}
          paginationMode="server"
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>
    </React.Fragment>
  );
};

export default Hof;

//test case https://codesandbox.io/s/material-demo-forked-mugv7?file=/demo.js

