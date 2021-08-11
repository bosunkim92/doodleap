import React, {useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import HomePage from '../HomePage/HomePage';
import ArtFeedPage from '../ArtFeedPage/ArtFeedPage';
import ProfilePage from "../ProfilePage/ProfilePage"
import Post from "../Post/Post";

function App() {

  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }

  function handleLogout(){
    userService.logout();
    setUser({user: null})
  }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup">
             <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          {userService.getUser() ? (
             <Switch>
                <Route exact path="/">
                    <HomePage user={user} handleLogout={handleLogout}/>
                </Route>
                <Route exact path="/art_feed">
                  <ArtFeedPage user={user} handleLogout={handleLogout}/>
                </Route>
                <Route path="/username/:username">
                  <ProfilePage user={user} handleLogout={handleLogout}/>
                </Route>
                <Route path="/posts/:id">
                  <Post user={user} handleLogout={handleLogout}/>
                </Route>
            </Switch>
           ) : (
            <Redirect to='/login'/>
           )}
      </Switch>
    </div>
  );
}

export default App;
