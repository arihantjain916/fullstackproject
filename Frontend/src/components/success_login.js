import React from "react";
import Button from "@mui/material/Button";

function SuccessLogin() {
    return(
        <>
        <h1>Success Login</h1>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href="/"
            >
              Logout
            </Button>
        </>
    )
}

export default SuccessLogin;