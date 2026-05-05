import fs from "fs";
import readline from "readline";

async function* lineReading(file) {
  const fileStream = fs.createReadStream(file, { encoding: "utf-8" });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  try {
    for await (const line of rl) {
      yield line;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
