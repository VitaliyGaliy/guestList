import React, { useEffect, useState, useRef, useCallback } from 'react';
import Axios from 'axios';
import ModalComponent from '../components/Modal';

import './ListPage.scss';
import Spinner from '../components/Spinner';


function ListPage() {
    const modalRef = useRef(null);
    const [guestsList, setGuestsList] = useState([])
    const [currentGuest, setCurrentGuest] = useState([])

    useEffect(() => {
        Axios.get('./data.json')
            .then((res) => {
                setTimeout(() => { setGuestsList(res.data) }, 2000)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    const onModalClick = useCallback((guest) => {
        modalRef.current.setIsOpen()
        setCurrentGuest(guest)
    }, [setCurrentGuest])

    const handleInvitationStatus = (id, invitationStatus) => {

        const updatedGuestsList = guestsList.map(guest =>
            guest.id === id ? { ...guest, invitationStatus: !invitationStatus } : guest
        )
        setGuestsList(updatedGuestsList)
    }

    return (
        <div className="listPage_container" >
            <h1>
                Concert
                </h1>
            <div>
                {
                    guestsList.length === 0 ?
                        <Spinner /> :
                        guestsList.map(guest => {
                            return (
                                <div className="guestRow_container" onClick={() => onModalClick(guest)} key={guest.id}>
                                    <div className="guestRow_rightContent">
                                        <div>{`User name: ${guest.userName}`}</div>
                                        <div>{`Invited: ${guest.invitationStatus ? 'invited' : 'not invited'}`}</div>
                                    </div>
                                    <button className="guestRow_button">Manage</button>
                                </div>
                            )
                        })
                }
            </div>
            <ModalComponent
                handleInvitationStatus={handleInvitationStatus}
                currentGuest={currentGuest}
                ref={modalRef} />
        </div >
    );
}

export default ListPage