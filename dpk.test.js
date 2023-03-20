import {
  deterministicPartitionKey,
  DEFAULT_TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH,
} from "./dpk.js";

describe("deterministicPartitionKey", () => {
  it("Should return TRIVIAL_PARTITION_KEY when no parameter passed", () => {
    expect(deterministicPartitionKey()).toBe(DEFAULT_TRIVIAL_PARTITION_KEY);
  });

  describe("With partitionKey", () => {
    it("Should return same partitionKey when length is less than MAX_PARTITION_KEY_LENGTH ", () => {
      const smallPartitionKey = "a".repeat(MAX_PARTITION_KEY_LENGTH - 100);
      const trivialKey = deterministicPartitionKey({
        partitionKey: smallPartitionKey,
      });
      expect(trivialKey).toBe(smallPartitionKey);
    });

    it("Should return same partitionKey when length is equal to MAX_PARTITION_KEY_LENGTH ", () => {
      const maxLengthPartitionKey = "a".repeat(MAX_PARTITION_KEY_LENGTH);
      const trivialKey = deterministicPartitionKey({
        partitionKey: maxLengthPartitionKey,
      });
      expect(trivialKey).toBe(maxLengthPartitionKey);
    });

    it("Should return new hash partitionKey when length is greater than MAX_PARTITION_KEY_LENGTH ", () => {
      const lengthPartitionKey = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
      const trivialKey = deterministicPartitionKey({
        partitionKey: lengthPartitionKey,
      });
      expect(trivialKey).not.toBe(lengthPartitionKey);
    });

    it("Should return string partitionKey when non string type values passed for partitionKey", () => {
      const numberPartitionKey = 123456;
      const trivialKey = deterministicPartitionKey({
        partitionKey: numberPartitionKey,
      });
      expect(trivialKey).toBe(JSON.stringify(numberPartitionKey));
    });
  });

  describe("Without partitionKey", () => {
    it("Should return new hash when partitionKey not present", () => {
      const trivialKey = deterministicPartitionKey("Some data");
      expect(trivialKey.length).toBe(128);
    });
  });

  describe("With primitive inputs", () => {
    it("Should return TRIVIAL_PARTITION_KEY when string passed", () => {
      expect(deterministicPartitionKey("")).toBe(DEFAULT_TRIVIAL_PARTITION_KEY);
    });
    it("Should not return TRIVIAL_PARTITION_KEY when boolean true passed", () => {
      expect(deterministicPartitionKey(true)).not.toBe(
        DEFAULT_TRIVIAL_PARTITION_KEY
      );
    });
    it("Should return TRIVIAL_PARTITION_KEY when boolean false passed", () => {
      expect(deterministicPartitionKey(false)).toBe(
        DEFAULT_TRIVIAL_PARTITION_KEY
      );
    });
    it("Should return TRIVIAL_PARTITION_KEY when zero number passed", () => {
      expect(deterministicPartitionKey(0)).toBe(DEFAULT_TRIVIAL_PARTITION_KEY);
    });
  });
});
