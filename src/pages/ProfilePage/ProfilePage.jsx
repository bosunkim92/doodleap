import React, {useState, useEffect} from 'react';
import {Grid, Loader} from 'semantic-ui-react';
import userService from "../../utils/userService";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import {useParams} from "react-router-dom";


    // profile page will have user's posts and bio info;
    // if the user is the profile owner, then the page will show buttons for edit profile and post, as well as delete posts.

export default function ProfilePage({ user }) {
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
            setPosts(() => [...data.posts]);
            setProfileUser(() => data.user);
        } catch (err) {
            console.log(err);
            setError("No profile");
        }
    }
    
    async function handleEditProfile(update) {
        setLoading(true)
        const data = await userService.updateProfile(update);
        console.log(data, " data var");
        setProfileUser(() => data.user);
        setLoading(false);
    }
    
    useEffect(()=> {
        getProfile();
    }, []);

    if (error) {
        return (
            <h1>{error}</h1>
        )
    }

    if(loading){
        return (
            <Grid
                textAlign="center"
                style={{height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth:300 }}>
                    <Loader size="large" active>
                        Loading
                    </Loader>
                </Grid.Column>
            </Grid>
        );
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <h1>Nav bar will be here</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio user={profileUser} handleEditProfile={handleEditProfile}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 300 }}>
                    <PostFeed
                        isProfile={true}
                        posts={posts}
                        numPhotosCol={3}
                        user={user}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}