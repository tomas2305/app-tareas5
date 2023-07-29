import React, { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import {
  DoneAllOutlined,
  LayersClearOutlined,
  PostAddOutlined,
  RemoveDoneOutlined,
} from "@mui/icons-material";

export default function OpenIconSpeedDial({ setOpenAddTareas, deleteAllTareas, tacharAllTareas }) {

  const [open, setOpen] = useState(false);

  const handleAddTarea = () => {
    setOpen(false);
    setOpenAddTareas(true);
  };

  return (
    <Box sx={{position: "fixed", bottom: 20, right: 80, height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        <SpeedDialAction
          key={"Añadir Tarea"}
          icon={<PostAddOutlined />}
          tooltipTitle={"Añadir Tarea"}
          onClick={handleAddTarea}
        />
        <SpeedDialAction
          key={"Borrar Todas Las Tareas"}
          icon={<LayersClearOutlined />}
          tooltipTitle={"Borrar Todas Las Tareas"}
          onClick={deleteAllTareas}
        />
        <SpeedDialAction
          key={"Tachar Todas Las Tareas"}
          icon={<RemoveDoneOutlined />}
          tooltipTitle={"Tachar Todas Las Tareas"}
          onClick={() => tacharAllTareas(true)}
        />
        <SpeedDialAction
          key={"Destachar Todas Las Tareas"}
          icon={<DoneAllOutlined />}
          tooltipTitle={"Destachar Todas Las Tareas"}
          onClick={() => tacharAllTareas(false)}
        />
      </SpeedDial>
    </Box>
  );
}
