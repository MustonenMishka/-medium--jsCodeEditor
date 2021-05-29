# -medium--jsCodeEditor
Locally-installed in-browser JSCodeEditor. Create excecutable code notes with preview window or text nodes with editor. Build with Typescript, React/Redux, Esbuild and Lerna. Hosted on npm, try - "npx @js-editor/cli serve".

## Description

This project can be easily installed by "npx @js-editor/cli serve" command, after that, code editor will be installed and automaticly started on your local machine.  
Code editor excecutes your code on the fly (Esbuild on WebAssebly compiles and bundles really fast) and shows result in preview window.
Feel free to import necessary libraries or build React components. 
You can also use shortcut function "show" (Example: `show(<h1>Some title</h1>)`.  
Also create text notes with convenient text-editor panel.  
You can add notes, delete notes, change their order. They are saved to your local notebook.js file (use another file by changing command to "... serve anotherfile.js".  
Code cells are resizable, have jsx-syntax highlighting and can be nicely formatted with "Format" button.  

## Under the hood

- Main language: Typescript.
- UI: React and bulmaCSS. Each cell is independent frame. Usage of custom hooks included.
- State management: Redux with Typescropt nicelly integrated.
- Localhost: Express with read/save to local file logic.
- On-the-fly code compiling and bundling: esbuld on WASM.
- Importing exterbal libraries: custom esbuild plugin for fetching packages from unpkg and caching them with localforage.
- Resizing, highlighting and formatting: react-resizable, monaco-editor and prettier.
