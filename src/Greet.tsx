import React from 'react';
import { ISay } from './Say';
import { withDependencyInjection } from './di';
import { ServiceNames } from './serviceNames';

export interface HelloProps {
  greeting: string;
}

export interface InjectedProps {
  say: ISay;
}

export function GreetInjected(props: HelloProps & InjectedProps) {
  const { greeting, say } = props;
  return <span>{greeting} {say.say()}</span>;
}

export const Greet = withDependencyInjection<HelloProps, InjectedProps>(GreetInjected, { say: ServiceNames.SayService });
