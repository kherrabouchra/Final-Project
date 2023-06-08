import { Children, React, useEffect, useState } from "react";
import {
  DashboardContainer,
  DashboardContainerDisplay,
} from "../../Dashboard/DashboardElements";

import {
  BlackBtn,
  GoBack,
  Header,
  TextSub,
} from "../../Global/GlobalComponents";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import api from "../../../api/api";

const NewPathForm = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.form;
    if (form.checkValidity()) {
      try {
        const response = await api.post("paths/create", { name, description });
        console.log(response.data);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  return (
    <div style={{ background: "black", height: "100%" }}>
      <Link to="/instdash/courses">
        <GoBack color={"white"} />
      </Link>
      <DashboardContainerDisplay>
        <DashboardContainer
          style={{
            height: "100%",
            margin: "70px",
          }}
        >
          <Box sx={{ width: "90%", margin: "auto" }}>
            <form onClick={handleSubmit}>
              <Header style={{ margin: "50px 0" }}>Create learning path</Header>
              <TextSub style={{ width: "70%", margin: "10px 100px" }}>
                Tell us about your learning path. Please provide a brief
                description of your learning path, including the name.
              </TextSub>
              <Box
                sx={{ padding: "20px 50px", width: "90%", maxWidth: "100%" }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  id="pathname"
                  style={{ margin: "0 20px" }}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <TextField
                  fullWidth
                  label="Descriprion"
                  id="desc"
                  style={{ margin: "20px" }}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  multiline
                  rows={5}
                  required
                />
                {error && <div className="errmsg">{error}</div>}
              </Box>

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: " 20px 150px",
                  alignItems: "flex-end",
                }}
              >
                <Box sx={{ flex: "1 1 auto" }} />

                <BlackBtn style={{ padding: "10px 16px" }}>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      border: "black",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                    type="submit"
                  >
                    Create
                  </button>
                </BlackBtn>
              </Box>
            </form>
          </Box>
        </DashboardContainer>
      </DashboardContainerDisplay>
    </div>
  );
};

export default NewPathForm;
