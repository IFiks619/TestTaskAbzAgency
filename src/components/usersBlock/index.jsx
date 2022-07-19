import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from './Users.module.scss'
import UserCard from "../userCard";

const UsersBlock = ({ newUserRegistrated, setNewUserRegistrated }) => {
    const [allUsersDownloaded, setAllUsersDownloaded] = useState(false)
    const [usersCount, setUsersCount] = useState(6)
    const [isLoading, setIsloading] = useState(true)
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState(7) //I think this is a bad idea

    useEffect(() => {
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users')
            .then(res => setAllUsers(res.data.total_users))
    })

    useEffect(() => {
        axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?count=${usersCount}`)
            .then(res => {
                if (users.length + 6 >= allUsers) {
                    setAllUsersDownloaded(true)
                }
                if(newUserRegistrated){
                    setNewUserRegistrated(false)
                    setUsersCount(6)
                }
                setUsers(res.data.users)
                setIsloading(false)
            })
            .catch((e) => {
                console.log(e)
                setAllUsersDownloaded(true)
            })
    }, [usersCount, newUserRegistrated])

    return (
        <div className={styles.root}>
            <div className="container mb-50">
                <div>
                    {isLoading
                        ?
                        [...Array(6)].map((_, i) => (
                            <div key={i} className='lds_ring m-center'><div></div><div></div><div></div><div></div></div>
                        ))
                        :
                        users.map((user, idx) => (
                            <UserCard user={user} key={idx} />
                        ))
                    }
                </div>
            </div>
            <button
                onClick={() => setUsersCount(usersCount + 6)}
                className={allUsersDownloaded ? styles.hide : styles.show}
            >Show more</button>
        </div>
    )
}

export default UsersBlock;