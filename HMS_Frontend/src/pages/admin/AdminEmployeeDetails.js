import {
  Button,
  Navbar,
  Container,
  Nav,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Employee from "../../components/admin/employee";
import "./adminDetails.css";

import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../config";
import axios from "axios";

import AddNewEmployeeModal from "../../components/admin/addNewEmployeeModal";
import RemoveEmployeeModal from "../../components/admin/removeEmployeeModal";
import UpdateEmployeeModal from "../../components/admin/updateEmployee";
import AddWardModal from "../../components/admin/components/AddWardModal";
import RemoveWardModal from "../../components/admin/components/RemoveWardModal";
import AddMedicineModal from "../../components/admin/components/AddMedicineModal";
import RemoveMedicineModal from "../../components/admin/components/RemoveMedicineModal";

//to set default header to axios

const Admin = () => {
  let serialNo = 1;
  //********************to check if data is changed========== */
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
  const [employeeUpdate, setEmployeeUpdate] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Rshow, setRShow] = useState(false);
  const RhandleShow = () => setRShow(true);

  const [Ushow, setUShow] = useState(true);
  const UhandleShow = () => setUShow(true);
  const UhandleClose = () => setUShow(false);

  const [updateModalFlag, setUpdateModalFlag] = useState(false);
  const [empId, setEmpid] = useState(0);

  const [employeeModal, setEmployeeModal] = useState(false);

  const [removeEmployee, setRemoveEmployee] = useState(false);

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  // add ward modal
  const [addWardModalFlag, setAddWardModalFlag] = useState(false);
  const [removeWardModalFlag, setRemoveWardModalFlag] = useState(false);
  //add medicine
  const [addMedicineModalFlag, setAddMedicineModalFlag] = useState(false);
  const [removeMedicineModalFlag, setRemoveMedicineModalFlag] = useState(false);

  //set token from session storage
  const [token] = useState(sessionStorage.getItem("token_admin"));
  //to set default header in axios
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //to implement search functionality
  const [search, setSearch] = useState("");
  /***************************************useEffect for updating page on start==================== */
  const updateEmployee = (id, employee) => {
    console.log(
      "inside before updateEmployee :" +
      Ushow +
      "updateModalFlag:" +
      updateModalFlag
    );
    setEmployeeUpdate(employee);
    console.log("recived name to update :" + employeeUpdate.firstName);

    setEmpid(id);
    console.log("empid recieved to update : " + empId);
    setUShow(true);
    setUpdateModalFlag(true);
  };


  /********===============================getting employees from server======================= */

  const getEmployeesFromServer = () => {
    //delete
    console.log("--------token--admin" + token);
    const url = `${URL}/employee/getAllEmployees`;
    axios.get(url).then((res) => {
      setDataChangedFlag(false);
      console.log("data flag inside getEmployeesFromServer " + dataChangedFlag);
      const result = res.data;
      if (result.status == "success") {
        setEmployees(result.data);
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err => {
      console.log("In getEmployeesFromServer "+err)
      navigate("/error");
    });
  };


  useEffect(() => {
    getEmployeesFromServer();
    console.log("inside useEffect of adminDetails");
  }, [dataChangedFlag]);

  return (
    <div >
      <Navbar expand="lg" sticky="top" className="custom-navbar" >
        <Container >
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="navbar-toggle"
            style={{
              color: "brown",
              fontWeight: "bold",
              background: "chartreuse"
            }}
          >
            Click For Options

          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ marginLeft: '5%' }}>
              {/* ==============================add new employee==================== */}
              <Button
                size="sm"
                variant="success"
                style={{ width: '200%', height: '50%' }}
                onClick={() => {
                  handleShow();
                  setEmployeeModal(true);
                }}
              >
                Add New Employee
              </Button>

              {/* ==========================add ward========================= */}
              <DropdownButton
                size="sm"
                title="Ward"
                variant="warning"
                style={{ margin: "10px" }}
              >
                <Dropdown.Item>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setAddWardModalFlag(true);
                    }}
                  >
                    {" "}
                    Add ward
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setRemoveWardModalFlag(true);
                    }}
                  >
                    {" "}
                    remove ward
                  </Button>
                </Dropdown.Item>
              </DropdownButton>

              {/* =========================add medicine=========================== */}
              <DropdownButton
                size="sm"
                title="Medicine"
                variant="warning"
                style={{ margin: "10px" }}
              >
                <Dropdown.Item>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setAddMedicineModalFlag(true);
                    }}
                  >
                    {" "}
                    Add Medicine
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setRemoveMedicineModalFlag(true);
                    }}
                  >
                    {" "}
                    remove Medicine
                  </Button>
                </Dropdown.Item>
              </DropdownButton>

              {/* ================================search employee===================== */}
              <Nav.Link style={{ marginLeft: '100%' }}>
                {/* third button */}
                <div style={{ float: "right" }}>
                  <input
                    style={{
                      borderStyle: "solid",
                      borderRadius: "20px",
                      marginLeft: "10px",
                      textAlign: 'center'
                    }}
                    placeholder="  Search by Name .."
                    onChange={(emp) => {
                      setSearch(emp.target.value);
                    }}
                    type="text"
                  />
                </div>
              </Nav.Link>
              <Nav.Link >
                {/* fourth menu operration */}

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    navigate("/signIn");
                  }}
                >
                  LogOut
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {/*---------------------------- all untoggled modals------------------ */}
        {updateModalFlag && (
          <UpdateEmployeeModal
            setUpdateModalFlag={setUpdateModalFlag}
            dataChangedFlag={dataChangedFlag}
            setDataChangedFlag={setDataChangedFlag}
            employeeUpdate={employeeUpdate}
            EmpId={empId}
            show={Ushow}
            setShow={setUShow}
            handleShow={UhandleShow}
            handleClose={UhandleClose}
          />
        )}
        {/* a-------------------------add medicne-------------- */}
        {addMedicineModalFlag && (
          <AddMedicineModal
            setAddMedicineModalFlag={setAddMedicineModalFlag}
            setDataChangedFlag={setDataChangedFlag}
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        )}
        {/* ------------------to remove medicine---------------- */}
        {removeMedicineModalFlag && (
          <RemoveMedicineModal
            setRemoveMedicineModalFlag={setRemoveMedicineModalFlag}
            setDataChangedFlag={setDataChangedFlag}
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        )}
        {/* -------------------to add ward--------------------------------- */}
        {addWardModalFlag && (
          <AddWardModal
            setAddWardModalFlag={setAddWardModalFlag}
            setDataChangedFlag={setDataChangedFlag}
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        )}
        {removeWardModalFlag && (
          <RemoveWardModal
            setRemoveWardModalFlag={setRemoveWardModalFlag}
            setDataChangedFlag={setDataChangedFlag}
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        )}
        {employeeModal && (
          <AddNewEmployeeModal
            setEmployeeModal={setEmployeeModal}
            employees={employees}
            show={show}
            setShow={setShow}
            dataChangedFlag={dataChangedFlag}
            setDataChangedFlag={setDataChangedFlag}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        )}
        {removeEmployee && (
          <RemoveEmployeeModal
            setRemoveEmployee={setRemoveEmployee}
            employees={employees}
            Rshow={Rshow}
            setRShow={setRShow}
            dataChangedFlag={dataChangedFlag}
            setDataChangedFlag={setDataChangedFlag}
            RhandleClose={handleClose}
            handleShow={RhandleShow}
          />
        )}
      </div>
      <div className="employee-container">
        <table className="employee-table">
          <thead >
            <tr className="table-heading" >
              <th >EmpId</th>
              <th>Name</th>
              <th>Phone No</th>
              <th>Role</th>
              <th>DOB</th>
              <th>Join Date</th>
              <th>Salary</th>
              <th>Update Detail</th>
              <th>Remove Emp</th>
            </tr>
          </thead>

          <tbody>
            {
              employees
                .filter((emp) => {
                  if (search == "") return emp;
                  else if (
                    ((`${emp.firstName}+" "+${emp.lastName}`).toLocaleLowerCase()).includes(
                      search.toLocaleLowerCase()
                    )
                  )
                    return emp;
                }).map((emp) => {
                  return (

                    <Employee
                      key={emp.empId}
                      serialNo={serialNo++}
                      employee={emp}
                      updateEmployee={updateEmployee}
                      setDataChangedFlag={setDataChangedFlag}
                    />
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
