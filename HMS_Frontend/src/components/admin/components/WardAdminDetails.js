import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { URL } from "../../../config";

const WardAdminDetails = (props) => {
  const { ward, removeWard } = props;
  const navigate = useNavigate();
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
  //to set defaults of axios header
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //delete ward on server
  

  return (
    <tr>
      <td>{ward.type}</td>
      <td>{ward.maxCapacity}</td>
      <td><Button
        size="sm"
        variant="danger"
        onClick={()=>removeWard(ward.wardId)}
        style={{ margin: "6px",backgroundColor:"maroon" }}
      >
        Remove
      </Button></td>
    </tr>
  );
};
export default WardAdminDetails;
