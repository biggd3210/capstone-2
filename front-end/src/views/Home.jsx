import React, { useState } from "react";

/* Styles and image imports */
import './Home.css'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import cthLogo from '/CTH-Logo.webp'

function Home() {
    const [count, setCount] = useState(0)
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                <img src={cthLogo} className="logo" alt="CTH logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
      </>
    )
}

export default Home;