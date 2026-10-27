# Deployment: Netlify (recommended) or Vercel

## Option A: GitHub + Netlify (same as your other sites)

1. Create a new GitHub repository (for example `dalal-technologies-site`) and push this folder to it.
2. In Netlify: **Add new site → Import an existing project → GitHub**, then choose the repository.
   Netlify reads `netlify.toml` for these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node 22
3. **Site configuration → Environment variables**: add `SITE_URL` = your final address, for example `https://www.yourdomain.com` (no trailing slash). This sets the canonical links, the sitemap and the social-sharing URLs. Redeploy after you set it.
4. **Forms → Enable form detection.** Netlify turns this off by default for new sites. Redeploy once after you enable it. The form is named `contact`.
5. **Forms → Form notifications → Add notification → Email**: send new messages to your inbox.
6. **Domain management → Add a domain**. Follow Netlify's DNS instructions at your registrar (for example Namecheap). HTTPS is issued automatically.

## Option B: drag-and-drop (fastest test)

Run `npm install && npm run build`, then drag the `dist/` folder onto https://app.netlify.com/drop.
For the contact form to work, enable form detection as in step 4 and drag the folder again.

## Option C: Vercel

Import the repository. Set the framework preset to **Other**, the build command to `npm run build` and the output directory to `dist`.
Netlify Forms won't work on Vercel. Set `contactFormName: ''` in `src/config/site.ts` to show email and phone only, or connect a form service.

## After the first deploy

- Open `/en/contact/`, send a test message and check that it appears under **Forms** in Netlify.
- Submit `https://yourdomain/sitemap.xml` in Google Search Console.
- Once you have a branded email address, update `email` in `src/config/site.ts` and push.

## Security headers

`public/_headers` sets a strict Content-Security-Policy (no third-party scripts), HSTS, X-Frame-Options, Referrer-Policy and long-term caching for hashed assets. If you add analytics or an external script later, add its domain to the CSP.
