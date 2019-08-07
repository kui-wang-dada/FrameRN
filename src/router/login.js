import Login from "login/Login";
import Password from "login/Password";
import Register from "login/Register";

const LoginRoute = {
  login: {
    screen: Login
  },
  password: {
    screen: Password
  },
  register: {
    screen: Register
  }
};
export default LoginRoute;
