import { Box, Typography } from '@mui/material'
import React from 'react'
import SchoolIcon from '@mui/icons-material/School';

export default function UsersFooter({description}) {
  return (
    <Box sx={{backgroundColor: "#003C43", display: "flex", alignItems: "center", justifyContent: "center",py:1,mt:5, px:{xs:2,md:0} }}>
      <SchoolIcon sx={{fontSize:{xs:60, md:80,color:"#fff"},pr:2}}/>
      <Box sx={{ textAlign: "center", ml: 1 }}>
        <Typography sx={{ textAlign: "center",fontWeight:"bold",fontSize:{xs:15, md:20},color:"#fff" }}>{description}</Typography>
      </Box>
    </Box>
  )
}
