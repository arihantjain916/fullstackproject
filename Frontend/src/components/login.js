import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
const defaultTheme = createTheme();

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.headers = "application/json"

const client = axios.create({
  baseURL: "http://localhost:8000/"
})

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()

  async function handleSave(e) {
    e.preventDefault();
    try {
      const res = await client.post(
        "/api/login/",
        {
          email: email,
          password: password,
        }
      );
      if (res.status === 200) {
        console.log("LOGIN SUCCESSFULLY");
      }
      window.location.href = "/successlogin";
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }
  return (
    <form onSubmit={handleSave}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              value={email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            // href = "/success"
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
    //   <form onSubmit={handleSave}>
    //     <input
    //       value={email}
    //       name="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Email"
    //       type="email"
    //       label = "Email"
    //     />
    //     <br />
    //     <input
    //       value={password}
    //       name="password"
    //       type="password"
    //       onChange={(e) => SetPassword(e.target.value)}
    //       placeholder="Password"
    //       label = "Password"
    //     />
    //     <br />
    //     <button className="button" type="submit">
    //       Enter
    //     </button>
    //     <br />
    //   </form>
  )
}

export default Login;
