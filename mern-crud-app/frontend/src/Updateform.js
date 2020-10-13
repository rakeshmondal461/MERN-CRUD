import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Updateform = (props)=>{
    const customerId = props.location.id;
    const sendData = {
        id:customerId
    }
    useEffect(() => {
        getDataById()
      }, []);

    
    async function getDataById() {
        const { data } = await axios.post(
          'http://localhost:4000/api/usersData/'
        ,sendData)
        setCustomerData(data)
      }

    const [customerData, setCustomerData] = useState([]);

    const [customer, setCustomer] = useState({
        id:customerId,
        name: customerData.name,
        mob: customerData.mob,
        uid: customerData.uid
      });



      
  const inputchange = (event) => {
    const targetname = event.target.name;
    const targetvalue = event.target.value;
    setCustomer((prev) => {
      if (targetname === "name") {
        return {
            id:prev.id,
          name: targetvalue,
          mob: prev.mob,
          uid: prev.uid
        };
      } else if (targetname === "mob") {
        return {
            id:prev.id,
          name: prev.name,
          mob: targetvalue,
          uid: prev.uid
        };
      } else {
        return {
            id:prev.id,
          name: prev.name,
          mob: prev.mob,
          uid: targetvalue
        };
      }
    })
  }



      const updatecustomer = (event) => {
        event.preventDefault();
        let { id,name, mob, uid } = customer;
        const customerdata = {
            id,
          name,
          mob,
          uid
        };
    
        axios
          .post('http://localhost:4000/api/users/update', customerdata)
          .then(() => console.log('Customer Updated'))
          .catch(err => {
            console.error(err);
          });
      }

    return(
        <div>
        <form onSubmit={updatecustomer}>
        <input type="hidden" name="id" defaultValue={customerId}/>
            <p>Name: <input type="text" name="name" id="name" defaultValue={customerData.name} onChange={inputchange} /></p>
            <p>Mobile: <input type="text" name="mob" id="mob" defaultValue={customerData.mob} onChange={inputchange} /></p>
            <p>Aadhar: <input type="text" name="uid" id="uid" defaultValue={customerData.uid} onChange={inputchange} /></p>
            <p>
                <button type="submit">Submit</button>
            </p>

        </form>
    </div>
    );
}

export default Updateform;