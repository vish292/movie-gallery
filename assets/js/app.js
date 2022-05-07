
let cl = console.log;

const showModel = document.getElementById("showModel")
const backDrop =document.getElementById("backDrop")
const myModal =document.getElementById("myModal")
const addmovie =document.getElementById("addmovie")
const myclosebtn =Array.from(document.querySelectorAll(".myclose"))
const title = document.getElementById("title")
const imgurl = document.getElementById("imgurl")
const rating = document.getElementById("rating")
const info =document.getElementById("info")
const movieform =document.getElementById("movieform")
const updatebtn = document.getElementById("update")
let moviearr =[];
if(localStorage.getItem("setmovie")){
    moviearr = JSON.parse(localStorage.getItem("setmovie"));
    // let moviedata = JSON.parse(localStorage.getItem("setmovie"))
    templating(moviearr)
}



function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }


let showModelhandler=(eve) =>{
    // toggelshowclass(backDrop,"show")
    // toggelshowclass(myModal,"show")
// backDrop.classList.toggle("show")
// myModal.classList.toggle("show")

toggelshowclass()
}

// function toggelshowclass(ele,nameofclass){
    // ele.classList.toggle(nameofclass)

// }



function toggelshowclass(){
    backDrop.classList.toggle("show")
    myModal.classList.toggle("show")
}



let onclosehandler =(eve) =>{
    // backDrop.classList.remove("show")
    // myModal.classList.remove("show")
    // toggelshowclass(backDrop,"show")
    // toggelshowclass(myModal,"show")
    toggelshowclass()
}


let onaddmoviehandler =(eve) =>{

    // eve.preventDefault();
    let movieobj={
        title: title.value,
        imgurl : imgurl.value,
        rating: rating.value,
        id :uuidv4()

    }

    moviearr.push(movieobj);
    // function templating(arr){
    //     let result ="";
    //     arr.forEach(ele =>{
    //        result += `
    //         <div class="col-md-4">
    //               <div class="card">
    //                  <div class="card-body">
    //                     <h5>${ele.title}</h5>
    //                     <img src="${ele.imageurl}" alt="">
    //                     <p>${ele.rating}</p>
    //                  </div>
    //               </div>
    //            </div>
    //          `
    //     })
    //     info.innerHTML =result;
    // }

    localStorage.setItem("setmovie",JSON.stringify(moviearr))
    templating(moviearr)
    title.value ="" ;
    imgurl.value ="";
    rating.value ="";
   
    toggelshowclass()

}

function onedithandler(eve) {
    cl("edit")
    let getid = eve.dataset.id;
    cl(getid);

    localStorage.setItem("setmovieid",getid)

    let data = moviearr.find(obj =>{
        return obj.id === getid
    })
    cl(data)

    title.value = data.title;
    imgurl.value = data.imgurl;
    rating.value = data.rating
    toggelshowclass();
    updatebtn.classList.remove("d-none")
    addmovie.classList.add("d-none")
}


let onupdatehandler =(eve) =>{
    let getid = localStorage.getItem("setmovieid")

    moviearr.forEach(ele =>{
        if(ele.id=== getid){
            ele.title =title.value;
            ele.imgurl = imgurl.value;
            ele.rating = rating.value;
        }

    }) 
    localStorage.setItem("setmovie",JSON.stringify(moviearr));
    templating(moviearr);
    updatebtn.classList.add("d-none")
    addmovie.classList.remove("d-none")
    movieform.reset()

}

let ondeletehandler =(eve) =>{
    let getid = eve.dataset.id;
    cl(getid)
   let deletemovie =moviearr.filter(obj =>{
       return obj.id != getid
   })
   cl(deletemovie)
   localStorage.setItem("setmovie",JSON.stringify(deletemovie))
   templating(deletemovie)
   location.reload()
}




function templating(arr){
    let result ="";
    arr.forEach(ele =>{
       result += `
        <div class="col-md-4">
              <div class="card">
                 <div class="card-body">
                    <h5>${ele.title}</h5>
                    <img src="${ele.imgurl}" alt="" class="img-fluid">
                    <p>${ele.rating}</p>
                    <span class="edit">
                    <i class="fas fa-edit"  data-id="${ele.id}"onclick="onedithandler(this)"></i>
                    <i class="fas fa-trash" data-id="${ele.id}" onclick="ondeletehandler(this)"></i>
                    </span>
                    
                 </div>
              </div>
           </div>
         `
    })
    info.innerHTML =result;
}
templating(moviearr)
updatebtn.addEventListener("click",onupdatehandler)
addmovie.addEventListener("click",onaddmoviehandler)
showModel.addEventListener("click", showModelhandler);
myclosebtn.forEach(btn =>{
    btn.addEventListener("click",onclosehandler)

})