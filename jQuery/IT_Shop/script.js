$(document).ready(function(){

    $(".add-to-cart").click(function(){
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        console.log(id,name,price);

        let items = {
            id: id,
            name: name,
            price: price,
            qty: 1
        }
         let itemsData = localStorage.getItem('MyShops');
         let itemsArray;
         if(itemsData == null) {
            itemsArray = [];
         }else {
            itemsArray = JSON.parse(itemsData);
         }

         let status = false;
         $.each(itemsArray, function(i,v){
            if(id == v.id) {
                v.qty++;
                status = true;
            }
         })

         if (status == false) {
            itemsArray.push(items);
         }

         let  itemsString = JSON.stringify(itemsArray);
         localStorage.setItem('MyShops', itemsString);
         count();
    })

    count();
    function count() {
        let itemsData = localStorage.getItem('MyShops');
        if(itemsData) {
            let itemsArray = JSON.parse(itemsData);

            let count = itemsArray.length;
            console.log(count);
            $("#count_item").text(count);
        }
    }

    getItem();
    function getItem() {
        let itemsData = localStorage.getItem('MyShops');
        if(itemsData) {
            let itemsArray = JSON.parse(itemsData);
            let data = '';
            let j = 1;
            let total = 0;
            $.each(itemsArray, function(i,v){
                let name = v.name;
                let price = v.price;
                let qty = v.qty;

                data += `<tr>
                            <td> ${j++} </td>
                            <td> ${name}</td>
                            <td> ${price}</td>
                            <td>
                            <button class="btn btn-outline-secondary min" data-index="${i}"> - </button>
                            ${qty}
                            <button class="btn btn-outline-secondary max" data-index="${i}"> + </button>
                            </td>
                            <td>${price * qty}</td>
                        </tr>`;
                total += price * qty;
            })
            data += `<tr class="bg-dark text-light">
                        <td colspan="4" align="right">Total</td>
                        <td> ${total}</td>
                    </tr>`
            $('#tbody').html(data);
        }
    }

    $('#tbody').on('click','.max',function(){
        let index = $(this).data('index');
        
        let itemsData = localStorage.getItem('MyShops');
        if(itemsData) {
            let itemsArray = JSON.parse(itemsData);
            
            $.each(itemsArray, function(i,v){
                if(index == i) {
                    v.qty++;
                }
            })
            let itemsString = JSON.stringify(itemsArray);
            localStorage.setItem('MyShops',itemsString);
            getItem();
        }
    })
    
    $('#tbody').on('click','.min',function(){
        let index = $(this).data('index');
        
        let itemsData = localStorage.getItem('MyShops');
        if(itemsData) {
            let itemsArray = JSON.parse(itemsData);
            
            $.each(itemsArray, function(i,v){
                if(index == i) {
                    v.qty--;
                    if(v.qty == 0){
                        let ans = confirm('Are you sure to remove?');
                        if(ans) {
                            itemsArray.splice(index,1);
                        }else {
                            v.qty = 1;
                        }
                    }
                }
            })
            let itemsString = JSON.stringify(itemsArray);
            localStorage.setItem('MyShops',itemsString);
            getItem();
            count();
        }
    })

    $('#order').click(function(){
        let ans = confirm("Are you sure to order?");
        if(ans) {
            localStorage.clear('MyShops');
            window.location.href = 'index.html';
        }
    })
})