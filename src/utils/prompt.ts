import readline from "readline";

/**
 * Prompts the user with a message and waits for the Enter key press.
 *
 * @param message - The message to display to the user.
 * @returns A promise that resolves once the user presses Enter.
 */
export async function promptUser(message: string): Promise<void> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(message, () => {
      rl.close();
      resolve();
    });
  });
}
