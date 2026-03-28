const { spawn } = require('child_process');
const child = spawn('npx', ['vercel', 'env', 'add', 'RESEND_API_KEY', 'production'], { shell: true });

child.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  if (output.includes('What')) {
    setTimeout(() => {
        child.stdin.write('re_br85QmHc_5pMejYcn8iJh1EwsJNoSS8cW\n');
    }, 500);
  }
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
