import chalk from "chalk";

/**
 * Displays a colorful ASCII art banner for the Ledger Signer CLI.
 */
export function displayBanner(): void {
  console.clear();
  console.log(
    chalk.greenBright(`
   ▗▖ ▗▖ ▗▄▄▖▗▖  ▗▖    ▗▖   ▗▄▄▄▖▗▄▄▄   ▗▄▄▖▗▄▄▄▖▗▄▄▖ 
   ▐▌ ▐▌▐▌   ▐▛▚▞▜▌    ▐▌   ▐▌   ▐▌  █ ▐▌   ▐▌   ▐▌ ▐▌
   ▐▛▀▜▌ ▝▀▚▖▐▌  ▐▌    ▐▌   ▐▛▀▀▘▐▌  █ ▐▌▝▜▌▐▛▀▀▘▐▛▀▚▖
   ▐▌ ▐▌▗▄▄▞▘▐▌  ▐▌    ▐▙▄▄▖▐▙▄▄▖▐▙▄▄▀ ▝▚▄▞▘▐▙▄▄▖▐▌ ▐▌
                                                
   
     +--------------------------------------+
     |       Ledger Signer CLI v1.0         |
     |  Hardware Wallet Signing Made Simple |
     +--------------------------------------+
  `)
  );
}
