import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle `
    :root {
        --maxWidth: 1280px;
        --white: #fff;
        --white: #000000;
        --lightGrey: #433434;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 55px;
        --fontMed: 24px;
        --fontSmall: 14px;
        --mainBrown: #613D2B;
    }
    * {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        box-sizing: border-box;
        font-family: Abhaya Libre ExtraBold;
    }
    body {
        margin: 0;
        padding: 0;
        background-color: #E5E5E5;
        overflow-x: hidden;
    }
    h1 {
        font-size: 2rem;
        font-weight: 600;
        color: var(--lightGrey)
    }
    h3 {
        font-size: 1.1rem;
        font-weight: 600;
    }
    p {
        font-size: 1rem;
        color: var(--black)
    }
`;
