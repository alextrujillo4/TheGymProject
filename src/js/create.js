
import {auth, firestore} from "./firebase";



let excercisesRef =firestore.collection('Excercises');
let routinesRef = firestore.collection('Routines');


let excChecked = [];

function getUpperBody(){
//upper body query 
let queryUpBody = excercisesRef.where('muscleType', '==', 'upperBody').get()
.then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {

      let name = doc.data().name
      let id = doc.data().id
      console.log(doc.id, '=>', name);
 
 
      $("#upper").append(`
      <li id="${id}" name="${name}">
      <div class="mdc-form-field">
      <div class="mdc-checkbox">
        <input type="checkbox"
               class="mdc-checkbox__native-control"
               id="checkbox-1"
               />
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark"
               viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
      
      </div>
      <label for="checkbox-1">${name}</label>
    </div>
    </li>
      `)
 

    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

}

function getLowerBody(){
 //lower body query
 let queryLowBody = excercisesRef.where('muscleType', '==', 'lowerBody').get()
 .then(snapshot => {
   if (snapshot.empty) {
     console.log('No matching documents.');
     return;
   }  

   snapshot.forEach(doc => {
    let name = doc.data().name
    let id = doc.data().id
     console.log(doc.id, '=>', name);


     $("#lower").append(`
     <li id="${id}" name="${name}">
     <div class="mdc-form-field">
     <div class="mdc-checkbox">
       <input type="checkbox"
              class="mdc-checkbox__native-control"
              id="checkbox-1"
              />
       <div class="mdc-checkbox__background">
         <svg class="mdc-checkbox__checkmark"
              viewBox="0 0 24 24">
           <path class="mdc-checkbox__checkmark-path"
                 fill="none"
                 d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
         </svg>
         <div class="mdc-checkbox__mixedmark"></div>
       </div>
     
     </div>
     <label for="checkbox-1">${name}</label>
   </div>
   </li>
     `)




    //console.log(checkbox.checked) //will return true or false



   });
 })
 .catch(err => {
   console.log('Error getting documents', err);
 });
}

function getCore(){
//core query
let queryCore = excercisesRef.where('muscleType', '==', 'core').get()
.then(snapshot => {
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  snapshot.forEach(doc => {
    let name = doc.data().name;
    let id = doc.id;
   
    console.log(doc.id, '=>', name);
    
let tam =$("#core").length;
    $("#core").append(`
    <li name="${name}" id="${id}">
    <div class="mdc-form-field">
    <div class="mdc-checkbox">
      <input type="checkbox"
             class="mdc-checkbox__native-control"
             id="checkbox-1"
             />
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark"
             viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
    
    </div>
    <label for="checkbox-1">${name}</label>
  </div>
  </li>`)
  });
})
.catch(err => {
  console.log('Error getting documents', err);
});

}

//core isChecked
$('#core').on('change', ':checkbox', function(event){
event.preventDefault()
let par = event.target.parentNode.parentNode.parentNode; 
if(this.checked){
    //console.log(par);
    par.setAttribute('isChecked',true);
   
} else {
    par.removeAttribute('isChecked');
}

    });

//upperBody isChecked 
$('#upper').on('change', ':checkbox', function(event){
    event.preventDefault()
    let par = event.target.parentNode.parentNode.parentNode; 
    if(this.checked){
        //console.log(par);
        par.setAttribute('isChecked',true);
       
    } else {
        par.removeAttribute('isChecked');
    }
    
        });

//lowerBody isChecked
$('#lower').on('change', ':checkbox', function(event){
    event.preventDefault()
    let par = event.target.parentNode.parentNode.parentNode; 
    if(this.checked){
        //console.log(par);
        par.setAttribute('isChecked',true);
       
    } else {
        par.removeAttribute('isChecked');
    }
    
        });

      









//crear rutina (verifica las casillas que se encuentren checked)
$("#createbtn").on("click", function (event) {
    event.preventDefault();
    auth.onAuthStateChanged(function (user) {
          
 
  

    
    let core =$('ul#core li')
    let upper =$('ul#upper li')
    let lower =$('ul#lower li')

       //checa valores checked del muscleType upper
       for (let i=0; i<upper.length; i++){
        let checkUpper = upper[i].getAttribute('isChecked')
        //console.log(check)
        if (checkUpper != null){
            console.log(upper[i].getAttribute('id'));

            let newExc ={
                id: upper[i].getAttribute('id'),
                name: upper[i].getAttribute('name')
            }
            excChecked.push(newExc)
        }

       // console.log($('ul#core li')[i].getAttribute('id'));
    }


    //checa valores checked del muscleType core
    for (let i=0; i<core.length; i++){
        let checkCore = core[i].getAttribute('isChecked')
        //console.log(check)
        if (checkCore != null){
            console.log(core[i].getAttribute('id'), '=>', core[i].getAttribute('name'));
            let newExc ={
                id: core[i].getAttribute('id'),
                name: core[i].getAttribute('name')
                
                
            }
            excChecked.push(newExc)

        

        }

       // console.log($('ul#core li')[i].getAttribute('id'));
    }

  
     //checa valores checked del muscleType lower
     for (let i=0; i<lower.length; i++){
        let checkLower = lower[i].getAttribute('isChecked')
        //console.log(check)
        if (checkLower != null){
            console.log(lower[i].getAttribute('id'));
            let newExc ={
                id: lower[i].getAttribute('id'),
                name: lower[i].getAttribute('name'),
                
            }
            excChecked.push(newExc)
        }

       // console.log($('ul#core li')[i].getAttribute('id'));
    }

   let routine = {
     excercises: excChecked,
     userId:  user.uid,
     isPrivate: true
   }

   console.log(routine);


//excChecked.push(newExc);
console.log(excChecked);


});

});


getUpperBody();
getCore();
getLowerBody();


 


  