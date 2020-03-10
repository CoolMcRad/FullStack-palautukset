import React, { useState } from 'react'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { userLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username, password,
        })
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        ) 
        blogService.setToken(user.token)
        dispatch(userLogin(user))
        setUsername('')
        setPassword('')
        dispatch(setNotification(`Welcome ${user.username} !`, 5))
      } catch (exception) {
        dispatch(setNotification(`wrong username/password`, 5))
      }
      }

      const s2 = {
        backgroundColor: "silver",
        borderBottomColor: "black",
        outlineStyle: "ridge",
        outlineColor: "silver",
        outlineWidth: "15px"
      }

    return (
    <div style={s2}>
      <h2>login to application</h2>
    <form onSubmit={handleLogin}>
    <Form.Group>
      <div>
      <Form.Label>username</Form.Label>
          <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      <Form.Label>password</Form.Label>
          <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant="primary" id="login-button" type="submit">login</Button>
      </Form.Group>
    </form>      
    </div>
    )
}

export default LoginForm