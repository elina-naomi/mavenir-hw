import React from 'react';
import {Modal,Button} from "react-bootstrap";

const ModalConfirmDelete = ({handleClose,show,deleteUser}) => {
    return (
        <Modal show={show} onHide={()=> {
            handleClose();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure that you want delete this Administrator?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=> {
                    handleClose();
                }}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => {
                    deleteUser();
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirmDelete;