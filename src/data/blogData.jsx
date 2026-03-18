// src/data/blogData.jsx
import React from 'react';
import { Baby, OrangeSlice, Footprints, Shapes, Backpack, Books } from '@phosphor-icons/react';

export const categories = [
  { id: 'neonatal', age: 'Neonatal', range: '0–28 Hari', icon: <Baby size={32} weight="duotone" />, color: 'bg-primary/10', iconColor: 'text-primary' },
  { id: 'bayi', age: 'Bayi', range: '0–11 Bulan', icon: <OrangeSlice size={32} weight="duotone" />, color: 'bg-secondary/20', iconColor: 'text-green-600' },
  { id: 'batita', age: 'Batita', range: '1–3 Tahun', icon: <Footprints size={32} weight="duotone" />, color: 'bg-accent/20', iconColor: 'text-orange-400' },
  { id: 'balita', age: 'Balita', range: '3–5 Tahun', icon: <Shapes size={32} weight="duotone" />, color: 'bg-pink-100', iconColor: 'text-pink-400' },
  { id: 'prasekolah', age: 'Prasekolah', range: '5–6 Tahun', icon: <Backpack size={32} weight="duotone" />, color: 'bg-purple-100', iconColor: 'text-purple-400' },
  { id: 'sekolah', age: 'Sekolah', range: '6–10 Tahun', icon: <Books size={32} weight="duotone" />, color: 'bg-blue-100', iconColor: 'text-blue-400' },
];

