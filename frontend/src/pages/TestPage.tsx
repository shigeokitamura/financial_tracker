import React from "react";
import { useAuth } from "../providers/auth";

const TestPage: React.FC = () => {
  // const { currentUser, token, logout, setCurrentUser } = useAuth();
  const { currentUser } = useAuth();

  if (currentUser) {
    console.log(currentUser);
  }

  return (
    <>
      { currentUser ? <p>logged in as {currentUser.name}</p> : <p>Please Log In</p> }
    </>
  )
}

export default TestPage;
