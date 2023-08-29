import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { URL } from "../../../config";

const MedicineAdminDetails = (props) => {
  const { medicine, setDataChangeFlagRemoveMedicine } = props;
  const navigate = useNavigate();
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
  //to set defaults of axios header
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //delete ward on server
  const removeMedicine = () => {
    const url = `${URL}/medicine/removeMedicine/${medicine.medicineId}`;
    axios.delete(url).then((res) => {
      const result = res.data;
      console.log(result);
      if (result.status == "success") {
        setDataChangeFlagRemoveMedicine(true);
        toast.success("medicine removed success");
      }
    }).catch(err => {
      navigate("/error");
    });
  };

  return (
    <tr>
      <td>{medicine.medicineName}</td>
      <td>{medicine.medicinePrice}</td>
      <td ><Button size="sm"  onClick={removeMedicine} style={{ margin: "6px" , backgroundColor:'maroon'}}>
        Remove
      </Button></td>
    </tr>
  );
};
export default MedicineAdminDetails;
