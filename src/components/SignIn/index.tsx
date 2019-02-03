import * as React from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import { Link } from 'react-router-dom'
import { Alert, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { SignUpLink } from '../SignUp'

interface Props {
    firebase: any
    history: any
}
interface State {
    email: string
    password: string
    error: string | null
    formComplete: boolean
}

const INITIAL_STATE: State = {
    email: '',
    password: '',
    error: null,
    formComplete: false
}

class SignInFormBase extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {...INITIAL_STATE}
    }

    completeForm = () => {
        const {
            email,
            password
        } = this.state
        const emailValid = email.trim().length > 0
        const passwordValid = password.trim().length > 0
        const complete = emailValid && passwordValid
        this.setState(_ => ({formComplete: complete}))
    }

    handleInputChange = (name: string, value: string) => {
        const state: any = this.state
        state[name] = value
        this.setState(() => state, () => { this.completeForm() })
    }

    handleCancel = () => {
        this.setState(INITIAL_STATE)
    }

    handleSubmit = () => {
        const { email, password } = this.state

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.setState({...INITIAL_STATE})
                    this.props.history.push(ROUTES.HOME)
                }
            )
            .catch((error: any) => {
                this.setState({ error: error.message })
            })
    }

    render () {
        const {
            email,
            password,
            error,
            formComplete
        } = this.state

        const errorMsg = error && <Alert color="danger">{error}</Alert>

        return (
            <Form>
                {errorMsg}
                <FormGroup row>
                    <Label for="email" sm={2}>Email:</Label>
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
                    <Label for="password" sm={2}>Password:</Label>
                    <Col sm={10}>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={
                                (e: any) => {
                                    this.handleInputChange(e.target.name, e.target.value)
                                }
                            }
                            placeholder="Password"
                        />
                    </Col>
                </FormGroup>
                <div>
                    <Button
                        color="primary"
                        disabled={!formComplete}
                        onClick={this.handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Button
                        color="link"
                        onClick={this.handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        )
    }
}

const SignInLink = () => (
    <p>
        Have an account? <Link to={ROUTES.SIGNIN}>Sign In</Link>
    </p>
)

const SignInPage = () => (
    <div>
        Sign In
        <SignInForm/>
        <hr/>
        <SignUpLink/> 
    </div>
)

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase as any)

export default SignInPage
export { SignInForm, SignInLink, SignInFormBase }

