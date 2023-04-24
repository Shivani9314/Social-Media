import React, {useState} from 'react'
import {Link} from "react-router-dom"
import './Signup.scss'
import { axiosClient } from '../../utils/axiosClient';

function Signup() {

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    async function handleClick(e) {
        e.preventDefault();
        try {
            const result = await axiosClient.post('/auth/signup', {
                name,
                email,
                password,

            });

            console.log(result)

        } catch (error) {
            console.log("error",error);
        }
    }

    return (
        <div className="Signup">
            <div className="Signup-box">
                <h2 className="heading">SignUp</h2>
                <form onSubmit={handleClick}>

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                         />

                    <input type="submit" className="submit" />
                </form>
                <p className="subheading">
                    Do not have an account? <Link to="/login"> Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup