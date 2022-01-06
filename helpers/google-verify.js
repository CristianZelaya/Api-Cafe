const {OAuth2Client} = require('google-auth-library');

const { GOOGLE_CLIENT_ID } = process.env;

const client = new OAuth2Client( GOOGLE_CLIENT_ID );

async function googleVerify( token = '' ) {

  const ticket = await client.verifyIdToken({

      idToken: token,
      audience: GOOGLE_CLIENT_ID,  
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

  });

  const { name, email, picture } = ticket.getPayload();

  return{
      nombre: name,
      correo: email,
      img: picture
  }

}

module.exports = {

    googleVerify

}

