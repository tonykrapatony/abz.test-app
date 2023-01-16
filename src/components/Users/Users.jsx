import React, { useEffect, useState } from 'react'
import Button from '../UI/Button'
import Preloader from './Preloader'
import UsersList from './UsersList'

export default function Users() {
    const [btnClass, setBtnClass] = useState('get-btn')
    const [count, setCount] = useState(6);
    const [users, setUsers] = useState([]);
    const [newusers, setNewusers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const switchBtn = () => {
        if (users.length <= (count-6)){
            setBtnClass('get-btn hiden')
        }
    }
    // const getNewUser = () => {
    //     fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
    //     .then(data => {
    //     return data.json();
    //     })
    //     .then( 
    //         (result) => {
    //             setNewusers(result.users);
    //     },
    //         (error) => {
    //             setError(error);
    //     })
    // }
    const getUser = () => {

        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=1')
            .then(data => {
            return data.json();
            })
            .then( 
                (result) => {
                    if (result.users[0].id === users[0].id) {
                        setCount(count + 6);
                        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count='+count)
                        .then(data => {
                            return data.json();
                        })
                        .then( 
                            (result) => {
                                setUsers(result.users);
                                setIsLoaded(true);
                        },
                            (error) => {
                                setIsLoaded(true);
                                setError(error);
                        })
                    } else {
                        setCount(6);
                        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count='+count)
                        .then(data => {
                            return data.json();
                        })
                        .then( 
                            (result) => {
                                setUsers(result.users);
                                setIsLoaded(true);
                        },
                            (error) => {
                                setIsLoaded(true);
                                setError(error);
                        }
                        )
                    }
                },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                })
        switchBtn();
    }
    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count='+count)
            .then(data => {
                return data.json();
            })
            .then( 
                (result) => {
                    setUsers(result.users);
                    setIsLoaded(true);
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
            }
        )
    }, [count])
    if(error) {
        return (
            <div className='users-container'>
                <h1 className="h1">Working with GET request</h1>
                <p>Error {error.message}</p>
                <Preloader className="preloader hiden"></Preloader>
                <Button onClick={getUser} className={btnClass}>Show more</Button>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div className='users-container'>
                <h1 className="h1">Working with GET request</h1>
                <Preloader className="preloader"></Preloader>
                <Button onClick={getUser} className={btnClass}>Show more</Button>
            </div>
        )
    } else {
        return (
            <div className='users-container'>
                <h1 className="h1">Working with GET request</h1>
                <UsersList usersList={users}></UsersList>
                <Preloader className="preloader hiden"></Preloader>
                <Button onClick={getUser} className={btnClass}>Show more</Button>
            </div>
        )
    }
}
