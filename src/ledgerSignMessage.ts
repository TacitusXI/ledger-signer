import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
import Eth from "@ledgerhq/hw-app-eth";

/**
 * Signs a given message using the Ledger Ethereum app.
 *
 * @param message - The plain text message to sign.
 * @returns A promise that resolves to the signature as a hex string.
 */
export async function signMessage(message: string): Promise<string> {
  try {
    // Open connection to the Ledger device via USB (empty string = auto-detect)
    const transport = await TransportNodeHid.open("");
    const eth = new Eth(transport);

    // Convert the message to a hex string (Ledger's signPersonalMessage requires hex)
    const messageHex = Buffer.from(message, "utf8").toString("hex");

    // Standard derivation path for Ethereum (adjust if necessary)
    const derivationPath = "44'/60'/0'/0/0";

    // Sign the message using the Ledger Ethereum app
    const result = await eth.signPersonalMessage(derivationPath, messageHex);

    // Combine r, s, and v values into a single signature string
    const vHex = result.v.toString(16).padStart(2, "0");
    const signature = `0x${result.r}${result.s}${vHex}`;

    // Close the transport (important for clean exit)
    await transport.close();

    return signature;
  } catch (err: unknown) {
    // Wrap the original error in a more descriptive Error
    throw new Error(
      `Failed to sign message: ${
        err instanceof Error ? err.message : JSON.stringify(err)
      }`
    );
  }
}
