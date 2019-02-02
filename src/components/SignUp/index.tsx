import * as React from 'react'
import { Link } from 'react-router-dom'
import { Alert, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

interface Props {
    firebase: any
    history: any
}

interface State {
    username: string
    passwordOne: string
    passwordTwo: string
    email: string
    error: string | null
    formComplete: boolean
}

class SignUpFormBase extends React.Component<Props, State> {
    readonly initialState: State = {
        username: '',
        passwordOne: '',
        passwordTwo: '',
        email: '',
        error: null,
        formComplete: false
    }
    constructor (props: Props) {
        super(props)
        this.state = this.initialState
    }

    completeForm = () => {
        const {
            username,
            passwordOne,
            passwordTwo,
            email
        } = this.state
        const userNameValid = username.trim().length > 0
        const passwordOneValid = passwordOne.trim().length > 0
        const passwordTwoValid = passwordTwo.trim().length > 0
        const passwordsMatch = passwordOne.trim() === passwordTwo.trim()
        const emailValid = email.trim().length > 0
        const isComplete = userNameValid && passwordOneValid && passwordTwoValid && passwordsMatch && emailValid

        let error: string | null = null
        if (!userNameValid) {
            error = `Username is invalid`
        } else if (userNameValid && !emailValid) {
            error = `Email address is invalid`
        } else if (
            userNameValid && emailValid && (!passwordOneValid || !passwordsMatch)
        ) {
            error = `Password invalid or passwords don't match`
        }

        this.setState(
            (prevState: any) => ({
                formComplete: isComplete,
                error: error
            })
        )
    }

    handleInputChange = (name:string, value: string) => {
        const state: any = this.state
        state[name] = value

        this.setState(
            (prevState: any) => state,
            () => { this.completeForm() }
        )
    }

    handleCancel = () => {
        this.setState((prevState: State) => ({ ...this.initialState }))
    }

    handleSubmit = (event: any) => {
        const { username, email, passwordOne } = this.state

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(
                (authUser: any) => {
                    // successful response
                    this.setState({...this.initialState})
                    this.props.history.push(ROUTES.HOME)
                }
            )
            .catch (
                (error: any) => {
                    // handle error
                    this.setState((prevState) => ({ error: error.message }))
                }
            )
        event.preventDefault();
    }

    render () {
        const {
            username,
            passwordOne,
            passwordTwo,
            email,
            error,
            formComplete
        } = this.state
        
        const errorMsg = error && <Alert color="danger">{error}</Alert>

        return (
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="username" sm={2}>Username:</Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="username"
                                value={username}
                                onChange={
                                    (e: any) => {
                                        this.handleInputChange(e.target.name, e.target.value)
                                    }
                                }
                                placeholder="Full Name"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="email"
                                value={email}
                                onChange={
                                    (e: any) => {
                                        this.handleInputChange(e.target.name, e.target.value)
                                    }
                                }
                                placeholder="Email Address"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="passwordOne" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input
                                type="password"
                                name="passwordOne"
                                value={passwordOne}
                                onChange={
                                    (e: any) => {
                                        this.handleInputChange(e.target.name, e.target.value)
                                    }
                                }
                                placeholder="Password"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="passwordTwo" sm={2}>Confirm Password</Label>
                        <Col sm={10}>
                            <Input
                                type="password"
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={
                                    (e: any) => {
                                        this.handleInputChange(e.target.name, e.target.value)
                                    }
                                }
                                placeholder="Confirm Password"
                            />
                        </Col>
                    </FormGroup>
                    <div>
                        <Button
                            color="primary"
                            disabled={!formComplete}
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                        </Button>
                        <Button
                            color="link"
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                    {errorMsg}
                </Form>
            </div>
        )
    }
}

const SignUpPage = () => (
    <div>
        <h1>Register to use this awesome app!</h1>
        <hr/>
        <SignUpForm />
    </div>
)

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGNUP}>Sign Up</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase as any)

export default SignUpPage
export { SignUpForm, SignUpLink, SignUpFormBase }
