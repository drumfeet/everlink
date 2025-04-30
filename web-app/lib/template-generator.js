// Export the base templates for preview
export const baseTemplates = {
  neonpulse: getNeonPulseTemplate(),
  subtle: getSubtleTemplate(),
  glassmorph: getGlassmorphTemplate(),
  retro: getRetroTemplate(),
}

// Update the generateTemplate function to handle the profile image
export function generateTemplate(data) {
  // Get the base template
  let templateHtml = ""

  try {
    // Get the appropriate template
    switch (data.template) {
      case "neonpulse":
        templateHtml = getNeonPulseTemplate()
        break
      case "subtle":
        templateHtml = getSubtleTemplate()
        break
      case "glassmorph":
        templateHtml = getGlassmorphTemplate()
        break
      case "retro":
        templateHtml = getRetroTemplate()
        break
      default:
        templateHtml = getNeonPulseTemplate()
    }

    // Replace placeholders with user data
    templateHtml = templateHtml
      .replace(/<title>.*?<\/title>/, `<title>${data.username} | Everlink</title>`)
      .replace(/<h1>.*?<\/h1>/, `<h1>${data.username}</h1>`)
      .replace(/<p class="bio">.*?<\/p>/, `<p class="bio">${data.bio}</p>`)

    // Replace profile image if provided
    if (data.profileImage) {
      templateHtml = templateHtml.replace(
        /src="https:\/\/arweave\.net\/your-profile-picture\.jpg"/,
        `src="${data.profileImage}"`,
      )
    }

    // Replace links section
    const linksHtml = data.links
      .filter((link) => link.title && link.url)
      .map((link) => `<a href="${link.url}" class="button" target="_blank" rel="noopener noreferrer">${link.title}</a>`)
      .join("\n                ")

    // Replace the links div content
    templateHtml = templateHtml.replace(
      /<div class="links">[\s\S]*?<\/div>/,
      `<div class="links">\n                ${linksHtml}\n            </div>`,
    )

    return templateHtml
  } catch (error) {
    console.error("Error generating template:", error)
    return "<html><body><h1>Error generating template</h1></body></html>"
  }
}

