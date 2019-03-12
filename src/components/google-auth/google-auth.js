import React from 'react';
import ReactGoogleAuth from 'react-google-auth';
import Spinner from '../spinner'

function Example(props) {
    console.log("gapi exists");
    return <div>
        <h1>App goes here</h1>
        <button onClick={props.onSignOutClick}>Sign out</button>
    </div>;
}

function Loader(props) {
    return <Spinner/>;
}

function SignIn(props) {
    if(props.initializing) {
        return <div className="Text Text-emphasis">Initializing...</div>;
    }
    if(props.error) {
        console.log('Error', props.error);
        return <div className="Text Text-strong">Error!</div>;
    }
    return <div>
        <button className="Button Button-primary" onClick={props.onSignInClick}>Sign in</button>
        {props.signingIn && <div>Signing in...</div>}
    </div>;
}

export default ReactGoogleAuth({
    clientId: "606987251303-nlhggcck2jq7cl2onjuu2i5fs8hirm3d.apps.googleusercontent.com",
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    loader: Loader,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    signIn: SignIn
})(Example);