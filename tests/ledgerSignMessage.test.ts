import { signMessage } from "../src/ledgerSignMessage";
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
import Eth from "@ledgerhq/hw-app-eth";

// Mock the TransportNodeHid module.
jest.mock("@ledgerhq/hw-transport-node-hid", () => ({
  open: jest.fn(),
}));

// Create a mock for the signPersonalMessage function.
const mockSignPersonalMessage = jest.fn();

// Mock the Eth class to return our mocked method.
jest.mock("@ledgerhq/hw-app-eth", () => {
  return jest.fn().mockImplementation(() => ({
    signPersonalMessage: mockSignPersonalMessage,
  }));
});

describe("signMessage", () => {
  // Provide a mock transport that includes a close function.
  const mockTransport = {
    close: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should sign a message and return the correct signature", async () => {
    // Arrange.
    const testMessage = "Hello, Ledger!";
    const rValue = "abcdef";
    const sValue = "123456";
    const vValue = 27; // 27 decimal => 0x1b in hex.

    // Mock TransportNodeHid.open to resolve to our mock transport.
    (TransportNodeHid.open as jest.Mock).mockResolvedValue(mockTransport);

    // Mock signPersonalMessage to return specific r, s, v values.
    mockSignPersonalMessage.mockResolvedValue({
      r: rValue,
      s: sValue,
      v: vValue,
    });

    // Act.
    const signature = await signMessage(testMessage);

    // Expected signature: 0x + r + s + (v as 2-digit hex, lower case).
    const expectedSignature = `0x${rValue}${sValue}1b`;

    // Assert.
    expect(signature).toBe(expectedSignature);
    expect(TransportNodeHid.open).toHaveBeenCalledWith("");
    expect(mockSignPersonalMessage).toHaveBeenCalledTimes(1);
    // Also verify that the transport.close function is called.
    expect(mockTransport.close).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if TransportNodeHid.open fails", async () => {
    // Arrange.
    const errorMessage = "Ledger not connected";
    (TransportNodeHid.open as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    // Act & Assert.
    await expect(signMessage("Any message")).rejects.toThrow(
      `Failed to sign message: ${errorMessage}`
    );
    expect(mockSignPersonalMessage).not.toHaveBeenCalled();
  });

  it("should throw a properly formatted error for an unknown error from signPersonalMessage", async () => {
    // Arrange.
    (TransportNodeHid.open as jest.Mock).mockResolvedValue(mockTransport);
    const unexpectedError = new Error("Unknown ledger error");
    mockSignPersonalMessage.mockRejectedValue(unexpectedError);

    // Act & Assert.
    await expect(signMessage("Any message")).rejects.toThrow(
      `Failed to sign message: ${unexpectedError.message}`
    );
  });

  it("should throw a properly formatted error when a non-Error is thrown", async () => {
    // Arrange.
    (TransportNodeHid.open as jest.Mock).mockResolvedValue(mockTransport);
    // Reject with a non-Error value (e.g., a string).
    mockSignPersonalMessage.mockRejectedValue("Some string error");

    // Act & Assert.
    await expect(signMessage("Any message")).rejects.toThrow(
      `Failed to sign message: "Some string error"`
    );
  });
});
