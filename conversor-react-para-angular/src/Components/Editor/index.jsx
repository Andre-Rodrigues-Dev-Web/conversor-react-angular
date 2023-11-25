import React, { useState } from 'react';
import './style.scss';

const Editor = () => {
  const [inputCode, setInputCode] = useState('');
  const [convertedCode, setConvertedCode] = useState({ ts: '', html: '' });

  const handleInputChange = (event) => {
    setInputCode(event.target.value);
  };

  const convertReactToAngular = (reactCode) => {
    try {
      // Encontrar o nome do componente
      const componentNameMatch = reactCode.match(/(?:function|class)\s+(\w+)/);
      const componentName = componentNameMatch ? componentNameMatch[1] : 'MyComponent';

      // Converter JSX para HTML Angular
      let htmlMatch = reactCode.match(/return\s+\(([\s\S]*)\);/m);
      let htmlCode = htmlMatch ? htmlMatch[1].trim() : '';
      htmlCode = htmlCode.replace(/\{props\.(\w+)\}/g, '{{$1}}');
      htmlCode = htmlCode.replace(/className=/g, 'class=');

      // Conversão de eventos e bindings
      const eventMappings = {
        onClick: '(click)',
        onChange: '(ngModelChange)',
        onSubmit: '(ngSubmit)'
      };

      Object.keys(eventMappings).forEach(reactEvent => {
        const angularEvent = eventMappings[reactEvent];
        const regex = new RegExp(`${reactEvent}=\{([^}]+)\}`, 'g');
        htmlCode = htmlCode.replace(regex, `${angularEvent}="$1"`);
      });

      // Converter bindings de dados
      htmlCode = htmlCode.replace(/\{([^}]+)\}/g, '{{$1}}');

      // Criar o código TypeScript para o componente Angular
      let tsCode = `import { Component, Input, Output, EventEmitter } from '@angular/core';\n\n`;
      tsCode += `@Component({\n`;
      tsCode += `  selector: 'app-${componentName.toLowerCase()}',\n`;
      tsCode += `  templateUrl: './${componentName.toLowerCase()}.component.html',\n`;
      tsCode += `  styleUrls: ['./${componentName.toLowerCase()}.component.scss']\n`;
      tsCode += `})\n`;
      tsCode += `export class ${componentName}Component {\n`;

      // Conversão de props e estados
      const propsMatch = reactCode.match(/this\.props\.(\w+)/g);
      const stateMatch = reactCode.match(/this\.state\.(\w+)/g);

      const props = propsMatch ? [...new Set(propsMatch.map(match => match.split('.')[1]))] : [];
      const states = stateMatch ? [...new Set(stateMatch.map(match => match.split('.')[1]))] : [];

      props.forEach(prop => {
        tsCode += `  @Input() ${prop}: any;\n`;
      });

      states.forEach(state => {
        tsCode += `  ${state}: any;\n`;
      });

      tsCode += `}\n`;

      return { ts: tsCode, html: htmlCode };
    } catch (error) {
      console.error('Erro ao converter o código:', error);
      return { ts: '', html: '' };
    }
  };

  const convertCode = () => {
    setConvertedCode(convertReactToAngular(inputCode));
  };

  return (
    <div className="container-editor">
      <div className="editor">
        <h2>React to Angular Code Converter</h2>
        <textarea
          value={inputCode}
          onChange={handleInputChange}
          placeholder="Digite seu código React aqui..."
          cols="30"
          rows="30"
        />
        <button onClick={convertCode}>Converter para Angular</button>
      </div>
      <div className='resultado'>
        <h3>Código TypeScript:</h3>
        <pre className="ts"><code>{convertedCode.ts}</code></pre>
        <h3>HTML do Componente:</h3>
        <pre className="html"><code>{convertedCode.html}</code></pre>
      </div>
    </div>
  );
}

export default Editor;
