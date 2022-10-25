//domain.com/

import Button from '@mui/material/Button';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Container, Grid, Stack, TextField} from "@mui/material";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Login from "./Login";

import NavBar from "../../component/NavBar/NavBar";

import CreatProfile from "./CreatProfile";
import AccountPage from "./AccountPage";


export default function Auth() {
  const {data: session} = useSession()
  const [needProfile, setNeedProfile] = useState(false);
  useEffect(() => {
    async function getUserInfo(email) {
      const res = await fetch('/api/needProfile', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {'Content-Type': 'application/json'}
      });

      const data = await res.json();
      //data.products.map(e => console.log(e))
      setNeedProfile(data.needProfile);
      // console.log("data.needProfile");
      // console.log(data.needProfile);
      return data.needProfile;
    }
    if (session) {
      getUserInfo(session.user.email);
    }

  }, [session]); // Or [] if effect doesn't need props or state


  if (session) { // already logged in
    if (needProfile) { //New Use First time login?
      return (
        <>
          <NavBar/>
          <h1>CreatProfile page</h1>
          <CreatProfile/>
          <Stack spacing={2.5} alignItems="center">
                <Button
                    variant="contained"
                    sx={{
                        width: { sm: 50, md: 100 },
                        height: { sm: 30, md: 60 },
                    }}
                    onClick={() => signOut({callbackUrl: 'http://localhost:3000/user/Auth'})}
                >Sign Out</Button>
            </Stack>
        </>
      );
    } //else: it's an old user.
    else {
      return (
        <>
          <NavBar/>

          <h1>AccountPage page</h1>
          <AccountPage/>
          <button onClick={() => signOut({callbackUrl: 'http://localhost:3000/user/Auth'})}>Sign out</button>
        </>
      )
    }

  }

  return ( /* need to logged in */ <>
      <NavBar/>
       <React.Fragment>
          <Container id="signup" justifyContent="left" maxWidth="sm">
              <Stack spacing={2.5} alignItems="center">
                  <h2>Welcome to WUBay, the harbor where used items receives a second life.</h2>
                  <h1>Please log in.</h1>
                  <Button
                      variant="contained"
                      sx={{
                          width: { sm: 100, md: 200 },
                          height: { sm: 30, md: 60 },
                      }}
                      onClick={() => signIn('google', {callbackUrl: 'http://localhost:3000/user/Auth'})}
                  >Log in with Google</Button>
              </Stack>
          </Container>
      </React.Fragment>
          </>
  )
}
