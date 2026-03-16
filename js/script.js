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

// ===== PROMPT TEMPLATES =====
const promptTemplates = [
  {
    category: "Social Media Post",
    color: "#6366f1",
    prompt:
      "Create an engaging Instagram carousel post about [TOPIC] for [TARGET AUDIENCE]. Include: 1) A hook headline that stops the scroll, 2) 5-7 slides with actionable tips, 3) A strong CTA that drives engagement. Tone: Professional yet approachable. Format: Short, punchy sentences with emojis.",
  },
  {
    category: "Video Script",
    color: "#06b6d4",
    prompt:
      "Write a 60-second TikTok/Reels script about [PRODUCT/SERVICE]. Structure: 0-3s: Hook that addresses a pain point, 3-15s: Problem elaboration, 15-45s: Solution demonstration, 45-60s: CTA with urgency. Include visual directions and trending audio suggestions.",
  },
  {
    category: "Blog Article",
    color: "#8b5cf6",
    prompt:
      "Generate a 1500-word SEO-optimized blog post about [KEYWORD]. Include: Compelling title with power words, Introduction with statistics, 5 H2 sections with actionable insights, Internal linking opportunities, Conclusion with summary and CTA. Target reading level: Grade 8.",
  },
  {
    category: "Email Campaign",
    color: "#6366f1",
    prompt:
      "Create a 3-email nurture sequence for [PRODUCT LAUNCH]. Email 1: Teaser with curiosity gap, Email 2: Value proposition with social proof, Email 3: Limited-time offer with scarcity. Each email should have a clear subject line, preview text, and single CTA.",
  },
  {
    category: "Brand Story",
    color: "#06b6d4",
    prompt:
      "Craft a compelling brand story for [COMPANY] that connects emotionally with [TARGET MARKET]. Include: Origin story, Mission & values, Customer transformation examples, Unique differentiators. Tone: Authentic, inspiring, and memorable. Length: 300-500 words.",
  },
  {
    category: "Product Description",
    color: "#8b5cf6",
    prompt:
      "Write persuasive product descriptions for [PRODUCT] targeting [AUDIENCE]. Include: Benefit-driven headline, 3-5 key features with benefits, Social proof element, Objection handling, Urgency trigger. Optimize for both SEO and conversion. Format: Scannable with bullet points.",
  },
];

// ===== MODAL FUNCTIONS =====
function openPromptModal() {
  document.getElementById("promptModal").classList.add("active");
  document.body.style.overflow = "hidden";
  generateNewPrompt();
}

function closePromptModal() {
  document.getElementById("promptModal").classList.remove("active");
  document.body.style.overflow = "";
}

function closeModalOutside(event) {
  if (event.target === document.getElementById("promptModal")) {
    closePromptModal();
  }
}

function generateNewPrompt() {
  const randomIndex = Math.floor(Math.random() * promptTemplates.length);
  const template = promptTemplates[randomIndex];

  const promptHTML = `
          <div class="prompt-category" style="background: ${template.color}20; color: ${template.color};">
              ${template.category}
          </div>
          <p style="color: #e2e8f0; line-height: 1.8;">
              ${template.prompt.replace(/\[([A-Z\/]+)\]/g, '<span style="color: #06b6d4;">[$1]</span>')}
          </p>
      `;

  document.getElementById("promptContent").innerHTML = promptHTML;
}

function copyPrompt() {
  const promptText = document.getElementById("promptContent").innerText;
  navigator.clipboard
    .writeText(promptText)
    .then(() => {
      showToast("Prompt copied to clipboard!");
    })
    .catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = promptText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast("Prompt copied to clipboard!");
    });
}

// ===== BOOKING FORM =====
function handleBooking(event) {
  event.preventDefault();

  const name = document.getElementById("clientName").value;
  const company = document.getElementById("companyName").value || "Personal";
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;
  const topic = document.getElementById("consultationTopic").value;

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const message = `Halo Kontengrafi, saya ingin booking konsultasi AI untuk:
      
Nama: ${name}
Perusahaan: ${company}
Tanggal: ${formattedDate}
Waktu: ${time} WIB
Topik: ${topic}

Mohon konfirmasi ketersediaan. Terima kasih!`;

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
