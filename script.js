function load(){
    const cart = []
    if(!localStorage.getItem("cart")){
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}
load()
$.ajax({url: "https://dummyjson.com/products", success: function(res){

res.products.forEach(pro => {
    $('.products').append(`

    <div class="col-md-6 col-xl-3 co-sm-12 my-2 p-2">
    
    <div class="card p-3">
        <div class="text-center"> <img src='${pro.thumbnail}' width="250" height="250"> </div>
        <div class="product-details"> <span class="fw-bold d-block p-3">$${pro.price}</span> <span>${pro.title}</span>
            <div class="buttons d-flex flex-row">
              <div class="cart  " onclick='showSingle("${pro.id}")' data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fas fa-eye"></i></i></div>
                 <button class="btn btn-outline-warning cart-button" onclick="addToCart('${pro.id}')"><span class="dot">1</span><i class="fa fa-shopping-cart"></i> Add to cart </button>
                </div>
        </div>
    </div>
    </div>
    `)
    });

}});

function showSingle(id){
    $.ajax({url: "https://dummyjson.com/products/"+id, success: function(res){
        $('.product').html(`
        <div class="toast bg-success " data-autohide="true">
        <div class="toast-header mx-auto">
          <strong class="mr-auto ">Done</strong>
        </div>
        <div class="toast-body text-light">
          Product added in your carts 
        </div>
      </div>
        <div class="container py-4 my-4 mx-auto d-flex flex-column offset-2">
        
        
          <div class="header">
            <div class="row r1">
              <div class="col-md-9 abc">
                <h1>${res.title}</h1>
              </div>
              <div class="col-md-3 text-right pqr"><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                  class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div>
            </div>
          </div>
          <div class="container-body mt-4">
            <div class="row r3 ">
              <div class="col-md-5 p-0 klo">
                <p>${res.description}</p>
                <span class="d-block fw-bold text-dark fs-5">$${res.price}</span>
                <span class="d-block fw-bold text-dark fs-5">${res.brand}</span>
                <span class="d-block fw-bold text-danger fs-5">${res.category}</span>
              </div>
              <div class="col-md-2"></div>
              <div class="col-md-5"> <img
                  src="${res.images[0]}"
                  width="90%" height="95%"> </div>
            </div>
          </div>
          <div class="footer d-flex flex-column mt-5">
            <div class="row r4">

              <div class="col-md-2 mio "><button type="button" class="btn btn-outline-warning" onclick="addToCart('${res.id}')"><a href="#">ADD TO
                    CART</a></button> </div>
              <div class="col-md-2 mio "><button type="button" class="btn btn-outline-warning"><a href="#">BUY
                    NOW</a></button></div>
            </div>
          </div>
        </div>`)
    }
    });

}

if(JSON.parse(localStorage.getItem('cart')).length >0){
    JSON.parse(localStorage.getItem('cart')).filter((p,i)=>{
            $('.cart-m').append(`
            <div class="row">
                                
            <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                    <!-- Image -->
                                    <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                    <img src = "${p.thumbnail}" class="w-100" />
                                        
                                    </div>
                                    <!-- Image -->
                                </div>
                                <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                    <!-- Data -->
                                    <p><strong>${p.title}</strong></p>
                                    <p>${p.description}</p>
                                    <!-- Price -->
                                    <p class="text-startr">
                                        <strong>$${p.price}</strong>
                                    </p>
                                    <!-- Price -->
                                    <button type="button" class="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                                        title="Remove item text-xl" onclick="del(${i})">
                                        <i class="fas fa-trash text-xl"></i>
                                    </button>
        
                                </div>
                                </div>
            ` )
        
        });
}else {
            
    $('.cart-m').append(`<div class="container text-center">
    <img src="images/empty-state-cart.svg" alt="">
    <p class="p-2 fs-3 fw-bold text-muted">Your shopping cart looks empty</p>
    <p>What are you waiting for?</p>
    </div>` )
}

    
function del(i){
    cart = JSON.parse(localStorage.getItem('cart'))
    cart.splice(i,1);
    addToLocalStorage(cart)
    window.location.reload()
}

function addToLocalStorage(cart) {
    if(localStorage.getItem("cart")){
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}


function addToCart(id){
    $.ajax({url: "https://dummyjson.com/products/"+id, success: function(res){
        const getCart = JSON.parse(localStorage.getItem('cart'))
        getCart.push(res)
        addToLocalStorage(getCart)
        $('.toast').toast('show');
        // $('#tostModal').toast('show');
    }});
}


var isLogged = localStorage.getItem('user')
var logname = localStorage.getItem('username')

if(isLogged){
    $('#signup').remove()
    $('#welcome').html(` Welcome ${logname}`)
    $('#logout').css('display','initial')
}
$('#logout').click(function(){
    localStorage.clear()
    location.reload()
})
    $("#signupForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 2 
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password" 
            },
            email: {
                required: true,
                email: true
            },
            agree: "required"
        },
        messages: {
            username: {
                required: "<span class='text-danger p-1'>* Please enter  username</span",
                minlength: "<span class='text-danger p-1'>* Your username must consist of at least 2 characters</span>"
            },
            email: {
                required: "<span class='text-danger p-1'>* Please enter email</span",
                email: "<span class='text-danger p-1'>Please enter a valid email </span>"
            },
            password: {
                required: "<span class='text-danger p-1'>* Please enter password </span>",
                minlength: "<span class='text-danger p-1'>* Your password must be consist of at least 5 characters </span>"
            },
            confirm_password: {
                required: "<span class='text-danger p-1'>* Please enter password </span>" ,
                minlength: "<span class='text-danger p-1'>*  Your password must be consist of at least 5 characters </span>",
                equalTo: "<span class='text-danger p-1'> * Please enter the same password as above</span>"
            },
            agree: "<span class='text-danger p-1'>* Please accept our policy </span>"
        },
        submitHandler: function() {
           localStorage.setItem('email',$('#email').val()) 
           localStorage.setItem('password',$('#password').val()) 
           localStorage.setItem('username',$('#username').val()) 
           location.href='login.html'
          }
    });



    $("#loginForm").validate({
        rules: {
            email: {
                required: true,
            },
            password: {
                required: true,
            }
        },
        messages: {
            email: {
                required: "<span class='text-danger p-1'>* Please enter email</span>",
            },
            password: {
                required: "<span class='text-danger p-1'>* Please enter password </span>",
            }
        },
        submitHandler: function() {
           theemail = localStorage.getItem('email') 
           thepwd = localStorage.getItem('password') 
           if(theemail == $('#email').val() && thepwd == $('#password').val()){
            localStorage.setItem('user',$('#email').val())
            location.href='index.html'
           } else {
                $('.error').html(`<div class="alert alert-danger" role="alert">
                email or password in valid
              </div>`)
           }
           }
    });