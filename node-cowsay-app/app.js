const cowsay = require("cowsay");
const os = require("os");

function modernPrint(data) {
  const { system, release, version, node, processor } = data;

  const message = `
    Hello, Stranger!

    Here's your info you requested:
    SYSTEM INFO: ${system}
    SYSTEM RELEASE: ${release}
    SYSTEM VERSION: ${version}
    SYSTEM NODE: ${node}
    SYSTEM PROCESSOR: ${processor}
    `;

  console.log(
    cowsay.say({
      text: message,
      e: "oO",
      T: "U ",
    })
  );
}

const requestData = {
  system: os.type(),
  release: os.release(),
  version: os.version(),
  node: os.hostname(),
  processor: os.cpus()[0].model,
};

modernPrint(requestData);
