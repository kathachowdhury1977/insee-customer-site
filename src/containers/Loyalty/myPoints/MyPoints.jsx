import React from "react";
import "./MyPoints.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Controls from "../Controls";
import GraphComponent from "../GraphComponent";
import Grid from "@mui/material/Grid";

const MyPoints = () => {
  return (
    <div className="MyPointsContainer">
      <div className="TransReedContainer">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Controls.CardComponent
              header={"Last Points Transaction"}
              content={"100.00"}
              footer={"on 20-12-2022"}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controls.CardComponent
              header={"Last Points Transaction"}
              content={"100.00"}
              footer={"on 20-12-2022"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="MyPointsFltrContainer">
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Controls.DatePicker
                    name="createdDateFrom"
                    label="Created Date From"
                    // maxDate={filterValues.createdDateTo || new Date()}
                    // value={filterValues.createdDateFrom}
                    // onChange={handleFilterChange}
                    // disable={filterValues.disableFilters}
                    // error={filterErr.createdDateFrom}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controls.DatePicker
                    name="createdDateFrom"
                    label="Created Date From"
                    // maxDate={filterValues.createdDateTo || new Date()}
                    // value={filterValues.createdDateFrom}
                    // onChange={handleFilterChange}
                    // disable={filterValues.disableFilters}
                    // error={filterErr.createdDateFrom}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="ExpCardContainer">
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <Controls.CardComponent
                  header={"Expiring"}
                  content={"10.00"}
                  footer={"on 01-01-2022"}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controls.CardComponent
                  header={"Expiring"}
                  content={"20.00"}
                  footer={"on 02-02-2022"}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controls.CardComponent
                  header={"Expiring"}
                  content={"30.00"}
                  footer={"on 03-03-2022"}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <GraphComponent></GraphComponent>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyPoints;
