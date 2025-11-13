# YT-Preview-Fixer
Do you also get annoyed by how loud YouTube video previews can be on the homepage?
Yeah, me too. That’s why I built this simple browser extension that adds a volume bar to YouTube’s homepage video previews - so you can finally control their sound level without going deaf every time a random preview decides to scream at you.

# This extension:
- Adds a volume slider to the bottom-right corner of each video preview on YouTube’s homepage.
- Lets you adjust or mute the volume of preview videos independently.
- Saves your preferred volume level in localStorage, so you don’t have to readjust it every time you reload YouTube.
- Automatically reduces the volume of previews at a fixed interval (to counter YouTube’s random volume resets).
- Works in any modern browser (Chrome, Edge, Firefox, Brave, Opera, etc.).

# Installation
Go to the repository page.
- Click the green “Code” button → choose “Download ZIP”.
- Extract the ZIP file somewhere on your computer.
- Open your browser’s Extensions or Add-ons page.
- In Chrome/Edge/Brave: go to chrome://extensions/ and enable Developer mode.
- Click “Load unpacked” and select the folder you just extracted.
- Refresh YouTube. You should now see the volume slider when hovering over videos on the homepage.

# Screenshot
![Screenshot1](https://github.com/tenshi64/YT-Preview-Fixer/blob/main/screenshots/screenshot.png)

# Help! YouTube/my PC lags when using this extension
If your browser or YouTube starts lagging, try this:
- Go to the extension’s installation folder.
- Open the folder /scripts.
- Edit the file extension.js.
- At the very top, find the line that defines the variable:
  ```const delay = 2; //in milliseconds``` Increase that number (e.g., 20 or 50).
- After saving the file, refresh (reload) the extension in your browser’s extensions settings page to apply the change.

# How it works
This extension runs a simple script that, every few milliseconds (a fixed delay set directly in the code), changes the volume of YouTube’s preview video player on the homepage.
It basically keeps checking the currently hovered video and makes sure its volume stays at your chosen level because YouTube sometimes randomly resets it to full blast when switching previews.

It’s definitely not the most optimized or elegant solution - in fact, it’s kind of a brute-force approach but after trying several methods, this was the only one that actually worked consistently across browsers.
