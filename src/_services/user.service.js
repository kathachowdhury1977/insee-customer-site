//import config from 'config';
import { authHeader } from "../_helpers";
import { Link, useLocation } from "react-router-dom";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getAllCounter,
  getById,
  update,
  delete: _delete,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
  //     .then(handleResponse)
  //     .then(user => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('user', JSON.stringify(user));

  //         return user;
  //     });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}
function getAllCounter() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch("http://dummy.restapiexample.com/api/v1/employees")
    .then((res) => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items,
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  //return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  //return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  //return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  //return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

// function handleResponse(response) {
//     const location = useLocation();
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }
