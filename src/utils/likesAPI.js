import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postID) {
    return fetch(`${BASE_URL}posts/${postID}/likes`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        new Error('Error liking Post');
    })
}

export function removeLike(likeID) {
    return fetch(`${BASE_URL}likes/${likeID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        new Error('Error deleting likes post');
    })
}