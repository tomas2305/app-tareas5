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
import React, { useEffect, useState } from "react";
import tareaImage from "../assets/tarea.png";
import { Delete } from "@mui/icons-material";

export default function Tarea({
  tarea,
  deleteTarea,
  tacharTarea,
  isTachadaProp,
}) {
  const [isTachada, setIsTachada] = useState(tarea.isTachada);
  const [open, setOpen] = useState(true);
  const [timeoutTarea, setTimeoutTarea] = useState(tarea.timeTarea);

  useEffect(() => {
    setIsTachada(isTachadaProp);
  }, [isTachadaProp]);

  const theme = useTheme();
  const colorTarea = theme.palette.secondary;
  const colorPrimary = theme.palette.primary;

  const cardContentStyle = {
    backgroundColor: colorTarea.main,
    paddingBottom: 1,
    cursor: "pointer"
  };
  const cardActionsStyle = {
    justifyContent: "right",
    backgroundColor: colorTarea.main,
    padding: 0
  };
  const tareaTachadaStyle = {
    backgroundColor: colorTarea.light,
    textDecorationLine: "line-through",
  };

  function tachar() {
    const newTachada = !isTachada;
    setIsTachada(newTachada);
    const tareaTachada = { ...tarea, isTachada: newTachada };
    tacharTarea(tareaTachada);
  }

  const handleDeleteTarea = async () => {
    await closeTarea();
    deleteTarea(tarea.id);
  }

  const closeTarea = () => {
    return new Promise((resolve, reject) => {
      setTimeoutTarea(250);
      setOpen(false);
      setTimeout(() => {
      resolve("Tarea completada");
    }, 300);
    })
    
  };

  return (
    <Grow in={open} timeout={timeoutTarea}>
      <Card sx={{ maxWidth: 345, transition: 'box-shadow 0.5s !important', '&:hover':{
      boxShadow: `-10px 5px ${colorPrimary.main}`,
    }}}>
        <CardMedia
          sx={{ height: 50, backgroundSize: "cover" }}
          image={tareaImage}
          title="tarea"
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
