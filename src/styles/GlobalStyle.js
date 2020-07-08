import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    height: 100vh;
    background-image: linear-gradient(#343a3f, #181A1D);
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0;
    overflow: hidden;
    
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
  }

  body {
    margin: 0;
  }
`

export default GlobalStyle
