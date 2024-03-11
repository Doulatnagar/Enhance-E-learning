// Admin page js
//upload img in admin page
function uploadimages(e) {
  let reader = new FileReader();
  reader.addEventListener('load',function () {
      if (this.result && localStorage) {
          const imagesArray = localStorage.getItem('images');
          console.log(imagesArray);
          let images = [];
          if (imagesArray) {
              images = [...JSON.parse(imagesArray)];
              images.push(reader.result);
          } else {
              images.push(reader.result);
          }
          localStorage.setItem('images', JSON.stringify(images));
          alert("Image Storage in gellery page");
      } else{
          alert('not success');
      }
  })
  reader.readAsDataURL(document.getElementById('file').files[0]);
}

//end img upload
// delete user.
function deleteuser(userdetails) {
  let arr = JSON.parse(localStorage.getItem("details"));
  arr.splice(userdetails, 1);
  localStorage.setItem("details", JSON.stringify(arr));
}
// Accept userId.
function acceptdeletuser(userdetails) {
  let arr2 = JSON.parse(localStorage.getItem("acceptData"));
  arr2.splice(userdetails, 1);
  localStorage.setItem("acceptData", JSON.stringify(arr2));
  location.reload();
}

// Create new array in localstorage for Accept userid
function acceptUser(userdetails) {
  let pendingData = JSON.parse(localStorage.getItem("details"));
  let acceptData = JSON.parse(localStorage.getItem("acceptData"));
  if (
    localStorage.getItem("acceptData") &&
    typeof acceptData === "object"
  ) {
    console.log("hell");
    acceptData.unshift(pendingData[userdetails]);
    localStorage.setItem("acceptData", JSON.stringify(acceptData));
  } else {
    let acceptData = [];
    acceptData.push(pendingData[userdetails]);
    localStorage.setItem("acceptData", JSON.stringify(acceptData));
  }
  let arr = JSON.parse(localStorage.getItem("details"));
  arr.splice(userdetails, 1);
  localStorage.setItem("details", JSON.stringify(arr));
  location.reload();
}

// registration details in localstorage
function registration(form) {
  alert("Your Request Send to Admin\n You can Login after Accept your request")
  form.preventDefault();
  let detailsone = {};
  for (let i = 0; i < form.target.length - 3; i++) {
    detailsone = { ...detailsone, [form.target[i].name]: form.target[i].value };
  }
  let detailsfirst = JSON.parse(localStorage.getItem("details"));
  if (detailsfirst && detailsfirst.length && typeof detailsfirst === "object") {
    detailsfirst.unshift(detailsone);
    localStorage.setItem("details", JSON.stringify(detailsfirst));
  } else {
    let imgArr = [];
    imgArr.push(detailsone);
    localStorage.setItem("details", JSON.stringify(imgArr));
    console.log("imgArr", imgArr);
  }
  location.reload();
}

//home page
function getingInfo() {
  alert("Welcome !");
  document.querySelector("#email_Id").innerHTML += "Email-Id: "+localStorage.getItem('Emailid');
 
  // for Image
      const images = JSON.parse(localStorage.getItem('images'));
      console.log('images', images);
      if (document.getElementById('imglists')) {
      images.map((val)=>{
          let preview = document.getElementById('imglists');
          preview.innerHTML += ['<div class="row my-3"><div class="d-flex justify-content-center border border-dark"><img class="imgadjust" src="'+ val +'" alt="Img" height="350" srcset=""></div><div class="col-4 border d-grid"><button class="btn btn-outline-info fa fa-heart"></button></div><div class="col-4 border"><input type="text" class="form-control" placeholder="Comment"></div><div class="col-4 border text-center"><button class="btn btn-outline-dark"><i class="fa fa-share"></i> Share</button></div></div>'].join('');
       });
     }
}


// Admin Page geting database

function getDataBase() {
  alert("Welcome Boss !");
  console.log(localStorage.getItem("details"));
  JSON.parse(localStorage.getItem("details")).map((val, idx) => {
    // console.log(val.EmailId,val.firstname+val.lastname);
    let tbody = document.querySelector("#getdatabse");
    tbody.innerHTML +=
      "<tr> <td>" +
      val.firstname +
      " " +
      val.lastname +
      "</td><td>" +
      val.EmailId +
      '</td><td><button class="btn btn-outline-info" onclick="deleteuser(' +
      idx +
      ')"><i class="fa fa-trash"></i></button><button class="btn btn-outline-info" onclick="acceptUser(' +
      idx +
      ')"><i class="fa fa-check"></i></button></td> </tr>';
  });
  JSON.parse(localStorage.getItem("acceptData")).map((val, idx) => {
    let acceptTable = document.querySelector("#acceptdata");
    acceptTable.innerHTML +=
      "<tr> <td>" +
      val.firstname +
      " " +
      val.lastname +
      "</td><td>" +
      val.EmailId +
      '</td><td><button class="btn btn-outline-info" onclick="acceptdeletuser(' +
      idx +
      ')"><i class="fa fa-trash"></i></button> </tr>';
  });
}

// check login details is register or Not
function checkcredential(credent) {
  credent.preventDefault();
  console.log("login-email : ", credent.target.loginName.value);
  console.log("login-password : ", credent.target.loginPassword.value);

  let database = JSON.parse(localStorage.getItem("acceptData"));
  // admin-crediantial
  if (
    credent.target.loginName.value === "doulatkumar@gmail.com" &&
    credent.target.loginPassword.value === "Doulat123"
  ) {
    window.location.href = "adminPage.html";
  } else if (
    database &&
    database.filter((val) => {
      console.log(credent.target.loginName.value,val);
      return (
        credent.target.loginName.value === val.EmailId &&
        credent.target.loginPassword.value === val.password
      );
      
    }).length
  ) {
    console.log(credent.target.loginName.value);
    window.location.href = "Home_page.html";
    localStorage.setItem("Emailid", credent.target.loginName.value);
  } else {
    alert(" Email-Id or password is Wrong\n OR \n Request is Pending"  );
  }
}

//For login and registration for validation
function checkspecail(n) {
  var arr = "1234567890!@#$%^&*()~[]{}|_+-=,/<>?;:'";
  var arr2 = '"';
  if (arr.includes(n[n.length - 1]) || arr2.includes(n[n.length - 1])) {
    return true;
  }
  return false;
}

function regisusername(e) {
  let val = e.value;
  if (val.includes(" ") || checkspecail(val)) {
    e.value = val.slice(0, -1);
    alert(
      "Please enter valid username \nUserName should not cantain ,special char and space"
    );
  }
}

function numbercheck(n) {
  var arr = "1234567890!#$%^&*()~[]{}|_+-=,/<>?;:'";
  var arr2 = '"';
  if (arr.includes(n[n.length - 1]) || arr2.includes(n[n.length - 1])) {
    return true;
  }
  return false;
}

function loginusername(e) {
  let val = e.value;
  if (val.includes(" ") || numbercheck(val)) {
    e.value = val.slice(0, -1);
    alert(
      "Please enter valid username \nUserName should not cantain ,special char and space"
    );
  }
}

//--------
