
import {auth, firestore} from "./firebase";

const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
formField.input = checkbox;


let excercisesRef =firestore.collection('Excercises');

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
      console.log(doc.id, '=>', name);
 
 
      $("#upper").append(`
      <ul>
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
    </ul>
      `)
 
 const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
 const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
 formField.input = checkbox;
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
     console.log(doc.id, '=>', name);


     $("#lower").append(`
     <li>
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

const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
formField.input = checkbox;



    //console.log(checkbox.checked) //will return true or false



   });
 })
 .catch(err => {
   console.log('Error getting documents', err);
 });
}

function getCore(){
//core query
let cont = 0;
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
    <li position="${cont}" id="${id}">
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
  cont = cont+1
const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
formField.input = checkbox;




  });
})
.catch(err => {
  console.log('Error getting documents', err);
});

}

$('#core').on('change', ':checkbox', function(event){
event.preventDefault()
let par = event.target.parentNode.parentNode.parentNode; 
if(this.checked){
    console.log(par);
    par.setAttribute('isChecked',true);
   
} else {
    par.removeAttribute('isChecked');
}


     //stuff 
    });

$("#createbtn").on("click", function (event) {
    event.preventDefault();

    let tam = $('ul#core li').length;
    let core =$('ul#core li')

    for (let i=0; i<tam; i++){
        if (core[i].getAttribute('isChecked') == true){
            console.log(core[i].getAttribute(id));
        }

       // console.log($('ul#core li')[i].getAttribute('id'));
    }

    console.log(tam);

    let newExc = {
        id :"id",
        name : "prueba"
    }

excChecked.push(newExc);
console.log(excChecked.length);
});

getLowerBody();
getUpperBody();
getCore();


 


  