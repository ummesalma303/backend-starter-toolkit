#!/usr/bin/env node

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Template path
const templatePath = path.resolve(__dirname, "../templates");

// questions
const questions = [
  {
    type: "input",
    name: "projectName",
    message: "Enter your project name:",
    default: "my-app",
    validate: (input) =>
      /^[a-z0-9-_]+$/.test(input) ||
      "Project name must be lowercase and URL friendly",
  },
  {
    type: "list",
    name: "packageManager",
    message: "Select a package manager:",
    choices: ["npm", "yarn", "pnpm"],
    default: "npm",
  },
];

async function init() {
  const { projectName, packageManager } = await inquirer.prompt(questions);

  const targetPath = path.join(process.cwd(), projectName);

  // ❌ Folder exists check
  if (fs.existsSync(targetPath)) {
    console.log("❌ Folder already exists!");
    process.exit(1);
  }

  console.log(`\n📁 Creating project "${projectName}"...\n`);

  try {
    // 1️⃣ Create directory
    fs.mkdirSync(targetPath, { recursive: true });

    // 2️⃣ Copy template
    fs.cpSync(templatePath, targetPath, {
      recursive: true,
      filter: (src) => {
        const baseName = path.basename(src);
        return !["node_modules", "dist", "logs", ".git"].includes(baseName);
      },
    });

    // 3️⃣ Rename gitignore
    const oldGit = path.join(targetPath, "gitignore.template");
    if (fs.existsSync(oldGit)) {
      fs.renameSync(oldGit, path.join(targetPath, ".gitignore"));
    }

    // 4️⃣ Update package.json
    const pkgPath = path.join(targetPath, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

      pkg.name = projectName;

      // remove fixed package manager
      delete pkg.packageManager;

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    }

    // 5️⃣ .env setup
    const envExample = path.join(targetPath, ".env.example");
    if (fs.existsSync(envExample)) {
      fs.copyFileSync(envExample, path.join(targetPath, ".env"));
    }

    console.log("✅ Template files copied successfully.\n");

    // 🎯 package manager specific commands
    let installCmd = "";
    let devCmd = "";

    if (packageManager === "npm") {
      installCmd = "npm install";
      devCmd = "npm run dev";
    }

    if (packageManager === "yarn") {
      installCmd = "yarn";
      devCmd = "yarn dev";
    }

    if (packageManager === "pnpm") {
      installCmd = "pnpm install";
      devCmd = "pnpm dev";
    }

    // 🚀 Final Instructions (Clean UX)
    console.log("\n🚀 Project created successfully!");
    console.log("=====================================");
    console.log("👉 Next steps:\n");

    console.log(`1. Go to project folder:`);
    console.log(`   cd ${projectName}\n`);

    console.log(`2. Install dependencies:`);
    console.log(`   ${installCmd}\n`);

    console.log(`3. Start development server:`);
    console.log(`   ${devCmd}\n`);

  } catch (err) {
    console.error("\n❌ Error creating project:");
    console.error(err.message);
    process.exit(1);
  }
}

init();