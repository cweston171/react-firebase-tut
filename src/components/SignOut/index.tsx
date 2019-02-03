import * as React from 'react'
import { withFirebase } from '../Firebase'
import { Button } from 'reactstrap'

interface Props {
    firebase: any
}
const SignOut = ({ firebase = null}: Props) => (
    <Button
        color="primary"
        onClick={firebase.doSignOut}
    >
        Sign Out
    </Button>
)

export default withFirebase(SignOut)
