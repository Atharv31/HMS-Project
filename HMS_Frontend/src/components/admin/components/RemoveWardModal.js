import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import axios from "axios";
import { URL } from '../../../config';
import WardAdminDetails from "./WardAdminDetails";
import { useNavigate } from "react-router";


const RemoveWardModal = (props) => {
  const navigate = useNavigate();
  const { show, setShow, handleClose ,setRemoveWardModalFlag} = props;
  
  const [dataChangeFlagRemoveWard,setDataChangeFlagRemoveWard]=useState(false);
  //to collect all wards from server
  const [wards,setWards]=useState([])
    
     //set token from session storage
     const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
      //to set defaults of axios header
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //to get wards from server
  const GetWardsFromServer = () => {
   setDataChangeFlagRemoveWard(false)
    const url = `${URL}/ward/getAllWards`;
    axios.get(url).then((res) => {
      const result = res.data;
      console.log(result);
      if (result.status == "success") setWards(result.data);
    }).catch(err=>{
      navigate("/error");
  });
  };

  
  const toggleDataFlag=()=>{
    setDataChangeFlagRemoveWard(true);
  }
  const removeWard = (id) => {
    const url = `${URL}/ward/removeWard/${id}`;
    axios
      .delete(url)
      .then((res) => {
        const result = res.data;
        console.log(result);
        if (result.status == "success") {
          if(result.data == "WARD_REMOVED")
          toast.success("ward removed success");
          else 
          toast.warning("ward not removed");
        } else {
          toast.warning("ward not removed");
        }
        setDataChangeFlagRemoveWard(true)
      })
      .catch((err) => {
        navigate("/error");
      });
    toggleDataFlag();
  };
  useEffect(() => {
    
    GetWardsFromServer();
    setDataChangeFlagRemoveWard(false)
  }, [dataChangeFlagRemoveWard]);
  /**==================================================================== */
  return (
    <div className="">
      {/* <Button variant="primary" onClick={handleShow}>
      Launch static backdrop modal
    </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Add Ward</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <table className="table" style={{textAlign:"center"}}>
             <tr>
               <th>Ward-Type</th><th>Ward-max-Capacity</th><th></th>
             </tr>
             {
               wards.map((ward)=>{
                 return (<WardAdminDetails   ward={ward} removeWard={removeWard}/>)
               })
             }
           </table>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative", left: "-120px" }}>
            <Button size="sm" variant="warning" onClick={()=>{
              setRemoveWardModalFlag(false);
              setShow(false)}}>
              Go back
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RemoveWardModal;
