// src/data/blogData.jsx
import React from 'react';
// Import ikon yang konsisten dengan kategori
import { 
  Baby, 
  OrangeSlice, 
  Footprints, 
  Shapes, 
  Backpack, 
  Books,
  Stethoscope,
  Flask,
  AppleLogo,
  Brain
} from '@phosphor-icons/react';

export const categories = [
  { 
    id: 'neonatal', 
    age: 'Neonatal', 
    range: '0–28 Hari', 
    icon: <Baby size={32} weight="duotone" />, 
    color: 'bg-blue-50', 
    iconColor: 'text-blue-500' 
  },
  { 
    id: 'bayi', 
    age: 'Bayi', 
    range: '0–11 Bulan', 
    icon: <OrangeSlice size={32} weight="duotone" />, 
    color: 'bg-green-50', 
    iconColor: 'text-green-600' 
  },
  { 
    id: 'batita', 
    age: 'Batita', 
    range: '1–3 Tahun', 
    icon: <Footprints size={32} weight="duotone" />, 
    color: 'bg-orange-50', 
    iconColor: 'text-orange-400' 
  },
  { 
    id: 'balita', 
    age: 'Balita', 
    range: '3–5 Tahun', 
    icon: <Shapes size={32} weight="duotone" />, 
    color: 'bg-pink-50', 
    iconColor: 'text-pink-400' 
  },
  { 
    id: 'prasekolah', 
    age: 'Prasekolah', 
    range: '5–6 Tahun', 
    icon: <Backpack size={32} weight="duotone" />, 
    color: 'bg-purple-50', 
    iconColor: 'text-purple-400' 
  },
  { 
    id: 'sekolah', 
    age: 'Sekolah', 
    range: '6–10 Tahun', 
    icon: <Books size={32} weight="duotone" />, 
    color: 'bg-indigo-50', 
    iconColor: 'text-indigo-400' 
  },
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
    desc: "Tali pusar bayi baru lahir memerlukan perawatan khusus agar tetap kering dan terhindar dari infeksi.",
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
  { 
    id: 13, 
    categoryId: 'neonatal', 
    title: "Mengenali Tanda Bayi Kuning (Ikterus)", 
    author: "dr. Siska", 
    date: "1 hari lalu", 
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=500&auto=format&fit=crop",
    desc: "Waspadai perubahan warna kulit dan mata bayi pada minggu pertama kelahirannya.",
    steps: ["Cek di bawah cahaya terang", "Tekan lembut kulit bayi", "Perhatikan pola menyusu", "Konsultasi jika kuning sampai kaki"]
  },
  { 
    id: 14, 
    categoryId: 'neonatal', 
    title: "Pentingnya Kolostrum Bagi Kekebalan Tubuh", 
    author: "dr. Sari", 
    date: "2 hari lalu", 
    img: "https://images.unsplash.com/photo-1544126592-807daf21565c?q=80&w=500&auto=format&fit=crop",
    desc: "Tetesan pertama ASI mengandung nutrisi emas yang tidak boleh dilewatkan oleh bayi baru lahir.",
    steps: ["Lakukan IMD setelah lahir", "Sering menyusui di hari pertama", "Pastikan pelekatan benar", "Istirahat cukup bagi Moms"]
  },
  { 
    id: 25, 
    categoryId: 'neonatal', 
    title: "Pola Tidur Bayi Baru Lahir: Apa yang Normal?", 
    author: "dr. Budi", 
    date: "3 hari lalu", 
    img: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=500&auto=format&fit=crop",
    desc: "Memahami siklus tidur bayi neonatal membantu orang tua mengatur ekspektasi dan waktu istirahat.",
    steps: ["Tidur 16-18 jam sehari", "Terbangun setiap 2-3 jam", "Bedakan siang dan malam", "Ciptakan suasana tenang"]
  },
  { 
    id: 26, 
    categoryId: 'neonatal', 
    title: "Cara Memandikan Bayi Newborn Tanpa Panik", 
    author: "dr. Sari", 
    date: "4 hari lalu", 
    img: "https://images.unsplash.com/photo-1600880292089-90a7e086f0ed?q=80&w=500&auto=format&fit=crop",
    desc: "Gunakan metode waslap sebelum tali pusar lepas untuk menjaga area pusar tetap kering.",
    steps: ["Siapkan air hangat kuku", "Gunakan sabun bayi lembut", "Seka area muka dahulu", "Keringkan dengan handuk lembut"]
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
  { 
    id: 15, 
    categoryId: 'bayi', 
    title: "Mengatasi Biang Keringat Pada Kulit Bayi", 
    author: "dr. Siska", 
    date: "3 hari lalu", 
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500&auto=format&fit=crop",
    desc: "Cuaca panas seringkali membuat kulit bayi kemerahan. Gunakan pakaian berbahan katun tipis.",
    steps: ["Pilih baju menyerap keringat", "Jaga suhu ruangan sejuk", "Gunakan sabun hypoallergenic", "Jangan gunakan bedak tabur"]
  },
  { 
    id: 16, 
    categoryId: 'bayi', 
    title: "Cara Menenangkan Bayi yang Sedang Tumbuh Gigi", 
    author: "dr. Budi", 
    date: "5 hari lalu", 
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=500&auto=format&fit=crop",
    desc: "Gusi gatal dan rewel adalah tanda tumbuh gigi. Teether bisa jadi penyelamat tidur Moms.",
    steps: ["Berikan teether dingin", "Pijat gusi dengan jari bersih", "Berikan makanan lembut", "Usap air liur agar tak iritasi"]
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
  }
];