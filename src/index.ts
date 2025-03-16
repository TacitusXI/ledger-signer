import { signMessage } from "./ledgerSignMessage";
import logger from "./utils/logger";
import { promptUser } from "./utils/prompt";

/**
 * Main entry point of the application.
 */
async function main(): Promise<void> {
  const message = "Hello, my friend!";
  logger.info(`Signing message: "${message}"`);

  // Define a maximum number of retries to avoid infinite loops
  const MAX_RETRIES = 3;
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    attempts++;
    try {
      // Attempt to sign the message
      const signature = await signMessage(message);
      logger.info(`Signature: ${signature}`);
      break; // Exit loop if successful
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Check for known Ledger error messages
        if (error.message.includes("UNKNOWN_APDU")) {
          logger.error(
            "Ledger error: Your Ledger might be locked or the Ethereum app not open."
          );
          await promptUser(
            "Please unlock your Ledger, open the Ethereum app, and press Enter to retry..."
          );
        } else if (error.message.includes("NoDevice")) {
          logger.error(
            "Ledger error: No Ledger device detected. Please ensure it's plugged in."
          );
          await promptUser(
            "Connect your Ledger device, open the Ethereum app, and press Enter to retry..."
          );
        } else {
          // Handle any other or unknown errors
          logger.error("Error during execution:", error.message);
          await promptUser("Press Enter to retry or Ctrl+C to abort...");
        }
      } else {
        // Non-Error throwables
        logger.error("An unknown error occurred:", error);
        await promptUser("Press Enter to retry or Ctrl+C to abort...");
      }

      // Check if we've hit the retry limit
      if (attempts >= MAX_RETRIES) {
        logger.error("Maximum retry limit reached. Exiting now.");
        process.exit(1);
      }
    }
  }
}

// Run main() and catch any unhandled errors
main().catch((err) => {
  logger.error("Unhandled error in main():", err);
  process.exit(1);
});
