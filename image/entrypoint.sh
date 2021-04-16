#!/bin/sh
set -e

ln -sf /opt opt
mono /opt/chocolatey/choco.exe ${INPUT_ARGS:-$@} --allow-unofficial --yes
