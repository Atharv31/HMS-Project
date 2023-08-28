
import { Button } from "react-bootstrap";
import "./employee.css"
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {URL} from "../../config"
const Employee = (props) => {
  const navigate = useNavigate();
  const { serialNo, employee, updateEmployee, setDataChangedFlag } = props;
  const [token] = useState(sessionStorage.getItem("token_admin"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //Remove employee
  const RemoveEmployee = (id) => {

    const url = `${URL}/employee/deleteEmployee/${id}`;
    console.log(url)
    setDataChangedFlag(true)
    axios.delete(url).then((res) => {
      const result = res.data;
      if (result.status === "success" && result.data === "deleted_success") {
        toast.success("remove success")
      } else {
        toast.warning("employee not removed")
      }
      
    }).catch(err => {
      navigate("/error");
    });


  }
  return (
    <tr className="employee-row">
      <td>{serialNo}</td>
      <td>{employee.firstName + " " + employee.lastName}</td>
      <td>{employee.cellNo}</td>
      <td>{employee.role.toUpperCase()}</td>
      <td>{employee.dob}</td>
      <td>{employee.hireDate}</td>
      <td>{employee.salary}</td>
      <td>
        <Button
          className="btn btn-info"

          size="sm"
          style={{ fontSize: "small" }}
          onClick={() => {
            console.log("empid in employee component" + employee.empId);
            updateEmployee(employee.empId, employee);
          }}
        >
          Update
        </Button>
      </td>
      <td>
        <Button
          variant="danger"
          size="sm"
          style={{ fontSize: "small", backgroundColor: 'darkred' }}
          onClick={() => {
            console.log("empid in employee component" + employee.empId);
            RemoveEmployee(employee.empId);
          }}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
};
export default Employee;
