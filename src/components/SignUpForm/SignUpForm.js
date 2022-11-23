import React from 'react'
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"

import "./SignUpForm.scss"

export default function SignUpForm(props) {
    const { setShowModal } = props

    const onSubmit = e => {
        e.preventDefault();
        setShowModal(false);
    }

    return (
        <div className='sign-up-form'>
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group className='form-group'>
                    <Row>
                        <Col>
                            <Form.Control type='text' placeholder='Nombre' />
                        </Col>
                        <Col>
                            <Form.Control type='text' placeholder='Apellido' />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='form-group'>
                    <Form.Control type='email' placeholder='Email'></Form.Control>
                </Form.Group>
                <Form.Group className='form-group'>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder='contraseña'></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control type="password" placeholder='Repetir Contraseña'></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Registrate
                </Button>
            </Form>
        </div>
    )
}
