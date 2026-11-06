"""生成可运行、可继续开发的完整 Agent 工坊项目包。"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import sys
import tempfile
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
from tools.package_student import collect_files as runtime_files

REQUIRED = (
    "项目交付说明.md", "启动离线演示.command", "tools/package_project.py",
    "docs/UI_DESIGN.md", "docs/UI_ACCEPTANCE.md", "docs/THIRD_PARTY_UI.md",
    "web/package.json", "web/package-lock.json", "web/index.html",
    "web/.gitignore", "web/.oxlintrc.json", "web/components.json",
    "web/tsconfig.json", "web/tsconfig.app.json", "web/tsconfig.node.json", "web/vite.config.ts",
)
SOURCE_TYPES = {".ts", ".tsx", ".css", ".woff2", ".svg", ".png", ".jpg", ".webp", ".json"}


def collect_files(root: Path) -> list[Path]:
    selected = set(runtime_files(root))
    selected.update(root / name for name in REQUIRED)
    selected.update(p for p in (root / "web/src").rglob("*") if p.suffix in SOURCE_TYPES)
    for path in selected:
        relative = path.relative_to(root)
        if not path.is_file():
            raise ValueError(f"缺少完整项目文件：{relative}")
        if any((root / Path(*relative.parts[:i])).is_symlink()
               for i in range(1, len(relative.parts) + 1)):
            raise ValueError(f"不允许符号链接：{relative}")
    return sorted(selected, key=lambda p: p.relative_to(root).as_posix())


def package(root: Path, output: Path) -> tuple[int, int]:
    files = collect_files(root)
    if output.resolve() in {p.resolve() for p in files}:
        raise ValueError("输出路径不能覆盖源文件")
    manifest = {"format": 1, "edition": "editorial-full", "files": {
        p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in files
    }}
    output.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(prefix=".project-", suffix=".zip", dir=output.parent)
    os.close(fd)
    try:
        with ZipFile(temporary, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
            for path in files:
                archive.write(path, "agent-workshop/" + path.relative_to(root).as_posix())
            archive.writestr("agent-workshop/PROJECT_MANIFEST.json",
                            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
        os.replace(temporary, output)
    finally:
        Path(temporary).unlink(missing_ok=True)
    return len(files) + 1, output.stat().st_size


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("-o", "--out", type=Path, default=ROOT / "dist/agent-workshop-editorial-full.zip")
    args = parser.parse_args()
    try:
        count, size = package(ROOT, args.out)
    except (OSError, ValueError) as exc:
        parser.exit(1, f"打包失败：{exc}\n")
    print(f"已生成：{args.out.resolve()}（{count} 个文件，{size / 1024 / 1024:.2f} MiB）")


if __name__ == "__main__":
    main()
