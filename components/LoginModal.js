export default  (props) => (
<>
<h2>Log in</h2>
<div>
    <form onSubmit={event=>{
        alert('Sign up!') 
        event.preventDefault()
        }}>
        <input id='email' type='email' placeholder='Email Address'/>
        <input id='password' type='password' placeholder='Password'/>
        <button>Login</button>
        
    </form>
    <p>
	    Don't have an account yet?{' '}
	    <a href='#' onClick={() => props.showSignup()}>
            Sign up
        </a>
    </p>
</div>
</>
)
