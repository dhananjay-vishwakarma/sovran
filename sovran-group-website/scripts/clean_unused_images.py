#!/usr/bin/env python3
"""
Script to clean up unused media (images and videos) based on media usage analysis.
This script reads the optimized-media-report.json file and optionally moves
unused media to a backup directory instead of deleting them immediately.
"""

import json
import os
import sys
import shutil
from datetime import datetime

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
MEDIA_REPORT = os.path.join(SCRIPT_DIR, 'optimized-media-report.json')
BACKUP_DIR = os.path.join(PROJECT_ROOT, 'unused_media_backup')

def clean_unused_media(dry_run=True, backup=True):
    """Clean up unused media based on the report."""
    # Check if report exists
    if not os.path.exists(MEDIA_REPORT):
        print(f"Error: Could not find report at {MEDIA_REPORT}")
        print("Please run the optimize_images.sh script first.")
        sys.exit(1)
    
    # Load the report
    with open(MEDIA_REPORT, 'r') as f:
        report = json.load(f)
    
    removed_media = report.get('removed', [])
    
    if not removed_media:
        print("No unused media found to clean up.")
        return
    
    # Count images and videos
    image_count = sum(1 for item in removed_media if item['type'] == 'image')
    video_count = sum(1 for item in removed_media if item['type'] == 'video')
    
    print(f"Found {len(removed_media)} unused media files to process:")
    print(f"  - Images: {image_count}")
    print(f"  - Videos: {video_count}")
    
    # Create backup directory with timestamp if needed
    if backup and not dry_run:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_path = f"{BACKUP_DIR}_{timestamp}"
        os.makedirs(backup_path, exist_ok=True)
        print(f"Created backup directory: {backup_path}")
    
    # Process each removed media file
    for media_item in removed_media:
        media_path = media_item['path']
        media_type = media_item['type']
        full_path = os.path.join(PROJECT_ROOT, media_path)
        
        if not os.path.exists(full_path):
            print(f"Warning: File does not exist: {media_path}")
            continue
        
        if dry_run:
            print(f"[DRY RUN] Would {'move' if backup else 'delete'} {media_path} ({media_type})")
        else:
            try:
                if backup:
                    # Preserve directory structure in backup
                    rel_path = os.path.relpath(full_path, PROJECT_ROOT)
                    backup_file_path = os.path.join(backup_path, rel_path)
                    os.makedirs(os.path.dirname(backup_file_path), exist_ok=True)
                    shutil.move(full_path, backup_file_path)
                    print(f"Moved {media_path} ({media_type}) to backup")
                else:
                    os.remove(full_path)
                    print(f"Deleted {media_path} ({media_type})")
            except Exception as e:
                print(f"Error processing {media_path}: {str(e)}")
    
    # Print summary
    action = 'moved' if backup else 'deleted'
    status = 'would be' if dry_run else 'were'
    print(f"\nSummary: {len(removed_media)} unused media files {status} {action}.")
    print(f"  - Images: {image_count}")
    print(f"  - Videos: {video_count}")
    
    if dry_run:
        print("\nThis was a dry run. No files were actually modified.")
        print("To actually clean up files, run with --execute parameter.")

if __name__ == '__main__':
    # Parse command line arguments
    dry_run = True
    backup = True
    
    if len(sys.argv) > 1:
        if '--execute' in sys.argv:
            dry_run = False
        if '--no-backup' in sys.argv:
            backup = False
    
    # Show help if requested
    if '--help' in sys.argv or '-h' in sys.argv:
        print("Usage: python clean_unused_media.py [options]")
        print("Options:")
        print("  --execute    Actually perform the cleanup (default is dry run)")
        print("  --no-backup  Delete files instead of moving to backup")
        print("  --help, -h   Show this help message")
        sys.exit(0)
    
    # Run the cleanup
    clean_unused_media(dry_run, backup)
