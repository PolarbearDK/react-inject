import React from "react";
import { IContainer } from "./Container";

// const reactCreateElement = React.createElement;
let reactContainer: IContainer;

// function createElementDI(type: any, props: any, ...children: any) {
//   if (type && type.injectProps) {
//     const localProps = { ...props };
//     const injectProps = type.injectProps;
//     for (const injection in injectProps) {
//       if (localProps[injection] === undefined) {
//         localProps[injection] = reactContainer.get(injectProps[injection]);
//       }
//     }
//     props = localProps;
//   }

//   return reactCreateElement(type, props, ...children);
// }

export function registerContainer(container: IContainer) {
  reactContainer = container;
}

// This function takes a component and inject dependencies.
export function withDependencyInjection<T extends U, U>(WrappedComponent: (props: T) => any, injectProps: any) {
  return (props: U) => {
    const injectedProps: any = {};
    for (const injection in injectProps) {
      injectedProps[injection] = reactContainer.get(injectProps[injection]);
    }
    return <WrappedComponent {...props} {...injectedProps}></WrappedComponent>
  }
}

