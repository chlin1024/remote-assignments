function ajax(src, callback) { 
    // your code here
    fetch(src)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.log(error));
}



function render(data) {
    // your code here
    // document.createElement() and appendChild() methods are preferred.
    const container = document.createElement('div');
    container.className = 'product-container';

    data.array.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-item';

        const name = document.createElement('h2');
        name.textContent = 'Product name: ${product.name}';
        item.appendChild(name);

        const price = document.createElement('h3');
        name.textContent = 'Price: ${product.price}';
        item.appendChild(price);

        const description = document.createElement('p');
        name.textContent = 'Description: ${product.description}';
        item.appendChild(description);

        container.appendChild(item);
    });
    
    document.body.appendChild(container);
}



ajax( 'https://remote-assignment.s3.ap-northeast-1.amazonaws.com/products', 
function (response) {
render(response); 
}
); 
// you should get product information in JSON format
// and render data in the page