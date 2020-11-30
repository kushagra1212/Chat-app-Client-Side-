import React from 'react';
import Styles from './Users.module.css';

const Users =(props)=>{
    const {nameusers,showusers}=props;
    return (
        <div className={Styles.mainuserdiv} >  
    {nameusers.map((ele,id)=>{
if(showusers)
    return (<div className={Styles.user} key={id}><h4>{ele.name} <spam style={{float:"right"}} >🟢</spam></h4></div>)
  else
  return null;
  })}
        </div>
    )
}

export default Users;