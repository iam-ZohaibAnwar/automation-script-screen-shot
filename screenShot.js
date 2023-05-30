const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://www.example.com',
  'https://www.google.com',
  'https://www.openai.com',
  // Add more URLs here
];

async function captureScreenshot(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.setViewport({ width: 1300, height: 750 });
  await page.screenshot({ path: outputPath });

  await browser.close();
}

async function captureScreenshots(urls) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const timestamp = new Date().getTime();
    const outputPath = path.join(__dirname, `screenshot_${i + 1}_${timestamp}.png`);

    try {
      await captureScreenshot(url, outputPath);
      console.log(`Screenshot captured for URL: ${url}`);
    } catch (error) {
      console.error(`Error capturing screenshot for URL: ${url}`);
      console.error(error);
    }
  }
}

function captureScreenshotsEveryMinute(urls) {
  captureScreenshots(urls); // Capture initial screenshots

  setInterval(() => {
    captureScreenshots(urls);
  }, 60000); // Capture screenshots every minute (in milliseconds)
}

captureScreenshotsEveryMinute(urls);
