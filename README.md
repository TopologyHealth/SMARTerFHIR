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

Using npm's git repo support: `npm install git@github.com:TopologyHealth/SMARTerFHIR.git`

Support for the npm registry will be coming soon

 <!-- npm: -->
<!--
```bash
npm install smarter-fhir
``` -->

## Usage

Here's a basic example demonstrating how to use the SMARTerFHIR library:

### Web Launch (using EMR or Standalone Launch)

The following is an example of a function to handle the SMART Launch. I.e., when the EMR launches the application, it must be directed to the page that runs the following. E.g., this could be https://www.yourwebsite.com/launch

```typescript
async function handleWebLaunch() {
    try {
        const emrClientID = YOUR_EMR_CLIENT_ID
        const emrClientSecret = EMR_CLIENT_SECRET //OPTIONAL -> Only Required if your EMR Authentication was registered with a Secret
        const smartLaunchHandler = new SmartLaunchHandler(emrClientID, emrClientSecret) //If no secret, use 'new SmartLaunchHandler(emrClientID)'
        await smartLaunchHandler.authorizeEMR(LAUNCH.EMR) //If Standalone, use 'await smartLaunchHandler.authorizeEMR(LAUNCH.STANDALONE)'
    }
    catch (e) {
        if (e instanceof Error) {
            throw e;
        }
        throw new Error(`Unknown Error: ${e}`)
    }
}
```

Here’s a breakdown of the above code snippet:

* `emrClientID`: Pass in the Client ID of the EMR Client that you want to connect to
* `emrClientSecret`: Pass in the Client Secret of the EMR Client that you want to connect to
* `SmartLaunchHandler`: Our Handler Object. Used mainly with authorizeEMR() to authorize the app and redirect accordingly

### Standalone Launch Details (Only for Standalone Launch. Skip if doing EMR Launch)
Relevant if using Standalone Launch.

When running `handleWebLaunch` for Standalone Launch, an `iss` query parameter must be passed to the webpage.

To aid in simplicity, you can use this example button that navigates to the page that runs `handleWebLaunch` and passes in the appropriately required `iss`:
```typescript
    <Button  my="sm" onClick={startStandaloneLaunch}>
        {"Execute Standalone Launch"}
    </Button>

    const startStandaloneLaunch = () =>
    {
     const emrType = ((YOUR_REACT_APP_EMR_TYPE).toLowerCase() as EMR) //YOUR_REACT_APP_EMR_TYPE must be set to 'EPIC' or 'CERNER' (More EMRs to come!)
     const emrEndpoints = getEndpointsForEmr(emrType)
     const iss = emrEndpoints.r4.toString()
      navigate({
        pathname: '/standalonelaunch', //This pathname should make a request to the page that runs 'handleWebLaunch'
        search: `?iss=${iss}`,
      });
    }
```

### SMART Client

The following is an example of a function to instantiate the SMART Client after `SMART Launch` has completed. During SmartLaunch, the EMR will authenticate your application. Once completed, it will redirect to the assigned redirect url. The code below should be set to run upon successful authentication and redirect:

```typescript
async function mySmartClientInstantiator() {
    try {
        const clientFactory = new ClientFactory();
        const client = await clientFactory.createEMRClient(LAUNCH.EMR) //If Standalone, use 'await clientFactory.createEMRClient(LAUNCH.STANDALONE)'
        if (!client) throw new Error('no client found')
        return client
    } catch (reason) {
        if (!(reason instanceof Error))
            throw new Error(`Unknown Error: ${reason}`)
        if (reason.message.includes("No 'state' parameter found. Please (re)launch the app.")
            || reason.message.includes("Could not find any JWT token")
            || reason.message === NO_CODE) {
            return console.log('No EMR connection established.')
        }
        if (reason.message.includes("User is not available"))
            return console.log('Waiting for Web Launch...')
        console.error(reason.message)
    }
}
```
Code snippet breakdown:

* `clientFactory`: Object for creating new EMRClients post-SMART authentication
* `client`: Client object for performing operations against the EMR for writing/receiving data

Make sure to import the necessary classes, interfaces, and types based on your requirements.

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
