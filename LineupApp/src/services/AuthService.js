import { config } from './config';
import axios from 'axios';

export const authService = {
    login,
    logout,
    isAuth
};

async function login(email, password) {
    try {
        const response = await axios({
            method: 'POST',
            headers: { 'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'mode':'cors',
                        'Access-Control-Allow-Origin': "*",
                },
            data: JSON.stringify({ email, password }),
            url: config.apiUrl + 'users/authenticate'
        });
        sessionStorage.setItem('user', JSON.stringify(response.data));
        return true;
    } catch (error) {
        return false;
    }
}

function logout() {
    sessionStorage.removeItem('user');
    window.location.reload();
    return true;
}

function isAuth() {
    let user = sessionStorage.getItem('user');
    if(user){
        let userData = JSON.parse(user);
        if (userData.token){
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};