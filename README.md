# SMARTerFHIR Library

The SMARTerFHIR library is a powerful toolkit for interacting with FHIR (Fast Healthcare Interoperability Resources) servers and implementing SMART on FHIR applications. It's based on tools and digital health standards from [SMART Health IT.](https://smarthealthit.org/) It provides a set of classes and utilities to facilitate FHIR resource handling, launch contexts, and EMR (Electronic Medical Record) integration.

## Features

- **FHIR Client**: The library includes a robust FHIR client implementation that supports communication with FHIR servers using the SMART on FHIR protocol.

- **Launch Handling**: SMARTerFHIR provides a `SmartLaunchHandler` class that simplifies the process of launching applications with different EMR systems such as Cerner, Epic, or SMART Health IT. It offers methods for handling launch requests and obtaining authorization tokens.

- **Resource Transformation**: The library includes a `Transformer` namespace that provides functions for transforming FHIR resources between the standard R4 format and the FHIR client format. This enables seamless integration with different FHIR implementations.

- **Client Abstraction**: The library provides an abstract `BaseClient` class that serves as the foundation for creating EMR-specific client implementations. It includes common functionality such as resource hydration, context creation, and resource creation.

- **Cerner and Epic Clients**: The library includes concrete client implementations for Cerner and Epic EMR systems. These clients extend the `BaseClient` class and provide specific implementation details for creating and interacting with resources in Cerner and Epic environments.

- **Client Factory**: The `ClientFactory` class simplifies the creation of EMR clients by automatically determining the EMR type based on the FHIR client configuration. It returns the appropriate client instance based on the detected EMR system.

## Installation

You can install the SMARTerFHIR library using... TBD

 <!-- npm: -->
<!--
```bash
npm install smarter-fhir
``` -->

## Usage

Here's a basic example demonstrating how to use the SMARTerFHIR library:

### Smart Launch

The following is an example of a function to handle the SMART Launch. I.e., when the EMR launches the application, it must be directed to the page that runs the following. E.g., this could be https://www.yourwebsite.com/launch

```typescript
async function mySmartLaunch() => {
  try {
      const queryString = window.location.search;
      const originString = window.location.origin;
      const urlParams = new URLSearchParams(queryString);
      const iss = urlParams.get('iss');
      let client: Client
      let smartLaunchHandler: SmartLaunchHandler
      if (iss !== null) {
          if (iss.includes('cerner')) {
              smartLaunchHandler = new SmartLaunchHandler(cernerClientID, EMR.CERNER)
              smartLaunchHandler.authorizeEMR()
          } else if (iss.includes('epic')) {
              smartLaunchHandler = new SmartLaunchHandler(epicClientID, EMR.EPIC)
              smartLaunchHandler.authorizeEMR()
          }
      }
  }
}
```

### SMART Client

The following is an example of a function to instantiate the SMART Client after SmartLaunch has completed. During SmartLaunch, the EMR will authenticate your application. Once completed, it will redirect to the assigned redirect url. The code below should run upon successful authentication and redirect:

```typescript
async function mySmartClientInstantiator() => {
  try {
    const clientFactory = new ClientFactory();
    const baseClient = await clientFactory.createEMRClient()
        .then(async (client) => {
            if (!client) throw new Error('no client found')
            return client
        })
        .catch((reason) => {
            throw new Error(`client not found: ${reason}`)
        })
    }
}
```

Make sure to import the necessary classes, interfaces, and types based on your requirements.

## Documentation

For detailed documentation on the SMARTerFHIR library, including classes, methods, and usage examples, please refer to the official documentation at [https://topology.health/docs](https://topology.health/docs).

## Contributing

Contributions to the SMARTerFHIR library are welcome! If you encounter any issues or have suggestions for improvement, please submit a GitHub issue or pull request in the repository at [TBD](https://github.com/your-repo).

Before contributing, please review the guidelines and code of conduct outlined in the repository.

## License

The SMARTerFHIR library is released under the [Apache 2.0 License](https://opensource.org/license/apache-2-0/). You are free to use, modify, and distribute this library in accordance with the terms of the license.

## Acknowledgments

We would like to express our gratitude to the developers and contributors who have made the SMARTerFHIR library possible. Their hard work and dedication are greatly appreciated.

## About

The SMARTerFHIR library is developed and maintained by [Topology Health](https://topology.health). For inquiries, please contact [info@topology.health](mailto:info@topology.health)
