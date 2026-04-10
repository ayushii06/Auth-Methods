import axios from "axios"
// import jwksClient from "jwks-rsa";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:5000/auth/callback";

const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";


// const client = jwksClient({
//   jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
// });
const client = "";

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}




export const redirect = (req,res) =>{
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    res.redirect(url);
}


export const callback = async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { id_token } = tokenRes.data;

    jwt.verify(
      id_token,
      getKey,
      {
        audience: CLIENT_ID,
        issuer: ["https://accounts.google.com"],
      },
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid ID token" });
        }

        const { email, name, sub } = decoded;

        // Fake DB (replace with real DB)
        let user = { id: sub, email, name };

        // 🔑 Generate your app tokens
        const accessToken = jwt.sign(
          { userId: user.id },
          ACCESS_SECRET,
          { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
          { userId: user.id },
          REFRESH_SECRET,
          { expiresIn: "7d" }
        );

        // // 🍪 Store refresh token in cookie
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "Strict",
        // });

        res.json({ accessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Auth failed" });
  }
};

