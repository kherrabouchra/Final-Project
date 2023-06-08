import React, { useState } from "react";
import styled from "styled-components";
import { Card, Button, Input, Form } from "antd";

const { Item } = Form;

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "currentPassword") {
            setCurrentPassword(value);
        } else if (name === "newPassword") {
            setNewPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // validate inputs
        if (!currentPassword || !newPassword || !confirmPassword) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password do not match.");
            return;
        }

        // TODO: send request to backend to update password

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");
    };

    return (
        <Wrapper>
            <Title>Change Password</Title>
            <Form onFinish={handleSubmit}>
                <Item label="Current Password" name="currentPassword" rules={[{ required: true, message: "Please enter your current password" }]}>
                    <Input.Password value={currentPassword} onChange={handleChange} />
                </Item>
                <Item label="New Password" name="newPassword" rules={[{ required: true, message: "Please enter a new password" }]}>
                    <Input.Password value={newPassword} onChange={handleChange} />
                </Item>
                <Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: "Please confirm your new password" }]}>
                    <Input.Password value={confirmPassword} onChange={handleChange} />
                </Item>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>
            </Form>
        </Wrapper>
    );
}

function AdminSettings() {
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleShowChangePassword = () => {
        setShowChangePassword(true);
    };

    const handleHideChangePassword = () => {
        setShowChangePassword(false);
    };

    return (
        <Card title="Change Password" onClick={handleShowChangePassword}>
            {showChangePassword && (
                <div>
                    <ChangePassword />
                    <Button onClick={handleHideChangePassword}>Cancel</Button>
                </div>
            )}
        </Card>
    );
}

export default AdminSettings;
