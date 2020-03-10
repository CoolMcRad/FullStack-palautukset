import React from 'react' 
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom"

const UserById = ({ users }) => {

    const id = useParams().id
    const user = users.find(n => n.id === id)

if (!user) {
    return null
}

const s2 = {
    backgroundColor: "silver",
    borderBottomColor: "black",
    outlineStyle: "ridge",
    outlineColor: "silver",
    outlineWidth: "10px"
  }
    
    return (
      <div style={s2}>
        <h2>{user.name}</h2>
        {user.blogs.map(blog =>
            <li key={blog.id}>
              {blog.title}
            </li>
            )}
      </div>
    )
}

export default UserById