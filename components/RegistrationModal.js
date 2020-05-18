import {useState} from 'react'
import axios from 'axios'



export default (props) => {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordconfirmation, setPasswordconfirmation] = useState('')






    return (
    <>
    <h2>Sign up</h2>
    <div>
    <form
        onSubmit={async event => {
            const response = await axios.post('/api/auth/register',{
                email,
                password,
                passwordconfirmation
            })
        console.log("onSubmit-response=>",response)
        event.preventDefault()
        {/* const submit = async () => {
            const response = await axios.post('/api/auth/register',{email,password,passwordconfirmation})
            console.log("response from axios=>",response)
        } */}
        }}>

            <input id='email' type='email' placeholder='Email address' onChange={event=>setEmail(event.target.value)}/>
            <input id='password' type='password' placeholder='Password' onChange={event=>setPassword(event.target.value)}></input>
            <input id='passwordconfirmation' type='password' placeholder='Enter password again' onChange={event=>setPasswordconfirmation(event.target.value)}></input>
            <button>Sign up</button>
            <p>
	            Already have an account? <a href='#' onClick={() => props.showLogin()}>Log in</a>
            </p>

        </form>
    </div>
    </>
    )
}