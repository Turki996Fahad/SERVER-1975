let currentLang = "ar";

const langBtn = document.getElementById("langBtn");
const form = document.getElementById("migration-form");
const resultWrap = document.getElementById("result-wrap");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");

function setLanguage(lang) {
  currentLang = lang;
  const html = document.documentElement;

  if (lang === "ar") {
    html.lang = "ar";
    html.dir = "rtl";
    langBtn.textContent = "English";
  } else {
    html.lang = "en";
    html.dir = "ltr";
    langBtn.textContent = "العربية";
  }

  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    const value = el.dataset[lang];

    if (el.tagName === "H1") {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll(
    "[data-placeholder-ar][data-placeholder-en]"
  ).forEach(el => {
    el.placeholder =
      lang === "ar"
        ? el.dataset.placeholderAr
        : el.dataset.placeholderEn;
  });
}

langBtn.addEventListener("click", () => {
  setLanguage(currentLang === "ar" ? "en" : "ar");
});

function squadLabel(value, lang) {
  const labels = {
    tanks: { ar: "دبابات", en: "Tanks" },
    aircraft: { ar: "طيارات", en: "Aircraft" },
    missiles: { ar: "صواريخ", en: "Missiles" }
  };

  return labels[value][lang];
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const playerName =
    document.getElementById("playerName").value.trim();

  const currentServer =
    document.getElementById("currentServer").value.trim();

  const hq =
    document.getElementById("hq").value.trim();

  const power =
    document.getElementById("power").value.trim();

  const firstSquadPower =
    document.getElementById("firstSquadPower").value.trim();

  const squadType =
    document.getElementById("squadType").value;

  const alliance =
    document.getElementById("alliance").value;

  const language =
    document.getElementById("language").value;

  const notes =
    document.getElementById("notes").value.trim();

  if (currentLang === "ar") {

    result.value =
`طلب هجرة إلى سيرفر #1975

اسم اللاعب: ${playerName}
السيرفر الحالي: ${currentServer}
مستوى HQ: ${hq}
القوة الكلية: ${power}
قوة الفيلق الأول: ${firstSquadPower}
نوع الفيلق: ${squadLabel(squadType, "ar")}
التحالف المطلوب: ${alliance}
اللغة: ${language}
ملاحظات: ${notes || "لا يوجد"}`;

  } else {

    result.value =
`Migration Request to Server #1975

Player Name: ${playerName}
Current Server: ${currentServer}
HQ Level: ${hq}
Total Power: ${power}
First Squad Power: ${firstSquadPower}
Squad Type: ${squadLabel(squadType, "en")}
Preferred Alliance: ${alliance}
Language: ${language}
Notes: ${notes || "None"}`;
  }

  resultWrap.classList.remove("hidden");

  resultWrap.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

copyBtn.addEventListener("click", async () => {

  await navigator.clipboard.writeText(result.value);

  const old = copyBtn.textContent;

  copyBtn.textContent =
    currentLang === "ar"
      ? "تم النسخ ✓"
      : "Copied ✓";

  setTimeout(() => {
    copyBtn.textContent = old;
  }, 1800);
});

setLanguage("ar");
