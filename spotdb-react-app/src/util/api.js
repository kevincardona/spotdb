import {API_URL} from '../config';

export function apiGet(endpoint) {
    const HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': sessionStorage.getItem('spotid')
    }
    return fetch(`${API_URL}${endpoint}/`, {headers: HEADERS}).then((res) => res.json());
}

export function apiPost(endpoint, data = {}) {
    var spotid = sessionStorage.getItem('spotid');
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'spotid': spotid
      },
      body: JSON.stringify(data)
    }
    return fetch(`${API_URL}${endpoint}/`, options).then((res) => res.json());
}  