import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../../context/TaskContextProvider.jsx";
import { userContext } from "../../context/StudentContextProvider.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Avatar, Box, Container } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewTask({ open, onClose, taskId }) {
  const { getTaskById,checkSubmission } = useContext(TaskContext);
  const { getStudentSection } = useContext(userContext);
  const [sectionId, setSectionId] = useState();
  const [homeWork, setHomeWork] = useState({});
  const [subMesg, setSubMesg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await getTaskById(taskId);
        setHomeWork(task.tasks);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    
    const getSection = async () => {
      try {
        const mySection = await getStudentSection();
        setSectionId(mySection.section._id);
      } catch (error) {
        console.error("Error fetching section:", error);
      }
    };

    fetchData();
    getSection();
  }, [getTaskById, taskId, getStudentSection]);

  useEffect(() => {
    const fetchSubmission = async () => {
      const sub = await checkSubmission(sectionId,taskId);
      console.log(sub)
      setSubMesg(sub);
    }
    fetchSubmission(sectionId, taskId)
  }, [taskId, sectionId]);

  return (
    <Container>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        classes={{ paper: "dialog-paper" }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "rgba(0, 60, 67, 0.7)" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              You have a new assignment!
            </Typography>
            <Button autoFocus color="inherit" onClick={onClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: "flex", justifyContent: "center", width: "60%", margin: "auto", flexDirection: "column", height: "100%" }}>
          <Box sx={{ p: 3, border: "2px solid rgba(0, 60, 67, 0.7)", textAlign: "center", borderRadius: "20px", m: 3, backgroundColor: "rgba(255, 255, 255)" }}>
            <Typography sx={{ fontWeight: "bold", py: 1 }} variant="h4">
              Let's do it !
            </Typography>
            <Typography sx={{ color: "black" }}>
              <span>{homeWork && homeWork.txt}</span>
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "center",
                textAlign: "center",
                p: 1,
                m: 2,
                borderRadius: "15px"
              }}
              onClick={() => {
                if (homeWork && homeWork.file) {
                  window.open(homeWork.file, "_blank");
                }
              }}
            >
              <Avatar alt="pdf logo" src="/image/file.png" sx={{ mr: 2, border: "1px solid #000" }} />
              <Typography
                variant="body1"
                component="a"
                href={homeWork && homeWork.file}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                See the File
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              
             {subMesg ?  <Link to={`editTask/${sectionId}/${taskId}`}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#135D66",
                    "&:hover": {
                      backgroundColor: "#77B0AA",
                    },
                  }}
                >
                  Edit your Submission
                </Button>
              </Link>:<Link to={`submitTask/${sectionId}/${taskId}`}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#135D66",
                    "&:hover": {
                      backgroundColor: "#77B0AA",
                    },
                  }}
                >
                  Add your Submission
                </Button>
              </Link>}
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
            Feedback: {homeWork && homeWork.feedback}
          </Box>
          <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
            End at: {homeWork && homeWork.endDate && homeWork.endDate.split("T")[0]}/{homeWork && homeWork.endDate && homeWork.endDate.split("T")[1].slice(0, -1)}
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
