// SupervisorTab2.jsx
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import BasicDateCalendar from "../../shared/BasicDateCalender.jsx";
import TaskCard from "../../shared/TaskCard.jsx";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import SpringModal from "../../shared/SpringModal.jsx";
import EditDeleteTask from "./EditDeleteTask.jsx";
import Title from "../../shared/title.jsx";
import { TaskContext } from "../../context/TaskContext.jsx";

export default function SupervisorTab2() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {getSuperTask}=useContext(TaskContext);
  const [ superTask,setSuperTask] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickDelete = () => {

    console.log("Delete action triggered");
    closeModal();
  };
  useEffect(()=>{
    const fetchData=async()=>{
      const {tasks} = await getSuperTask();
      setSuperTask(tasks);
    }
    fetchData();
  },[])
  return (
    <Box>
        <Title title={"Add task"}/>
      <Grid container>
        <Grid item md={7}>
          <Grid container spacing={2}>
            <SpringModal closeModal={closeModal} isModalOpen={isModalOpen} modalContent={<EditDeleteTask closeModal={closeModal} onClickDelete={onClickDelete} />} />
            {superTask.map(task=> (
            <Grid item md={6} onClick={openModal}>
              <TaskCard txt={task.txt} endDate={task.endDate}/>
            </Grid>
            ))}
            
          </Grid>
          <Box sx={{ pt: 2 }}>
            <Link to='addTask'>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgba(43, 1, 62, 0.7)",
                  "&:hover": { backgroundColor: "rgba(43, 1, 62, 0.8)" },
                }}
              >
                Add Task
                <AddCircleIcon sx={{ fontSize: 30, ml:1 }}/>
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item md={5}>
          <BasicDateCalendar
            style={{ border: "1px solid rgba(43, 1, 62, 0.4)" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
