import { Box, Button, Typography } from "@mui/material";
import React from "react";
import InputCom from "../../shared/InputCom.jsx";
import { useFormik } from "formik";
import axios from "axios";
import { annValidation } from "../../validation/validation.js";
export default function Announcement() {
  const token = localStorage.getItem("userToken");
  const initialValues = {
    subject: "",
    message:""
  };
  const onSubmit = async (values) => {
    try {
      const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/admin/sendAnn`, values, {
        headers: { token: `Bearer ${token}` },
      });
      showSnackbar({
        message: "Announcement sent successfully",
        severity: "success",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      showSnackbar({
        message:"submission failed",
        severity: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema:annValidation,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const inputs = [
    {
      id: "subject",
      type: "text",
      name: "subject",
      title: "Subject",
      rows:1
    },
    {
      id: "message",
      type: "text",
      name: "message",
      title: "Announcement text",
      rows:5
    },
  ];
  const renderInputs = inputs.map((input, index) => (
    <InputCom
      type={input.type}
      name={input.name}
      id={input.id}
      title={input.title}
      value={input.value}
      key={index}
      placeholder={input.name}
      multiline
      rows={input.rows}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      errors={formik.errors}
    />
  ));
  return (
    <Box
      sx={{
        ml: { md: "240px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%", textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontSize: "30px",
            my: 5,
            fontWeight: "bold",
          }}
        >
          Send Announcement
        </Typography>
        <form onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
          <Box sx={{ textAlign: "center" }}></Box>
          {renderInputs}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#135D66",
              "&:hover": {
                backgroundColor: "#77B0AA",
              },
            }}
            type="submit"
          >
           Send
          </Button>
        </form>
      </Box>
    </Box>
  );
}
