import tokenService from './tokenService';

const BASE_URL = '/api/posts/';

export function create(post) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: post,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function getOne(postID) {
    return fetch(`${BASE_URL}posts/` + postID, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function updatePost(postID, data) {
    return fetch(`${BASE_URL}posts/` + postID, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
    }).then(res => res.json()).then(res => { res.json()
    }).catch(error => {});
}

export function deletePost(postID) {
    return fetch(`${BASE_URL}posts/${postID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        new Error('Error has occured while deleting post')
    })
}