const compareContainer =
    document.getElementById("compare-container");

const compareProducts =
    JSON.parse(
        localStorage.getItem("compareProducts")
    ) || [];

const fallbackProducts = [
    {
        id: "1",
        name: "White Sneakers",
        price: 4999,
        rating: 4,
        category: "Footwear"
    },
    {
        id: "2",
        name: "Black Hoodie",
        price: 2999,
        rating: 5,
        category: "Clothing"
    },
    {
        id: "3",
        name: "Blue Jeans",
        price: 1999,
        rating: 4,
        category: "Clothing"
    },
    {
        id: "4",
        name: "White Sneakers",
        price: 4999,
        rating: 4,
        category: "Footwear"
    }
];

function renderCompare() {

    if (compareProducts.length === 0) {
        compareContainer.innerHTML =
            "<h3>No products selected</h3>";
        return;
    }

    const selected =
        fallbackProducts.filter(
            product =>
                compareProducts.includes(
                    String(product.id)
                )
        );

    compareContainer.innerHTML =
        selected.map(
            product => `
                <div style="
                    border:1px solid #ccc;
                    padding:15px;
                    margin:10px;
                ">
                    <h3>${product.name}</h3>
                    <p><b>Price:</b> ₹${product.price}</p>
                    <p><b>Rating:</b> ${product.rating}</p>
                    <p><b>Category:</b> ${product.category}</p>
                </div>
            `
        ).join("");
}

renderCompare();