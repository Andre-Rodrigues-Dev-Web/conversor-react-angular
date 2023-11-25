import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [convertedCode, setConvertedCode] = useState({ ts: '', html: '' });

  const handleInputChange = (event) => {
    setInputCode(event.target.value);
  };

  const convertReactToAngular = (reactCode) => {
    // Encontrar o nome do componente
    const componentNameMatch = reactCode.match(/function\s+(\w+)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'MyComponent';

    // Converter JSX para HTML Angular
    const htmlMatch = reactCode.match(/return\s+\(([\s\S]*)\);/m);
    let htmlCode = htmlMatch ? htmlMatch[1].trim() : '';
    htmlCode = htmlCode.replace(/\{props\.(\w+)\}/g, '{{$1}}');

    // Criar o código TypeScript para o componente Angular
    let tsCode = `import { Component, Input } from '@angular/core';\n\n`;
    tsCode += `@Component({\n`;
    tsCode += `  selector: 'app-${componentName.toLowerCase()}',\n`;
    tsCode += `  templateUrl: './${componentName.toLowerCase()}.component.html'\n`;
    tsCode += `})\n`;
    tsCode += `export class ${componentName}Component {\n`;
    tsCode += `  @Input() name: string;\n`;
    tsCode += `}\n`;

    return { ts: tsCode, html: htmlCode };
  };

  const convertCode = () => {
    setConvertedCode(convertReactToAngular(inputCode));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="editor">
          <h2>React to Angular Code Converter</h2>
          <textarea
            value={inputCode}
            onChange={handleInputChange}
            placeholder="Digite seu código React aqui..."
            cols="80"
            rows="90"
          />
          <button onClick={convertCode}>Converter para Angular</button>
        </div>
        <div className='resultado'>
          <h3>Código TypeScript:</h3>
          <pre>{convertedCode.ts}</pre>
          <h3>HTML do Componente:</h3>
          <pre>{convertedCode.html}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
