//* Fetch data

const fetchMobileData = async (search) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${search}`
    );
    const mobilesData = await response.json();
    const mobiles = mobilesData.data;
    displayMobilesData(mobiles);
};

//* display mobiles data

const displayMobilesData = (mobiles) => {
    const parentContainer = document.getElementById('card_container');
    parentContainer.textContent = '';

    mobiles.map((mobile) => {
        const card = document.createElement('div');

        card.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10">
                            <img
                                src=${mobile.image}
                                alt="Shoes"
                                class="rounded-xl" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">${mobile.phone_name}</h2>
                            <p class="text-[#706F6F]">${mobile.slug}</p>
                            <h2 class="card-title">${mobile.brand}</h2>
                            <div class="card-actions">
                                <button onclick="handleShowDetail('${mobile.slug}')" class="btn btn-primary">
                                    Show Details
                                </button>
                            </div>
                        </div>
                    </div>
        `;
        parentContainer.appendChild(card);
    });
    handleLoading(false);
};

//* search with Input value

const searchWithInput = () => {
    handleLoading(true);
    const searchInputElement = document.getElementById('searchText');
    const searchText = searchInputElement.value;
    searchInputElement.value = '';
    fetchMobileData(searchText);
};

//* Set loading

const handleLoading = (isLoading) => {
    const loadingElement = document.getElementById('loading');

    if (isLoading) {
        loadingElement.classList.remove('hidden');
    } else {
        loadingElement.classList.add('hidden');
    }
};

//* Search With Button

const handleSearchButton = (buttonId) => {
    const searchButtonElement = document.getElementById(buttonId);
    const searchButtonValue = searchButtonElement.innerText;
    fetchMobileData(searchButtonValue);
};

const searchIphone = () => {
    handleLoading(true);
    handleSearchButton('search_iphone');
};

const searchSamsung = () => {
    handleLoading(true);
    handleSearchButton('search_samsung');
};

const searchOppo = () => {
    handleLoading(true);
    handleSearchButton('search_oppo');
};

//* Handle show details

const handleShowDetail = async (id) => {
    //* Fetch data with id
    const response = await fetch(
        `https://openapi.programming-hero.com/api/phone/${id}`
    );

    const mobilesData = await response.json();
    const data = mobilesData.data;
    console.log(data);
    showDetailModal(data);
};

//* show detail modal handle

const showDetailModal = (data) => {
    show_detail_modal.showModal();

    /*    console.log(
        data.mainFeatures.sensors.forEach((element) => {
            console.log(element);
        })
    ); */

    const parentModal = document.getElementById('modal_parent');

    parentModal.textContent = '';
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
    
        <div class="card card-compact bg-base-100">
                <figure><img src=${data.image} alt="phones" /></figure>
                            
                <h3 class="text-3xl font-bold my-6">${data.name}</h3>
            <div class="space-y-2 px-0 mx-0">

                <p class="text-lg text-[#706F6F]"><span class="text-xl font-semibold text-[#403F3F] px-0">Storage: </span>
                ${data.mainFeatures.storage}</p>
                                
                <p class="text-lg text-[#706F6F]"><span class="text-xl font-semibold text-[#403F3F] px-0">Display size: </span>
                ${data.mainFeatures.displaySize}</p>
                                
                <p class="text-lg text-[#706F6F]"><span class="text-xl font-semibold text-[#403F3F] px-0">Chipset: </span>
                ${
                    data.mainFeatures.chipSet
                        ? data.mainFeatures.chipSet
                        : 'no chip set available'
                }</p>
                                
                <p class="text-lg text-[#706F6F]"><span class="text-xl font-semibold text-[#403F3F] px-0">Memory: </span>
                ${data.mainFeatures.memory}</p>
                                
                <p class="text-lg text-[#706F6F]"><span class="text-xl font-semibold text-[#403F3F] px-0">Release date: </span>
                ${data.releaseDate ? data.releaseDate : 'No date available'}</p>
                                
                <p class="text-lg text-[#706F6F]"><span class="text-xl font-semibold text-[#403F3F] px-0">Brand: </span>
                ${data.brand}</p>
                                
                <p class="text-lg text-[#706F6F]"><span class="text-xl font-semibold text-[#403F3F] px-0">GPS: </span>
                ${data.others?.GPS ? data.others.GPS : 'No GPS available'}</p>
                                
                <p class="text-lg text-[#706F6F]"><span class="text-xl font-semibold text-[#403F3F] px-0">Sensors: </span>
                ${data.mainFeatures?.sensors}</p>
                                
                
            </div>
        </div>
    
    `;
    parentModal.appendChild(createDiv);
};
