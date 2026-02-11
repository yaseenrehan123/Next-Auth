import { auth } from './auth'

const DebugLoggedInState = async () => {
    const session = await auth();
    console.log("LOGIN SESSION: ", session);
    return (
        <div></div>
    )
}

export default DebugLoggedInState