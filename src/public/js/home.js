const socket = io();

socket.emit('getProducts');

socket.on('productos', (products) => {
    const html = products.map((product) => {
        return (`
        <tr>
            <td>${product.title}</td>
            <td>${product.code}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
        </tr>
        `);
    }).join(" ");
    document.getElementById('products').innerHTML = html;
});