import * as fs from 'fs';
import * as os from 'os';
import * as child_process from 'child_process';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

import * as docker from './docker';

async function run() {
  try {
    if (os.platform() == 'darwin') {
      core.setFailed('Not supported on darwin platform');
      return;
    }

    const workspace = process.env['GITHUB_WORKSPACE'] || '.';
    const args = core.getInput('args', {required: true});
    const image = core.getInput('image') || 'ghcr.io/crazy-max/chocolatey';

    if (os.platform() == 'win32') {
      core.startGroup('Running choco');
      await exec.exec(`choco.exe ${args} --allow-unofficial`);
      core.endGroup();
      return;
    }

    if (!(await docker.imageExists(image))) {
      await core.group(`Pulling chocolatey Docker image`, async () => {
        await exec.exec('docker', ['pull', image]);
      });
    }

    await core.group(`Running choco`, async () => {
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
    });

    await core.group(`Fixing perms`, async () => {
      const uid = parseInt(child_process.execSync(`id -u`, {encoding: 'utf8'}).trim());
      const gid = parseInt(child_process.execSync(`id -g`, {encoding: 'utf8'}).trim());
      await exec.exec('sudo', ['chown', '-R', `${uid}:${gid}`, workspace]);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
