import React, {useState, useEffect} from 'react';
import {Grid, Loader} from 'semantic-ui-react';
import userService from "../../utils/userService";
import ProfileBio from "../../components/ProfileBio/ProfileBio";


    // profile page will have user's posts and bio info;
    // if the user is the profile owner, then the page will show buttons for edit profile and post, as well as delete posts.

export default function ProfilePage({ user, handleLogout }) {
    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const {username} = useParams();

    async function getProfile() {
        try{
            const data = await userService.getProfile(username);
            console.log(data, " data");

            setLoading(() => false);
        }
    }
}