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
                                <button class="btn btn-primary">
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
    console.log(searchButtonValue);
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
