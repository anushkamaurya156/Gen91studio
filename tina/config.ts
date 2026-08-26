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
                values?.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
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
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL identifier)",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "tools",
            label: "Tools & Software",
            list: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Lucide Icon Name",
          },
          {
            type: "number",
            name: "sortOrder",
            label: "Sort Order",
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
              return (
                values?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
                `work-item-${Date.now()}`
              );
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title / Exhibit Name",
            isTitle: true,
            required: true,
          },
          {
            type: "reference",
            name: "category",
            label: "Category (Dropdown Picker)",
            collections: ["category"],
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Work Image (Upload / Select)",
            required: true,
          },
          {
            type: "string",
            name: "alt",
            label: "Image Alt Text",
          },
          {
            type: "string",
            name: "description",
            label: "Custom Description (optional)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "tech",
            label: "Custom Tech / Tools Tags",
            list: true,
          },
          {
            type: "string",
            name: "fileName",
            label: "File Name (optional reference)",
          },
        ],
      },
      {
        name: "siteSection",
        label: "Site Sections",
        path: "content/site-sections",
        format: "json",
        templates: [
          {
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "headingLine1", label: "Heading Line 1" },
              { type: "string", name: "headingHighlight", label: "Heading Highlighted Text" },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: { component: "textarea" },
              },
              { type: "string", name: "locationText", label: "Location Text" },
              { type: "image", name: "profileImage", label: "Profile Picture" },
              { type: "number", name: "badgeYears", label: "Badge Years Number" },
              { type: "string", name: "badgeYearsText", label: "Badge Years Label" },
              { type: "string", name: "badgeCraftText", label: "Badge Craft Label" },
            ],
          },
          {
            name: "about",
            label: "About Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleHighlight", label: "Title Highlighted Text" },
              {
                type: "string",
                name: "paragraphs",
                label: "About Paragraphs",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "stats",
                label: "Key Stats Counter",
                list: true,
                fields: [
                  { type: "number", name: "value", label: "Value (Number)" },
                  { type: "string", name: "suffix", label: "Suffix (e.g. +)" },
                  { type: "string", name: "label", label: "Stat Label" },
                ],
              },
            ],
          },
          {
            name: "skills",
            label: "Skills & Expertise Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "titleHighlight", label: "Title Highlight" },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "skills",
                label: "Software & Tools Skills",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Skill Name" },
                  { type: "number", name: "level", label: "Proficiency (0-100)" },
                ],
              },
              {
                type: "object",
                name: "expertise",
                label: "Design Disciplines & Expertise",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Expertise Name" },
                  { type: "number", name: "level", label: "Proficiency (0-100)" },
                ],
              },
            ],
          },
          {
            name: "experience",
            label: "Experience Timeline Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "titleHighlight", label: "Title Highlight" },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "experience",
                label: "Work Experiences",
                list: true,
                fields: [
                  { type: "string", name: "company", label: "Company Name" },
                  { type: "string", name: "role", label: "Role / Designation" },
                  { type: "string", name: "duration", label: "Duration / Period" },
                  {
                    type: "string",
                    name: "achievement",
                    label: "Key Achievements",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            name: "testimonials",
            label: "Testimonials Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "titleHighlight", label: "Title Highlight" },
              {
                type: "object",
                name: "testimonials",
                label: "Client Testimonials",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Client Name" },
                  { type: "string", name: "title", label: "Client Role / Company" },
                  { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
                  { type: "number", name: "rating", label: "Star Rating (1-5)" },
                ],
              },
            ],
          },
          {
            name: "resume",
            label: "Curriculum Vitae / Resume",
            fields: [
              { type: "string", name: "name", label: "Candidate Name" },
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "contactLine", label: "Contact Info Line" },
              {
                type: "string",
                name: "summary",
                label: "Professional Summary",
                ui: { component: "textarea" },
              },
              { type: "string", name: "coreCompetencies", label: "Core Competencies", list: true },
              {
                type: "object",
                name: "experience",
                label: "Full Work Experience",
                list: true,
                fields: [
                  { type: "string", name: "role", label: "Role" },
                  { type: "string", name: "company", label: "Company" },
                  { type: "string", name: "duration", label: "Duration" },
                  { type: "string", name: "bullets", label: "Bullet Points", list: true },
                ],
              },
              {
                type: "object",
                name: "freelanceExperience",
                label: "Freelance Experience",
                list: true,
                fields: [
                  { type: "string", name: "role", label: "Role" },
                  { type: "string", name: "company", label: "Company" },
                  { type: "string", name: "duration", label: "Duration" },
                  { type: "string", name: "bullets", label: "Bullet Points", list: true },
                ],
              },
              {
                type: "object",
                name: "technicalSkills",
                label: "Technical Skills",
                fields: [
                  {
                    type: "string",
                    name: "threeDAndRendering",
                    nameOverride: "3D & Rendering",
                    label: "3D & Rendering",
                  },
                  {
                    type: "string",
                    name: "graphicDesign",
                    nameOverride: "Graphic Design",
                    label: "Graphic Design",
                  },
                  { type: "string", name: "video", nameOverride: "Video", label: "Video Editing" },
                  {
                    type: "string",
                    name: "additional",
                    nameOverride: "Additional",
                    label: "Additional Skills",
                  },
                ],
              },
              {
                type: "object",
                name: "education",
                label: "Education",
                list: true,
                fields: [
                  { type: "string", name: "degree", label: "Degree" },
                  { type: "string", name: "institution", label: "Institution" },
                ],
              },
              { type: "string", name: "languages", label: "Languages", list: true },
            ],
          },
          {
            name: "contact",
            label: "Contact Information",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "titleHighlight", label: "Title Highlight" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "email", label: "Email Address" },
              { type: "string", name: "phone", label: "Phone Number" },
              { type: "string", name: "whatsapp", label: "WhatsApp Link" },
              { type: "string", name: "linkedin", label: "LinkedIn Profile Link" },
              { type: "string", name: "location", label: "Location / Address" },
            ],
          },
          {
            name: "navigation",
            label: "Navigation Links",
            fields: [
              {
                type: "object",
                name: "links",
                label: "Nav Links",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Link Label" },
                  { type: "string", name: "href", label: "Link Href" },
                  { type: "string", name: "hash", label: "Section Hash" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
