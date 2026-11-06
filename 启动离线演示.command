#!/bin/bash
# 完整流程演示，不调用真实模型；产物会保存到当前项目 out/。
set -uo pipefail
cd "$(dirname "$0")"
source tools/mac_env.sh
prepare_env || exit 1
exec .venv/bin/python -m blueprint ui --mock
