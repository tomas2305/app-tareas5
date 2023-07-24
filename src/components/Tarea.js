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
  const tarea = props.tarea
  const [isTachada, setIsTachada] = useState(tarea.isTachada);

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
    const newTachada = !isTachada;
    setIsTachada(newTachada);
    props.tacharTarea({...tarea, isTachada: newTachada});
  }

  function deleteTarea(){
    props.deleteTarea(tarea.id);
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
          {tarea.input}
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
