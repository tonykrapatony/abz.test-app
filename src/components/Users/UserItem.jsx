import React from 'react'

export default function UserItem({userData}) {
  return (
    <li className="users-item">
        <div className="item-img">
          <img src={userData.photo}  alt={userData.name} />
        </div>
        <p className='item-name'>{userData.name}</p>
        <p className='item-pos'>{userData.position}</p>
        <p className='item-email'>{userData.email}</p>
        <p className='item-phone'>{userData.phone}</p>
    </li>
  )
}
