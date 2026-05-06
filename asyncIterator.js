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

async function checkingForErrors(file) {
  let lines = 0;
  let errors = 0;

  try {
    for await (const line of lineReading(file)) {
      lines++;
      if (line.includes("error")) {
        errors++;
        console.log(`Error found in line ${lines}`);
      }
    }

    console.log(`Lines: ${lines}`);
    console.log(`Errors: ${errors}`);
  } catch (error) {
    console.error(error.message);
  }
}

checkingForErrors("text.txt");
