import React from 'react'
import NavBar from "../../components/NavBar/NavBar";
import HallOfFame from "../../components/HallOfFame/HallOfFame";
import {Icon} from "semantic-ui-react"
import {Link} from "react-router-dom";

export default function HomePage({user, handleLogout}){



    return (
        <>
            <NavBar user={user} handleLogout={handleLogout}/>
            <HallOfFame user={user} />
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