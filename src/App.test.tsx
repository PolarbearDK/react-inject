import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import { Container } from './Container';
import { ISay, WorldService, SayService } from './Say';
import { ServiceNames } from './serviceNames';
import { registerContainer } from './di';

test('renders learn react link', () => {
  const container = new Container();
  container.registerSingleton<ISay>(WorldService.serviceName, () => new WorldService());
  container.register<ISay>(SayService.serviceName, () => new SayService('Goodbye'));
  container.register<ISay>(ServiceNames.SayService, () => new SayService('Foo Bond, James Bond'));
  registerContainer(container);

  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
