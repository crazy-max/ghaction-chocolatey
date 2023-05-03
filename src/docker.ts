import * as exec from '@actions/exec';

export async function imageExists(name: string): Promise<boolean> {
  return await exec
    .getExecOutput('docker', ['images', '-q', name], {
      ignoreReturnCode: true,
      silent: true
    })
    .then(res => {
      if (res.stderr.length > 0 && res.exitCode != 0) {
        throw new Error(res.stderr);
      }
      return res.stdout.trim().length > 0;
    });
}
