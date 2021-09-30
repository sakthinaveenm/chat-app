import React, { useState } from "react";
import { CContainer, CNavbarBrand, CNavbar } from "@coreui/react";
export default function Navbar() {
  return (
    <div>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="#" style={{ color: "black" }}>
            Navbar
          </CNavbarBrand>
        </CContainer>
      </CNavbar>
    </div>
  );
}
