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
  { 
    id: 27, 
    categoryId: 'bayi', 
    title: "Tekstur MPASI Bayi Usia 6 - 12 Bulan", 
    author: "Akil Girtzi, S.Gz", 
    date: "1 minggu lalu", 
    img: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=500&auto=format&fit=crop",
    desc: "Naik tekstur secara bertahap sangat penting untuk melatih kemampuan mengunyah bayi.",
    steps: ["Usia 6 bln: Puree halus", "Usia 8 bln: Mash lumat", "Usia 9 bln: Cincang kasar", "Usia 12 bln: Makanan keluarga"]
  },
  { 
    id: 28, 
    categoryId: 'bayi', 
    title: "Red Flags Perkembangan Motorik Bayi", 
    author: "dr. Sari", 
    date: "1 minggu lalu", 
    img: "https://images.unsplash.com/photo-1544126592-807daf21565c?q=80&w=500&auto=format&fit=crop",
    desc: "Ketahui kapan harus waspada terhadap keterlambatan tumbuh kembang motorik bayi.",
    steps: ["Belum tegak leher di 4 bln", "Belum duduk di 9 bln", "Belum merangkak di 12 bln", "Segera konsultasi dokter anak"]
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
  { 
    id: 17, 
    categoryId: 'batita', 
    title: "Membangun Kebiasaan Sikat Gigi Sejak Dini", 
    author: "drg. Bud Santoso", 
    date: "6 hari lalu", 
    img: "https://images.unsplash.com/photo-1559591937-e3b2e3f0e5da?q=80&w=500&auto=format&fit=crop",
    desc: "Gigi susu yang sehat adalah pondasi bagi gigi permanen. Mulailah kebiasaan sikat gigi yang menyenangkan.",
    steps: ["Gunakan sikat gigi bulu lembut", "Pilih pasta gigi rasa buah", "Sikat gigi sambil bernyanyi", "Lakukan dua kali sehari"]
  },
  { 
    id: 18, 
    categoryId: 'batita', 
    title: "Mengatasi Tantrum dengan Teknik Deep Breathing", 
    author: "dr. Sari", 
    date: "1 minggu lalu", 
    img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=500&auto=format&fit=crop",
    desc: "Ledakan emosi pada batita adalah hal wajar. Bantu mereka mengenali perasaan melalui pernapasan.",
    steps: ["Tetap tenang dan jangan emosi", "Ajak anak menarik napas dalam", "Berikan pelukan hangat", "Validasi perasaan anak"]
  },
  { 
    id: 29, 
    categoryId: 'batita', 
    title: "Bermain Sambil Belajar Kosakata Baru", 
    author: "dr. Siska", 
    date: "2 minggu lalu", 
    img: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?q=80&w=500&auto=format&fit=crop",
    desc: "Batita sedang dalam masa eksplorasi bahasa. Ajak bicara secara konsisten untuk menambah kosakatanya.",
    steps: ["Sebutkan nama-nama benda", "Bernyanyi bersama", "Gunakan bahasa yang benar", "Bacakan buku bergambar"]
  },
  { 
    id: 30, 
    categoryId: 'batita', 
    title: "Mencegah Stunting Melalui Protein Hewani", 
    author: "Akil Girtzi, S.Gz", 
    date: "3 minggu lalu", 
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop",
    desc: "Protein hewani seperti telur, ikan, dan daging adalah kunci utama pencegahan stunting.",
    steps: ["Berikan telur setiap hari", "Variasi menu ikan laut", "Kurangi makanan manis", "Pantau BB/TB di Posyandu"]
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
  { 
    id: 19, 
    categoryId: 'balita', 
    title: "Pentingnya Batasi Screen Time Bagi Otak Balita", 
    author: "dr. Siska", 
    date: "1 minggu lalu", 
    img: "https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=500&auto=format&fit=crop",
    desc: "Paparan layar berlebih bisa menghambat perkembangan bahasa dan fokus si kecil.",
    steps: ["Maksimal 1 jam per hari", "Dampingi saat menonton", "Pilih konten edukatif", "Prioritaskan interaksi fisik"]
  },
  { 
    id: 20, 
    categoryId: 'balita', 
    title: "Mengenal Emosi Lewat Buku Cerita", 
    author: "dr. Sari", 
    date: "2 minggu lalu", 
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=500&auto=format&fit=crop",
    desc: "Bercerita sebelum tidur adalah cara efektif mengajarkan empati dan pengenalan karakter.",
    steps: ["Pilih buku bergambar cerah", "Tanyakan perasaan tokoh", "Gunakan intonasi berbeda", "Jadikan rutinitas malam"]
  },
  { 
    id: 31, 
    categoryId: 'balita', 
    title: "Imunisasi Dasar Lanjutan Untuk Balita", 
    author: "dr. Budi", 
    date: "3 minggu lalu", 
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop",
    desc: "Jangan lupa booster imunisasi untuk mempertahankan kekebalan tubuh balita.",
    steps: ["Cek buku KIA/KMS", "Booster DPT-HB-Hib", "Booster MR (Campak Rubella)", "Konsultasi jadwal susulan"]
  },
  { 
    id: 32, 
    categoryId: 'balita', 
    title: "Mengajarkan Berbagi Kepada Teman Sebaya", 
    author: "dr. Siska", 
    date: "1 bulan lalu", 
    img: "https://images.unsplash.com/photo-1516627144065-aba326eeecdf?q=80&w=500&auto=format&fit=crop",
    desc: "Balita mulai bersosialisasi. Ajarkan konsep berbagi secara perlahan tanpa memaksa.",
    steps: ["Gunakan timer bergantian", "Berikan contoh langsung", "Puji saat anak berbagi", "Hargai barang kesayangan anak"]
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
  { 
    id: 21, 
    categoryId: 'prasekolah', 
    title: "Pentingnya Sarapan Untuk Konsentrasi Belajar", 
    author: "Akil Girtzi, S.Gz", 
    date: "3 minggu lalu", 
    img: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=500&auto=format&fit=crop",
    desc: "Anak yang sarapan memiliki daya ingat dan suasana hati yang lebih baik di sekolah.",
    steps: ["Pilih karbohidrat kompleks", "Tambahkan telur/susu", "Hindari makanan terlalu manis", "Siapkan sarapan praktis"]
  },
  { 
    id: 22, 
    categoryId: 'prasekolah', 
    title: "Membangun Kemandirian Memakai Baju Sendiri", 
    author: "dr. Budi", 
    date: "1 bulan lalu", 
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500&auto=format&fit=crop",
    desc: "Mengancingkan baju melatih motorik halus yang penting untuk persiapan menulis.",
    steps: ["Pilih baju longgar", "Gunakan kancing besar", "Berikan pujian atas usaha", "Sabar menunggu anak selesai"]
  },
  { 
    id: 33, 
    categoryId: 'prasekolah', 
    title: "Rutinitas Sebelum Tidur Yang Baik Untuk Otak", 
    author: "dr. Sari", 
    date: "1 bulan lalu", 
    img: "https://images.unsplash.com/photo-1544126592-807daf21565c?q=80&w=500&auto=format&fit=crop",
    desc: "Rutinitas tidur yang konsisten membuat kualitas istirahat anak optimal.",
    steps: ["Sikat gigi dan cuci kaki", "Redupkan lampu kamar", "Bercerita tanpa gadget", "Peluk dan ucapkan selamat malam"]
  },
  { 
    id: 34, 
    categoryId: 'prasekolah', 
    title: "Melatih Disiplin Waktu Tanpa Mengancam", 
    author: "dr. Siska", 
    date: "1 bulan lalu", 
    img: "https://images.unsplash.com/photo-1511949863613-92cd5ed1afbc?q=80&w=500&auto=format&fit=crop",
    desc: "Anak prasekolah mulai memahami konsep jam. Ajarkan manajemen waktu harian yang menyenangkan.",
    steps: ["Buat papan jadwal bergambar", "Gunakan jam pasir/timer", "Berikan pilihan terbatas", "Konsisten dengan aturan"]
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
  { 
    id: 23, 
    categoryId: 'sekolah', 
    title: "Mengenali Bakat dan Minat Anak Sejak Dini", 
    author: "dr. Siska", 
    date: "1 bulan lalu", 
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=500&auto=format&fit=crop",
    desc: "Setiap anak unik. Observasi hobi mereka untuk membantu mengarahkan ke potensi terbaiknya.",
    steps: ["Coba berbagai hobi", "Berikan dukungan moral", "Jangan memaksakan ambisi", "Hargai setiap progres kecil"]
  },
  { 
    id: 24, 
    categoryId: 'sekolah', 
    title: "Pencegahan Bullying di Lingkungan Sekolah", 
    author: "dr. Sari", 
    date: "2 bulan lalu", 
    img: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=500&auto=format&fit=crop",
    desc: "Bangun komunikasi terbuka dengan anak agar mereka berani bercerita tentang kesehariannya.",
    steps: ["Jadilah pendengar yang baik", "Ajarkan sikap asertif", "Hubungi pihak sekolah", "Pantau interaksi sosialnya"]
  },
  { 
    id: 35, 
    categoryId: 'sekolah', 
    title: "Cara Efektif Membantu Anak Belajar Matematika", 
    author: "dr. Budi", 
    date: "2 bulan lalu", 
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop",
    desc: "Ubah ketakutan anak pada matematika menjadi permainan angka yang mengasyikkan.",
    steps: ["Gunakan benda nyata (buah, Lego)", "Belajar belanja di pasar", "Jangan dihafal tapi dipahami", "Berikan pujian atas logika anak"]
  },
  { 
    id: 36, 
    categoryId: 'sekolah', 
    title: "Manfaat Tidur Siang bagi Anak Usia Sekolah", 
    author: "dr. Sari", 
    date: "3 bulan lalu", 
    img: "https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?q=80&w=500&auto=format&fit=crop",
    desc: "Tidur siang sejenak mengembalikan energi dan menjaga emosi anak tetap stabil sampai malam.",
    steps: ["Cukup 30 - 45 menit", "Lakukan setelah pulang sekolah", "Jangan terlalu sore agar malam mengantuk", "Pastikan bantal/suasana nyaman"]
  },
];