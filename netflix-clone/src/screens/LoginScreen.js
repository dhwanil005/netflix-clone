import React, {useState} from 'react'
import './LoginScreen.css';
import SignUpScreen from './SignUpScreen';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);

  return (
     <div className="loginScreen">
        <div className= "loginScreen__background">
            <img className="loginScreen__logo"
            src = "https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" 
            alt ="LoginScreen" />
            <button className='loginScreen__button' onClick={()=>setSignIn(true)}>
                Sign in
            </button>
            <div className='loginScreen__gradient' />
            </div>
            <div className='loginScreen__body'>
                {signIn ? (
                    <SignUpScreen />
                ): (
                    <>
                <h1>Unlimited films, TV programmes and more.</h1>
                <h2>Watch anywhere, cancel anytime.</h2>
                <h3>
                    Ready to watch? Enter your email to create or restart your membership.
                </h3>
                <div className='loginScreen__input'>
                   <form>
                    <input type="email" placeholder='Email Address' />
                    <button className='loginScreen__getStarted' onClick={() => setSignIn(true)}>Get Started</button>
                   </form>
                </div>
                </>
        

                )}
                
        </div>
    </div>
  )
}

export default LoginScreen;