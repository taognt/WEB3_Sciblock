import { useContext, useState } from "react";
import AuthContext from "../../hooks/useSession";
import axios from "axios";

const SignIn = ({ onError }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setLoggedUser } = useContext(AuthContext);

    const handleSignIn = async () => {
        try {
            const responseLogin = await axios.post(
                "http://localhost:5000/login",
                {
                    email: email,
                    password: password,
                }
            );
            setLoggedUser(responseLogin.data.token);
        } catch (e) {
            onError(e);
        }
    };

    return (
        <div className="signin-container">
            <h3>Connection</h3>
            <form className="signin-form">
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="button"
                    className="signin-button"
                    value="se connecter"
                    onClick={handleSignIn}
                />
            </form>
        </div>
    );
};
export default SignIn;
