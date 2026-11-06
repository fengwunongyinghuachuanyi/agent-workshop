"""完整交付包须可重建、资源齐全，并排除本机状态。"""
import hashlib
import json
import re
from pathlib import Path
from zipfile import ZipFile

from tools.package_project import package

ROOT = Path(__file__).resolve().parents[1]


def test_complete_project_archive_contains_sources_assets_and_integrity_manifest(tmp_path):
    output = tmp_path / "project.zip"
    count, size = package(ROOT, output)
    with ZipFile(output) as archive:
        assert archive.testzip() is None
        names = set(archive.namelist())
        prefix = "agent-workshop/"
        assert count == len(names) and size > 0
        required = {"web/src/main.tsx", "web/src/workspace.css", "web/src/components/workshop-icons.tsx",
                    "web/package-lock.json", "web/vite.config.ts", "blueprint/web/server.py",
                    "项目交付说明.md", "启动离线演示.command", "docs/THIRD_PARTY_UI.md"}
        assert {prefix + name for name in required} <= names
        for name in names:
            parts = Path(name).parts
            assert not ({".git", ".venv", "node_modules", "out", "__pycache__", ".pytest_cache"} & set(parts))
            assert not any(part.startswith(".env") and part != ".env.example" for part in parts)
        entry = archive.read(prefix + "blueprint/web/static/index.html").decode()
        for asset in re.findall(r'(?:src|href)="(/static/[^"?]+\.(?:js|css))"', entry):
            assert prefix + "blueprint/web/static/" + asset.removeprefix("/static/") in names
        manifest = json.loads(archive.read(prefix + "PROJECT_MANIFEST.json"))
        assert len(manifest["files"]) == len(names) - 1
        for name, digest in manifest["files"].items():
            assert hashlib.sha256(archive.read(prefix + name)).hexdigest() == digest
        assert archive.getinfo(prefix + "启动离线演示.command").external_attr >> 16 & 0o111
