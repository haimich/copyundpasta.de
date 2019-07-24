import Vue from "vue";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faPinterestP } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// fas
import { faRss, faSearch, faTimesCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";

// far
import { faEnvelope, faComment, faClock, faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

config.autoAddCss = true;

export default () => {
  library.add(
    faRss, faPinterestP, faEnvelope, faSearch, faComment, faTimesCircle,
    faClock, faUserCircle, faQuestionCircle, 
  );
  
  Vue.component("FontAwesome", FontAwesomeIcon);
}
