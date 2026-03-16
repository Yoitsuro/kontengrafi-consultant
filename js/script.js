// ===== NAVIGATION SCROLL EFFECT =====
window.addEventListener("scroll", function () {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById("navLinks");
  menu.classList.toggle("active");
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("active");
  });
});

// ===== SET MINIMUM DATE =====
const today = new Date().toISOString().split("T")[0];
document.getElementById("bookingDate").setAttribute("min", today);

// ===== COUNTDOWN TIMER (3 HOURS LOOPING) =====
function startCountdown() {
  const countdownDuration = 10800; // 3 jam
  const storageKey = "promoEndTime_3H";

  function resetTimer() {
    const newEndTime = new Date().getTime() + countdownDuration * 1000;
    localStorage.setItem(storageKey, newEndTime);
    return newEndTime;
  }

  let endTime = localStorage.getItem(storageKey);
  const now = new Date().getTime();

  if (!endTime || parseInt(endTime) <= now) {
    endTime = resetTimer();
  } else {
    endTime = parseInt(endTime);
  }

  const timerElement = document.getElementById("countdownTimer");
  if (!timerElement) return;

  // KUNCI PERBAIKAN: Kita pisahkan rumus perhitungannya ke dalam fungsi khusus
  function updateTimerDisplay() {
    const currentTime = new Date().getTime();
    let timeRemaining = Math.floor((endTime - currentTime) / 1000);

    if (timeRemaining <= 0) {
      endTime = resetTimer();
      timeRemaining = countdownDuration;
    }

    let hours = Math.floor(timeRemaining / 3600);
    let minutes = Math.floor((timeRemaining % 3600) / 60);
    let seconds = timeRemaining % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerElement.innerHTML = `${hours}j ${minutes}m ${seconds}d`;
  }

  // 1. Eksekusi fungsi ini SECARA LANGSUNG saat halaman dimuat (agar tidak ada delay 1 detik)
  updateTimerDisplay();

  // 2. Baru setelah itu, biarkan dia mengulang setiap 1 detik
  setInterval(updateTimerDisplay, 1000);
}

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", function () {
  console.log("Kontengrafi website loaded successfully!");
  startCountdown(); // Jalankan timernya saat website dibuka
});

// ===== BOOKING FORM =====
function handleBooking(event) {
  event.preventDefault();

  const name = document.getElementById("clientName").value;
  const company = document.getElementById("companyName").value || "Personal";
  const date = document.getElementById("bookingDate").value;
  // Mengambil data dari dropdown paket, bukan time lagi
  const packageType = document.getElementById("bookingPackage").value;
  const topic = document.getElementById("consultationTopic").value;

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Memperbarui template pesan WhatsApp
  const message =
    "Halo Kontengrafi, saya ingin booking konsultasi AI untuk:\n\n" +
    "Nama: " +
    name +
    "\n" +
    "Perusahaan: " +
    company +
    "\n" +
    "Tanggal: " +
    formattedDate +
    "\n" +
    "Paket: " +
    packageType +
    "\n" +
    "Topik: " +
    topic +
    "\n\n" +
    "Mohon konfirmasi ketersediaan. Terima kasih!";

  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = "6281995555169";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
  showToast("Redirecting to WhatsApp...");
}

// ===== PORTFOLIO TABS (Tetap sama seperti sebelumnya) =====
function switchPortfolioTab(event, tabId) {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  event.currentTarget.classList.add("active");

  const contents = document.querySelectorAll(".portfolio-content");
  contents.forEach((content) => content.classList.remove("active"));

  document.getElementById("tab-" + tabId).classList.add("active");
}

// ===== PLAY VIDEO ON HOVER =====
function playHoverVideo(element) {
  const video = element.querySelector("video");
  if (video) {
    // Memutar video saat mouse masuk
    let playPromise = video.play();

    // Menangkap error jika browser memblokir autoplay
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Browser mencegah pemutaran video otomatis:", error);
      });
    }
  }
}

function pauseHoverVideo(element) {
  const video = element.querySelector("video");
  if (video) {
    // Menjeda video saat mouse keluar
    video.pause();
  }
}

// ===== CONTACT FORM =====
function handleContact(event) {
  event.preventDefault();
  showToast("Message sent successfully! We'll get back to you soon.");
  event.target.reset();
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  toastMessage.textContent = message;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 3000);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", function () {
  console.log("Kontengrafi website loaded successfully!");
});
