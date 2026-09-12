#!/usr/bin/env python3
"""Create faithful website derivatives; never modify the incoming originals.

Requires Python 3, Pillow, fonttools[woff], ffmpeg, ffprobe and curl. Run from any directory:
    python3 scripts/prepare-media.py [--force]
"""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import shutil
import struct
import subprocess

from PIL import Image
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "public/media"
FONTS = ROOT / "public/fonts"


def checksum(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def probe(path: Path) -> dict:
    return json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration:stream=codec_name,width,height,avg_frame_rate,pix_fmt",
        "-of", "json", str(path),
    ]))


def faststart(path: Path) -> bool:
    atoms = []
    with path.open("rb") as stream:
        while header := stream.read(8):
            if len(header) != 8:
                break
            size, kind = struct.unpack(">I4s", header)
            header_size = 8
            if size == 1:
                size = struct.unpack(">Q", stream.read(8))[0]
                header_size = 16
            atoms.append(kind)
            if size == 0:
                break
            stream.seek(size - header_size, 1)
    return b"moov" in atoms and b"mdat" in atoms and atoms.index(b"moov") < atoms.index(b"mdat")


def image_copy(source: Path, target: Path) -> dict:
    original_hash = checksum(source)
    shutil.copy2(source, target)
    assert checksum(target) == original_hash, f"Copy differs: {target}"
    with Image.open(target) as picture:
        dimensions = picture.size
    return {
        "source": str(source.relative_to(ROOT)),
        "url": "/" + str(target.relative_to(ROOT / "public")),
        "bytes": target.stat().st_size,
        "width": dimensions[0], "height": dimensions[1],
        "sha256": original_hash, "operation": "byte-for-byte copy",
    }


