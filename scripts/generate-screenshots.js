const { chromium } = require('playwright');
const path = require('path');

async function generateScreenshots() {
  console.log('Starting screenshot generation...');
  
  // Launch browser
  const browser = await chromium.launch({
    headless: true // Set to false if you want to see the browser
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  
  const page = await context.newPage();
  
  // Use your deployed Vercel URL
  const baseUrl = 'https://akuphecloud.com';
  
  // Define screenshots to take
  const screenshots = [
    {
      url: baseUrl,
      name: 'homepage-full',
      fullPage: true
    },
    {
      url: baseUrl,
      name: 'homepage-hero',
      fullPage: false
    },
    {
      url: `${baseUrl}/#projects`,
      name: 'projects-section',
      fullPage: false
    },
    {
      url: `${baseUrl}/#services`,
      name: 'services-section',
      fullPage: false
    },
    {
      url: `${baseUrl}/#testimonials`,
      name: 'testimonials-section',
      fullPage: false
    },
    {
      url: `${baseUrl}/#contact`,
      name: 'contact-section',
      fullPage: false
    },
    {
      url: `${baseUrl}/admin`,
      name: 'admin-dashboard',
      fullPage: false
    }
  ];
  
  // Create screenshots directory
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  const fs = require('fs');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }
  
  // Take screenshots
  for (const screenshot of screenshots) {
    try {
      console.log(`Navigating to ${screenshot.url}...`);
      await page.goto(screenshot.url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait a bit for animations to complete
      await page.waitForTimeout(2000);
      
      // Scroll to section if it's a hash link
      if (screenshot.url.includes('#')) {
        const section = screenshot.url.split('#')[1];
        await page.evaluate((sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, section);
        await page.waitForTimeout(1000);
      }
      
      const screenshotPath = path.join(screenshotsDir, `${screenshot.name}.png`);
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: screenshot.fullPage 
      });
      
      console.log(`✓ Screenshot saved: ${screenshot.name}.png`);
    } catch (error) {
      console.error(`✗ Failed to capture ${screenshot.name}: ${error.message}`);
    }
  }
  
  // Create a collage/thumbnail view
  console.log('\nCreating thumbnail view...');
  
  // Create a new page for thumbnail
  const thumbnailPage = await context.newPage();
  await thumbnailPage.setViewportSize({ width: 1200, height: 900 });
  
  // Create HTML for thumbnail collage
  const thumbnailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 20px;
          background: #0a0a0a;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: auto auto;
          gap: 20px;
          max-width: 1160px;
          margin: 0 auto;
        }
        .main-preview {
          grid-column: 1;
          grid-row: 1 / 3;
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }
        .side-preview {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .title {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          padding: 16px 32px;
          border-radius: 12px;
          color: white;
          font-size: 24px;
          font-weight: 600;
          z-index: 10;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .subtitle {
          font-size: 14px;
          font-weight: 400;
          margin-top: 4px;
          opacity: 0.8;
        }
        .tech-stack {
          position: absolute;
          bottom: 30px;
          right: 30px;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          padding: 12px 20px;
          border-radius: 8px;
          color: white;
          font-size: 12px;
          z-index: 10;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .preview-label {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #3b82f6;
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .admin-text {
          color: white;
          text-align: center;
        }
        .admin-text h3 {
          font-size: 20px;
          margin-bottom: 8px;
        }
        .admin-text p {
          font-size: 14px;
          opacity: 0.7;
        }
      </style>
    </head>
    <body>
      <div class="title">
        Next.js Portfolio with Dynamic CMS
        <div class="subtitle">Full-Stack Portfolio Website with Admin Dashboard</div>
      </div>
      
      <div class="container">
        <div class="main-preview">
          <div class="preview-label">Homepage</div>
          <div style="height: 840px; overflow: hidden;">
            <img src="file://${path.join(screenshotsDir, 'homepage-hero.png')}" alt="Homepage" 
                 style="object-position: top center;">
          </div>
        </div>
        
        <div class="side-preview" style="height: 400px;">
          <div class="preview-label">Projects Section</div>
          <img src="file://${path.join(screenshotsDir, 'projects-section.png')}" alt="Projects">
        </div>
        
        <div class="side-preview" style="height: 400px;">
          <div class="admin-text">
            <h3>Admin Dashboard</h3>
            <p>Full CRUD Operations<br>MongoDB Integration<br>Real-time Updates</p>
          </div>
        </div>
      </div>
      
      <div class="tech-stack">
        Next.js 14 • TypeScript • MongoDB • Tailwind CSS • Vercel
      </div>
    </body>
    </html>
  `;
  
  await thumbnailPage.setContent(thumbnailHTML);
  await thumbnailPage.waitForTimeout(1000);
  
  await thumbnailPage.screenshot({ 
    path: path.join(screenshotsDir, 'upwork-thumbnail.png'),
    fullPage: false 
  });
  
  console.log('✓ Upwork thumbnail created: upwork-thumbnail.png');
  
  await browser.close();
  
  console.log('\n✅ Screenshot generation complete!');
  console.log(`📁 Screenshots saved in: ${screenshotsDir}`);
  console.log('\n📸 Use "upwork-thumbnail.png" for your Upwork portfolio');
}

// Run the script
generateScreenshots().catch(console.error);