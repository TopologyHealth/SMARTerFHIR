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

Install from the command line: `npm install @topologyhealth/smarterfhir`

Install via package.json: `"@topologyhealth/smarterfhir": ">=0.4.1"`

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
