import React from 'react';

const WelcomePage = () => {
    const localHostUrl = 'http://localhost:8888/login';
    const liveHostUrl = 'https://moods-music.glitch.me/login';
    return(
        <div className="welcome-page">
                    <h1 className="welcome-heading">welcome to <span className="moods">Moods</span> where you can listen to music according to your mood</h1>
                    <a className="login-link"
                     href ={liveHostUrl}>
                        <button className="btn btn-dark login-btn">login with spotify</button>
                    </a>
        </div>
    )
}

export default WelcomePage;


