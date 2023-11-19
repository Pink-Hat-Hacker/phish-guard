import { useState } from 'react'
import phishGuardLogo from '/icon.png'
import './App.css'

function App() {
  const [color, setColor] = useState("");
  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true});
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
          document.body.style.backgroundColor = color;
      },
    });
  }
  return (
    <>
      <div>
        <a href="https://github.com/pink-hat-hacker" target="_blank">
          <img src={phishGuardLogo} className="logo" alt="PhishGuard logo" />
        </a>
      </div>
      <h1>PhishGuard</h1>
      <div className="card">
        <input type='color' onChange={(e) => setColor(e.currentTarget.value)}></input>
        <button onClick={() => onclick()}>
          Click Me
        </button>
      </div>
    </>
  )
}

export default App
