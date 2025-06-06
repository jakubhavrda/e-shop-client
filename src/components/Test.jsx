import { UserContext } from "./app";
import { useContext } from "react";

function Test() {
    const {user} = useContext(UserContext);
    console.log("user in Test component:", user);
    
    return (
        <div>
            <h1>Test Component</h1>
            <p>This is a test component to verify the setup.</p>
            {user && <p>User: {user.name}</p>}
        </div>
    );
}

export default Test;