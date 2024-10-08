// paddy categories load to fetch

const loadCatagories = () => {
    document.getElementById("spinner").classList.remove("hidden")
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res => res.json())
    .then(data => { 
      setTimeout(() => {
        document.getElementById("spinner").classList.add("hidden")
        displayCategories(data.categories)
      },2000)
      
    })
    .catch((error)=> console.log(error));
}

// paddy categories display 

const displayCategories = (data) => {
  const categoryContainer = document.getElementById("categories");

  data.forEach((item) => {
      
          // //   crated a button
             const card = document.createElement("div");
             card.classList.add = " flex justify-between";
             card.innerHTML = `
             <button  id="btn-${item.category}" onclick="specificPets('${item.category}')" class="w-full border btn btn-outline h-[70px] ButtonColorRemove">
             <img src="${item.category_icon}"/>
             ${item.category}
             </button>
                
         `;
 

          // // added button to catagories 
          
          categoryContainer.appendChild(card);
          
  });

  
};



// cat and dogs load to fetch

const loadPetsData = (item) => {
document.getElementById("spinner").classList.remove("hidden")
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
  .then((res) => res.json())
  .then((data) => {
    setTimeout(() => {
      if(item){
        const decendingItem = data.pets.sort((a,b) => b.price - a.price);
        loadPetsDetails(decendingItem);
        

      }
      loadPetsDetails(data.pets);
    },2000)
    
  })
  .catch((error) => console.log("Error loading pets data:", error));
}

const loadPetsDetails = (pets) => {
document.getElementById("spinner").classList.add("hidden")

  // console.log(pets);
  const peatsContainur = document.getElementById("catsdetails");
  peatsContainur.innerHTML='';

  if(pets.length==0){
      peatsContainur.classList.remove('grid')
      peatsContainur.innerHTML=
      `
      <div class="flex flex-col justify-center items-center gap-6 bg-gray-100 text-center rounded-xl h-[650px] px-2 md:px-8 lg:px-16">
    <img class="w-[150px] md:w-[250px]" src="images/error.webp"/>
    <h3 class="text-2xl md:text-3xl font-bold ">No Information Available</h3>
    <p class="text-gray-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
    its layout. The point of using Lorem Ipsum is that it has a.</p>
       </div>
      `
  }
  else{
      peatsContainur.classList.add('grid')
  }
   
  pets.forEach ((pets) => {
  
     const card = document.createElement("div")
     card.innerHTML =`
          <div class="p-2 border rounded-lg ">
          <img src=${pets.image} alt="" class="rounded-xl w-full h-[200px]" />

          <div class="mt-3  ">
                  <h3 class="py-4 font-bold text-2xl ">${pets.pet_name}</h3>
                 <p> <i class="fa-brands fa-slack"></i>  Breed : ${pets.breed}</p>
                 
                 <p> <i class="fa-regular fa-calendar"></i> Birth: ${pets.date_of_birth}</p>
                 <p> <i class="fa-solid fa-mercury"></i> Gender: ${pets.gender}</p>
                 <p> <i class="fa-solid fa-dollar-sign"></i>  price: ${pets.price}$</p>
          </div>
                <div class=" mt-5 flex gap-8 items-center">
                    <p onclick="LikeButton('${pets.image}')" class="btn btn-outline px-5 btn-sm" > <i class="fa-solid fa-thumbs-up"></i></p>
                   <button onclick="AdoptDetails()" class="btn btn-outline btn-sm">Adopt</button>
                   <button onclick="modalDetails('${pets.petId}')" class="btn btn-outline btn-sm " >Details</button>
                
                </div>
          </div>

     
     `

     peatsContainur.append(card)

  })


}

function specificPets(pets) {
document.getElementById("spinner").classList.remove("hidden")

const peatsContainur = document.getElementById("catsdetails");
  peatsContainur.innerHTML='';



  fetch(`https://openapi.programming-hero.com/api/peddy/category/${pets}`)
    .then(res => res.json())
    .then(data => {

    RemoveColor()


      const AddButtonColors = document.getElementById(`btn-${pets}`)
      AddButtonColors.classList.add('ButtonColor')

      setTimeout(() => {
        loadPetsDetails(data.data);
      },2000)
      
    })
    
  
}

function RemoveColor(){
  const RemoveColors=document.getElementsByClassName('ButtonColorRemove')

  for(let Item of RemoveColors){
    Item.classList.remove('ButtonColor')
  }
}

// Like Button Clicked :
const LikeButton = ID => {
  AddedImage(ID);
};

// Added New Box Image Items :
const AddedImage = Item => {
  const LikesPetsContainer = document.getElementById('like-btn');

  const CreatedBox = document.createElement('div');
  CreatedBox.innerHTML = `
     <div>
      <img class="rounded-lg" src="${Item}"/>
     </div>
    
    `;
  LikesPetsContainer.appendChild(CreatedBox);
};


  const btnsort=() => {
    const peatsContainur = document.getElementById("catsdetails");
    peatsContainur.innerHTML='';

    loadPetsData(true) 
  }


    // no-2 ditels btn click start

   function modalDetails(pet){
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${pet}`)
    .then(res=>res.json())
    .then(data=>ShowDetailsModal(data.petData))
   }

function ShowDetailsModal(Details){

const ModalContainer=document.getElementById('ModalContainer')
ModalContainer.innerHTML=
`
<div class="">
  <img class="w-[500px] h-[250px]" src="${Details.image}"/>
  <h1 class=" my-5 font-bold text-lg">${Details.pet_name} </h1>
  <div class="grid grid-cols-2 my-4">
    <p> <i class="fa-brands fa-slack"></i>  Breed : ${Details.breed}</p>           
    <p> <i class="fa-regular fa-calendar"></i> Birth: ${Details.date_of_birth}</p>
    <p> <i class="fa-solid fa-mercury"></i> Gender: ${Details.gender}</p>
    <p> <i class="fa-solid fa-dollar-sign"></i>  price: ${Details.price}$</p>
  </div>

  <div>
     <h1 class=" font-bold text-lg">Details Information</h1>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
         The point of using is that it has a more-or-less normal distribution of letters, as opposed to using.</p>
  </div>

</div>
`

document.getElementById("my_Custom_modal").showModal()
}

// Adopt Details
function AdoptDetails() {
  ShowModalAdopt();
}
function TimeOut() {
  let countdownNumber = 3;
  const countdownElement = document.getElementById('countdown');

  const intervalId = setInterval(() => {
    countdownNumber--;
    countdownElement.textContent = countdownNumber;

    if (countdownNumber === 0) {
      clearInterval(intervalId);
      document.getElementById('CustomModalTwo').close();
    }
  }, 1000);
}
function ShowModalAdopt() {
  const ModalAdopt = document.getElementById('ModalAdopt');
  ModalAdopt.innerHTML = `
    <div class="w-[350px] lg:w-[460px] mx-auto text-center">
      <h2 class="text-3xl font-bold mb-5 text-[#0E7A81]">Successfully !</h2>
    
      <i class="fa-regular fa-clock text-3xl"></i>
       <h2 class="mt-3 font-bold">Please waiting just few second ! </h2>
     
       <h1 class="text-2xl font-bold mt-4" id="countdown">3</h1>
       
    </div>
    `;
  document.getElementById('CustomModalTwo').showModal();

  TimeOut();
}

    // no-2 ditels btn click end



loadCatagories();
loadPetsData();
