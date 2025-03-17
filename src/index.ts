import { signMessage } from "./ledgerSignMessage";
import logger from "./utils/logger";
import { promptUser, promptForInput } from "./utils/prompt";
import { displayBanner } from "./utils/banner";

/**
 * Main entry point of the application.
 */
async function main(): Promise<void> {
  displayBanner();

  // Dynamically prompt the user for a message to sign
  const message = await promptForInput("Enter the message to sign: ");
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
          logger.error("Error during execution:", error.message);
          await promptUser("Press Enter to retry or Ctrl+C to abort...");
        }
      } else {
        logger.error("An unknown error occurred:", error);
        await promptUser("Press Enter to retry or Ctrl+C to abort...");
      }

      // If maximum retries reached, exit
      if (attempts >= MAX_RETRIES) {
        logger.error("Maximum retry limit reached. Exiting now.");
        process.exit(1);
      }
    }
  }
}

main().catch((err) => {
  logger.error("Unhandled error in main():", err);
  process.exit(1);
});
