import React, { useState } from 'react'
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"
import { isEmailValid } from "../../util/validations"
import { toast } from 'react-toastify';
import { values, size } from "lodash";

import { signUpApi } from "../../api/auth"

import "./SignUpForm.scss"

export default function SignUpForm(props) {
    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signUoLoading, setsignUoLoading] = useState(false)

    const onSubmit = e => {
        e.preventDefault();
        //setShowModal(false);
        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        })

        if (validCount !== size(formData)) {
            toast.warning("Debe diligenciar todos los campos");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("El email es incorrecto");
            } else if (formData.password !== formData.repeatPassword) {
                toast.warning("Las contraseñas no coinciden");
            } else if (size(formData.password) < 6) {
                toast.warning("Las contraseñas deben tener mas de 6 caracteres");
            } else {
                setsignUoLoading(true);
                signUpApi(formData).then(response => {
                    if (response.code) {
                        toast.warning(response.message)
                    } else {
                        toast.success("EL registro ha sido correcto");
                        setShowModal(false)
                        setFormData(initialFormValue())
                    }
                }).catch(() => {
                    toast.error("Error en el servidor");
                }).finally(() => {
                    setsignUoLoading(false)
                });
            }
        }
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='sign-up-form'>
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group className='form-group'>
                    <Row>
                        <Col>
                            <Form.Control type='text' placeholder='Nombre' name='name'
                                defaultValue={formData.name} />
                        </Col>
                        <Col>
                            <Form.Control type='text' placeholder='Apellido' name='lastName'
                                defaultValue={formData.lastName} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='form-group'>
                    <Form.Control type='email' placeholder='Email' name='email'
                        defaultValue={formData.email} />
                </Form.Group>
                <Form.Group className='form-group'>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder='contraseña' name='password'
                                defaultValue={formData.password}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control type="password" placeholder='Repetir Contraseña' name='repeatPassword'
                                defaultValue={formData.repeatPassword}></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Button variant='primary' type='submit'>
                    {signUoLoading ? <Spinner animation='border' /> : "Registrate"}
                </Button>
            </Form>
        </div>
    )
}

function initialFormValue() {
    return {
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}
