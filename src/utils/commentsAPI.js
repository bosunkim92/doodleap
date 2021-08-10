import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postID, data) {
    return fetch(`${BASE_URL}posts/${postID}/comments`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        new Error('Error inspiring Post');
    })
}
export function getAllComments(postID) {
    return fetch(`${BASE_URL}posts/${postID}/comments`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function getOneComment(commentID) {
    return fetch(`${BASE_URL}comments/${commentID}`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function editComment(commentID, data) {
    return fetch(`${BASE_URL}comments/${commentID}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}


export function deleteComment(commentID) {
    return fetch(`${BASE_URL}comments/${commentID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}