#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Terminaldan papka nomini olish
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Iltimos, papka nomini kiriting: ", function (folderName) {
  if (!folderName) {
    console.log("Papka nomi kiritilmadi. Iltimos, qayta urinib ko'ring.");
    rl.close();
    return;
  }

  // Foydalanuvchiga variantlarni ko'rsatish
  console.log("Proyekt turini tanlang:");
  console.log("1. TypeScript (ts)");
  console.log("2. React (js)");

  rl.question("Tanlovingizni kiriting (1 yoki 2): ", function (choice) {
    let projectType;
    if (choice === "1") {
      projectType = "ts";
    } else if (choice === "2") {
      projectType = "react";
    } else {
      console.log("Noto'g'ri tanlov. Iltimos, 1 yoki 2-ni tanlang.");
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
    const cssFilePath = path.join(folderPath, "style.module.scss");

    // js yoki ts va css fayllarni yozish
    fs.writeFileSync(
      mainFilePath,
      `
import React from 'react'
import styles from "./style.module.scss"

const ${folderName} = () => {
  return (
    <div className={styles.container}>${folderName}</div>
  )
}

export default ${folderName}`
    );
    fs.writeFileSync(cssFilePath, "/* SASS/CSS kodlar shu yerda */");

    console.log(`Papka va fayllar yaratildi: ${finalFolderName}`);

    rl.close();
  });
});
