import React, { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap"
import logoWhite from "../../assets/png/logo-white.png"
import logoBlue from "../../assets/png/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faComment } from '@fortawesome/free-solid-svg-icons'
import "./SignInSignUp.scss"
import BasicModal from "../../components/modal/basic/BasicModal"
import SignUpForm from "../../components/SignUpForm"

export default function SignInSignUp() {
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openModal = content => {
        setShowModal(true);
        setContentModal(content)
    }

    return (
        <>
            <Container className="signin-signup" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent openModal={openModal} setShowModal={setShowModal} />
                </Row>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    )
}

function LeftComponent() {
    return (
        <Col className='signin-signup__left' xs={6}>
            <img src={logoBlue} alt="twittor" />
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} />
                    - Sigue lo que te interesa.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUser} />
                    - Enterate de que esta hablando la gente</h2>
                <h2>
                    <FontAwesomeIcon icon={faComment} />
                    - Unete a la conversacion</h2>
            </div>
        </Col>
    )
}

function RightComponent(props) {
    const { openModal, setShowModal } = props;

    return (
        <Col className='signin-signup__right' xs={6}>
            <div>
                <img src={logoWhite} alt="twittor" />
                <h2>Mira lo que esta pasando en el mundo en este momento</h2>
                <h3>Unete a twittor hoy mismo</h3>
                <Button variant='primary'
                    onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}>
                    Registrate
                </Button>
                <Button variant='outline-primary'
                    onClick={() => openModal(<h2>Formulario de login</h2>)}>
                    Iniciar Sesion
                </Button>
            </div>
        </Col>
    )
}