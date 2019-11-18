
import {MDCFormField} from '@material/form-field';
//import {MDCCheckbox} from '@material/checkbox';

import {auth, firestore} from "./firebase";

const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
formField.input = checkbox;


let excercisesRef =firestore.collection('Excercises');

function getUpperBody(){
//upper body query 
let queryUpBody = excercisesRef.where('muscleType', '==', 'upperBody').get()
.then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {
      console.log(doc.id,'=>', doc.data());
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

     $("#lower").append(`<li>${name} </li>
     `)
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
    console.log(doc.id, '=>', doc.data());
  });
})
.catch(err => {
  console.log('Error getting documents', err);
});

}

getLowerBody();


 


  