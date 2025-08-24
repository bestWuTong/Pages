document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const nav = document.getElementById("keyword-nav");

  let allKeywords = new Set();
  photoData.forEach(photo => photo.keywords.forEach(k => allKeywords.add(k)));

  const keywords = ["全部", ...Array.from(allKeywords)];
  keywords.forEach(keyword => {
    const btn = document.createElement("button");
    btn.textContent = keyword;
    btn.addEventListener("click", () => {
      document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPhotos(keyword);
    });
    if (keyword === "全部") btn.classList.add("active");
    nav.appendChild(btn);
  });

  function renderPhotos(filter) {
    gallery.innerHTML = "";
    let filtered = filter === "全部" ? photoData : photoData.filter(p => p.keywords.includes(filter));
    filtered.forEach((photo, idx) => {
      const card = document.createElement("div");
      card.className = "photo-card";
      card.style.animationDelay = `${idx * 0.1}s`;

      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = "摄影作品";

      const info = document.createElement("div");
      info.className = "photo-info";
      info.innerHTML = `
        <p><strong>关键词：</strong>${photo.keywords.join(" / ")}</p>
        <p><strong>拍摄时间：</strong>${photo.time}</p>
        <p><strong>地点：</strong>${photo.location}</p>
        <p><strong>设备：</strong>${photo.device}</p>
      `;

      card.appendChild(img);
      card.appendChild(info);
      gallery.appendChild(card);
    });
  }

  renderPhotos("全部");
});
