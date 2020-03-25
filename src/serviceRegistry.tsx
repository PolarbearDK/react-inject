export const foo = 42;
// import React, { PropsWithChildren, useContext } from 'react';
// import { Container, IContainer } from './Container';


// const container = new Container();

// // const containerContext = React.createContext<IContainer>(container);

// // export function WithContainer(props: PropsWithChildren<{}>) {
// //   return <containerContext.Provider value={container}>{props.children}</containerContext.Provider>;
// // }

// // export function useContainer() {
// //   return useContext(containerContext);
// // }






// class Service1 { }
// class Service2 { }
// class Service3 {
//   static serviceName = "Service3"
//   constructor(private service1: Service1, private service2: Service2) {
//   }
// }




// container.registerSingleton("Service1", new Service1()) // TODO use nameof from Typescript when it becomes available https://github.com/microsoft/TypeScript/issues/1579
// container.registerSingleton("Service2", (x) => new Service2())
// container.register(Service3.serviceName, (x) => new Service3(x.get<Service1>("Service1"), x.get<Service2>("Service2")))




// export function mySampleComponent(props: {}) {
//   const Container = useContainer();
//   const service = Container.get<Service3>(Service3.serviceName);
//   ...
// }


// InversifyJS but not for functional components.