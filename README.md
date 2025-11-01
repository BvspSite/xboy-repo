Ini README-nya, bisa langsung copy-paste ke file `README.md` di repo GitHub kamu:  

# XBOY HEX - Portfolio Website

XBOY HEX adalah proyek website portfolio yang dikembangkan menggunakan **Vite + React + TypeScript**, serta didukung oleh **Tailwind CSS** untuk styling.

## 🔧 Langkah-langkah Pembuatan

### 1. Inisialisasi Proyek
npm create vite@latest portofabrilio --template react-ts
cd portofabrilio
npm install


### 2. Konfigurasi Vite dan Tailwind CSS
- Tambahkan **Tailwind CSS**:
  
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

- Edit `tailwind.config.js`:
  
  module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  
- Tambahkan Tailwind ke `index.css`:
  
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### 3. Pengembangan dan Testing
Jalankan perintah berikut untuk melihat hasilnya di browser lokal:

npm run dev


### 4. Build dan Deploy ke GitHub Pages
- Tambahkan konfigurasi `vite.config.ts`:
  
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    base: "./",
  });

- Build proyek:
  
  npm run build
  
- Push ke GitHub, lalu aktifkan **GitHub Pages** dari branch `gh-pages`.



## 🚀 Teknologi yang Digunakan
- **React** (dengan Vite)
- **TypeScript**
- **Tailwind CSS**
- **GitHub Pages** (untuk hosting)

## 📌 Live Demo
Kunjungi: https://bvspsite.github.io/Fabrilio/

---

