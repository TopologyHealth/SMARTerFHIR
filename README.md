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
async function handleSmartLaunch() {
    try {
        const emrClientID = MY_EMR_CLIENT_ID
        const smartLaunchHandler = new SmartLaunchHandler(emrClientID)
        smartLaunchHandler.authorizeEMR()
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
    }
}
```

### SMART Client

The following is an example of a function to instantiate the SMART Client after SmartLaunch has completed. During SmartLaunch, the EMR will authenticate your application. Once completed, it will redirect to the assigned redirect url. The code below should run upon successful authentication and redirect:

```typescript
async function mySmartClientInstantiator() {
    const clientFactory = new ClientFactory();
    const baseClient = await clientFactory.createEMRClient()
        .then((client) => {
            if (!client) throw new Error('no client found')
            return client
        }).catch((reason) => {
            throw new Error(`client not found: ${reason}`)
        })
    return baseClient
}
```

Make sure to import the necessary classes, interfaces, and types based on your requirements.

### Standalone Launch

For a [Standalone Launch](https://build.fhir.org/ig/HL7/smart-app-launch/app-launch.html#launch-app-standalone-launch), the user begins by authenticating through their EMR and is redirected to your application on success.

The following example function uses SMARTerFHIR to begin the standalone launch flow with an EMR, which will redirect the user to the EMR to continue the flow:

```typescript
async function startStandaloneLaunch(emrType: EMR, emrClientId: string) {
    const smartLaunchHandler = new SmartLaunchHandler(emrClientID)
    smartLaunchHandler.authorizeStandaloneEMR(emrType)
}
```

The following example function will instantiate a SMART Client if executed after the EMR redirects from a standalone launch:

```typescript
async function myStandaloneSmartClientInstantiator() {
    const clientFactory = new ClientFactory();
    const baseClient = await clientFactory.createStandaloneEMRClient()
        .then((client) => {
            if (!client) throw new Error('no client found')
            return client
        }).catch((reason) => {
            throw new Error(`client not found: ${reason}`)
        })
    return baseClient;
}
```

## Documentation

For detailed documentation on the SMARTerFHIR library, including classes, methods, and usage examples, please refer to the official documentation at [https://topology.health/docs](https://topology.health/docs).

## Contributing

Contributions to the SMARTerFHIR library are welcome! If you encounter any issues or have suggestions for improvement, please submit a GitHub issue or pull request in the repository at [SMARTerFHIR](https://github.com/TopologyHealth/SMARTerFHIR).

Before contributing, please review the guidelines and code of conduct outlined in the repository:

### Ground Rules

#### Contributions and discussion guidelines

By making a contribution to this project, you are deemed to have accepted the [Developer Certificate of Origin](https://developercertificate.org/) (DCO).

All conversations and communities on SMARTerFHIR agree to GitHub's [Community Guidelines](https://help.github.com/en/github/site-policy/github-community-guidelines) and [Acceptable Use Policies](https://help.github.com/en/github/site-policy/github-acceptable-use-policies). This code of conduct also applies to all conversations that happen within our contributor community here on GitHub. We expect discussions in issues and pull requests to stay positive, productive, and respectful.
#### Reporting a bug or discussing a feature idea

If you found a technical bug on SMARTerFHIR or have ideas for features we should implement, the issue tracker is the best place to share your ideas. Make sure to follow the issue template ([click here to open a new issue](https://github.com/TopologyHealth/SMARTerFHIR/issues/new))

#### Fixing a bug or implementing a new feature

If you find a bug on SMARTerFHIR and open a PR that fixes it, we'll review it as soon as possible to ensure it matches our engineering standards.

If you want to implement a new feature, open an issue first to discuss what it'd look like and to ensure it fits in our roadmap and plans for the app.

## License

The SMARTerFHIR library is released under the [Apache 2.0 License](https://opensource.org/license/apache-2-0/). You are free to use, modify, and distribute this library in accordance with the terms of the license.

## Acknowledgments

We would like to express our gratitude to the developers and contributors who have made the SMARTerFHIR library possible. Their hard work and dedication are greatly appreciated.

## About

The SMARTerFHIR library is developed and maintained by [Topology Health](https://topology.health). For inquiries, please contact [info@topology.health](mailto:info@topology.health)
