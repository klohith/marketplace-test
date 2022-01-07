const axios = require('axios').default;
const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkF6SWVRbm9KRmUtQy1nWEg1Yk9wSCJ9.eyJpc3MiOiJodHRwczovL2Rldi1zei0zenA1Zi5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDYxOTM0OTY0NjExMjk2MTQ1NTQiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtc3otM3pwNWYuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2Rldi1zei0zenA1Zi5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjM0NTU2NjE3LCJleHAiOjE2MzcxNDg2MTcsImF6cCI6IlVvM2YzT1lxQmY2OEVYV21mUW03c1cyNnZvY3pFbWFsIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciB1cGRhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIn0.GfRQ-AHfRiUF5W0MNExyrkuaiU-yJajFxwNQQtSZ0oeGEZkaKY7X9zVhLhk7iSeCWxgSwb--xeZ8Jsj7F5oqzulkX-iCDA9VHeMKKGXFvC5V7641JeoskqpTJ7jr4nDsizQPsxVQtvUjobjxo8fa_j1fqF2bWSpwR0G-bNlSDuyOm1a5rAidGOs9LbSfkm2pMTbKMkyoD2pOviBPzP-1dIFFPi8V2jIqQK4z683H8s-jYwcLrKgHNGTpXLSabJz1Y_AuGl-nV0nbGaGna9WPjlbhe3BCUKY7CWosGJB1509ecmL476COJEzMSm65lawQFKOnjy6o5xdGUzr9hhlvQw'

async function funcOne() {
  const url = `https://dev-sz-3zp5f.eu.auth0.com/api/v2/users/google-oauth2|106193496461129614554`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(res);
  const userMetadata = res;
  console.log(userMetadata);
}

funcOne()
