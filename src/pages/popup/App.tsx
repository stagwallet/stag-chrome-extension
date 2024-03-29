
import * as Stag from '../../stag'

import { useEffect, useState } from 'react'

//const { PrivateKey } = require('bsv')

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export function SignIn({ setLocked }: { setLocked: Function }) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  function handleUnlock() {

    setLocked(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <img src={`https://media.twetch.app/dyt/256x256/545af7c1e4e2453c164306c62fe9555e8599819d8751720763c0fd567f4ce784.png`} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Stag Wallet
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleUnlock}
            >
              Unlock
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Import Relayx Seed"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const App = (): JSX.Element => {

  const [boosting, setBoosting] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [locked, setLocked] = useState<boolean>(true)

  //const [privateKey] = useState(new PrivateKey())

  const [address, setAddress] = useState<string>()

  //setAddress('ADDRESS' )//privateKey.toAddress().toString())

 //const [wallet, setWallet] = useState<Stag.Wallet | null>()


  /*useEffect(() => {

    (async () => {

      const _wallet = await Stag.loadWallet()

      setWallet(_wallet)

    })()

  }, [])*/

  async function boostNow(event: any) {

    event.preventDefault()

    setMessage('Boosting...')

    setBoosting(true)

    setTimeout(() => {

      setMessage('Success!')

      setTimeout(() => {

        setMessage('')

        setBoosting(false)
  
      }, 2500)

    }, 2500)

    console.log('boost now')

  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {locked ? (
         <SignIn setLocked={setLocked} />
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <img src={`https://media.twetch.app/dyt/256x256/545af7c1e4e2453c164306c62fe9555e8599819d8751720763c0fd567f4ce784.png`} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Stag Wallet
            </Typography>
            {/*wallet?.card?.address && (
              <p>wallet: {wallet?.card?.address}</p>
            )*/}
            <br/>
            <br/>
            {boosting ? (
              <p>{message}</p>
            ) : (
              <Button variant="contained" onClick={boostNow}>Boost Now</Button>
            )}
            
         </Box>
        )}

      </Container>
    </ThemeProvider>
  )
}

export default App
