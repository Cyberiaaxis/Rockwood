import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Signature() {
  const [editorContent, setEditorContent] = React.useState("");

  // Function to handle saving the content
  const handleSave = () => {
    // Implement your save logic here
    console.log("Saved Content:", editorContent);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        height: "auto", // Ensure container can grow based on content
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Space between editor and button
        width: "100%", // Ensure full width
        padding: 0
      }}
    >
      <Typography variant="h6" gutterBottom>
        Signature Editor
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          height: "200px", // Set a fixed height for the editor container
        }}
      >
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          theme="snow"
          placeholder="Write your signature here..."
          style={{ height: "60%" }} // Fill the container height
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"] // Adds the option to clear formatting
            ]
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 0 }} // Margin top for spacing from editor
      >
        Save
      </Button>
    </Box>
  );
}
