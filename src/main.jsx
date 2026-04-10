import React from 'react';
import ReactDOM from 'react-dom/client';

window.React = React;
window.useState = React.useState;
window.useEffect = React.useEffect;
window.useRef = React.useRef;
window.useCallback = React.useCallback;
window.useMemo = React.useMemo;
window.useReducer = React.useReducer;
window.useContext = React.useContext;
window.createContext = React.createContext;

import * as Recharts from 'recharts';
window.Recharts = Recharts;

import * as XLSX from 'xlsx';
window.XLSX = XLSX;

window.addEventListener('load', () => {
    if (window.BRASAO_B64) {
        const el = document.getElementById("ld-icon");
        if (el) {
          const img = document.createElement("img");
          img.src    = window.BRASAO_B64;
          img.className = "ld-brasao";
          img.alt    = "Brasão Gov. Edison Lobão";
          el.parentNode.replaceChild(img, el);
        }
    }

    const s = document.createElement('script');
    s.src = '/app.js';
    s.onload = () => {
        if (typeof window.App === "function") {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(React.createElement(window.App));

            setTimeout(() => {
                const ls = document.getElementById("loading-screen");
                if (ls) {
                    ls.classList.add("hide");
                    setTimeout(() => ls.remove(), 600);
                }
            }, 300);
        } else {
            console.error("Erro: window.App não definido.");
        }
    };
    document.body.appendChild(s);
});
