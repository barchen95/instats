import {authHeader} from "Helpers";

export const playerService = {
    getAll
};

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    return fetch(`http://www.rishonims.com/server/users/getall`, requestOptions).then(
    // return fetch(`http://www.rishonims.com/server/users/getall`,
    // requestOptions).then(
    handleResponse);
}

function handleResponse(response) {
    return response
        .text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}
