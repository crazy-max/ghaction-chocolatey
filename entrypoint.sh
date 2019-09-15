#!/bin/sh
set -e

ARGS=${INPUT_ARGS:-$@}
mono /opt/chocolatey/choco.exe "$ARGS" --allow-unofficial
