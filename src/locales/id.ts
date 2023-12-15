const common = {
  validation: {
    required: "{name} wajib diisi.",
  },
} as const;

const components = {
  calendar: {
    acceptText: "Terapkan",
    cancelText: "Batalkan",
  },

  timePicker: {
    toolbarTitle: "Pilih waktu",
    cancelText: "Batal",
    labels: ["Jam", "Menit"],
  },
} as const;

const fourOFour = {
  title: "Yah, Halaman Tidak Ditemukan",
  description:
    "Halaman ini tidak ada di Rey. Yuk, periksa ulang link tujuan kamu atau kembali ke",
  action: "Beranda",
} as const;

const fiveHundred = {
  title: "Maaf, Sistem Sedang Error",
  description:
    "Sistem Rey sedang mengalami masalah. Mohon coba kembli dalam beberapa saat atau hubungi kami via",
  action: "WhatsApp",
} as const;

export default {
  common,
  components,
  fourOFour,
  fiveHundred,
} as const;
