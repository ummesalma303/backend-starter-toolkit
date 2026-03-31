#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "Enter your project name:",
    default: "my-app"
  }
];

const answers = await inquirer.prompt(questions);
const projectName = answers.projectName;

const targetPath = path.join(process.cwd(), projectName);

// template path
const __dirname = new URL('.', import.meta.url).pathname;
const templatePath = path.join(__dirname, "../templates");

// check exists
if (fs.existsSync(targetPath)) {
  console.log("❌ Folder already exists!");
  process.exit(1);
}

console.log(`📁 Creating project "${projectName}"...`);

// create folder
fs.mkdirSync(targetPath, { recursive: true });

// copy template
fs.cpSync(templatePath, targetPath, {
  recursive: true,
  filter: (src) => {
    const ignore = ["node_modules", "dist", "logs"];
    return !ignore.some((item) => src.includes(item));
  }
});

// env setup
const envExamplePath = path.join(targetPath, ".env.example");
const envPath = path.join(targetPath, ".env");

if (fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log("⚙️ .env created");
}

// detect package manager
const agent = process.env.npm_config_user_agent || "";

const pkgManager = agent.includes("pnpm")
  ? "pnpm"
  : agent.includes("yarn")
  ? "yarn"
  : "npm";

console.log("📦 Installing dependencies...");

try {
  execSync(`${pkgManager} install`, {
    cwd: targetPath,
    stdio: "inherit"
  });
} catch (err) {
  console.log("❌ Installation failed!");
  process.exit(1);
}

// success
console.log("\n🚀 Project ready!");
console.log(`cd ${projectName}`);
console.log(`${pkgManager} run dev`);