import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import tareaImage from "../assets/tarea.png";
import { Delete } from "@mui/icons-material";

export default function Tarea(props) {
  const [isTachada, setIsTachada] = useState(false);

  const theme = useTheme();
  const colorTarea = theme.palette.secondary;
  const cardContentStyle = {
    backgroundColor: colorTarea.main,
    paddingBottom: 1,
    cursor: "pointer",
  };
  const cardActionsStyle = {
    justifyContent: "right",
    backgroundColor: colorTarea.main,
    padding: 0,
  };
  const tareaTachadaStyle = {
    backgroundColor: colorTarea.light,
    textDecorationLine: "line-through",
  };

  function tachar() {
    setIsTachada(!isTachada);
  }

  function deleteTarea(){
    props.deleteTarea(props.id);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 50, backgroundSize: "cover" }}
        image={tareaImage}
        title="green iguana"
      />
      <CardContent
        onClick={tachar}
        sx={
          isTachada
            ? { ...cardContentStyle, ...tareaTachadaStyle }
            : cardContentStyle
        }
      >
        <Typography gutterBottom variant="h6" component="div">
          {props.input}
        </Typography>
      </CardContent>
      <CardActions
        sx={
          isTachada
            ? { ...cardActionsStyle, ...tareaTachadaStyle }
            : cardActionsStyle
        }
      >
        <Button size="small" onClick={deleteTarea}>
          <Delete />
        </Button>
      </CardActions>
    </Card>
  );
}
