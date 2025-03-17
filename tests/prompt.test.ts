import { promptUser, promptForInput } from "../src/utils/prompt";
import readline from "readline";

// Create a custom mock implementation for readline.createInterface.
const closeMock = jest.fn();
const questionMock = jest.fn(
  (questionText: string, callback: (answer?: string) => void) => {
    // For promptForInput, pass "Test input"; for promptUser, no answer needed.
    callback("Test input");
  }
);

jest.mock("readline", () => ({
  createInterface: jest.fn(() => ({
    question: questionMock,
    close: closeMock,
  })),
}));

describe("promptForInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user input", async () => {
    const input = await promptForInput("Enter input: ");
    expect(input).toBe("Test input");
    expect(questionMock).toHaveBeenCalledWith(
      "Enter input: ",
      expect.any(Function)
    );
    expect(closeMock).toHaveBeenCalled();
  });
});

describe("promptUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve without returning any value", async () => {
    // For promptUser, the callback doesn't need an answer.
    questionMock.mockImplementationOnce(
      (questionText: string, callback: (answer?: string) => void) => {
        callback();
      }
    );
    const result = await promptUser("Press Enter: ");
    expect(result).toBeUndefined();
    expect(questionMock).toHaveBeenCalledWith(
      "Press Enter: ",
      expect.any(Function)
    );
    expect(closeMock).toHaveBeenCalled();
  });
});
