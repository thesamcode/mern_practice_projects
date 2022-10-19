import axios from "axios";
import "./login.scss"
import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClcik = async e => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials)
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/")
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: {message:"You are not authorized"} });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };



  return <div className="login">
    <div className="lContainer">
      <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" ></input>
      <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" ></input>
      <button disabled={loading} onClick={handleClcik} className="lButton">Login</button>
      {error && <span>{error.message}</span>}
    </div>
  </div>
};

export default Login;