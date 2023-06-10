import React, { useEffect } from "react";
import {
  Banner,
  P,
  BlackBtn,
  PurpleBtn,
  SubHeader,
  TextSub,
  Header,
} from "../Global/GlobalComponents";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons-react";
import { Box, NavLink } from "@mantine/core";
import api from "../../api/api";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
const nav = [
  {
    icon: IconGauge,
    label: "General",
    description: "Update your personal informations",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  {
    icon: IconFingerprint,
    label: "Security",
    description: "Change your password",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  {
    icon: IconActivity,
    label: "More",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
];

const AccountSettings = ({ user, log }) => {
  const [active, setActive] = useState(0);
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [dev, setDev] = useState({});
  const [logged, setLogged] = useState(log);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  console.log(log);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/user/${user.userID}`);

      setDev(response.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const [data, setData] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    education: "",
    work_experience: "",
    password: "",
    repeatPassword: "",
  });

  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value || "", // Set default value to an empty string if null
    }));
  };

  const validatePassword = () => {
    if (data.password !== data.repeatPassword) {
      setError("Password and repeated password do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogout = () => {
    api
      .get(`/logout`)
      .then((res) => {
        console.log("logged out!");
        window.location.reload();
        navigate("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    api
      .delete(`/user/${user.userID}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Status);
        } else {
          setError(res.data.Error);
        }
        handleLogout();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    const isValidPassword = validatePassword();

    if (!isValidPassword) {
      // Password is not valid, return or handle the error
      return;
    }
    try {
      const updatedData = {
        username: data.username,
        email: data.email,
        country: data.country, // Set default value to an empty string if null
        city: data.city, // Set default value to an empty string if null
        education: data.education, // Set default value to an empty string if null
        work_experience: data.work_experience, // Set default value to an empty string if null
        password: data.password,
      };
      const response = await api.put(`user/dev/${user.userID}`, updatedData);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const items = nav.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      onClick={() => setActive(index)}
      color="violet"
      style={{ background: "white" }}
      variant="subtle"
    />
  ));

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setData({
      username: dev.username,
      email: dev.email,
      country: dev.country,
      city: dev.city,
      education: dev.education,
      work_experience: dev.work_experience,
      password: "",
      repeatPassword: "",
    });
  }, [dev]);

  return (
    <div
      style={{
        display: "flex",
        background: "#F8F8F8",
        height: "100vh",
        padding: "160px",
      }}
    >
      <div style={{ marginRight: "60px" }}>
        <SubHeader style={{ margin: " 0", width: "100%" }}>
          Account settings
        </SubHeader>

        <Box w={300}>{items}</Box>
      </div>
      <div style={{ flex: 1, alignSelf: "baseline", marginRight: "60px" }}>
        {active === 0 && (
          <>
            <Input
              bordered
              fullWidth="true"
              size="lg"
              label="Username"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <Input
              bordered
              fullWidth="true"
              size="lg"
              label="Email"
              name="email"
              type="text"
              value={data.email}
              onChange={handleChange}
            />
            <Input
              bordered
              fullWidth="true"
              size="lg"
              label="Country"
              name="country"
              type="text"
              value={data.country}
              onChange={handleChange}
            />
            <Input
              bordered
              fullWidth="true"
              size="lg"
              label="City"
              name="city"
              type="text"
              value={data.city}
              onChange={handleChange}
            />
            <Input
              bordered
              fullWidth="true"
              size="lg"
              label="Education"
              name="education"
              type="text"
              value={data.education}
              onChange={handleChange}
            />
            <Input
              bordered
              fullWidth="true"
              size="lg"
              label="Work experience"
              name="work_experience"
              type="text"
              value={data.work_experience}
              onChange={handleChange}
            />
          </>
        )}
        {active === 1 && (
          <>
            <Input
              bordered
              fullWidth="true"
              size="lg"
              label="Password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              /* endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              } */
            />
            <Input
              bordered
              fullWidth="true"
              size="lg"
              label="Confirm new password"
              name="repeatPassword"
              type="password"
              value={data.repeatPassword}
              onChange={handleChange}
            />
            <div className="errmsg">{error}</div>
          </>
        )}

        {active === 2 && (
          <>
            <div>
              <SubHeader style={{ margin: "0" }}>Delete account?</SubHeader>
              <P>All your data will be deleted permenetly.</P>
            </div>
          </>
        )}

        {active !== 2 ? (
          <PurpleBtn
            onClick={handleSubmit}
            style={{ margin: "40px 0 0 80%", padding: "14px" }}
          >
            Save changes
          </PurpleBtn>
        ) : (
          <BlackBtn
            onClick={handleDelete}
            style={{ margin: "40px  70% 0 0", padding: "16px" }}
          >
            Delete my account
          </BlackBtn>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
