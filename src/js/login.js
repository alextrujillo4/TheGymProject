import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import {MDCLinearProgress} from "@material/linear-progress";

new MDCRipple(document.querySelector('.cancel'));
new MDCRipple(document.querySelector('.next'));

const username = new MDCTextField(document.querySelector('.username'));
const password = new MDCTextField(document.querySelector('.password'));
const linearProgress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));
linearProgress.close();
//const URL = "https://us-central1-gymproject-9f46b.cloudfunctions.net";
const URL = "http://localhost:5000/gymproject-9f46b/us-central1"
