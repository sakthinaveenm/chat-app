import { CCard, CCardBody } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function RoomList({ room }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>Room List</h3>
      {room &&
        room.map((val) => {
          return (
            <Link key={val._id} to={`/chat/${val._id}/${val.name}`}>
              <CCard style={{ width: "150px", margin: "10px" }}>
                <CCardBody>
                  <h2>{val.name}</h2>
                </CCardBody>
              </CCard>
            </Link>
          );
        })}
    </div>
  );
}
