import React, { forwardRef, useImperativeHandle } from 'react';
import Modal from 'react-modal';

import './Modal.scss';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const ModalComponent = forwardRef(({ currentGuest, handleInvitationStatus }, ref) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useImperativeHandle(ref, () => ({
        setIsOpen() {
            setIsOpen(true);
        }
    }));

    const setInvitationStatus = () => {
        handleInvitationStatus(currentGuest.id, currentGuest.invitationStatus)
        closeModal()
    }

    return (
        <div>
            <div className='button' onClick={openModal}></div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modalContainer">
                    <div className="guestRow_rightContent">
                        <div>{`User id: ${currentGuest.id}`}</div>
                        <div>{`User name: ${currentGuest.userName}`}</div>
                        <div>{`User email: ${currentGuest.email}`}</div>
                        <div>{`Invited: ${currentGuest.invitationStatus ? 'invited' : 'not invited'}`}</div>
                    </div>
                    {
                        currentGuest.invitationStatus ?
                            <button className="modalBtn" onClick={setInvitationStatus}>Decline</button> :
                            <button className="modalBtn" onClick={setInvitationStatus}>Accept</button>
                    }
                </div>
            </Modal>
        </div>
    );
})

export default ModalComponent