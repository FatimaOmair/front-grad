import  { useState, useEffect } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import CardComp3 from "../HeadOD/Head2/CardComp3.jsx";
import SpringModal from "./SpringModal.jsx";
import SupervisorName from "../student/Booking/SupervisorName.jsx";
import GetStudentName from "./GetStudentName.jsx";
import Pagination from '@mui/material/Pagination';
import Title from "./title.jsx";

export default function DynamicSection2({ getSections, flag = true }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [section, setSection] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sections = await getSections();
        setSection(sections);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchData();
  }, [getSections]);

  const openModal = (students) => {
    setRowData(students);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const itemsPerPage = 3;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const paginatedSections = section.slice(firstIndex, lastIndex);

  return (
    <Box sx={{padding:"0px 70px"}}>
      <Title title={"Your sections"} />
      <Grid container spacing={2}>
        {paginatedSections.map((sec) => (
          <Grid item xs={12} sm={6} md={4} key={sec._id}>
            <CardComp3
              title={`Section Number: ${sec.num}`}
              description={
                <>
                  {flag && <SupervisorName userId={sec.userId} />}
                </>
              }
              onClickLearnMore={() => openModal(sec.students)}
              flag={flag}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, }}>
        <Pagination
          count={Math.ceil(section.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
        />
      </Box>
      <SpringModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        modalContent={
          <>
            <Avatar
              src="/image/student.png"
              alt="section student"
              sx={{ width: "15%", height: "15%", margin: "auto", border: "1px solid black" }}
            />

            <Box sx={{ textAlign: "center", pt: 2 }}>
              <Typography>Students: </Typography>
              {rowData && rowData.map((studentId) => (
                <GetStudentName key={studentId} userId={studentId} />
              ))}
            </Box>
          </>
        }
      />
    
    </Box>
  );
}
