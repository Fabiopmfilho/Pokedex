import React from 'react'

export const themes = {
    dark: {
        color: 'white',
        background: 'gray',
        padding: '5px',
    },
    light: {
        color: 'black',
        background: 'white',
        padding: '5px',
    }
}

const ThemeContext = React.createContext(themes.dark)

export default ThemeContext;