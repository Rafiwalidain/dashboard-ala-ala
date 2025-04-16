var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  userName = document.getElementById("name"),
  age = document.getElementById("age"),
  city = document.getElementById("city"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  post = document.getElementById("post"),
  sDate = document.getElementById("sDate"),
  submitbtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title");

let getData = localStorage.getItem("userProfile") ? JSON.parse(localStorage.getItem("userProfile")) : [];

let isEdit = false,
  editId;
showInfo();

file.onchange = function () {
  if (file.files[0].size <= 2000000) {
    // 2MB
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      imgUrl = e.target.result;
      imgInput.src = imgUrl;
    };
    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("File terlalu besar. tolong pilih file dibawah 2MB.");
  }
};

function showInfo() {
  userInfo.innerHTML = "";
  document.querySelectorAll(".employeeDetails").forEach((info) => info.remove());
  getData.forEach((element, index) => {
    let createElement = `<tr class='employeeDetails'>
    <td>${index + 1}</td>
    <td><img src='${element.picture}' alt='' width='50' height='50'></td>
    <td>${element.employeeName}</td>
    <td>${element.employeeAge}</td>
    <td>${element.employeeCity}</td>
    <td>${element.employeeEmail}</td>
    <td>${element.employeePhone}</td>
    <td>${element.employeePost}</td>
    <td>${element.startDate}</td>

    <td>
        <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${
      element.employeePost
    }', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

        <button class="btn btn-warning" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${
      element.employeePost
    }', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

        <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>

     </td>
    </tr>`;

    userInfo.innerHTML += createElement;
  });
}
showInfo();

function deleteInfo(index) {
  if (confirm("Yakin mau menghapus data ini?")) {
    getData.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
  }
}

function readInfo(pic, name, age, city, email, phone, post, sDate) {
  (document.querySelector(".showImg").src = pic),
    (document.querySelector("#showName").value = name),
    (document.querySelector("#showAge").value = age),
    (document.querySelector("#showCity").value = city),
    (document.querySelector("#showEmail").value = email),
    (document.querySelector("#showPhone").value = phone),
    (document.querySelector("#showPost").value = post),
    (document.querySelector("#showsDate").value = sDate);
}

function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate) {
  isEdit = true;
  editId = index;
  imgInput.src = pic;
  userName.value = name;
  age.value = Age;
  city.value = City;
  email.value = Email;
  phone.value = Phone;
  post.value = Post;
  sDate.value = Sdate;

  submitbtn.innerText = "Update";
  modalTitle.innerHTML = "Update Form";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const information = {
    picture: imgInput.src.includes("person-fill.svg") ? "./img/person-fill.svg" : imgInput.src,
    employeeName: userName.value,
    employeeAge: age.value,
    employeeCity: city.value,
    employeeEmail: email.value,
    employeePhone: phone.value,
    employeePost: post.value,
    startDate: sDate.value,
  };

  if (!isEdit) {
    getData.push(information);
  } else {
    isEdit = false;
    getData[editId] = information;
  }

  localStorage.setItem("userProfile", JSON.stringify(getData));

  submitbtn.innerText = "Submit";
  modalTitle.innerHTML = "Isi Form";
  showInfo(getData);
  form.reset();

  imgInput.src = "./img/person-fill.svg";
  modal.style.display = "none";
  document.querySelector(".modal-backdrop").remove();
});

// Set menu item aktif berdasarkan halaman saat ini
function setActiveMenuItem() {
  const currentPage = window.location.pathname.split("/").pop();
  const menuItems = document.querySelectorAll("#sidebar .side-menu.top li a");

  menuItems.forEach((item) => {
    item.parentElement.classList.remove("active");
    if (item.getAttribute("href") === currentPage || (currentPage === "" && item.getAttribute("href") === "index.html")) {
      item.parentElement.classList.add("active");
    }
  });
}

// Panggil fungsi ini saat halaman dimuat
document.addEventListener("DOMContentLoaded", setActiveMenuItem);
