const socket = io();

socket.emit('getProducts');

socket.on('productos', (products) => {
    console.log(products);
    const html = products.map((product) => {
        return (`
        <tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.description}</td>
            <td><img src="${product.thumbnail}" alt="not found" width="50px"></td>
        </tr>
        `);
    }).join(" ");
    document.getElementById('products').innerHTML = html;

});