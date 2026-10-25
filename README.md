# A little belated birthday page ♡

A minimal, mobile-responsive belated birthday page with a dark, subtle clock-inspired palette, a password screen, a short birthday wish, a **Short Note** image section, a tap-to-enlarge view, tiny flower/kitten animations, and a live analogue + digital clock at the end.

## 1. Add your Short Note PNG

1. Open the `assets` folder.
2. Replace `short-note.png` with your own PNG (keep the exact filename `short-note.png`).
3. Recommended image size: **1414 × 2000 px**. It scales to the available screen width without cropping.
4. Tap/click the note to enlarge it. The hover magnifier has been removed.

The included `short-note.png` is a placeholder. Replace it before sharing.

## 2. Password

The password is **`Time`** (capital T). When the password is incorrect, the page shows only this clue: “Hint: the thing I ask you at the end 😉”.

## 3. Change the wish (optional)

Open `index.html` and edit the sentence inside `<p class="wish">...</p>`. You can also edit the small captions in the same file.

## 4. Preview on Windows 11

Double-click `index.html` to preview it in a browser. Try the password `Time`, scroll down to **Short Note**, tap the image to enlarge it, then scroll to **Time enna achu ?** to see the live local clock.

## 5. Put it online and create a QR code

A QR code needs a public website URL; a local `index.html` file on your computer will not open for someone scanning it from their phone.

1. Deploy the contents of this folder to a static host such as Netlify Drop (https://app.netlify.com/drop) or another host you trust. Keep `index.html`, `styles.css`, `script.js`, and the `assets` folder together.
2. Open the deployed URL on your phone and test it before making the QR.
3. In Command Prompt in this folder, run `py -m pip install -r requirements.txt`, then `py generate_qr.py` and paste the public page URL.
4. The script creates `birthday-qr.png`. Scan it from a second device before sharing.

## Privacy note

This is a **front-end password gate** for the requested surprise, not strong security: the password and page content can be discovered by someone inspecting the website files. Do not place highly private content on a public static host. Stronger privacy requires server-side password protection.
