#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Terminaldan papka nomini olish
const folderName = process.argv[2];

if (!folderName) {
  console.log(
    "Iltimos, papka nomini kiriting. Masalan: `npx node create-folder myFolder`"
  );
  process.exit(1);
}

// Yangi papka yaratish
const folderPath = path.join(process.cwd(), folderName);
fs.mkdirSync(folderPath, { recursive: true });

// Papkaning ichida js va css fayllar yaratish
const jsFilePath = path.join(folderPath, `${folderName}.js`);
const cssFilePath = path.join(folderPath, "style.module.scss");

// js va css fayllarni yozish
fs.writeFileSync(
  jsFilePath,
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

console.log(`Papka va fayllar yaratildi: ${folderName}`);
