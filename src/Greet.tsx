import React from 'react';
import { ISay } from './Say';
import { withDependencyInjection } from './di';
import { ServiceNames } from './serviceNames';

export interface HelloProps {
  greeting: string;
  say: ISay;
}

export function GreetInjected(props: HelloProps) {
  const { greeting, say } = props;
  return <span>{greeting} {say.say()}</span>;
}

export const Greet = withDependencyInjection<HelloProps, Omit<HelloProps, 'say'>>(GreetInjected, { say: ServiceNames.SayService });
