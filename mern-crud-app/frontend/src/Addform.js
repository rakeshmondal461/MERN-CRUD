import React from 'react';

const Addform = (props) => {
    return (
        <div>
            <form onSubmit={props.fsubmit}>
                <p>Name: <input type="text" name="name" id="name" onChange={props.fchange} /></p>
                <p>Mobile: <input type="text" name="mob" id="mob" onChange={props.fchange} /></p>
                <p>Aadhar: <input type="text" name="uid" id="uid" onChange={props.fchange} /></p>
                <p>
                    <button>Submit</button>
                </p>

            </form>
        </div>
    )
}

export default Addform;