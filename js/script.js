//* Fetch data
const fetchMobileData = async () => {
    const response = await fetch(
        'https://openapi.programming-hero.com/api/phones?search=iphone'
    );
    const mobilesData = await response.json();
    const mobiles = mobilesData.data;

    displayMobilesData(mobiles);
};

fetchMobileData();

const displayMobilesData = (mobiles) => {
    const parentContainer = document.getElementById('card_container');

    mobiles.map((mobile) => {
        const card = document.createElement('div');
        console.log(mobile);

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
};
