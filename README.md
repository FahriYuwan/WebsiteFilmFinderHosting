# 🎥 FilmFinder 🎬  
<div align="center">
  <img src="https://img.shields.io/github/contributors/FahriYuwan/WebsiteFilmFinder?color=red" alt="Contributors" />
  <img src="https://img.shields.io/github/commit-activity/m/FahriYuwan/WebsiteFilmFinder?color=blue" alt="Commit Activity" />
  <img src="https://img.shields.io/github/last-commit/FahriYuwan/WebsiteFilmFinder?color=yellow" alt="Last Commit" />
  <img src="https://img.shields.io/github/license/FahriYuwan/WebsiteFilmFinder?color=orange" alt="License" />
</div>

**FilmFinder** adalah platform berbasis web untuk mencari, menilai, dan mengelola informasi tentang film, acara TV, dan konten hiburan lainnya. Terinspirasi oleh situs seperti IMDb, FilmFinder memberikan pengalaman navigasi yang mudah dan ramah pengguna.  

---

## 📚 **Deskripsi Singkat**  
FilmFinder menyediakan informasi terperinci tentang:  
- 🎞️ Film  
- 📺 Acara TV  
- 🎭 Konten hiburan lainnya  

Platform ini dirancang untuk mempermudah pengguna dalam:  
- 🔍 Menemukan film atau acara TV favorit mereka  
- ⭐ Memberikan ulasan dan penilaian  
- 📝 Menambahkan konten baru ke dalam database  

---

## ✨ **Fitur Utama**  

1. **🏠 Beranda**  
   Menampilkan daftar film dan acara TV yang sedang populer.  

2. **🔍 Detail Film/Acara TV**  
   Halaman dengan informasi lengkap seperti:  
   - Sinopsis  
   - Tanggal rilis  
   - Durasi  
   - Genre  
   - Pemeran utama  
   - Rating dan ulasan pengguna  

3. **🎛️ Pencarian dan Filter**  
   Cari berdasarkan:  
   - Judul  
   - Aktor  
   - Genre  
   - Filter berdasarkan tahun rilis, rating,  penghargaan, dan lainnya.  

4. **🔧 Manajemen Konten**  
   Admin dapat mengelola data film atau acara TV dengan mudah.  

5. **🔐 Sistem Login dan Registrasi**  
   - Akun pengguna untuk fitur yang dipersonalisasi.  
   - Login menggunakan Google atau media sosial lainnya.  
   - Fitur lupa/reset password dan konfirmasi email.  

6. **✍️ Ulasan dan Rating Pengguna**  
   Pengguna dapat memberikan rating serta menulis ulasan.  

7. **➕ Menambahkan Konten Baru**  
   Pengguna terdaftar (Writer) dapat menambahkan data film atau acara TV baru.  

8. **✅ Validasi Ulasan dan Data Baru**  
   Admin dapat menerima atau menolak ulasan dan data yang diajukan.  

---

## 🛠️ **Teknologi yang Digunakan**  
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="50" alt="ReactJS" />  
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" alt="Laravel Icon" height="50" /> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="50" alt="PostgreSQL" />  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" height="50" alt="Tailwind CSS" />  
</div>  

---

## 🖥️ **Cara Install Local (Tanpa Docker)**  

1. Install **Composer** di perangkat Anda:  
  ```bash
  composer install
  ```

2. Install dependensi **React**:  
  ```bash
  npm install
  ```

3. Salin file `.env.example` di folder `server`, ubah namanya menjadi `.env`, lalu isi sesuai konfigurasi Anda.  
  Jalankan perintah berikut untuk mendapatkan app key:  
  ```bash
  php artisan key:generate
  ```

4. Migrasikan database dan jalankan seeder (seeder untuk roles dan user):  
  ```bash
  php artisan migrate
  php artisan db:seed
  ```

5. Jalankan seeder.py untuk menambahkan data awal: 
  ```bash
  python database/python_seeders/seeder.py
  ```

6. Jalankan server Laravel dan React secara bersamaan:  
  ```bash
  php artisan serve
  npm run dev
  ```

7. Buka browser dan akses `http://127.0.0.1:8000/` untuk melihat website FilmFinder.

## 🐋 **Cara Install dengan Docker**  

1. Pastikan Docker telah terpasang di perangkat Anda.
2. Sesuaikan konfigurasi variabel DB di .env dan seeder.py.
3. Jalankan perintah berikut:
    ```bash 
    docker-compose up --build
4. Buka browser dan akses `http://localhost:8000/` untuk melihat website FilmFinder.

## ⚠️ **Catatan Penting**  
1. Ganti value menjadi "localhost" untuk variabel db_host jika ingin berjalan di lokal. Gunakan "db" untuk db_host jika berjalan di Docker.
2. Sesuaikan .env untuk fitur verify email dan login Google.
3. 📺 Tutorial Lengkap:
Akses https://www.youtube.com/watch?v=UVfBVNWVdSc untuk melihat tutorial video.

## 🤝 Kontributor
<div align="center"> <a href="https://github.com/FahriYuwan"> <img src="https://avatars.githubusercontent.com/u/130884349?v=4" width="100" alt="Fahri Yuwan" style="border-radius: 50%; border: 2px solid #ffd700;" /></a> <a href="https://github.com/RafifShabi"> <img src="https://avatars.githubusercontent.com/u/72936629?v=4" width="100" alt="Rafif Shabi Prasetyo" style="border-radius: 50%; border: 2px solid #ffd700;" /> </a> </div>
<div align="center"> <p style="color:#ffd700; font-weight: bold; font-size: 18px;">Fahri Yuwan</p> <p style="color:#ffd700; font-weight: bold; font-size: 18px;">Rafif Shabi Prasetyo</p> </div>

## 🎓 Dosen Pembimbing
<div align="center"> <a href="https://github.com/sriratnawulan123"> <img src="https://avatars.githubusercontent.com/u/148301780?v=4" width="120" alt="Sri Ratna Wulan" style="border-radius: 50%; border: 3px solid #4caf50;" /> </a> <p style="color:#ffd700; font-weight: bold; font-size: 18px;">Sri Ratna Wulan</p> </div>

## 📜 Lisensi
<div align="center"> <h3>FilmFinder ©️ [MIT License](https://opensource.org/license/MIT)</h3> </div>

## 🏢 Institusi

<div align="center">
  <img src="https://www.polban.ac.id/wp-content/uploads/2021/11/MASTER-LOGO-POLBAN-SMALL.png" height="100" alt="Polban Logo" />
</div>