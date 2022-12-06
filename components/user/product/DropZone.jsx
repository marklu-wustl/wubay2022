/* eslint-disable react-hooks/exhaustive-deps */
import {Box, Button, Divider} from "@mui/material";
import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {H5, Small} from "../../Typography";

const DropZone = ({onChange, title, imageSize}) => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles)
    if (onChange) onChange(acceptedFiles);
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: true,
    accept: ".jpeg,.jpg,.png,.gif",
    maxFiles: 10,
  });
  return (
    <Box
      py={4}
      px={{
        md: 10,
        xs: 4,
      }}
      display="flex"
      minHeight="200px"
      alignItems="center"
      borderRadius="10px"
      border="1.5px dashed"
      flexDirection="column"
      borderColor="grey.300"
      justifyContent="center"
      textalign="center"
      bgcolor={isDragActive ? "grey.200" : "grey.100"}
      sx={{
        transition: "all 250ms ease-in-out",
        outline: "none",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <H5 mb={1} color="grey.600">
        {title || "Drag & drop product image here"}
      </H5>
      <Small mb={1} color="grey.600">{imageSize || "Upload 280*280 image"}</Small>

      <Divider
        sx={{
          "::before, ::after": {
            borderColor: "grey.300",
            width: 70,
          },
        }}
      >
        <Small color="text.disabled" px={1}>
          OR
        </Small>
      </Divider>

      <Button
        type="button"
        variant="outlined"
        color="info"
        sx={{
          px: 4,
          my: 2,
        }}
      >
        Select files
      </Button>


      {!!files && files.map((f)=>{
        return (
          <Small key={f.name} color="grey.600">{f.name}</Small>
        );
      })}
    </Box>
  );
};

export default DropZone;
