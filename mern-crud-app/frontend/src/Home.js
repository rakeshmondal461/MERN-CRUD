import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Customerlist from './Customerlist';
import Addform from './Addform';
const Home = () => {

  const [customers, setCustomers] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    mob: "",
    uid: ""
  });

  
  const formchange = (event) => {
    const targetname = event.target.name;
    const targetvalue = event.target.value;
    setCustomer((prev) => {
      if (targetname === "name") {
        return {
          name: targetvalue,
          mob: prev.mob,
          uid: prev.uid
        };
      } else if (targetname === "mob") {
        return {
          name: prev.name,
          mob: targetvalue,
          uid: prev.uid
        };
      } else {
        return {
          name: prev.name,
          mob: prev.mob,
          uid: targetvalue
        };
      }
    })
  }

  const addcustomer = (event) => {
    event.preventDefault();
    let { name, mob, uid } = customer;
    const customerdata = {
      name,
      mob,
      uid
    };

    axios
      .post('http://localhost:4000/api/users/create', customerdata)
      .then(() => console.log('Customer Created'))
      .catch(err => {
        console.error(err);
      });
    fetchData()
  }

  const deletecustomer = (id) =>{
    axios
    .delete(`http://localhost:4000/api/users/delete/${id}`)
    .then(() => console.log('Customer deleted'))
    .catch(err => {
      console.error(err);
    });
  }

  // GET DATA FROM BACKEND
  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    const { data } = await axios.get(
      'http://localhost:4000/api/users'
    )
    setCustomers(data)
  }

  
return (
    <>
    <Addform fchange={formchange} fsubmit={addcustomer} />
    <Customerlist cdata={customers} dfun = {deletecustomer} />
    </>
);
}

export default Home;