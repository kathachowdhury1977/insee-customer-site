import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import { withStyles } from "@material-ui/core/styles";

const CardComponent = (props, classes) => {
  //   const styles = (muiBaseTheme) => ({
  //     card: {},
  //   });
  const { header, content, footer, height, width } = props;
  return (
    <>
      <Card sx={{ height: height, width: width }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14, textAlign: "center" }}
            color="text.secondary"
          >
            {header}
            <h3>{content}</h3>
            {footer}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CardComponent;
