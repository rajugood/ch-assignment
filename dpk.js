import { createHash } from "node:crypto";

export const DEFAULT_TRIVIAL_PARTITION_KEY = "0";
export const MAX_PARTITION_KEY_LENGTH = 256;
const HASH_ALGORITHM = "sha3-512";
const HASH_ENCODING = "hex";

const generateHash = (data) => {
  return createHash(HASH_ALGORITHM).update(data).digest(HASH_ENCODING);
};
export const deterministicPartitionKey = (event) => {
  let candidate = DEFAULT_TRIVIAL_PARTITION_KEY;

  if (event) {
    const { partitionKey } = event;

    if (partitionKey) {
      candidate =
        typeof partitionKey === "string"
          ? partitionKey
          : JSON.stringify(partitionKey);

      if (candidate.length > MAX_PARTITION_KEY_LENGTH)
        return generateHash(JSON.stringify(candidate));
    } else {
      return generateHash(JSON.stringify(event));
    }
  }
  return candidate;
};
