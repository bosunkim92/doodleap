import React, {useState, useEffect} from 'react'
import NavBar from "../../components/NavBar/NavBar";
import HallOfFame from "../../components/HallOfFame/HallOfFame";
import {Icon} from "semantic-ui-react"
import {Link} from "react-router-dom";
import "./HomePage.css";
import * as postsAPI from "../../utils/postsAPI"

export default function HomePage({user, handleLogout}){
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        try{
            const data = await postsAPI.getAll();
            setPosts([...data.posts]);
        } catch(err) {

        }
    }

    useEffect(()=> {
        getPosts()
    }, [])

    const postsArranged = posts.sort(function(a, b){
        return (b.likes.length + b.inspiring.length) - (a.likes.length + a.inspiring.length);
    })

    const topThree = postsArranged.slice(0, 3);

    return (
        <>
            <NavBar user={user} handleLogout={handleLogout}/>
            <HallOfFame user={user} topThree={topThree}/>
            <div>
                <h3>Click&nbsp;
                    <span>&nbsp;<Link to="/art_feed"><Icon name="paint brush"></Icon></Link></span>
                    to check out more of
                    <br/>
                    awesome art works!
                </h3>
            </div>
        </>
    )
} 