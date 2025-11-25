# Portfolio Website - Project Documentation

## Project Overview

This is a static portfolio website for a 3D artist specializing in nature-inspired animations. The site is **video-heavy** and optimized for performance on GitHub Pages.

**Tech Stack:**
- Pure HTML, CSS, JavaScript (no frameworks)
- Static hosting on GitHub Pages
- Video-first design with responsive layouts

---

## Design Decisions

### 1. Video Strategy

**Landing Page:**
- **Desktop**: 16:9 landscape videos (1920×1080)
- **Mobile**: 9:16 portrait videos (720×1280)
- **Switching**: Automatic based on viewport width (768px breakpoint)
- **Frame Rate**: 24 fps (cinematic, smaller file size)
- **Formats**: MP4 (H.264) primary, WebM (VP9) fallback
- **Duration**: 5-10 seconds recommended for optimal loop quality

**Why separate orientations?**
- Better visual experience on mobile (no letterboxing)
- Smaller file sizes for mobile users
- Professional presentation on all devices

### 2. Performance Optimizations

**Video Encoding:**
- CRF 23 (high quality, reasonable file size)
- `faststart` flag for streaming (video starts before fully downloaded)
- Audio removed (background videos don't need it)
- Multiple resolutions for bandwidth adaptation

**Image Optimization:**
- TinyPNG API compression (typically 50-70% reduction)
- Poster images extracted from first frame
- All images optimized before deployment

**File Size Targets:**
- Desktop 1080p MP4: < 3 MB
- Desktop 720p WebM: < 2 MB
- Mobile 720p MP4: < 2 MB
- Mobile 480p WebM: < 1 MB
- Poster images: < 200 KB (after optimization)

### 3. UI/UX Design

**Navigation Bar:**
- Blurred semi-transparent background (`backdrop-filter: blur(10px)`)
- Glassmorphism effect with `rgba(255, 255, 255, 0.1)` background
- Appears when scrolled past 50% of landing video
- White text for contrast against blurred backgrounds

**Layout:**
- Single-column project grid (full-width mobile, max 1500px desktop)
- Full-screen landing video (`100vh` height, `object-fit: cover`)
- Light beige background (`#e6e0d4`) with subtle noise texture for main content
- Dark landing section for video contrast

**Typography:**
- Font: 'Outfit' from Google Fonts
- Uppercase headings with letter-spacing
- Clean, modern aesthetic

---

## File Structure

```
pawelgrzelak.com-antigravity/
├── index.html              # Main page
├── project-template.html   # Template for individual projects
├── style.css               # All styles
├── script.js               # Navigation, scroll effects, animations
├── convert-videos.bat      # Video conversion automation
├── optimize-images.bat     # Image optimization wrapper
├── optimize-images.ps1     # PowerShell image optimizer
├── generate_noise.py       # Generates noise texture for background
└── assets/
    ├── noise.png                      # Background texture
    ├── placeholder-poster.jpg         # Fallback poster
    ├── [name]-desktop-1080p.mp4       # Desktop video (high res)
    ├── [name]-desktop-720p.webm       # Desktop video (fallback)
    ├── [name]-desktop-poster.jpg      # Desktop poster image
    ├── [name]-mobile-720p.mp4         # Mobile video (high res)
    ├── [name]-mobile-480p.webm        # Mobile video (fallback)
    └── [name]-mobile-poster.jpg       # Mobile poster image
```

---

## Automation Scripts

### Video Conversion (`convert-videos.bat`)

**Purpose:** Convert source videos to all required formats with proper codecs and naming.

**Usage:**
1. Drag and drop video files onto `convert-videos.bat`
2. Script auto-detects orientation (landscape vs portrait)
3. Generates all required formats + poster image
4. Saves to `assets/` folder with original filename as prefix

**Output naming:**
- Landscape: `[filename]-desktop-1080p.mp4`, `[filename]-desktop-720p.webm`, `[filename]-desktop-poster.jpg`
- Portrait: `[filename]-mobile-720p.mp4`, `[filename]-mobile-480p.webm`, `[filename]-mobile-poster.jpg`

**Requirements:**
- ffmpeg installed and in PATH

**Technical details:**
- 24 fps encoding
- H.264 codec for MP4 (CRF 23, slow preset)
- VP9 codec for WebM (1M bitrate for desktop, 800K for mobile)
- Poster extracted from first frame (JPEG quality 2)
- `object-fit: cover` compatible (maintains aspect ratio)

### Image Optimization (`optimize-images.bat` + `.ps1`)

**Purpose:** Compress images using TinyPNG API to reduce file size.

**Usage:**
1. Drag and drop images onto `optimize-images.bat`
2. Script compresses and **overwrites** originals
3. Shows compression stats (KB saved, percentage)

**API Key:** `KM08d19zsGznnFJ319dSrxtD8X8hzKmT`
- Free tier: 500 compressions/month
- Track usage: [tinypng.com/dashboard](https://tinypng.com/dashboard)

**Output:**
- Overwrites original files
- Typically 50-70% size reduction
- No quality loss visible to human eye

---

## HTML Structure

### Landing Video Implementation

```html
<header id="landing">
  <div class="video-wrapper">
    <!-- Desktop (landscape) video -->
    <video class="bg-video desktop" autoplay muted loop playsinline 
           poster="assets/[name]-desktop-poster.jpg">
      <source src="assets/[name]-desktop-1080p.mp4" type="video/mp4" media="(min-width: 768px)">
      <source src="assets/[name]-desktop-720p.webm" type="video/webm" media="(min-width: 768px)">
    </video>

    <!-- Mobile (portrait) video -->
    <video class="bg-video mobile" autoplay muted loop playsinline 
           poster="assets/[name]-mobile-poster.jpg">
      <source src="assets/[name]-mobile-720p.mp4" type="video/mp4" media="(max-width: 767px)">
      <source src="assets/[name]-mobile-480p.webm" type="video/webm" media="(max-width: 767px)">
    </video>

    <div class="overlay-gradient"></div>
  </div>

  <div class="landing-content">
    <h1 class="artist-name">PAWEŁ GRZELAK</h1>
    <p class="artist-subtitle">3D ARTIST & ANIMATOR</p>
  </div>

  <div class="scroll-indicator">
    <!-- Mouse scroll animation -->
  </div>
</header>
```

**Key attributes:**
- `autoplay muted loop playsinline` - Required for background video autoplay
- `poster` - Shows while video loads
- `media` attribute on `<source>` - Browser-native responsive video selection

---

## CSS Key Patterns

### Full-Screen Video

```css
#landing {
  height: 100vh;
  width: 100vw;
  position: relative;
}

.video-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Maintains aspect ratio, crops excess */
}
```

### Blurred Navbar

```css
#main-nav.visible {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);  /* Safari support */
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Responsive Video Switching

```css
.bg-video.desktop { display: none; }
.bg-video.mobile { display: block; }

@media (min-width: 768px) {
  .bg-video.desktop { display: block; }
  .bg-video.mobile { display: none; }
}
```

---

## JavaScript Behavior

### Navigation Visibility

```javascript
window.addEventListener('scroll', () => {
  const triggerPoint = landingSection.offsetHeight * 0.5; // 50% of landing height
  
  if (window.scrollY > triggerPoint) {
    nav.classList.add('visible');
  } else {
    nav.classList.remove('visible');
  }
});
```

**Trigger point:** Navbar appears when scrolled past 50% of landing video height.

---

## Deployment Workflow

### 1. Prepare Videos

```bash
# Drag landscape video for desktop
landing-desktop.mp4 → convert-videos.bat

# Drag portrait video for mobile
landing-mobile.mp4 → convert-videos.bat
```

**Output:**
- `landing-desktop-desktop-1080p.mp4`
- `landing-desktop-desktop-720p.webm`
- `landing-desktop-desktop-poster.jpg`
- `landing-mobile-mobile-720p.mp4`
- `landing-mobile-mobile-480p.webm`
- `landing-mobile-mobile-poster.jpg`

### 2. Optimize Images

```bash
# Drag all poster images
*.jpg → optimize-images.bat
```

**Result:** Images compressed by ~50-70%, originals overwritten.

### 3. Update HTML

Replace placeholder paths in `index.html` with actual filenames:

```html
<source src="assets/landing-desktop-desktop-1080p.mp4" ...>
```

### 4. Test Locally

Open `index.html` in browser:
- Check desktop video loads (resize to > 768px)
- Check mobile video loads (resize to < 768px)
- Verify navbar appears on scroll
- Test all project card videos

### 5. Deploy to GitHub Pages

```bash
git add .
git commit -m "Add optimized videos and assets"
git push origin main
```

**GitHub Pages serves from:** `main` branch, root directory.

---

## Performance Checklist

- [ ] All videos encoded at 24 fps
- [ ] All videos under target file sizes (< 3 MB)
- [ ] All poster images optimized with TinyPNG
- [ ] `faststart` flag enabled on all MP4 files
- [ ] Audio removed from all videos
- [ ] Both MP4 and WebM formats provided
- [ ] Poster images match video aspect ratios
- [ ] Tested on desktop (Chrome, Firefox, Safari)
- [ ] Tested on mobile (iOS Safari, Chrome)
- [ ] Lighthouse performance score > 90

---

## Common Issues & Solutions

### Video doesn't autoplay on mobile
- **Cause:** Missing `playsinline` attribute
- **Fix:** Add `playsinline` to all `<video>` tags

### Video shows letterboxing
- **Cause:** Aspect ratio mismatch
- **Fix:** Ensure `object-fit: cover` is applied and video matches expected ratio (16:9 or 9:16)

### Navbar text not readable
- **Cause:** Insufficient contrast against blurred background
- **Fix:** Adjust `rgba` opacity or add text-shadow

### Large file sizes
- **Cause:** High bitrate or long duration
- **Fix:** Reduce video duration to 5-10s or increase CRF value (lower quality)

### TinyPNG API limit reached
- **Cause:** 500 compressions/month limit
- **Fix:** Use a different API key or wait for next month

---

## Browser Compatibility

**Tested and working:**
- Chrome 90+ (desktop & mobile)
- Firefox 88+
- Safari 14+ (desktop & iOS)
- Edge 90+

**Known issues:**
- Safari < 14: `backdrop-filter` not supported (navbar will be semi-transparent without blur)
- IE 11: Not supported (no `object-fit`, no WebM)

---

## Future Enhancements

**Potential improvements:**
- Add lazy-loading for project grid videos (IntersectionObserver)
- Implement Service Worker for offline support
- Add video preloading hints for faster initial load
- Create automated build pipeline (GitHub Actions)
- Add analytics to track video load times
- Implement progressive video loading (low-res → high-res)

---

## Contact & Support

**Project Owner:** Paweł Grzelak  
**Hosting:** GitHub Pages  
**Repository:** pawelgrzelak.com-antigravity  

**External Dependencies:**
- ffmpeg (video conversion)
- TinyPNG API (image optimization)
- Google Fonts (Outfit typeface)

---

*Last updated: 2025-11-25*
