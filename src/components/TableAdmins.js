import React from 'react';
import {Table} from "react-bootstrap";
import styles from '../css-modules/admintable.module.css'

const TableAdmins = ({users, setActiveUser,activeUser,setMode,filterFunction}) => {
    return (
        <div className={`${styles.table} overflow-auto`}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th></th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(users)
                    .map(key => users[key])
                    .filter(filterFunction)
                    .map((user) =>
                    <tr key={user.id}>
                        <td><input type="checkbox"
                                   checked={activeUser.id===user.id}
                                   onChange={() => {
                                       setMode('edit');
                                       setActiveUser(user);
                                   }}/></td>
                        <td>{user.username}</td>
                        <td>{user.firstname} {user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                )
                }
                </tbody>
            </Table>
        </div>

    );
};

export default TableAdmins;