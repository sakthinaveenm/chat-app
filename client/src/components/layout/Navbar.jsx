import { CContainer, CNavbarBrand, CNavbar } from "@coreui/react";
import { Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../userContext";

export default function Navbar() {
  const { user, setUser } = useContext(userContext);

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/logout");
      const data = res.json();
      console.log("logout data", data);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="#" style={{ color: "black" }}>
            Navbar
          </CNavbarBrand>
          <Button
            onClick={() => {
              logout();
            }}
          ></Button>
        </CContainer>
      </CNavbar>
    </div>
  );
}
