import React from "react";
import { IContainer } from "./Container";

let reactContainer: IContainer;

export function registerContainer(container: IContainer) {
  reactContainer = container;
}

// This function takes a component and inject dependencies.
export function withDependencyInjection<TProps, TInjected>(WrappedComponent: (props: TProps & TInjected) => any, injectProps: Record<keyof TInjected, string>) {
  return (props: TProps) => {
    const injectedProps: any = {};
    for (const injection in injectProps) {
      injectedProps[injection] = reactContainer.get(injectProps[injection]);
    }
    return <WrappedComponent {...props} {...injectedProps}></WrappedComponent>
  }
}
