import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
const Customerlist = (props)=> {
    return(
        <div>
        <table border="1">
        <thead>
         <tr>
            <td>Name</td>
            <td>Mob</td>
            <td>Aadhar</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
          </thead>
         
        <tbody>
          {
              
            props.cdata.map(customer => (
             
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.mob}</td>
                <td>{customer.uid}</td>
                <td>
                <Link to={{ pathname: '/update/', id:`${customer._id}` }}>
                  <EditIcon  />
                </Link>
                </td>
                <td><button onClick={() => props.dfun(customer._id)}><DeleteIcon  /></button></td>
              </tr>
            ))
            
          }
          </tbody>
        </table>
      </div>
    )
}
export default Customerlist;