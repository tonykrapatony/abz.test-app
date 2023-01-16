import React from 'react'
import UserItem from './UserItem'

export default function UsersList({usersList}) {
  return (
    <ul className="users-list">
        {usersList.map(item => (
            <UserItem key={item.id} userData={item}></UserItem>
        ))}
    </ul>
  )
}
