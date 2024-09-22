function matchPattern(inputLine, pattern) {
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  }

  splitLine = inputLine.split("");

  if (pattern === "\\d") {
    return splitLine.some((char) => !isNaN(char));

  } else if (pattern === "\\w") {
    return splitLine.some((char) => {
      const code = char.charCodeAt(0);
      // Uppercase Letters (A-Z): U+0041 to U+005A, Lowercase Letters (a-z): U+0061 to U+007A, 
      // Digits (0-9): U+0030 to U+0039, Underscore (_): U+005F
      return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57) || code === 95;
    });

  } else if (pattern.startsWith("[") && pattern.endsWith("]")) {
    if (pattern[1] === "^") {
      const chars = pattern.slice(2, -1).split("");
      return splitLine.some((char) => !chars.includes(char));
    }

    const chars = pattern.slice(1, -1).split("");
    return splitLine.some((char) => chars.includes(char));

  } else {
    throw new Error(`Unhandled pattern ${pattern}`);
  }
}

function main() {
  const pattern = process.argv[3];
  const inputLine = require("fs").readFileSync(0, "utf-8").trim();

  if (process.argv[2] !== "-E") {
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }


  if (matchPattern(inputLine, pattern)) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();
