import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap"
import { values, size } from "lodash";
import { toast } from 'react-toastify';
import { isEmailValid } from "../../util/validations"

import { signInApi, setToken } from "../../api/auth"

import "./SignInForm.scss"

export default function SignInForm(props) {
    const {setRefreshCheckLogin} = props;
    const [formData, setFormData] = useState(initialFormValue())
    const [signInLoading, setsignInLoading] = useState(false)

    

    const onSubmit = e => {
        e.preventDefault();

        let validCount = 0;
        values(formData).some(value => {
            value && validCount++
            return null
        });

        if (validCount !== size(formData)) {
            toast.warning("Debe diligenciar todos los campos");
            return;
        }
        if (!isEmailValid(formData.email)) {
            toast.warning("El email es incorrecto");
            return;
        }
        setsignInLoading(true);

        signInApi(formData).then(response => {
            if (response.code) {
                toast.warning(response.message);
            }else{
                setToken(response.token);
                setRefreshCheckLogin(true);
            }
        }).then((response) => {
            console.log(response)
        }).catch(() => {
            toast.error("Error en el servidor");
        }).finally(() => {
            setsignInLoading(false);
        })
    }

    const onChange = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="sign-in-form">
            <h2>Entrar</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control type="email" placeholder="Correo electronico"
                        defaultValue={formData.email} name="email" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Contraseña"
                        defaultValue={formData.password} name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {signInLoading ? <Spinner animation="border" /> : "Inicar Sesion"} </Button>
            </Form>
        </div>
    )
}

function initialFormValue() {
    return {
        email: "",
        password: ""
    }
}