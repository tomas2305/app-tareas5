import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import tareaImage from "../assets/tarea.png";
import { Delete } from "@mui/icons-material";

export default function Tarea({tarea, deleteTarea, tacharTarea, timeTarea}) {
  const [isTachada, setIsTachada] = useState(tarea.isTachada);
  const [open, setOpen] = useState(true);
  const [timeoutTarea, setTimeoutTarea] = useState(timeTarea);

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
    tacharTarea({...tarea, isTachada: newTachada});
  }

  function handleDeleteTarea(){
    setTimeoutTarea(250);
    setOpen(false);
    setTimeout(() => deleteTarea(tarea.id), 800)
  }

  return (
    <Grow in={open} timeout={timeoutTarea}>
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
        <Button size="small" onClick={handleDeleteTarea}>
          <Delete />
        </Button>
      </CardActions>
    </Card>
    </Grow>
  );
}
