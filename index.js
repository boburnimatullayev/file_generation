#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Terminaldan papka nomini olish
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Sizning proyekt turini tanlang (ts/react): ",
  function (projectType) {
    const folderName = process.argv[2];
    if (!folderName) {
      console.log(
        "Iltimos, papka nomini kiriting. Masalan: `npx github:<username>/<repository-name> myFolder`"
      );
      rl.close();
      return;
    }

    // Papka nomiga qo'shimcha qo'shish
    const suffix = projectType === "ts" ? "-ts" : "-react";
    const finalFolderName = `${folderName}${suffix}`;

    // Yangi papka yaratish
    const folderPath = path.join(process.cwd(), finalFolderName);
    fs.mkdirSync(folderPath, { recursive: true });

    // Papkaning ichida js yoki ts va css fayllar yaratish
    const fileExtension = projectType === "ts" ? "ts" : "js";
    const mainFilePath = path.join(folderPath, `index.${fileExtension}`);
    const cssFilePath = path.join(folderPath, "style.css");

    // js yoki ts va css fayllarni yozish
    fs.writeFileSync(
      mainFilePath,
      `
import React from 'react'
import styles from "./style.module.scss"

const ${folderName} = () => {
  return (
    <div>${folderName}</div>
  )
}

export default ${folderName}`
    );
    fs.writeFileSync(cssFilePath, "/* CSS kodlar shu yerda */");

    console.log(`Papka va fayllar yaratildi: ${finalFolderName}`);

    rl.close();
  }
);
