let skeletonHTML = "";
for (let i = 0; i < 9; i++) {
  skeletonHTML += `
    <div class="product-box">
      <div class="skeleton-img"></div>
      <div class="skeleton" style="height: 20px; margin: 10px 0; width: 20%; display: block"></div>
      <div class="skeleton" style="height: 16px; width: 50%; display: block"></div>
      <div class="skeleton" style="height: 36px; width: 30%; margin-top: 10px;"></div>
    </div>
  `;
}
document.querySelector(".grid").innerHTML = skeletonHTML;
