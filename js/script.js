//* Fetch data

const fetchMobileData = async (search, showAll) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${search}`
    );
    const mobilesData = await response.json();
    const mobiles = mobilesData.data;

    displayMobilesData(mobiles, showAll);
};

//* display mobiles data

const displayMobilesData = (mobiles, showAll) => {
    const parentContainer = document.getElementById('card_container');
    parentContainer.textContent = '';

    //console.log('show all button', showAll);

    //* Show all button
    const showAllButton = document.getElementById('show_all');
    if (mobiles.length > 12) {
        showAllButton.classList.remove('hidden');
    } else {
        showAllButton.classList.add('hidden');
    }

    //* added slice to debug data & handle show all

    if (!showAll) {
        mobiles = mobiles.slice(0, 12);
    }

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

const searchWithInput = (showAll) => {
    handleLoading(true);

    const searchInputElement = document.getElementById('searchText');
    const searchText = searchInputElement.value;

    if (showAll) {
        searchInputElement.value = '';
    }
    fetchMobileData(searchText, showAll);
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

//* Handle show all

const handleShowAll = () => {
    searchWithInput(true);
};