// In a real application, these would be loaded from files
function getNeonPulseTemplate() {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Permanent web page for your digital profile.">
    <meta name="keywords"
        content="Everlink, everlinkdotfun, everlink.fun, Arweave, AO, Blockchain, Crypto, Web3, Link in Bio, Profile Page, Decentralized, Permanent Hosting">
    <meta name="author" content="everlink.fun">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Metadata -->
    <meta property="og:title" content="everlink.fun">
    <meta property="og:description" content="Permanent web page for your digital profile.">
    <meta property="og:image"
        content="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8">
    <meta property="og:url" content="https://everlink.fun">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="everlink.fun">

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="everlink.fun">
    <meta name="twitter:description" content="Permanent web page for your digital profile.">
    <meta name="twitter:image"
        content="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8">
    <meta name="twitter:site" content="@everlink">
    <meta name="twitter:creator" content="@everlink">

    <!-- Favicon -->
    <link rel="icon"
        href="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
        type="image/jpeg">
    <link rel="apple-touch-icon"
        href="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
        type="image/jpeg">
    <link rel="canonical" href="https://everlink.fun" />

    <title>Username | Everlink</title>
    <style>
        :root {
            --color-bg: #0f0f0f;
            --color-card: #1a1a1a;
            --color-accent: #4fd1c5;
            --color-accent-hover: #38b2ac;
            --color-text: #e2e8f0;
            --color-subtext: #a0aec0;
            --border-radius: 12px;
            --font-stack: 'Fira Code', Menlo, Monaco, Consolas, monospace;
            --shadow-glow: 0 0 10px rgba(79, 209, 197, 0.3);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: var(--font-stack);
            background-color: var(--color-bg);
            color: var(--color-text);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
        }

        main {
            max-width: 700px;
            width: 100%;
            background-color: var(--color-card);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-glow);
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .profile-picture-container {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 1rem;
            border: 2px solid var(--color-accent);
            box-shadow: var(--shadow-glow);
        }

        .profile-picture {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: var(--color-accent);
        }

        p.bio {
            font-size: 1rem;
            color: var(--color-subtext);
            text-align: center;
            margin-bottom: 2rem;
            max-width: 500px;
        }

        .links {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 1rem;
        }

        .button {
            background-color: var(--color-accent);
            color: var(--color-bg);
            padding: 0.75rem 1rem;
            text-align: center;
            border-radius: var(--border-radius);
            font-weight: bold;
            text-decoration: none;
            transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .button:hover {
            background-color: var(--color-accent-hover);
            transform: scale(1.03);
        }

        .footer {
            margin-top: 2rem;
            font-size: 0.85rem;
            color: var(--color-subtext);
            text-align: center;
        }

        .footer-link {
            color: var(--color-accent);
            text-decoration: none;
        }

        .footer-link:hover {
            text-decoration: underline;
        }

        .share-profile {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: rgba(15, 15, 15, 0.5);
            border: 1px solid rgba(79, 209, 197, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: none;
            backdrop-filter: blur(2px);
        }

        .share-icon {
            width: 16px;
            height: 16px;
            fill: transparent;
            opacity: 0.7;
        }

        .share-profile:hover {
            transform: scale(1.05);
            box-shadow: 0 0 8px rgba(79, 209, 197, 0.3);
            background-color: rgba(26, 26, 26, 0.7);
            border-color: var(--color-accent);
        }

        .share-profile:active {
            transform: scale(0.95);
        }
    </style>
</head>

<body>
    <main>
        <a href="https://twitter.com/intent/tweet?text=I%20just%20discovered%20%40everlinkdotfun%20-%20create%20a%20permanent%20web%20page%20for%20your%20digital%20profile.%20All%20your%20content%20in%20one%20customizable%20link.%20%F0%9F%9A%80%F0%9F%9A%80"
            target="_blank" rel="noopener noreferrer" class="share-profile">
            <svg class="share-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                    stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                    stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                    stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.59 13.51L15.42 17.49" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M15.41 6.51L8.59 10.49" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </a>

        <div class="container">
            <div class="profile-section">
                <div class="profile-picture-container">
                    <img src="https://arweave.net/your-profile-picture.jpg" class="profile-picture"
                        onError="this.style.display='none';" />
                </div>
                <h1>Username</h1>
                <p class="bio">Your bio or description goes here. Share a bit about yourself or what these links are for.</p>
            </div>

            <div class="links">
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">Twitter/X</a>
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">Podcast</a>
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">Website</a>
            </div>

            <div class="footer">
                <a href="https://everlink.fun" target="_blank" rel="noopener noreferrer" class="footer-link">Join us on
                    everlink.fun</a>
            </div>
        </div>
    </main>
</body>

</html>`
}

function getSubtleTemplate() {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Permanent web page for your digital profile.">
    <meta name="keywords"
        content="Everlink, everlinkdotfun, everlink.fun, Arweave, AO, Blockchain, Crypto, Web3, Link in Bio, Profile Page, Decentralized, Permanent Hosting">
    <meta name="author" content="everlink.fun">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Metadata -->
    <meta property="og:title" content="everlink.fun">
    <meta property="og:description" content="Permanent web page for your digital profile.">
    <meta property="og:image"
        content="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8">
    <meta property="og:url" content="https://everlink.fun">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="everlink.fun">

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="everlink.fun">
    <meta name="twitter:description" content="Permanent web page for your digital profile.">
    <meta name="twitter:image"
        content="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8">
    <meta name="twitter:site" content="@everlink">
    <meta name="twitter:creator" content="@everlink">

    <!-- Favicon -->
    <link rel="icon"
        href="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
        type="image/jpeg">
    <link rel="apple-touch-icon"
        href="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
        type="image/jpeg">
    <link rel="canonical" href="https://everlink.fun" />

    <title>Username | Everlink</title>
    <style>
        /* CSS Variables with semantic naming */
        :root {
            /* Base sizing unit */
            --size-unit: 4px;

            /* Theme colors - more subtle palette */
            --color-brand-primary: #555;
            --color-brand-primary-hover: #333;
            --color-text-primary: #444;
            --color-text-secondary: #777;
            --color-surface-page: #fafafa;
            --color-surface-card: #fff;
            --color-border-subtle: #f0f0f0;
            --color-accent-gradient-start: #ececec;
            --color-accent-gradient-end: #f9f9f9;

            /* Spacing scale - based on multiples of base unit */
            --space-2xs: calc(var(--size-unit) * 2);
            /* 8px */
            --space-xs: calc(var(--size-unit) * 2.5);
            /* 10px */
            --space-sm: calc(var(--size-unit) * 3.75);
            /* 15px */
            --space-md: calc(var(--size-unit) * 5);
            /* 20px */
            --space-lg: calc(var(--size-unit) * 7.5);
            /* 30px */
            --space-xl: calc(var(--size-unit) * 10);
            /* 40px */

            /* Typography scale */
            --font-size-base: 1rem;
            --font-size-small: calc(var(--font-size-base) * 0.9);
            --font-size-body: var(--font-size-base);
            --font-size-heading-sm: calc(var(--font-size-base) * 1.2);
            --font-size-heading-md: calc(var(--font-size-base) * 1.5);
            --font-size-heading-lg: calc(var(--font-size-base) * 2);

            /* Layout dimensions */
            --layout-page-padding: calc(var(--size-unit) * 4);
            --layout-content-width-ratio: 0.9;
            /* 90% of available width */
            --layout-content-max-width: 680px;
            --layout-content-min-width: 300px;

            /* Component dimensions */
            --avatar-size-ratio: 0.16;
            /* Slightly smaller avatar */
            --avatar-size: calc(var(--layout-content-max-width) * var(--avatar-size-ratio));

            /* Border radius - more subtle curves */
            --radius-small: calc(var(--size-unit) * 1.5);
            /* 6px */
            --radius-medium: calc(var(--size-unit) * 2.5);
            /* 10px */
            --radius-large: calc(var(--size-unit) * 4);
            /* 16px */
            --radius-circular: 50%;

            /* Typography */
            --font-family-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            --line-height-normal: 1.5;
            --line-height-tight: 1.25;

            /* Effects - more subtle shadows */
            --shadow-opacity: 0.05;
            --shadow-blur: 10px;
            --shadow-normal: 0 1px var(--shadow-blur) rgba(0, 0, 0, var(--shadow-opacity));
            --shadow-hover: 0 3px 12px rgba(0, 0, 0, calc(var(--shadow-opacity) * 1.25));
            --duration-transition-normal: 0.25s;

            /* Responsive breakpoints */
            --breakpoint-mobile: 320px;
            --breakpoint-tablet: 768px;
        }

        /* Basic reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html,
        body {
            height: 100%;
        }

        /* Body styling */
        body {
            display: flex;
            justify-content: center;
            min-height: 100vh;
            width: 100%;
            background-color: var(--color-surface-page);
            font-family: var(--font-family-main);
            color: var(--color-text-primary);
            line-height: var(--line-height-normal);
            padding: var(--layout-page-padding);
            padding-top: var(--space-xl);
            padding-bottom: var(--space-xl);
        }

        /* Main content wrapper */
        main {
            width: 100%;
            max-width: var(--layout-content-max-width);
            display: flex;
            flex-direction: column;
            align-items: center;
            /* Ensures main takes up available space to push footer down */
            flex: 1;
            min-height: calc(100vh - 2 * var(--space-xl) - 2 * var(--layout-page-padding));
        }

        /* Content container */
        .container {
            text-align: center;
            width: 100%;
            max-width: var(--layout-content-max-width);
            min-width: min(var(--layout-content-min-width), 100%);
            margin: 0 auto;
            /* Ensure the container takes all available height and creates a column layout */
            display: flex;
            flex-direction: column;
            min-height: 100%;
            padding: 0 var(--space-sm);
            /* Add some horizontal padding */
            box-sizing: border-box;
        }

        /* Header section with profile */
        .profile-section {
            margin-bottom: var(--space-lg);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Avatar styles */
        .profile-picture-container {
            width: var(--avatar-size);
            height: var(--avatar-size);
            border-radius: var(--radius-circular);
            margin-bottom: var(--space-md);
            background: linear-gradient(to right, var(--color-accent-gradient-start), var(--color-accent-gradient-end));
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
            /* Border for the avatar - more subtle */
            border: 1px solid var(--color-border-subtle);
            box-shadow: var(--shadow-normal);
        }

        .profile-picture {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
            z-index: 1;
        }

        .profile-picture[src]:not([src=""]) {
            opacity: 1;
        }

        /* Share profile button - more subtle */
        .share-profile {
            position: absolute;
            top: var(--space-md);
            right: var(--space-md);
            background: var(--color-surface-card);
            border: 1px solid var(--color-border-subtle);
            border-radius: var(--radius-circular);
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all var(--duration-transition-normal);
            opacity: 0.6;
        }

        .share-profile:hover {
            background-color: var(--color-border-subtle);
            opacity: 1;
        }

        .share-icon {
            width: 18px;
            height: 18px;
            color: var(--color-text-secondary);
        }

        /* Typography - more refined */
        h1 {
            font-size: var(--font-size-heading-md);
            margin-bottom: var(--space-xs);
            font-weight: 600;
            /* Slightly less bold */
            line-height: var(--line-height-tight);
            color: var(--color-text-primary);
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            max-width: 100%;
        }

        p.bio {
            font-size: var(--font-size-body);
            margin-bottom: var(--space-md);
            color: var(--color-text-secondary);
            max-width: calc(var(--layout-content-max-width) * 0.7);
            /* Slightly narrower width */
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
            font-weight: 400;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
        }

        /* Links navigation */
        .links {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: var(--space-sm);
            /* This will push the footer to the bottom when content is short */
            flex: 1 0 auto;
            padding-bottom: var(--space-lg);
        }

        /* Action button styling - more subtle */
        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-xs) var(--space-md);
            text-decoration: none;
            font-size: var(--font-size-body);
            font-weight: 500;
            /* Less bold */
            color: var(--color-text-primary);
            background-color: var(--color-surface-card);
            border-radius: var(--radius-medium);
            transition: all var(--duration-transition-normal);
            width: 100%;
            /* Button height proportional to font size */
            line-height: calc(var(--font-size-body) * 1.7);
            border: 1px solid var(--color-border-subtle);
            box-shadow: var(--shadow-normal);
            letter-spacing: 0.01em;
            white-space: normal;
            overflow-wrap: break-word;
            word-wrap: break-word;
            min-height: 2.5em;
        }

        .button:hover {
            transform: translateY(calc(var(--size-unit) * -0.25));
            /* Subtler lift effect */
            box-shadow: var(--shadow-hover);
            background-color: var(--color-surface-page);
        }

        /* Footer - more subtle */
        .footer {
            margin-top: auto;
            padding-top: var(--space-md);
            padding-bottom: var(--space-md);
            text-align: center;
            font-size: calc(var(--font-size-small) * 0.9);
            /* Even smaller font */
            color: var(--color-text-secondary);
            opacity: 0.7;
            /* Ensure footer doesn't shrink */
            flex-shrink: 0;
            width: 100%;
        }

        .footer-link {
            color: var(--color-text-secondary);
            text-decoration: none;
            font-weight: 400;
        }

        .footer-link:hover {
            text-decoration: underline;
            opacity: 1;
        }

        /* Empty state - when no links are present */
        .links:empty {
            min-height: var(--space-xl);
            /* Ensure some minimum space */
        }

        /* Scrollbar styling - more subtle */
        ::-webkit-scrollbar {
            width: calc(var(--size-unit) * 1.5);
            /* Thinner scrollbar */
        }

        ::-webkit-scrollbar-track {
            background: var(--color-surface-page);
        }

        ::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.1);
            /* Very subtle scrollbar */
            border-radius: var(--space-xs);
            border: calc(var(--size-unit) * 0.5) solid var(--color-surface-page);
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.15);
        }

        /* Responsive adjustments */
        @media (max-width: var(--breakpoint-tablet)) {
            :root {
                /* Adjust avatar size for smaller screens */
                --avatar-size-ratio: 0.2;
                /* Slightly reduce text size */
                --font-size-base: 0.95rem;
            }

            body {
                padding: var(--space-md);
            }

            h1 {
                font-size: var(--font-size-heading-sm);
                padding: 0 var(--space-xs);
            }

            p.bio {
                font-size: var(--font-size-small);
                max-width: 100%;
                padding: 0 var(--space-xs);
            }

            .button {
                line-height: calc(var(--font-size-body) * 1.5);
                padding: var(--space-xs) var(--space-sm);
            }
        }

        @media (max-width: var(--breakpoint-mobile)) {
            :root {
                --layout-page-padding: var(--space-sm);
                --font-size-base: 0.9rem;
            }

            body {
                padding: var(--space-sm);
            }

            .container {
                width: 100%;
                min-width: auto;
                padding: 0 var(--space-2xs);
            }

            .profile-picture-container {
                width: calc(var(--layout-content-min-width) * var(--avatar-size-ratio) * 1.2);
                height: calc(var(--layout-content-min-width) * var(--avatar-size-ratio) * 1.2);
            }

            .share-profile {
                top: var(--space-sm);
                right: var(--space-sm);
                width: 32px;
                height: 32px;
            }

            .share-icon {
                width: 16px;
                height: 16px;
            }

            h1 {
                font-size: calc(var(--font-size-heading-sm) * 0.95);
            }

            .footer {
                font-size: calc(var(--font-size-small) * 0.85);
                padding: var(--space-sm) var(--space-xs);
            }
        }

        /* Extra small screens adjustment */
        @media (max-width: 350px) {
            :root {
                --font-size-base: 0.85rem;
            }

            .button {
                padding: var(--space-2xs) var(--space-xs);
            }

            .profile-section {
                margin-bottom: var(--space-md);
            }
        }
    </style>
</head>

<body>
    <main>
        <a href="https://twitter.com/intent/tweet?text=I%20just%20discovered%20%40everlinkdotfun%20-%20create%20a%20permanent%20web%20page%20for%20your%20digital%\`\`\`xml
just%20discovered%20%40everlinkdotfun%20-%20create%20a%20permanent%20web%20page%20for%20your%20digital%
profile.%20All%20your%20content%20in%20one%20customizable%20link.%20%F0%9F%9A%80%F0%9F%9A%80"
            target="_blank" rel="noopener noreferrer" class="share-profile">
            <svg class="share-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </a>

        <div class="container">
            <div class="profile-section">
                <div class="profile-picture-container">
                    <img src="https://arweave.net/your-profile-picture.jpg" class="profile-picture"
                        onError="this.style.display='none';" />
                </div>
                <h1>Username</h1>
                <p class="bio">Your bio or description goes here. Share a bit about yourself or what these links are for.</p>
            </div>

            <div class="links">
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">Twitter/X</a>
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">Podcast</a>
                <a href="#" class="button" target="_blank" rel="noopener noreferrer">Website</a>
            </div>

            <div class="footer">
                <a href="https://everlink.fun" target="_blank" rel="noopener noreferrer" class="footer-link">Join us on
                    everlink.fun</a>
            </div>
        </div>
    </main>
</body>

</html>`
}

function getGlassmorphTemplate() {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Permanent web page for your digital profile.">
    <meta name="keywords"
        content="Everlink, everlinkdotfun, everlink.fun, Arweave, AO, Blockchain, Crypto, Web3, Link in Bio, Profile Page, Decentralized, Permanent Hosting">
    <meta name="author" content="everlink.fun">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Metadata -->
    <meta property="og:title" content="everlink.fun">
    <meta property="og:description" content="Permanent web page for your digital profile.">
    <meta property="og:image"
        content="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8">
    <meta property="og:url" content="https://everlink.fun">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="everlink.fun">

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="everlink.fun">
    <meta name="twitter:description" content="Permanent web page for your digital profile.">
    <meta name="twitter:image"
        content="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8">
    <meta name="twitter:site" content="@everlink">
    <meta name="twitter:creator" content="@everlink">

    <!-- Favicon -->
    <link rel="icon"
        href="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
        type="image/jpeg">
    <link rel="apple-touch-icon"
        href="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
        type="image/jpeg">
    <link rel="canonical" href="https://everlink.fun" />

    <title>Username | Everlink</title>
    <style>
        /* Glassmorphism styles */
        :root {
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.3);
            --glass-color: #fff;
            --glass-shadow: rgba(0, 0, 0, 0.1);
            --glass-radius: 1rem;
            --font-stack: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            font-family: var(--font-stack);
            background: linear-gradient(to bottom right, #43cea2, #185a9d);
            height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            /* Hide scrollbars */
        }

        main {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: var(--glass-radius);
            box-shadow: 0 8px 32px var(--glass-shadow);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 2rem;
            text-align: center;
            color: var(--glass-color);
            width: 80%;
            max-width: 500px;
            position: relative;
        }

        .profile-picture-container {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto 1rem;
            border: 3px solid var(--glass-color);
            box-shadow: 0 0 15px var(--glass-shadow);
        }

        .profile-picture {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        p.bio {
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }

        .links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .button {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 0.7rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 0.75rem 1rem;
            text-align: center;
            color: var(--glass-color);
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .footer {
            margin-top: 2rem;
            font-size: 0.9rem;
        }

        .footer a {
            color: var(--glass-color);
            text-decoration: none;
        }

        .share-profile {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: none;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }

        .share-icon {
            width: 16px;
            height: 16px;
            fill: var(--glass-color);
            opacity: 0.7;
        }

        .share-profile:hover {
            transform: scale(1.1);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            background-color: rgba(255, 255, 255, 0.2);
        }

        .share-profile:active {
            transform: scale(0.9);
        }
    </style>
</head>

<body>
    <main>
        <a href="https://twitter.com/intent/tweet?text=Check%20out%20my%20profile%20created%20with%20%40everlinkdotfun!%20Create%20your%20own%20permanent%20web%20page%20for%20your%20digital%20identity.%20%23Everlink%20%23Web3%20%23Arweave"
            target="_blank" rel="noopener noreferrer" class="share-profile">
            <svg class="share-icon" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" />
                <path fill="currentColor"
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" />
                <path fill="currentColor"
                    d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" />
                <path fill="currentColor" d="M8.59 13.51L15.42 17.49" />
                <path fill="currentColor" d="M15.41 6.51L8.59 10.49" />
            </svg>
        </a>

        <div class="profile-picture-container">
            <img src="https://arweave.net/your-profile-picture.jpg" class="profile-picture"
                onError="this.style.display='none';" />
        </div>
        <h1>Username</h1>
        <p class="bio">Your bio or description goes here. Share a bit about yourself or what these links are for.</p>

        <div class="links">
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">Twitter/X</a>
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">Podcast</a>
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">Website</a>
        </div>

        <div class="footer">
            <a href="https://everlink.fun" target="_blank" rel="noopener noreferrer">Join us on everlink.fun</a>
        </div>
    </main>
</body>

</html>`
}

function getRetroTemplate() {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Permanent web page for your digital profile.">
    <meta name="keywords"
        content="Everlink, everlinkdotfun, everlink.fun, Arweave, AO, Blockchain, Crypto, Web3, Link in Bio, Profile Page, Decentralized, Permanent Hosting">
    <meta name="author" content="everlink.fun">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Metadata -->
    <meta property="og:title" content="everlink.fun">
    <meta property="og:description" content="Permanent web page for your digital profile.">
    <meta property="og:image"
        content="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8">
    <meta property="og:url" content="https://everlink.fun">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="everlink.fun">

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="everlink.fun">
    <meta name="twitter:description" content="Permanent web page for your digital profile.">
    <meta name="twitter:image"
        content="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8">
    <meta name="twitter:site" content="@everlink">
    <meta name="twitter:creator" content="@everlink">

    <!-- Favicon -->
    <link rel="icon"
        href="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
        type="image/jpeg">
    <link rel="apple-touch-icon"
        href="https://zgrcgiojaydmjiimqt7p6yw6gsljrup7ygrkv7ydcbranj26ax7q.arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
        type="image/jpeg">
    <link rel="canonical" href="https://everlink.fun" />

    <title>Username | Everlink</title>
    <style>
        /* Retro Theme Styles */
        :root {
            --retro-bg: #f0d8a8;
            --retro-text: #382f22;
            --retro-accent: #a45a52;
            --retro-border: #79473b;
            --font-stack: 'Courier New', Courier, monospace;
        }

        body {
            font-family: var(--font-stack);
            background-color: var(--retro-bg);
            color: var(--retro-text);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            text-align: center;
        }

        main {
            background-color: #fff;
            border: 4px dashed var(--retro-border);
            padding: 2rem;
            width: 80%;
            max-width: 600px;
            box-shadow: 8px 8px 0px var(--retro-accent);
        }

        .profile-picture-container {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto 1rem;
            border: 2px solid var(--retro-accent);
        }

        .profile-picture {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: var(--retro-accent);
            text-shadow: 2px 2px var(--retro-border);
        }

        p.bio {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .links {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .button {
            background-color: var(--retro-accent);
            color: #fff;
            border: none;
            padding: 0.6rem 1rem;
            text-decoration: none;
            display: block;
            border-radius: 0;
            box-shadow: 4px 4px 0px var(--retro-border);
            transition: transform 0.2s ease;
        }

        .button:hover {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px var(--retro-border);
        }

        .footer {
            margin-top: 2rem;
            font-size: 1rem;
        }

        .footer a {
            color: var(--retro-text);
        }

        .share-profile {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: var(--retro-accent);
            border: 2px solid var(--retro-border);
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: none;
        }

        .share-icon {
            width: 16px;
            height: 16px;
            fill: #fff;
        }

        .share-profile:hover {
            transform: scale(1.1);
            box-shadow: 4px 4px 0px var(--retro-border);
        }

        .share-profile:active {
            transform: scale(0.9);
        }
    </style>
</head>

<body>
    <main>
        <a href="https://twitter.com/intent/tweet?text=I%20created%20my%20retro%20profile%20with%20%40everlinkdotfun!%20Make%20your%20own%20permanent%20web%20page%20today!%20%23retro%20%23web3%20%23everlink"
            target="_blank" rel="noopener noreferrer" class="share-profile">
            <svg class="share-icon" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" />
                <path fill="currentColor"
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" />
                <path fill="currentColor"
                    d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" />
                <path fill="currentColor" d="M8.59 13.51L15.42 17.49" />
                <path fill="currentColor" d="M15.41 6.51L8.59 10.49" />
            </svg>
        </a>

        <div class="profile-picture-container">
            <img src="https://arweave.net/your-profile-picture.jpg" class="profile-picture"
                onError="this.style.display='none';" />
        </div>
        <h1>Username</h1>
        <p class="bio">Your bio or description goes here. Share a bit about yourself or what these links are for.</p>

        <div class="links">
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">Twitter/X</a>
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">Podcast</a>
            <a href="#" class="button" target="_blank" rel="noopener noreferrer">Website</a>
        </div>

        <div class="footer">
            <a href="https://everlink.fun" target="_blank" rel="noopener noreferrer">Join us on everlink.fun</a>
        </div>
    </main>
</body>

</html>`
}