def video_derivative(job: tuple[Path, Path], force: bool) -> dict:
    source, target = job
    original_hash = checksum(source)
    source_meta = probe(source)
    if force or not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
        temporary = target.with_name(target.stem + ".preparing.mp4")
        subprocess.run([
            "ffmpeg", "-v", "error", "-i", str(source),
            "-map", "0:v:0", "-map", "0:a:0?", "-sn", "-dn",
            "-vf", "fps=30,scale=720:1280:force_original_aspect_ratio=decrease:flags=lanczos,pad=720:1280:(ow-iw)/2:(oh-ih)/2",
            "-c:v", "libx264", "-preset", "medium", "-threads", "2",
            "-crf", "25", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level:v", "3.1",
            "-c:a", "aac", "-b:a", "128k", "-ar", "48000",
            "-movflags", "+faststart", "-y", str(temporary),
        ], check=True)
        temporary.replace(target)
    output_meta = probe(target)
    video = next(stream for stream in output_meta["streams"] if "width" in stream)
    assert (video["width"], video["height"]) == (720, 1280)
    assert video["codec_name"] == "h264" and video["avg_frame_rate"] == "30/1"
    assert video["pix_fmt"] == "yuv420p"
    assert any(stream["codec_name"] == "aac" for stream in output_meta["streams"])
    assert faststart(target), f"Missing MP4 faststart: {target}"
    assert abs(float(source_meta["format"]["duration"]) - float(output_meta["format"]["duration"])) < 0.2
    assert checksum(source) == original_hash, f"Original changed: {source}"
    print(f"Ready {target.name}: {target.stat().st_size / 1024 / 1024:.2f} MiB", flush=True)
    return {
        "source": str(source.relative_to(ROOT)),
        "sourceBytes": source.stat().st_size, "sourceSha256": original_hash,
        "url": "/" + str(target.relative_to(ROOT / "public")),
        "bytes": target.stat().st_size, "sha256": checksum(target),
        "width": 720, "height": 1280, "fps": 30,
        "videoCodec": "h264", "audioCodec": "aac", "faststart": True,
        "duration": float(output_meta["format"]["duration"]),
        "operation": "resize and encode only; no crop, retouch, recolor or generated imagery",
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Regenerate existing video derivatives")
    options = parser.parse_args()
    for folder in (MEDIA / "photos", MEDIA / "videos", MEDIA / "posters", FONTS):
        folder.mkdir(parents=True, exist_ok=True)

    images = []
    for number in range(1, 10):
        for phase in ("once", "sonra"):
            name = f"uygulama-{number:02d}-{phase}.jpg"
            images.append(image_copy(ROOT / "GELEN-GORSELLER/once-sonra" / name, MEDIA / "photos" / name))
    images.append(image_copy(ROOT / "GELEN-GORSELLER/marka/platin-antalya-logo.png", MEDIA / "logo.png"))
    print("18 photographs and the logo copied without changes.", flush=True)

    font_sources = [
        ("Inter", "inter", "Inter%5Bopsz%2Cwght%5D.ttf"),
        ("NotoSansArabic", "notosansarabic", "NotoSansArabic%5Bwdth%2Cwght%5D.ttf"),
    ]
    fonts = []
    for name, family, filename in font_sources:
        base = "https://raw.githubusercontent.com/google/fonts/main/ofl/" + family + "/"
        target = FONTS / (name + ".ttf")
        if not target.exists():
            subprocess.run(["curl", "-fsSL", base + filename, "-o", str(target)], check=True)
        license_path = FONTS / (name + "-OFL.txt")
        if not license_path.exists():
            subprocess.run(["curl", "-fsSL", base + "OFL.txt", "-o", str(license_path)], check=True)
        compressed = target.with_suffix(".woff2")
        if not compressed.exists() or compressed.stat().st_mtime < target.stat().st_mtime:
            font = TTFont(target)
            font.flavor = "woff2"
            font.save(compressed)
        font = TTFont(compressed)
        characters = "ĞğİıŞşÇçÖöÜüЖжЯяЮю" if name == "Inter" else "العربية"
        assert all(ord(character) in font.getBestCmap() for character in characters)
        axes = [{"tag": axis.axisTag, "min": axis.minValue, "default": axis.defaultValue, "max": axis.maxValue}
                for axis in font["fvar"].axes]
        fonts.append({"name": name, "url": "/fonts/" + compressed.name, "source": base + filename,
                      "bytes": compressed.stat().st_size, "sha256": checksum(compressed),
                      "sourceTtfUrl": "/fonts/" + target.name, "sourceTtfBytes": target.stat().st_size,
                      "sourceTtfSha256": checksum(target), "variableAxes": axes,
                      "verifiedCharacters": characters, "license": "/fonts/" + license_path.name})
    print("Local variable fonts and OFL licenses ready.", flush=True)

    jobs = [
        (ROOT / f"GELEN-VIDEOLAR/once-sonra/uygulama-{number:02d}-once-sonra.mov", MEDIA / f"videos/uygulama-{number:02d}.mp4")
        for number in range(1, 10)
    ]
    instructional = [
        (next((ROOT / "GELEN-VIDEOLAR/orijinaller").glob("video-01-*.mp4")), "planlama", 22),
        (next((ROOT / "GELEN-VIDEOLAR/orijinaller").glob("video-02-*.mp4")), "deneyim", 18),
    ]
    jobs += [(source, MEDIA / f"videos/{name}.mp4") for source, name, _ in instructional]
    with ThreadPoolExecutor(max_workers=2) as pool:
        videos = list(pool.map(lambda job: video_derivative(job, options.force), jobs))

    posters = []
    for source, name, seconds in instructional:
        target = MEDIA / f"posters/{name}.jpg"
        subprocess.run([
            "ffmpeg", "-v", "error", "-ss", str(seconds), "-i", str(source),
            "-frames:v", "1", "-vf", "scale=720:-2:flags=lanczos", "-q:v", "2", "-y", str(target),
        ], check=True)
        posters.append({"source": str(source.relative_to(ROOT)), "sourceTimeSeconds": seconds,
                        "url": "/media/posters/" + target.name, "bytes": target.stat().st_size,
                        "sha256": checksum(target), "operation": "faithful extracted video frame"})

    manifest = {"photosAndLogo": images, "videos": videos, "posters": posters, "fonts": fonts,
                "servedAssetBytes": sum(entry["bytes"] for entries in (images, videos, posters, fonts) for entry in entries),
                "totalBytes": sum(path.stat().st_size for folder in (MEDIA, FONTS) for path in folder.rglob("*")
                                  if path.is_file() and path.name != "manifest.json")}
    (MEDIA / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Verified total: {manifest['totalBytes'] / 1024 / 1024:.2f} MiB. Manifest: public/media/manifest.json", flush=True)


if __name__ == "__main__":
    main()
