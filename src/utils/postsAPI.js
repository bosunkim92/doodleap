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
    console.log("getall function is firing")
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function getOne(postID) {
    console.log("getOne function is firing")
    return fetch(`${BASE_URL}posts/` + postID, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function updatePost(postID, data) {
    console.log("updatePost function is firing")
    console.log(data);
    return fetch(`${BASE_URL}posts/` + postID, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
    }).then(res => res.json()).then(result => { console.log('success:', result);
    }).catch(error => {console.log('Error', error)});
}

export function deletePost(postID) {
    console.log("deletePost function is firing")
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