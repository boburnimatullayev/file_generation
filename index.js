#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const folderName = process.argv[2];
if (!folderName) {
  console.log(
    "Iltimos, papka nomini `npx github:<username>/<repository-name> myFolder` tarzida kiriting."
  );
  process.exit(1);
}

// `inquirer` yordamida tanlov imkoniyatini yaratish
inquirer
  .prompt([
    {
      type: "list",
      name: "projectType",
      message: "Proyekt turini tanlang:",
      choices: [
        { name: "TypeScript (ts)", value: "ts" },
        { name: "React (js)", value: "react" },
      ],
    },
  ])
  .then((answers) => {
    const projectType = answers.projectType;

    // Papka nomiga qo'shimcha qo'shish

    const finalFolderName = folderName;

    // Yangi papka yaratish
    const folderPath = path.join(process.cwd(), finalFolderName);
    fs.mkdirSync(folderPath, { recursive: true });

    // Papkaning ichida js yoki ts va css fayllar yaratish
    const fileExtension = projectType === "ts" ? "ts" : "jsx";
    const mainFilePath = path.join(folderPath, `index.${fileExtension}`);
    const cssFilePath = path.join(folderPath, "style.module.scss");

    // js yoki ts va css fayllarni yozish
    fs.writeFileSync(
      mainFilePath,
      `
import React from 'react'
import styles from "./style.module.scss"

const ${folderName}${projectType ? ": React.FC " : ""} = () => {
  return (
    <div>${folderName}</div>
  )
}

export default ${folderName}`
    );
    fs.writeFileSync(cssFilePath, "/* SASS kodlar shu yerda */");

    console.log(`Papka va fayllar yaratildi: ${finalFolderName}`);
  })
  .catch((error) => {
    console.error("Xatolik yuz berdi:", error);
  });
