"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const child_process = __importStar(require("child_process"));
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (os.platform() !== 'darwin') {
                core.setFailed('Not supported on darwin platform');
                return;
            }
            const workspace = process.env['GITHUB_WORKSPACE'] || '.';
            const args = core.getInput('args');
            if (os.platform() == 'win32') {
                core.info('🏃 Running Choco...');
                yield exec.exec(`choco.exe ${args} --allow-unofficial`);
                return;
            }
            core.info('🏃 Running Choco...');
            fs.writeFileSync('/tmp/env.txt', child_process.execSync(`env`, { encoding: 'utf8' }).trim());
            yield exec.exec('docker', [
                'run',
                '--rm',
                '--env-file',
                '/tmp/env.txt',
                '--workdir',
                '/wksp',
                '--volume',
                `${workspace}:/wksp`,
                'crazymax/ghaction-chocolatey',
                args
            ]);
            core.info('🔨 Fixing perms...');
            const uid = parseInt(child_process.execSync(`id -u`, { encoding: 'utf8' }).trim());
            const gid = parseInt(child_process.execSync(`id -g`, { encoding: 'utf8' }).trim());
            yield exec.exec('sudo', ['chown', '-R', `${uid}:${gid}`, workspace]);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
