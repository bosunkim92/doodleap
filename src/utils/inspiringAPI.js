import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postID) {
    return fetch(`${BASE_URL}posts/${postID}/inspiring`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        new Error('Error inspiring Post');
    })
}

export function removeInspiring(inspireID) {
    return fetch(`${BASE_URL}inspiring/${inspireID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        new Error('Error deleting inspiring post');
    })
}