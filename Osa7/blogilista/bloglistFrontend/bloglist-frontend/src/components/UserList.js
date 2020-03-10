import React from 'react' 
import { Table } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom"

const UserList = ({ users }) => {

    const s2 = {
        backgroundColor: "silver",
        borderBottomColor: "black",
        outlineStyle: "ridge",
        outlineColor: "silver",
        outlineWidth: "10px"
      }

    return (
      <div style ={s2}>
        <h2>Users</h2>
        <Table bg="dark" variant="dark" striped>
          <tbody>
            <tr>
              <td></td>
              <td>blogs created</td>
            </tr>
            {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
}

export default UserList