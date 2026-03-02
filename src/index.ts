return new Response(JSON.stringify(data), {
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*", // INI YANG WAJIB ADA
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

Setelah Anda mengedit file tersebut di GitHub, tunggu sampai GitHub Actions berubah menjadi centang hijau lagi, baru kemudian coba websitenya. Selamat mencoba!
