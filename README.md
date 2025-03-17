▗▖ ▗▖ ▗▄▄▖▗▖  ▗▖    ▗▖   ▗▄▄▄▖▗▄▄▄   ▗▄▄▖▗▄▄▄▖▗▄▄▖ 
▐▌ ▐▌▐▌   ▐▛▚▞▜▌    ▐▌   ▐▌   ▐▌  █ ▐▌   ▐▌   ▐▌ ▐▌
▐▛▀▜▌ ▝▀▚▖▐▌  ▐▌    ▐▌   ▐▛▀▀▘▐▌  █ ▐▌▝▜▌▐▛▀▀▘▐▛▀▚▖
▐▌ ▐▌▗▄▄▞▘▐▌  ▐▌    ▐▙▄▄▖▐▙▄▄▖▐▙▄▄▀ ▝▚▄▞▘▐▙▄▄▖▐▌ ▐▌




## Overview

Ledger Signer provides a simple yet robust interface to interact with Ledger devices using TypeScript. It supports secure message signing, dynamic user input, comprehensive error handling, and includes utilities for logging and CLI prompting.

## Features

- **Secure Message Signing:** Interact with Ledger devices to sign messages.
- **Modular Design:** Clear separation of concerns with dedicated modules for logging, prompting, and signing.
- **Robust Error Handling:** Gracefully handles common Ledger errors and prompts users for corrective actions.
- **TypeScript & Jest:** Written in TypeScript with comprehensive test coverage using Jest.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed (v14 or higher is recommended).

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TacitusXI/ledger-signer.git
   cd ledger-signer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

### Build

Compile the TypeScript code to JavaScript:

```bash
npm run build
```

### Run

Start the application with:

```bash
npm run start
```

### Lint

Check for code quality and consistency using ESLint:

```bash
npm run lint
```

### Test

Run the test suite with Jest:

```bash
npm run test
```

## Scripts (from package.json)

- **build:** Compiles the TypeScript files using tsc.
- **start:** Runs the application via ts-node src/index.ts.
- **lint:** Executes ESLint on .ts files to enforce coding standards.
- **test:** Runs tests using Jest.

## Dependencies

Key dependencies include:

- **@ledgerhq/hw-app-eth & @ledgerhq/hw-transport-node-hid:** For Ledger device interaction.
- **usb-detection:** To monitor USB device status.

Dev dependencies include TypeScript, ESLint, and Jest for testing and code quality.
