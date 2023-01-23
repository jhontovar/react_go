import { API_HOST, TOKEN } from "../util/constant"
import jwtDecode from "jwt-decode"

export function signUpApi(user) {
    const url = `${API_HOST}/register`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        birthday: new Date()
    };
    delete userTemp.repeatPassword;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
    }
    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        return { code: 404, message: "Email no disponible" }
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
};

export function signInApi(user) {
    const url = `${API_HOST}/login`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase()
    };
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
    }
    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        return { code: 404, message: "Usuario o contraseña incorrecta" }
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}

export function setToken(token) {
    localStorage.setItem(TOKEN, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function logout() {
    localStorage.removeItem(TOKEN)
}

export function isExpired(token) {
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeout = expire - Date.now();
    if (timeout < 0) {
        return true
    }

    return false
}

export function isUserLogin() {
    const token = getToken();
    if (!token) {
        logout();
        return null;
    }

    if (isExpired(token)) {
        logout();
    }

    return jwtDecode(token)
}
