
/*** JS Regex Substitution (in progress) ***/
/*** Aims to reproduce fine typesetting ***/

/*** At the time being, only block level element are parsed, skipping childnodes to protect <a href> and <img src> from being filtered ***/

/*** TODO : include missing childnodes but not <a> and <img>
/*** TODO : fix Multiple <br>

/*** ddelcourt 1.24 ***/


// Defining constants
const nothing = "";
const highlightSpan = '<span class="grep">';
const highlightSpan2 = '<span class="grep2">';
const spanAfter = '</span>';

// Array of objects for parsing
const arrayOfObjects = [
  {
    /*** Espaces multiples (doubles et plus) — ne touche pas aux sauts de ligne ***/
    regEx: / {2,}/g,
    replaceString: " ",
    spanBefore: nothing,
    spanAfter: nothing
  },  
  {
    /*** Retours à la ligne multiples ***/
    /*** Peut devenir plus restrictif encore ***/
    regEx: /(\<br\>){4,}/g,
    replaceString: "<br><br>",
    spanBefore: nothing,
    spanAfter: nothing
  },
  // {
  //   /*** Majuscule sur la première lettre du premier mot si elle est en minuscule - Saute les caractères non alphabétiques
  //   /*** Contourne le problème du css:first-letter qui ne fonctionne que dans les display: block; ***/
  //   /*** Must refine because of delimiters / Only apply on first-level node ***/
  //   regEx: /(^\W*)\b(?<!\,\s|\>)([a-z])/g,
  //   replaceString: '$1<span class="grep2 capitalize">$2</span>',
  //   spanBefore: highlightSpan2,
  //   spanAfter: spanAfter
  // },

  {
    /*** Espace fine insécable avant le point-virgule ***/
    regEx: /(\s*)(;)/g,
    replaceString: " $2",
    spanBefore: highlightSpan,
    spanAfter: spanAfter
  },
  {
    /*** Espace fine insécable avant ? et ! et : et » ***/
    regEx: /(\s*(\?|!|:|»))/g,
    replaceString: " $2",
    spanBefore: highlightSpan,
    spanAfter: spanAfter
  },
  {
    /*** espace fine après « ***/
    regEx: /(«\s*)/g,
    replaceString: "« ",
    spanBefore: highlightSpan,
    spanAfter: spanAfter
  },

  /*** Catch brackets and their content ***/
  // {
  //   regEx: /(\[(.+?)\])/g,
  //   replaceString: '<sup class="grep"> $1</sup>',
  //   spanBefore: nothing,
  //   spanAfter: nothing
  // },
  {
    /*** Points de suspension ***/
    regEx: /(\.{2,})/g,
    replaceString: "…",
    spanBefore: highlightSpan,
    spanAfter: spanAfter
  },
  {
    /*** Mettre les er / re /e après une chiffre en sup ***/
    regEx: /(?<=\d)(er|re|e)\b/g,
    replaceString: '<sup class="grep">$1</sup>',
    spanBefore: highlightSpan,
    spanAfter: spanAfter
  },
  {
    /*** Tiret long au lieu de trait d'union ***/
    regEx: /(?<=\s|^|>)-|–(?=\s|,|&)/g,
    replaceString: "—",
    spanBefore: highlightSpan,
    spanAfter: spanAfter
  },
  {
    /*** Mettre les x correctement dans les dimensions ***/
    regEx: /(?<=\s|d)x(?=\s*\d)/g,
    replaceString: " × ",
    spanBefore: highlightSpan,
    spanAfter: spanAfter
  },
  
  {
    /*** Minutes après les heures en sup */
    regEx: /(?<=\dh)(\d{2}\b)/g,
    replaceString: '<sup class="grep">$1</sup>',
    spanBefore: highlightSpan,
    spanAfter: spanAfter
  }
  // ,
  // {
  //   /*** Ligatures OE ***/
  //   regEx: /oe/g,
  //   replaceString: "œ",
  //   spanBefore: highlightSpan,
  //   spanAfter: spanAfter
  // },
  // {
  //   regEx: /Oe/g,
  //   replaceString: "Œ",
  //   spanBefore: highlightSpan,
  //   spanAfter: spanAfter
  // },
  // {
  //   /*** Ligatures AE ***/
  //   regEx: /ae/g,
  //   replaceString: "æ",
  //   spanBefore: highlightSpan,
  //   spanAfter: spanAfter
  // },
  // {
  //   /*** /Ae/g ***/
  //   regEx: /Ae/g,
  //   replaceString: "Æ",
  //   spanBefore: highlightSpan,
  //   spanAfter: spanAfter
  // }  

];

function typeSet(text) {
  let txt = text;
  for(const r of arrayOfObjects) {
      txt = txt.replace(r.regEx, r.replaceString);
  }
  return txt;
}

// Make typeSet available globally (no ES6 export for maximum compatibility)
window.typeSet = typeSet;

// Auto-execution code commented out - we call typeSet explicitly in animationController
/*
const elementList = document.querySelectorAll(".typeSet, h1, h2, h3, h4,li");

// console.clear();

for (let i = 0; i < elementList.length; i++) {
  const element = elementList[i];
  
    // elementList[i].style.backgroundColor = "#E4EAF587";


// console.log("Element", i, element);
// console.log("Child nodes", i, element.childNodes);

  for (let j = 0; j < element.childNodes.length; j++) {
    const childNode = element.childNodes[j];

    // Check if the node is a text node
    if (childNode.nodeType === Node.TEXT_NODE) {
      // Create a temporary span element
      const tempSpan = document.createElement("span");

      // Set the content of the span with the modified data
      let modifiedData = childNode.data;
      arrayOfObjects.forEach((obj) => {
        const regex = obj.regEx;
        const replaceString = obj.replaceString;
        const spanBefore = obj.spanBefore || "";
        const spanAfter = obj.spanAfter || "";

        // Apply transformations from regExArray
        modifiedData = modifiedData.replace(
          regex,
          `${spanBefore}${replaceString}${spanAfter}`
        );
      });

      tempSpan.innerHTML = modifiedData;

      // Replace the original text node with the modified span
      childNode.parentNode.replaceChild(tempSpan, childNode);

 
//     console.log("Child node data", j, tempSpan.innerHTML);
    }
  }
}
*/
