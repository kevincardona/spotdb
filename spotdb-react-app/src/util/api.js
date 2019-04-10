import { API_URL } from "../config";
// import React from 'react';
// import { Redirect } from 'react-router-dom';

export function apiGet(endpoint) {
  const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  };
  var result = fetch(`${API_URL}${endpoint}/`, { headers: HEADERS })
    .then(res => res.json())
    .catch(function(error) {
      return error;
    });

  if (!result.loggedin) return result;
  else return result;
}

export function apiPost(endpoint, data = {}) {
  // var spotid = sessionStorage.getItem('spotid');
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: localStorage.getItem("token")
    },
    body: JSON.stringify(data)
  };
  var result = fetch(`${API_URL}${endpoint}/`, options)
    .then(res => res.json())
    .catch(error => {
      return error;
    });

  if (!result.loggedin) return result;
  else return result;
}