export const allArticles = [
  // --- NEONATAL ---
  { 
    id: 1, 
    categoryId: 'neonatal', 
    title: "Perawatan Tali Pusar Bayi Baru Lahir", 
    author: "dr. Siska", 
    date: "2 Jam lalu", 
    img: "https://i.pinimg.com/1200x/06/fc/3b/06fc3b59aa4144bf6185b1058ade8534.jpg",
    desc: "Tali pusar bayi baru lahir memerlukan perawatan khusus agar tetap kering dan terhindar dari infeksi. Moms tidak perlu panik, kuncinya adalah kebersihan.",
    steps: ["Cuci tangan sebelum menyentuh", "Gunakan air matang", "Biarkan kering alami", "Lipat popok di bawah pusar"]
  },
  { 
    id: 2, 
    categoryId: 'neonatal', 
    title: "Teknik Menggendong M-Shape yang Aman", 
    author: "dr. Budi", 
    date: "5 Jam lalu", 
    img: "https://i.pinimg.com/1200x/07/17/d5/0717d50e2b6decf1ec10351081a0818b.jpg",
    desc: "Posisi M-Shape adalah posisi paling ergonomis untuk mendukung pertumbuhan tulang panggul bayi neonatal.",
    steps: ["Pastikan lutut lebih tinggi dari bokong", "Punggung membentuk huruf C", "Wajah bayi selalu terlihat", "Gunakan gendongan kain yang nyaman"]
  },

  // --- BAYI ---
  { 
    id: 3, 
    categoryId: 'bayi', 
    title: "Jadwal MPASI Pertama: Menu 4 Bintang", 
    author: "Akil Girtzi, S.Gz", 
    date: "1 hari lalu", 
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=500&auto=format&fit=crop",
    desc: "Memasuki usia 6 bulan, kebutuhan nutrisi bayi meningkat. Menu 4 Bintang memastikan gizi lengkap terpenuhi.",
    steps: ["Karbohidrat sebagai energi", "Protein hewani untuk zat besi", "Protein nabati tambahan", "Sayur sebagai perkenalan serat"]
  },
  { 
    id: 4, 
    categoryId: 'bayi', 
    title: "Stimulasi Tummy Time Agar Bayi Cepat Merangkak", 
    author: "dr. Sari", 
    date: "2 hari lalu", 
    img: "https://i.pinimg.com/1200x/ca/85/3c/ca853c1c96ffd839c8fa10c99cbf2ddf.jpg",
    desc: "Tummy time melatih otot leher dan bahu bayi. Lakukan secara rutin sejak bayi pulang ke rumah.",
    steps: ["Letakkan di permukaan datar", "Gunakan mainan berwarna cerah", "Mulai dengan 2-3 menit saja", "Ajak bayi berinteraksi saat tengkurap"]
  },

  // --- BATITA ---
  { 
    id: 5, 
    categoryId: 'batita', 
    title: "Anak Pilih-pilih Makanan? Ini Solusinya", 
    author: "dr. Budi", 
    date: "3 hari lalu", 
    img: "https://i.pinimg.com/1200x/a2/a2/9e/a2a29e19082df71283d05328a9e4cc8e.jpg",
    desc: "Fase Picky Eater sering terjadi pada batita. Moms perlu kreativitas ekstra agar nutrisi tetap terjaga.",
    steps: ["Jangan paksa anak makan", "Sajikan porsi kecil", "Hias makanan jadi menarik", "Makan bersama keluarga"]
  },
  { 
    id: 6, 
    categoryId: 'batita', 
    title: "Tips Melatih Potty Training Tanpa Stres", 
    author: "dr. Siska", 
    date: "4 hari lalu", 
    img: "https://i.pinimg.com/1200x/76/9f/54/769f54e193b9920ee4eb66fe900f44f0.jpg",
    desc: "Melatih anak buang air di toilet membutuhkan kesabaran dan waktu yang tepat sesuai kesiapan si kecil.",
    steps: ["Kenalkan alat potty", "Gunakan celana kain biasa", "Apresiasi saat berhasil", "Jangan marahi jika mengompol"]
  },

  // --- BALITA ---
  { 
    id: 7, 
    categoryId: 'balita', 
    title: "Aktivitas Motorik Kasar di Rumah", 
    author: "dr. Sari", 
    date: "6 hari lalu", 
    img: "https://i.pinimg.com/736x/bb/80/a1/bb80a1414c9bd772b18522600ea795b6.jpg",
    desc: "Melatih motorik kasar membantu balita mengontrol gerakan tubuh dan keseimbangan.",
    steps: ["Bermain jalur selotip", "Lompat bantal", "Lempar bola ke keranjang", "Menari bersama"]
  },
  { 
    id: 8, 
    categoryId: 'balita', 
    title: "Membangun Kepercayaan Diri Lewat Tugas Kecil", 
    author: "dr. Budi", 
    date: "1 minggu lalu", 
    img: "https://i.pinimg.com/736x/37/d3/7a/37d37a9c7b678ef411364ae7942ec693.jpg",
    desc: "Balita senang membantu. Berikan tugas sederhana agar mereka merasa berharga dan mandiri.",
    steps: ["Merapiakn mainan sendiri", "Menyiram tanaman", "Menaruh baju kotor", "Menyiapkan piring makan"]
  },

  // --- PRASEKOLAH ---
  { 
    id: 9, 
    categoryId: 'prasekolah', 
    title: "Cara Menyiapkan Mental Anak Masuk TK", 
    author: "dr. Siska", 
    date: "1 minggu lalu", 
    img: "https://i.pinimg.com/736x/5b/69/ac/5b69ac36e07fafc334a86afe754f2745.jpg",
    desc: "Sekolah pertama adalah langkah besar. Bantu si kecil agar tidak merasa cemas di hari pertamanya.",
    steps: ["Ceritakan hal seru di sekolah", "Kunjungi sekolah sebelumnya", "Siapkan alat tulis bersama", "Latih kemandirian makan"]
  },
  { 
    id: 10, 
    categoryId: 'prasekolah', 
    title: "Mengenal Warna dan Bentuk Lewat Seni", 
    author: "dr. Sari", 
    date: "2 minggu lalu", 
    img: "https://i.pinimg.com/1200x/ae/ff/f8/aefff8848b27e388b9754310f5930eb5.jpg",
    desc: "Belajar tidak harus membosankan. Gunakan cat air dan kertas untuk eksplorasi kreativitas.",
    steps: ["Gunakan jari untuk melukis", "Campurkan warna primer", "Gunting kertas berbagai bentuk", "Tempelkan menjadi kolase"]
  },

  // --- SEKOLAH ---
  { 
    id: 11, 
    categoryId: 'sekolah', 
    title: "Menjaga Kesehatan Mata di Era Digital", 
    author: "dr. Budi", 
    date: "3 minggu lalu", 
    img: "https://i.pinimg.com/1200x/33/15/0d/33150dcf499286cf28a038df19b8bbde.jpg",
    desc: "Anak usia sekolah sering terpapar layar gadget. Moms harus membatasi durasi agar mata tidak cepat lelah.",
    steps: ["Aturan 20-20-20", "Batasi screen time 1 jam/hari", "Pastikan cahaya cukup", "Ajak main di luar ruangan"]
  },
  { 
    id: 12, 
    categoryId: 'sekolah', 
    title: "Pentingnya Bekal Sehat Dari Rumah", 
    author: "Akil Girtzi, S.Gz", 
    date: "1 bulan lalu", 
    img: "https://i.pinimg.com/736x/e6/39/64/e63964d0edd620466654c145bef34bfc.jpg",
    desc: "Jajan sembarangan bisa berbahaya. Bekal bergizi menjamin energi anak tetap stabil selama belajar.",
    steps: ["Bawa air putih", "Pastikan ada sayur dan buah", "Kurangi makanan kemasan", "Gunakan wadah yang menarik"]
  },
];