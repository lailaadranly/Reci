import axios from "axios";

const API_KEY = "AIzaSyCh9vxDbVELjlrAtrxNwEpCXTWLLc5mSWA";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const user = response.data.localId;

  let responseData = { token: token, userId: user };

  return responseData;
}

export async function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
