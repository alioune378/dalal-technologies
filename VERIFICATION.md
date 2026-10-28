# Claims verification checklist: Dalal Technologies

Review every line before the site goes public. Anything you can't confirm should be edited or removed.
The file to change is shown in brackets. After a change, run `npm run build` (Netlify does this automatically).

## 1. Experience described on the site  [src/content/company.ts → `about`, `home.founderBody`]

As you asked, the site **names no one**: neither you nor any employer or brand. Your experience is described in the company's voice ("Dalal Technologies was built on more than fifteen years…"). Former employers are described only by their industry:
- "a global premium automaker's North American operations and its captive finance arm"
- "a multinational automotive group" (parts and service area management)

There is no photo and no founder section. The About page and the homepage show a "15+ years" panel instead. You can add a team section later.

| # | Still worth a final look | Action |
|---|---|---|
| 1.1 | The industry descriptions above | Make sure they are vague enough for you, or simplify them to "automotive manufacturer" and "automotive group" |
| 1.2 | Mention of an internal AI innovation competition | Keep or remove |
| 1.3 | Contact email is now `info@dalaltechnologies.com` | Create this mailbox after buying the domain, or messages sent to it will bounce |

## 2. Company information  [src/config/site.ts]

| # | Item | Status | Action |
|---|---|---|---|
| 2.1 | Email **alioune378@icloud.com** (personal) | From your brief | Replace with a company-domain address once you have one (one-line change) |
| 2.2 | Phone **+1 (614) 589-2962** | From your brief | Confirm you want it public |
| 2.3 | Location "**Ithaca, New York**" | From your brief | Confirm the city. No street address is shown |
| 2.4 | Site URL is a placeholder: `https://dalal-technologies.netlify.app` | **Decision needed** | Set `SITE_URL` once the domain is chosen |
| 2.4b | Markets now read "United States, Canada, Senegal and international" | Done |
| 2.5 | No registration number, headquarters, employee count, trademark or partnerships are claimed | — | Keep it that way until they exist |
| 2.6 | About page: "In Wolof, *dalal* carries the idea of welcome…" | Wording written for you | Confirm you're happy with this meaning, or remove it |
| 2.7 | Relationship between **Dalal Studio** and Dalal Technologies | Resolved 28 Oct 2026: the Dalal Studio name is retired. All client sites, including the embassy demo, now credit Dalal Technologies | None |

## 3. Projects  [src/content/projects.ts]

Every project has `visible: true/false`. Set it to `false` to hide a project without deleting it.

| Project | Shown as | What to confirm |
|---|---|---|
| **Sénégal Consulaire Digital** | Functional demonstration, independent, unofficial | Features come from the project README and QA report. The preview screenshot shows the demo with its "Démonstration" banner and the Senegal flag in the demo's header. Confirm you're comfortable showing it. The disclaimer appears on its case study page in both languages |
| **Lintel & Meridian Advisory** | Published, affiliated initiative (not a client) | **The live site couldn't be checked from the build environment.** Confirm English/French/Arabic, the sector pages and the contact form. No screenshot is used; it gets a typographic preview |
| **Teranga City** | Published website for a development initiative, affiliated | Features come from the site's source. The source has French, English, Spanish and Arabic text, so the site says "multilingual". Confirm the "confirmation email" feature is live |
| **Sant Yalla Boutique** | In development, engagement to be confirmed | Spelling (Sant Yalla or Sante Yalla), the owner's consent, any live URL |
| **Cabinet Magaye Sène** | Built, publication to be confirmed | Whether to mention the family connection, the practice's consent, the live URL, and the professional rules on advertising |
| **Sankara Mbaye** | In development, "Creator and media" | Category, client consent, live URL |
| **O3S** | Concept, unsolicited proposal | **Consider hiding it until O3S responds.** Showing an unsolicited pitch to a named company publicly can backfire. Also confirm the client-portal concept actually exists |
| **ServiceOps: Dealer Performance Intelligence** | Concept, synthetic data only | Confirm it doesn't reproduce employer tools, layouts or data |
| Results sections | Every case study says results will be published only when measured | Add real, provable outcomes only |

## 4. Services and AI claims  [src/content/services.ts]

- The AI offerings are labeled one of three ways:
  - **Demonstrated independent concept:** workflow automation, and request classification and routing (backed by the on-site demo and the embassy demo's simulated workflows).
  - **Capability under development:** assistants, document workflows, AI support, knowledge search, AI reporting.
  - **Advisory offering:** automation assessment, predictive analytics exploration, governance.

  Change any label that doesn't match reality.
- The AI page says plainly: "Dalal Technologies has not yet deployed AI systems in production for clients."
- Power BI, Tableau, SQL and Excel/Power Query appear under services. They come from your stated experience.

## 5. Client relationships, endorsements, certifications

- No client logos, testimonials, statistics, certifications (ISO, SOC 2), government accreditation or security badges appear anywhere.
- No employer or brand is named. A short note on the About page and in the footer says that prior experience implies no client relationship or endorsement.
- Industry pages say they are "a sector of focus, not a client list". Each one keeps prior employment separate from Dalal Technologies' own work.

## 6. Interactive demonstrations

- The dashboard is labeled "Illustrative dashboard: synthetic data". Its numbers are generated in the browser and describe no real company.
- The AI workflow is labeled "simulated, not connected to live systems". It uses simple keyword rules and nothing is sent anywhere.

## 7. Insights articles  [src/content/insights.ts]

Three short articles are written in the company's name and dated 27 October 2026. Read them and approve, edit or delete them before publishing.

## 8. Legal pages  [src/pages/Other.tsx → `legal`]

The privacy notice and terms of use are plain-language drafts, **not legal advice**. They say that Netlify stores form submissions and that no analytics or advertising cookies are used. If you add analytics later, update the privacy notice. Have a lawyer review both pages if you will serve EU or Senegalese clients at scale.

## 9. Logo files

- The supplied `01_Primary_Horizontal` files are **cropped on the right**: the last "L", the "S" and "ENGINEERING" are cut off. So the light-background logo was made from the complete `04_Reverse_Dark` file by recolouring the white parts to the logo's navy, with the gold unchanged. The dark-background version is the same artwork with a transparent background.
- The header uses the lockup without the small tagline line, because the tagline is unreadable at header size. The footer and the Open Graph images use the full lockup.
- As the logo package README itself says, ask your designer for **vector (SVG) masters**. Then replace the files in `public/brand/`.
