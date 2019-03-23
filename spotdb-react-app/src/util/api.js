import {API_URL} from '../config';

export function apiGet(endpoint) {
    const HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
    }
    return fetch(`${API_URL}${endpoint}/`, {headers: HEADERS}).then((res) => res.json()).catch(function(error) {
      return error;
    });
}

export function apiPost(endpoint, data = {}) {
    var spotid = sessionStorage.getItem('spotid');
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    }
    return fetch(`${API_URL}${endpoint}/`, options).then((res) => res.json()).catch((error) => {
      return error;
    });
}