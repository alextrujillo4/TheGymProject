
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
        <li aria-checked="false" class="mdc-list-item" role="checkbox" id="${id}" name="${name}">
            <span class="mdc-list-item__graphic">
                <div class="mdc-checkbox">
                    <input class="mdc-checkbox__native-control"
                           id="demo-list-checkbox-item-3"
                           type="checkbox"/>
                    <div class="mdc-checkbox__background">
                      <svg class="mdc-checkbox__checkmark"
                           viewBox="0 0 24 24">
                        <path class="mdc-checkbox__checkmark-path"
                              d="M1.73,12.91 8.1,19.28 22.79,4.59"
                              fill="none"/>
                      </svg>
                      <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                  </div>
            </span>
            <label class="mdc-list-item__text" for="demo-list-checkbox-item-3">${name}</label>
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
     <li aria-checked="false" class="mdc-list-item" role="checkbox" id="${id}" name="${name}">
            <span class="mdc-list-item__graphic">
                <div class="mdc-checkbox">
                    <input class="mdc-checkbox__native-control"
                           id="demo-list-checkbox-item-3"
                           type="checkbox"/>
                    <div class="mdc-checkbox__background">
                      <svg class="mdc-checkbox__checkmark"
                           viewBox="0 0 24 24">
                        <path class="mdc-checkbox__checkmark-path"
                              d="M1.73,12.91 8.1,19.28 22.79,4.59"
                              fill="none"/>
                      </svg>
                      <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                  </div>
            </span>
            <label class="mdc-list-item__text" for="demo-list-checkbox-item-3">${name}</label>
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
    <li aria-checked="false" class="mdc-list-item" role="checkbox" id="${id}" name="${name}">
            <span class="mdc-list-item__graphic">
                <div class="mdc-checkbox">
                    <input class="mdc-checkbox__native-control"
                           id="demo-list-checkbox-item-3"
                           type="checkbox"/>
                    <div class="mdc-checkbox__background">
                      <svg class="mdc-checkbox__checkmark"
                           viewBox="0 0 24 24">
                        <path class="mdc-checkbox__checkmark-path"
                              d="M1.73,12.91 8.1,19.28 22.79,4.59"
                              fill="none"/>
                      </svg>
                      <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                  </div>
            </span>
            <label class="mdc-list-item__text" for="demo-list-checkbox-item-3">${name}</label>
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
    let core =$('ul#core li');
    let upper =$('ul#upper li');
    let lower =$('ul#lower li');
       //checa valores checked del muscleType upper
       for (let i=0; i<upper.length; i++){
        let checkUpper = upper[i].getAttribute('isChecked');
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
//excChecked.push(newExc);
console.log(excChecked);


});


getUpperBody();
getCore();
getLowerBody();


 


  