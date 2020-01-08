const { exec } = require('child_process');
var isWin = process.platform === "win32";
let win = 'cd node_modules && mklink /D _ ..'
  let linux = 'cd node_modules && ln -s .. _'
let command = isWin ? win : linux
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

