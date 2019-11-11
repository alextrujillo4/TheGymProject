import "../index.html";
import "../scss/style.scss";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCFloatingLabel } from "@material/floating-label";
import { MDCSnackbar } from "@material/snackbar";
import {MDCRipple} from '@material/ripple';

const username = new MDCTextField(document.querySelector('.username'));
const password = new MDCTextField(document.querySelector('.password'));

new MDCRipple(document.querySelector('.cancel'));
new MDCRipple(document.querySelector('.next'));

const author = new MDCTextField(document.querySelector(".author"));
const title = new MDCTextField(document.querySelector(".title"));
const content = new MDCTextField(document.querySelector(".content"));
const snackbar = new MDCSnackbar(document.querySelector(".mdc-snackbar"));

const author_edit = new MDCTextField(document.querySelector(".author-edit"));
const title_edit = new MDCTextField(document.querySelector(".title-edit"));
const content_edit = new MDCTextField(document.querySelector(".content-edit"));

const dialog = new MDCDialog(document.querySelector(".mdc-dialog"));
const dialog_edit = new MDCDialog(
  document.querySelector(".mdc-dialog---editable")
);

const URL = " https://us-central1-gymproject-9f46b.cloudfunctions.net";
const URL_TEST = "http://localhost:5001/gymproject-9f46b/us-central1";

function callFunctions() {
  $.ajax({
    url: URL + "/helloWorld",
    method: "GET",
    dataType: "json",
    success: responseJSON => {
      console.log("Connexión Exitosa");
      //console.log(responseJSON)
    },
    error: function(err) {
      console.log("Connexión Error");
      console.log(err)
    }
  });
}

callFunctions();


