import { defineConfig } from "tinacms";

// Tina Cloud credentials
const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

const clientId =
  process.env.TINA_CLIENT_ID ||
  process.env.VITE_TINA_CLIENT_ID ||
  "47438203-cb62-46ae-bec9-2c4498c75c37";

const token =
  process.env.TINA_TOKEN ||
  process.env.VITE_TINA_TOKEN ||
  "9a0ab6b6123f2094da5276b277a1d1194afc0726";

export default defineConfig({
  branch,
  clientId,
  token,

  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      mediaRoot: "Images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "category",
        label: "Categories",
        path: "content/categories",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => {
              return (
                values?.slug ||
                values?.name
                  ?.toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "") ||
                "new-category"
              );
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Category Name",
            description:
              "The display name for this discipline (e.g. 3D Modeling, Graphic Design, Brand Identity).",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Category Summary",
            description:
              "A clear overview of the creative services and deliverables in this category.",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "tools",
            label: "Key Tools & Software",
            description:
              "Add software or techniques used (e.g. Blender, 3ds Max, Photoshop, CorelDRAW).",
            list: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon Name (Optional)",
            description:
              "Lucide icon to display beside this category (e.g. Boxes, Sparkles, Wand2, Package, Palette).",
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug (Advanced / Auto-generated)",
            description: "Web address identifier for this category's page (e.g. 3d-modeling).",
          },
          {
            type: "number",
            name: "sortOrder",
            label: "Display Order Number (Optional)",
            description: "Controls the order on the homepage services grid (e.g. 1 for first).",
          },
        ],
      },
      {
        name: "workItem",
        label: "Work Items (Gallery)",
        path: "content/work-items",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => {
              const title = values?.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
              return title || `work-item-${Date.now()}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            description:
              "Give this work item a clear name (e.g. 3D Modeling Exhibit 01 or Luxury Perfume Bottle Render).",
            isTitle: true,
            required: true,
          },
          {
            type: "reference",
            name: "category",
            label: "Which category does this belong to?",
            description:
              "Select which category folder this project should be grouped under from the dropdown.",
            collections: ["category"],
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Upload or choose a photo of this project",
            description:
              "Click to upload a high-resolution photo, 3D render, or graphic design image for this exhibit.",
            required: true,
          },
          {
            type: "string",
            name: "alt",
            label: "Image Description for Accessibility (Alt Text)",
            description:
              "Short description of what appears in the visual for search engines and accessibility.",
          },
          {
            type: "string",
            name: "description",
            label: "Custom Project Notes (Optional)",
            description:
              "Leave empty to use the category's standard description, or write a custom summary.",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "tech",
            label: "Specific Tools Used (Optional)",
            description:
              "Specific tools used for this project (defaults to category tools if left blank).",
            list: true,
          },
        ],
      },
      {
        name: "siteSection",
        label: "Site Sections & Text",
        path: "content/site-sections",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        templates: [
          {
            name: "hero",
            label: "Hero & Banner Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Top Eyebrow Text",
                description:
                  "Small tagline displayed above the main heading (e.g. Gen91Studio — Independent Design House).",
              },
              {
                type: "string",
                name: "headingLine1",
                label: "Main Heading Line 1",
                description: "First line of the big homepage title (e.g. VISUALS THAT).",
              },
              {
                type: "string",
                name: "headingHighlight",
                label: "Highlighted Heading Text",
                description: "Colored/accented text in the title (e.g. STAND OUT).",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Hero Subtitle Description",
                description: "Introductory paragraph below the main headline.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "locationText",
                label: "Location Tagline",
                description:
                  "Side banner location text (e.g. Based in Mumbai, Maharashtra, India).",
              },
              {
                type: "image",
                name: "profileImage",
                label: "Hero Profile Picture",
                description: "Portrait photo shown on the right side of the hero.",
              },
              {
                type: "number",
                name: "badgeYears",
                label: "Experience Badge Number",
                description: "Number shown in the glowing experience badge (e.g. 10).",
              },
              {
                type: "string",
                name: "badgeYearsText",
                label: "Experience Badge Top Label",
                description: "Small top text in badge (e.g. Years of).",
              },
              {
                type: "string",
                name: "badgeCraftText",
                label: "Experience Badge Bottom Label",
                description: "Small bottom text in badge (e.g. Creative Craft).",
              },
            ],
          },
          {
            name: "about",
            label: "About Section & Stats",
            fields: [
              {
                type: "string",
                name: "label",
                label: "Section Small Label",
                description: "Small label at top of section (e.g. About Gen91studio).",
              },
              {
                type: "string",
                name: "titleLine1",
                label: "About Heading",
                description: "First part of the about heading (e.g. A decade turning).",
              },
              {
                type: "string",
                name: "titleHighlight",
                label: "Highlighted Heading Words",
                description: "Accented words in the about heading (e.g. briefs into brands).",
              },
              {
                type: "string",
                name: "paragraphs",
                label: "About Paragraphs",
                description:
                  "Add, edit, or reorder the paragraphs explaining your studio's story and craft.",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "stats",
                label: "Key Stats Counter Cards",
                description: "The 4 counter boxes highlighting your studio achievements.",
                list: true,
                fields: [
                  {
                    type: "number",
                    name: "value",
                    label: "Stat Number",
                    description: "Numerical value that counts up (e.g. 10, 100, 50).",
                  },
                  {
                    type: "string",
                    name: "suffix",
                    label: "Symbol Suffix",
                    description: "Symbol attached after number (e.g. + or %).",
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Stat Label Text",
                    description:
                      "Description below the number (e.g. Years Experience, Happy Clients).",
                  },
                ],
              },
            ],
          },
          {
            name: "skills",
            label: "Skills & Expertise Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Section Eyebrow",
                description: "Small header label (e.g. Skills & Expertise).",
              },
              {
                type: "string",
                name: "title",
                label: "Heading First Part",
                description: "First part of section title (e.g. Craft, technology, and).",
              },
              {
                type: "string",
                name: "titleHighlight",
                label: "Heading Highlighted Part",
                description: "Accented title words (e.g. ideas in motion).",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
                description: "Introductory paragraph explaining your competencies.",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "skills",
                label: "Software & Tools Proficiency Bars",
                description: "List software tools with proficiency percentages (0-100).",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Software / Tool Name",
                    description: "e.g. Adobe Photoshop, Blender, Autodesk 3ds max.",
                  },
                  {
                    type: "number",
                    name: "level",
                    label: "Proficiency Percentage (0 to 100)",
                    description: "Percentage width of the animated progress bar.",
                  },
                ],
              },
              {
                type: "object",
                name: "expertise",
                label: "Design Disciplines Proficiency Bars",
                description: "List design specialities with proficiency percentages (0-100).",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Design Discipline Name",
                    description: "e.g. Graphic Design, Brand Identity Design, 3D Visualisation.",
                  },
                  {
                    type: "number",
                    name: "level",
                    label: "Proficiency Percentage (0 to 100)",
                    description: "Percentage width of the animated progress bar.",
                  },
                ],
              },
            ],
          },
          {
            name: "experience",
            label: "Experience Timeline Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Section Eyebrow",
                description: "e.g. Experience",
              },
              {
                type: "string",
                name: "title",
                label: "Heading First Part",
                description: "e.g. Ten years,",
              },
              {
                type: "string",
                name: "titleHighlight",
                label: "Heading Highlighted Words",
                description: "e.g. ten studios",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Timeline Subtitle",
                description: "Brief summary paragraph above the career timeline.",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "experience",
                label: "Work Experience Timeline Cards",
                description: "Chronological list of career positions and design studios.",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "company",
                    label: "Company / Studio Name",
                    description: "e.g. Remi Group, Adorn India, Geo Lighting.",
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Role / Title",
                    description: "e.g. Senior 3D Designer & Graphic Designer.",
                  },
                  {
                    type: "string",
                    name: "duration",
                    label: "Duration / Period",
                    description: "e.g. Ongoing, 2 Years, 2025 | 6 Months.",
                  },
                  {
                    type: "string",
                    name: "achievement",
                    label: "Key Achievements & Summary",
                    description: "Describe the responsibilities and major projects delivered.",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            name: "testimonials",
            label: "Client Testimonials Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Section Eyebrow",
                description: "e.g. Testimonials",
              },
              {
                type: "string",
                name: "title",
                label: "Heading First Part",
                description: "e.g. What clients",
              },
              {
                type: "string",
                name: "titleHighlight",
                label: "Heading Highlighted Word",
                description: "e.g. say",
              },
              {
                type: "object",
                name: "testimonials",
                label: "Client Reviews",
                description: "Quotes from clients, founders, and marketing heads.",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Client Name",
                    description: "e.g. Rahul Shetty, Priya Nair.",
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Client Role & Company",
                    description: "e.g. Marketing Head, Industrial Group.",
                  },
                  {
                    type: "string",
                    name: "quote",
                    label: "Client Review Quote",
                    description: "The full text of the endorsement.",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "number",
                    name: "rating",
                    label: "Star Rating (1 to 5)",
                    description: "Number of stars to display (usually 5).",
                  },
                ],
              },
            ],
          },
          {
            name: "resume",
            label: "Curriculum Vitae / Resume",
            fields: [
              {
                type: "string",
                name: "name",
                label: "Full Name",
                description: "Name displayed at top of the resume document.",
              },
              {
                type: "string",
                name: "headline",
                label: "Professional Headline",
                description: "e.g. SENIOR 3D & GRAPHIC DESIGNER | 10+ YEARS EXPERIENCE.",
              },
              {
                type: "string",
                name: "contactLine",
                label: "Contact Information Line",
                description: "Address, phone, email summary line.",
              },
              {
                type: "string",
                name: "summary",
                label: "Professional Summary",
                description:
                  "Comprehensive summary of experience, capabilities, and software mastery.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "coreCompetencies",
                label: "Core Competencies",
                description: "List of design and technical competencies.",
                list: true,
              },
              {
                type: "object",
                name: "experience",
                label: "Full Professional Experience",
                description: "Detailed job history entries.",
                list: true,
                fields: [
                  { type: "string", name: "role", label: "Job Role / Title" },
                  { type: "string", name: "company", label: "Company & Location" },
                  { type: "string", name: "duration", label: "Duration" },
                  {
                    type: "string",
                    name: "bullets",
                    label: "Bullet Points",
                    description: "Key responsibilities and outcomes.",
                    list: true,
                  },
                ],
              },
              {
                type: "object",
                name: "freelanceExperience",
                label: "Freelance & Consulting Experience",
                description: "Ongoing and freelance client projects.",
                list: true,
                fields: [
                  { type: "string", name: "role", label: "Role / Project Type" },
                  { type: "string", name: "company", label: "Client / Company Name" },
                  { type: "string", name: "duration", label: "Duration" },
                  {
                    type: "string",
                    name: "bullets",
                    label: "Bullet Points",
                    list: true,
                  },
                ],
              },
              {
                type: "object",
                name: "technicalSkills",
                label: "Technical Skills Breakdown",
                description: "Grouped skills for the CV table.",
                fields: [
                  {
                    type: "string",
                    name: "threeDAndRendering",
                    nameOverride: "3D & Rendering",
                    label: "3D & Rendering Software",
                    description: "e.g. Autodesk 3ds Max, V-Ray, Corona Renderer.",
                  },
                  {
                    type: "string",
                    name: "graphicDesign",
                    nameOverride: "Graphic Design",
                    label: "Graphic Design Software",
                    description: "e.g. CorelDRAW, Adobe Photoshop.",
                  },
                  {
                    type: "string",
                    name: "video",
                    nameOverride: "Video",
                    label: "Video Editing Tools",
                    description: "e.g. Adobe Premiere Pro.",
                  },
                  {
                    type: "string",
                    name: "additional",
                    nameOverride: "Additional",
                    label: "Additional Skills",
                    description: "e.g. Product Photography, AI Tools, Storyboarding, Print Prep.",
                  },
                ],
              },
              {
                type: "object",
                name: "education",
                label: "Education & Qualifications",
                description: "Degrees, diplomas, and high school credentials.",
                list: true,
                fields: [
                  { type: "string", name: "degree", label: "Degree / Course Name" },
                  { type: "string", name: "institution", label: "University / Institute Name" },
                ],
              },
              {
                type: "string",
                name: "languages",
                label: "Languages Spoken",
                description:
                  "e.g. Marathi — Native, Hindi — Fluent, English — Working Proficiency.",
                list: true,
              },
            ],
          },
          {
            name: "contact",
            label: "Contact Details & Socials",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Section Eyebrow",
                description: "e.g. Contact",
              },
              {
                type: "string",
                name: "title",
                label: "Heading First Part",
                description: "e.g. Let's build something",
              },
              {
                type: "string",
                name: "titleHighlight",
                label: "Heading Highlighted Word",
                description: "e.g. memorable",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle Prompt",
                description: "Encouraging call to action message.",
              },
              {
                type: "string",
                name: "email",
                label: "Email Address",
                description: "Primary project inquiry email.",
              },
              {
                type: "string",
                name: "phone",
                label: "Phone Number",
                description: "Direct phone contact.",
              },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp Chat Link",
                description: "Direct WhatsApp click-to-chat URL (e.g. https://wa.me/918999901362).",
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn Profile URL",
                description: "Full URL to your LinkedIn profile.",
              },
              {
                type: "string",
                name: "location",
                label: "Studio Location / Address",
                description: "Display address for the footer and contact card.",
              },
            ],
          },
          {
            name: "navigation",
            label: "Navigation Menu Links",
            fields: [
              {
                type: "object",
                name: "links",
                label: "Navigation Menu Items",
                description: "Links shown in the top navbar and footer.",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Menu Label",
                    description:
                      "Text shown on the menu button (e.g. Studio, Expertise, Work, Contact).",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link URL / Hash",
                    description: "Target URL (e.g. /#about or /#services).",
                  },
                  {
                    type: "string",
                    name: "hash",
                    label: "Scroll Section ID",
                    description:
                      "Section HTML ID for smooth scrolling (e.g. about, skills, services, contact).",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
