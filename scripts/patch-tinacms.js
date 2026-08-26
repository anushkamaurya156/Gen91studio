import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(
  __dirname,
  "../node_modules/@tinacms/graphql/dist/index.js"
);

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, "utf8");
  const target = `const items = await fg(
      path7.join(basePath, "**", \`/*.\${extension}\`).replace(/\\\\/g, "/"),
      {
        dot: true,
        ignore: ["**/node_modules/**"]
      }
    );`;

  const replacement = `const escapedBasePath = fg.escapePath(normalize(basePath));
    const items = await fg(
      \`\${escapedBasePath}/**/*.\${extension}\`,
      {
        dot: true,
        ignore: ["**/node_modules/**"]
      }
    );`;

  if (content.includes("path7.join(basePath, \"**\", `/*.${extension}`)")) {
    content = content.replace(
      /const items = await fg\([\s\S]*?path7\.join\(basePath, "\*\*", `\/\*\.\$\{extension\}`\)[\s\S]*?ignore: \["\*\*\/node_modules\/\*\*"\][\s\S]*?\}\s*\);/,
      replacement
    );
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Patched @tinacms/graphql for Windows path compatibility.");
  }
}
