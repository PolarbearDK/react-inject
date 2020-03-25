import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { WorldService, SayService, ISay } from './Say';
import { App } from './App';
import { Container } from './Container';
import { registerContainer } from './di';
import { ServiceNames } from './serviceNames';


const container = new Container();
container.registerSingleton<ISay>(WorldService.serviceName, () => new WorldService())
container.register<ISay>(SayService.serviceName, () => new SayService("Goodbye"))
container.register<ISay>(ServiceNames.SayService, () => new SayService("Foo Bond, James Bond"))
registerContainer(container);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
