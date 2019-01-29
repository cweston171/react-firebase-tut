import * as React from 'react'

const context: any = null // cast as 'any', so that type inference doesn't expect null in firebase context provider
const FirebaseContext = React.createContext(context)

export default FirebaseContext
