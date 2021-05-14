import * as fs from 'fs';
import * as os from 'os';
import * as child_process from 'child_process';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
  try {
    if (os.platform() == 'darwin') {
      core.setFailed('Not supported on darwin platform');
      return;
    }

    const workspace = process.env['GITHUB_WORKSPACE'] || '.';
    const args = core.getInput('args', {required: true});
    const image = core.getInput('image') || 'ghcr.io/crazy-max/ghaction-chocolatey';

    if (os.platform() == 'win32') {
      core.startGroup('Running choco');
      await exec.exec(`choco.exe ${args} --allow-unofficial`);
      core.endGroup();
      return;
    }

    core.startGroup(`Pulling chocolatey Docker image`);
    await exec.exec('docker', ['pull', image]);
    core.endGroup();

    core.startGroup('Running choco');
    fs.writeFileSync('/tmp/env.txt', child_process.execSync(`env`, {encoding: 'utf8'}).trim());
    await exec.exec('docker', [
      'run',
      '--rm',
      '--env-file',
      '/tmp/env.txt',
      '--workdir',
      '/wksp',
      '--volume',
      `${workspace}:/wksp`,
      image,
      args
    ]);
    core.endGroup();

    core.startGroup('Fixing perms');
    const uid = parseInt(child_process.execSync(`id -u`, {encoding: 'utf8'}).trim());
    const gid = parseInt(child_process.execSync(`id -g`, {encoding: 'utf8'}).trim());
    await exec.exec('sudo', ['chown', '-R', `${uid}:${gid}`, workspace]);
    core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
