export default function authenticate(req, res, next) {
  const { username, password } = req.body;

  const USERNAME = "admin";
  const PASSWROD = "123";

  if (username === USERNAME && password === PASSWROD) {
    req.loginFailed = false;
  } else {
    req.loginFailed = true;
  }
  next();
}
