import React, {Fragment, useState} from 'react';
import TableAdmins from "./components/TableAdmins";
import ConfigurationPanel from "./components/ConfigurationPanel";
import {data} from "./constants/data";
import AdminDetails from "./components/AdminDetails";
import ModalConfirmDelete from "./components/ModalConfirmDelete";


const App = () => {

    const [users, setUsers] = useState(data);
    const [activeUser, setActiveUser] = useState('');
    const [mode, setMode] = useState('');
    const [counter, setCounter] = useState(Object.keys(users).length + 1);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [search, setSearch] = useState('');


    const addEditUser = (user) => {
        const newUsers = {...users};
        if (!newUsers[user.id]) {
            setCounter(counter + 1);
        }
        newUsers[user.id] = user;
        setMode('');
        setActiveUser('');
        setUsers(newUsers);
    }

    const deleteUser = () => {
        const newUsers = {...users};
        delete newUsers[activeUser.id];
        setUsers(newUsers);
        setActiveUser('');
        handleClose();
    }

    const filterFunction = (user) => {
        console.log(user);
        if(search) {
            return user.username.toLowerCase().includes(search.toLowerCase())
                ||user.firstname.toLowerCase().includes(search.toLowerCase())
                ||user.lastname.toLowerCase().includes(search.toLowerCase());
        } else {
            return user;
        }
    }

    return (
        <Fragment>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-7 shadow-sm'>
                        <h2 className='mb-2'>Administrators</h2>
                        <ConfigurationPanel setMode={setMode} setActiveUser={setActiveUser} handleShow={handleShow}
                                            mode={mode} setSearch={setSearch}/>
                        <TableAdmins users={users} activeUser={activeUser} setActiveUser={setActiveUser}
                                     setMode={setMode} filterFunction={filterFunction}/>
                    </div>
                    <div className='col-5'>
                        <AdminDetails activeUser={activeUser} mode={mode} counter={counter} addEditUser={addEditUser}
                                      setActiveUser={setActiveUser}/>
                    </div>
                </div>

            </div>
            <ModalConfirmDelete show={show} handleClose={handleClose} deleteUser={deleteUser}/>
        </Fragment>

    );
};

export default App;