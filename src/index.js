import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root"); //index.html의 root div
const root = createRoot(container);

root.render(<App />);

/** ReactDOM.render is no longer supported in React 18. Use createRoot instead. 
// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);

*/
