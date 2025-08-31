#!/usr/bin/env python3
import re
from pathlib import Path
import json
import shutil

root = Path(__file__).resolve().parent
# project_root should be the workspace root (one level up from scripts/)
project_root = root.parent
# adjust if script placed elsewhere
# find all .tsx files
tsx_files = list(project_root.rglob('*.tsx'))
pattern = re.compile(r"['\"]([^'\"]+\.(?:png|jpe?g))['\"]", re.IGNORECASE)

out_dir = project_root / 'src' / 'assets' / 'images' / 'from-tsx'
out_dir.mkdir(parents=True, exist_ok=True)
report_lines = []
manifest = {}
external = []
unique_images = set()

for tsx in tsx_files:
    rel_tsx = tsx.relative_to(project_root)
    tsx_key = str(rel_tsx)
    manifest.setdefault(tsx_key, [])
    content = tsx.read_text(encoding='utf-8')
    for m in pattern.finditer(content):
        img_path = m.group(1)
        unique_images.add(img_path)
        # record line number
        start = m.start()
        lineno = content.count('\n', 0, start) + 1
        report_lines.append(f"{tsx_key}:{lineno}:{img_path}")
        entry = {'img': img_path, 'line': lineno}
        # resolve local file
        if img_path.lower().startswith('http'):
            external.append({'file': tsx_key, 'img': img_path, 'line': lineno})
            entry['full'] = None
        else:
            # absolute path starting with / -> relative to project root
            if img_path.startswith('/'):
                candidate = project_root / img_path.lstrip('/')
            else:
                candidate = tsx.parent / img_path
            candidate = candidate.resolve()
            if candidate.exists() and candidate.is_file():
                entry['full'] = str(candidate)
                # copy into per-tsx folder
                tsx_basename = tsx.stem
                destdir = out_dir / tsx_basename
                destdir.mkdir(parents=True, exist_ok=True)
                fname = candidate.name
                dest = destdir / fname
                base = dest.stem
                ext = dest.suffix
                i = 1
                while dest.exists():
                    dest = destdir / f"{base}_{i}{ext}"
                    i += 1
                shutil.copy2(candidate, dest)
                entry['copied_to'] = str(dest.relative_to(project_root))
            else:
                entry['full'] = None
        manifest[tsx_key].append(entry)

# write outputs
(report_file := project_root / 'images-report.txt').write_text('\n'.join(report_lines), encoding='utf-8')
(manifest_file := out_dir.parent / 'from-tsx-manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
(external_file := out_dir / 'external-urls.json').write_text(json.dumps(external, indent=2), encoding='utf-8')
(unique_file := out_dir.parent / 'images-list.txt').write_text('\n'.join(sorted(unique_images)), encoding='utf-8')

print(f"Processed {len(tsx_files)} .tsx files")
print(f"Found {len(unique_images)} unique image references")
print(f"Report written to: {report_file}")
print(f"Manifest written to: {manifest_file}")
print(f"Copied images into: {out_dir}")
print(f"External references written to: {external_file}")
print(f"Unique list: {unique_file}")
