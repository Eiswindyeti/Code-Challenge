import { createDecipheriv } from "crypto";
import { createReadStream, createWriteStream, readFileSync } from "fs";
import { createServer } from "https";
import { createGunzip } from "zlib";

// Functions for challenge 1
const decryptFile = (): Promise<void> => {
  return new Promise((resolve) => {
    const key64 = readFileSync("./secret.key", "utf-8");
    const decryptionKey = Buffer.from(key64.substring(0, 32));

    const iv = readFileSync("./iv.txt");
    const auth = readFileSync("./auth.txt");

    const decipher = createDecipheriv("aes-256-gcm", decryptionKey, iv);
    decipher.setAuthTag(auth);

    const readStream = createReadStream("./secret.enc");
    const writeStream = createWriteStream("./decrypted.zip");

    readStream.pipe(decipher).pipe(writeStream);

    writeStream.on("finish", resolve);
  });
};

const unzipFile = (): Promise<void> => {
  return new Promise((resolve) => {
    const readStream = createReadStream("./decrypted.zip");
    const writeStream = createWriteStream("./decrypted.txt");
    readStream.pipe(createGunzip()).pipe(writeStream);
    writeStream.on("finish", resolve);
  });
};

// Functions for challenge 2

const addNumbersOfText = (text: string): number => {
  const allNumbers = text
    .match(/\d/g)
    ?.map((numberString) => parseInt(numberString));

  return allNumbers?.reduce((sum, currentValue) => sum + currentValue) || 0;
};

// Functions for challenge 3

const addVocalsOfText = (text: string): number => {
  const vocalValueMap = {
    a: 2,
    e: 4,
    i: 8,
    o: 16,
    u: 32,
  };

  const allVocals = text
    .match(/[aeiouAEIOU]/g)
    ?.map((vocal) => vocalValueMap[vocal.toLowerCase()]);

  return allVocals?.reduce((sum, currentValue) => sum + currentValue) || 0;
};

// Functions for challenge 4

const getAddedNumbersPerSentence = (
  text: string
): { array: number[]; lastSentence: string } => {
  const sentences = text.split(".");

  return {
    array: sentences.map((sentence) => addNumbersOfText(sentence)),
    lastSentence: sentences[sentences.length - 1],
  };
};

const getTopTenForChallengeFour = (numbers: number[]): number[] => {
  // Get simple top ten
  const topTen = numbers
    .slice()
    .sort((a, b) => b - a)
    .slice(0, 10);

  // Sort top ten to get the top ten in order as the numbers occures in the original array
  topTen.sort((a, b) => {
    if (a === b) return 0;

    return numbers.indexOf(a) < numbers.indexOf(b) ? -1 : 1;
  });

  // Return the topTen array with subtracted indices
  return topTen.map((value, index) => value - index);
};

const getChallengeFourCodeWord = (array: number[]): string => {
  return String.fromCharCode(...getTopTenForChallengeFour(array));
};


// File reader function
const readEncryptedFile = (
  challengeType: 2 | 3 | 4
): Promise<number | number[]> => {
  return new Promise((resolve) => {
    const readStream = createReadStream("./decrypted.txt", {
      highWaterMark: 64 * 1024 * 1024,
    });

    let resNumber = 0;
    let resNumberArray: number[] = [];

    let lastSentence = "";

    readStream.on("data", (chunk) => {
      switch (challengeType) {
        case 2: {
          resNumber += addNumbersOfText(chunk.toString("utf-8"));
          break;
        }
        case 3: {
          resNumber += addVocalsOfText(chunk.toString("utf-8"));
          break;
        }
        case 4: {
          const { array, lastSentence: resSentence } =
            getAddedNumbersPerSentence(lastSentence + chunk.toString("utf-8"));
          lastSentence = resSentence;
          resNumberArray = resNumberArray.concat(array);
          break;
        }
      }
    });

    readStream.on("end", () => {
      resolve(resNumber || resNumberArray);
    });
  });
};

const runChallenges = async () => {
  // Aufgabe 1
  console.log(`Starte Aufgabe 1...`);
  await decryptFile();
  await unzipFile();
  console.log(
    "Datei wurde entschlüsselt und entpackt und liegt unter ./decrypted.txt"
  );

  // Aufgabe 2
  console.log(`Starte Aufgabe 2...`);
  const challengeTwo = await readEncryptedFile(2) as number;
  console.log(`Antwort Aufgabe 2: ${challengeTwo}`);

  // Aufgabe 3
  console.log(`Starte Aufgabe 3...`);
  const challengeThree = await readEncryptedFile(3) as number;
  console.log(`Antwort Aufgabe 3: ${challengeThree + challengeTwo}`);

  // Aufgabe 4
  console.log(`Starte Aufgabe 4...`);
  const challengeFourArray = (await readEncryptedFile(4)) as number[];

  const challengeFourCodeWord = getChallengeFourCodeWord(challengeFourArray);
  console.log(`Aufgabe 4 code word: ${challengeFourCodeWord}`);

  const server = createServer(
    {
      key: readFileSync("./localhost.key"),
      cert: readFileSync("./localhost.crt"),
    },
    (req, res) => {
      res.writeHead(200);

      res.end(challengeFourCodeWord);
    }
  );

  server.listen(443, () => {
    console.log(`Der HTTPS Server für Aufgabe 4 wurde gestartet.`);
  });
};

runChallenges();
