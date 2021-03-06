import React from  'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email:'',
            password: '',
        };

    }
    componentDidMount() {

    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const userCredentials = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userCredentials);
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin":"*",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userCredentials)
        }).then(async (res) => {
            console.log(res.ok)
            console.log(await res.json())
        })
    }

    render() {
        return(
            <div className="container h-100">
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div className="p-4 w-25 rounded shadow bg-white">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Email: </label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="email@email.com"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
                    </div>
                    <div className="form-group">
                    <label>Password: </label>
                    <input
                    type="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
                    </div>
                    <div className="form-group text-right">
                    <Link className="btn btn-outline-primary" to="/register">Register</Link>
                    <span className="px-1"></span>
                    <input type="submit"
                    value="Login"
                    className="btn btn-primary"
                    />
                    </div>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}