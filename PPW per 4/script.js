console.log("Selamat datang di Nasi Padang CI!");

const qtyInputs = document.querySelectorAll(".qty");
const totalItemsEl = document.getElementById("totalItems");
const totalPriceEl = document.getElementById("totalPrice");
const orderBtn = document.getElementById("orderBtn");
const resetBtn = document.getElementById("resetBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutResult = document.getElementById("checkoutResult");
const checkoutList = document.getElementById("checkoutList");
const checkoutTotal = document.getElementById("checkoutTotal");
const waLink = document.getElementById("waLink");

// Fungsi untuk menghitung total jumlah dan harga
function updateTotal() {
  let totalItems = 0;
  let totalPrice = 0;

  qtyInputs.forEach(input => {
    const qty = parseInt(input.value) || 0;
    const price = parseInt(input.dataset.price);
    totalItems += qty;
    totalPrice += qty * price;
  });

  if (totalItemsEl) totalItemsEl.textContent = totalItems;
  totalPriceEl.textContent = totalPrice.toLocaleString("id-ID");
}

// Perbarui total saat pengguna mengubah input jumlah
qtyInputs.forEach(input => {
  input.addEventListener("input", updateTotal);
});

// Saat tombol 'Mari di Pesan' diklik
orderBtn.addEventListener("click", () => {
  updateTotal();
  alert(`Kamu memesan ${totalItemsEl ? totalItemsEl.textContent : 0} menu dengan total Rp ${totalPriceEl.textContent}`);
});

// Saat tombol RESET diklik
resetBtn.addEventListener("click", () => {
  qtyInputs.forEach(input => {
    input.value = 0;
  });

  if (totalItemsEl) totalItemsEl.textContent = "0";
  totalPriceEl.textContent = "0";

  checkoutResult.style.display = "none";
  checkoutList.innerHTML = "";
  checkoutTotal.textContent = "";
  waLink.href = "#";

  alert("Pesanan telah di-reset!");
});

// Saat tombol ORDER diklik
checkoutBtn.addEventListener("click", () => {
  checkoutList.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;
  let orderText = "Halo, saya ingin memesan:\n";
  let pesananArray = [];

  qtyInputs.forEach(input => {
    const qty = parseInt(input.value) || 0;
    const price = parseInt(input.dataset.price);
    const itemName = input.closest(".menu-item").querySelector("h3").textContent;

    if (qty > 0) {
      const itemTotal = qty * price;
      const itemLine = `${itemName} (${qty}x) - Rp ${itemTotal.toLocaleString("id-ID")}`;
      const li = document.createElement("li");
      li.textContent = itemLine;
      checkoutList.appendChild(li);

      orderText += `• ${itemName} (${qty}x)\n`;
      totalItems += qty;
      totalPrice += itemTotal;

      pesananArray.push(`${itemName} x ${qty} = Rp ${itemTotal}`);
    }
  });

  if (totalItems === 0) {
    alert("EETTT UDAH LAPER YAA LUPA MILIH!");
    return;
  }

  checkoutTotal.textContent = `Rp ${totalPrice.toLocaleString("id-ID")}`;
  orderText += `\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}`;

  // WhatsApp Link
  const whatsappURL = `https://wa.me/6282135750744?text=${encodeURIComponent(orderText)}`;
  waLink.href = whatsappURL;

  checkoutResult.style.display = "block";

  // Redirect ke halaman form pembelian
  const encodedPesanan = encodeURIComponent(pesananArray.join("\n"));
  const encodedTotal = encodeURIComponent(totalPrice);
  window.location.href = `../PPW per 6/PPWper6.html?pesanan=${encodedPesanan}&total=${encodedTotal}`;
});
