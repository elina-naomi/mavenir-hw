import React from 'react';
import {FaTrashAlt, FcPlus} from "react-icons/all";
import styles from '../css-modules/admindetails.module.css'


const ConfigurationPanel = ({setActiveUser,setMode,counter,handleShow,mode, setSearch}) => {

    console.log(counter);
    return (
        <div className='row justify-content-between'>
            <div className='col-5'>
                <input type='text' id='search' name='search' placeholder='Search'
                       className={`mb-3 mt-2 p-1 pl-2 w-100 ${styles.input}`}
                       onChange={event => {
                           setSearch(event.target.value);
                       }}
                />
            </div>
            <div className='col-2 text-right'>
                <FcPlus size='1.2em' className={`mr-2 ${styles.iconButton}`}
                onClick={()=> {
                    console.log(counter);
                    const newUser = {};
                    console.log(newUser);
                    setMode('add');
                    setActiveUser(newUser);
                }}
                />
                <FaTrashAlt color='grey' className={`${styles.iconButton}`}
                onClick={()=> {
                    if(mode==='edit') {
                        handleShow();
                    } else {
                        alert('Choose an Administrator first')
                    }
                }}/>
            </div>
        </div>
    );
};

export default ConfigurationPanel;