const loadPhone = async (searchText = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  //  display show all button if there are more than 12 phones

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  console.log("is show all ", isShowAll);
  //  display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // 1. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
    //2. ser innerHTML
    phoneCard.innerHTML = `
    <figure class='pt-4'>
        <img src="${phone.image}" alt="Shoes" />
    </figure>
     <div class="card-body text-yellow-800">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.brand}</p>
            <p>//${phone.slug}</p>
            <div class="card-actions justify-end">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
     </div>
     `;
    //3. append child
    cardContainer.appendChild(phoneCard);
  });
  toggleLoadingBar(false);
};

//  handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingBar(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// const handleSearch2 = () => {
//   toggleLoadingBar(true);
//   const inputField = document.getElementById("search-field2");
//   const searchText = inputField.value;
//   console.log(searchText);
//   loadPhone(searchText);
// };

const toggleLoadingBar = (isLoading) => {
  const loadingBar = document.getElementById("loading");
  if (isLoading === true) {
    loadingBar.classList.remove("hidden");
  } else {
    loadingBar.classList.add("hidden");
  }
};

//
const handleShowDetail = async (id) => {
  console.log("clicked", id);
  //  load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetail(phone);
};

const showPhoneDetail = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("detail-phone-name");
  phoneName.innerText = phone.name;

  const phoneImage = document.getElementById("phone-img");
  phoneImage.src = phone.image;

  const chipSet = document.getElementById("chipset");
  chipSet.innerText = phone.mainFeatures.chipSet;

  const storage = document.getElementById("storage");
  storage.innerText = phone.mainFeatures.storage;

  const memory = document.getElementById("memory");
  memory.innerText = phone.mainFeatures.memory;

  const displaySize = document.getElementById("displaySize");
  displaySize.innerText = phone.mainFeatures.displaySize;

  const sensors = document.getElementById("sensors");
  sensors.innerText = phone.mainFeatures.sensors;

  const releaseDate = document.getElementById("releaseDate");
  releaseDate.innerText = phone.releaseDate;

  const wlan = document.getElementById("wlan");
  wlan.innerText = phone?.others?.WLAN || "No WLAN Available";

  const Bluetooth = document.getElementById("Bluetooth");
  Bluetooth.innerText = phone?.others?.Bluetooth || "No Bluetooth Available";
  const GPS = document.getElementById("GPS");
  GPS.innerText = phone?.others?.GPS || "No GPS Available";

  const NFC = document.getElementById("NFC");
  NFC.innerText = phone?.others?.NFC || "No NFC Available";
  const Radio = document.getElementById("Radio");
  Radio.innerText = phone?.others?.Radio || "No Radio Available";
  const USB = document.getElementById("USB");
  USB.innerText = phone?.others?.USB || "No USB Available";

  show_details_modal.showModal();
};

// handle show all button
const handleShowAll = () => {
  handleSearch(true);
};

// loadPhone();
