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