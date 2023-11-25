# conversor-react-angular
## Conversor de código React para Angular
A aplicação foi criada com o objetivo de melhorar as técnicas de códificação. A ideia foi criar um conversor de React para Angular, atualmente é realizada a seguinte tradução:

``` JavaScript
import React from 'react'
function Topo () {
  return (
    <></>
  )
}

export default Topo

```

### Para

``` TypeScript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent {
}

```

### instalação do conversor
Abra a pasta da aplicação e mande o comando abaixo

```CMD
npm install
```

Após baixar os pacotes basta apenas rodar o comando npm start na pasta aberta do projeto.

### Procedimentos para realizar a conversão

1) Copie a função do componente React seguindo o execplo abaixo

```JavaScript
import React from 'react'
function SeuComponent () {
  return (
    <></>
  )
}

export default Topo
```

2) Após digitar o componente no textarea clique no botão "Coverter para Angular"
3) Veja no canto direito o componente Angular gerado