#!/usr/bin/env python3
import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
IMAGES_DIR = PROJECT_ROOT / 'src' / 'assets' / 'images'
MANIFEST = IMAGES_DIR / 'from-tsx-manifest.json'

EXTS = {'.png', '.jpg', '.jpeg'}

if not MANIFEST.exists():
    print(f"Manifest not found at {MANIFEST}")
    raise SystemExit(1)

with MANIFEST.open(encoding='utf-8') as f:
    data = json.load(f)

# collect referenced files from manifest 'full' fields
referenced = set()
for tsx, entries in data.items():
    for e in entries:
        full = e.get('full')
        if full:
            p = Path(full).resolve()
            try:
                # only consider files under IMAGES_DIR
                if IMAGES_DIR.resolve() in p.parents or p == IMAGES_DIR.resolve():
                    referenced.add(str(p))
            except Exception:
                pass

print(f"Referenced files found in manifest (under images dir): {len(referenced)}")

# scan images dir for files to consider deleting
removed = []
skipped = []
for p in IMAGES_DIR.rglob('*'):
    if p.is_dir():
        # skip the from-tsx folder entirely
        if p.name == 'from-tsx':
            skipped.append((str(p), 'directory - skipped'))
        continue
    # skip manifest and helper files
    if p.name in {'from-tsx-manifest.json', 'images-list.txt'}:
        skipped.append((str(p), 'manifest/list - skipped'))
        continue
    if p.suffix.lower() not in EXTS:
        skipped.append((str(p), 'not target ext - skipped'))
        continue
    # only delete if not referenced
    if str(p.resolve()) not in referenced:
        try:
            p.unlink()
            removed.append(str(p.relative_to(PROJECT_ROOT)))
        except Exception as exc:
            skipped.append((str(p), f'failed to remove: {exc}'))
    else:
        skipped.append((str(p), 'referenced - kept'))

print('\nSummary:')
print(f'Files removed: {len(removed)}')
for x in removed[:50]:
    print(' -', x)
print(f'Files skipped/kept: {len(skipped)}')

# write a log
log = PROJECT_ROOT / 'scripts' / 'clean_unused_images.log'
with log.open('w', encoding='utf-8') as f:
    f.write('Removed:\n')
    for r in removed:
        f.write(r + '\n')
    f.write('\nSkipped:\n')
    for s in skipped:
        f.write(s[0] + ' -- ' + s[1] + '\n')

print(f'Log written to {log}')
