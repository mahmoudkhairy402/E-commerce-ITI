import React from 'react'

/**
* @author
* @function Notfound
**/

 const Notfound = (props) => {
    props.show(false);
    // props.showfoot(false);
  return(
    <div>
        <div className="alert alert-danger">
            ERROR 404..Notfound
        </div>
    </div>
   )
  }


  export default Notfound;