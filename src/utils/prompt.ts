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

/**
 * Prompts the user with a message and returns their input.
 *
 * @param message - The message to display.
 * @returns A promise that resolves to the user's input.
 */
export async function promptForInput(message: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(message, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
}
