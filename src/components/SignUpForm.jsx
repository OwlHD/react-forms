import { useState } from 'react'

export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (username.length <= 2 || password.length <= 2 || username.length > 10 || password.length > 10) {
                throw new Error('Username and password must be between 3 and 10 characters long.')
            }
            event.preventDefault();
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', 
            { 
              method: "POST", 
              headers: { 
                "Content-Type": "application/json" 
              }, 
              body: JSON.stringify({ 
                username: `${username}`, 
                password: `${password}` 
              }) 
            })
            const result = await response.json()
            console.log(result)
            setToken(result.token)
            setError(null)
            setSuccessMessage(`Success! ${result.message}`)
        } catch (error) {
            console.log('Error encountered. ',error)
            setSuccessMessage(null)
            setError(error.message)
        }
      }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Username: {''}<input value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password: {''}<input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br />
                <button>Submit</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
    </div>
    )
    
}