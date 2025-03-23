var C=Object.defineProperty;var W=(r,e,t)=>e in r?C(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var u=(r,e,t)=>W(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const O=()=>{const r={SERVER_URI:void 0,LOGIN_URI:void 0};if(Object.values(r).some(e=>!e))throw new Error("Missing environment variable");return r},w=class w{constructor(){var e;try{const a=((e=new URLSearchParams(window.location.search).get("token"))==null?void 0:e.trim())||this.token;if(!a)throw new Error;this.token=a,this.clearSearch()}catch{this.logout()}}get token(){return localStorage.getItem(w.TOKEN_NAME)}set token(e){localStorage.setItem(w.TOKEN_NAME,e)}clearSearch(){const t=window.location.href.split("?")[0];window.history.replaceState({},document.title,t)}logout(){localStorage.removeItem(w.TOKEN_NAME),window.location=O().LOGIN_URI}};u(w,"TOKEN_NAME","regaleToken");let A=w,P=null;const q=()=>(P||(P=new A),P),v=async function(r,e=void 0){const t=await fetch(r,{method:e?"POST":"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${q().token}`},...e?{body:JSON.stringify(e)}:{}});if(t.status===401||t.status===403)return q().logout();if(t.ok)return await t.json();throw new Error(`${t.status}: ${t.statusText}`)},F=10,B=2.5,y=O().SERVER_URI,i={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:F},bookmarks:[]},V=function(r){const{recipe:e}=r.data;return{id:e.id,title:e.title,publisher:e.publisher,sourceUrl:e.source_url,image:e.image_url,servings:e.servings,cookingTime:e.cooking_time,ingredients:e.ingredients,...e.key&&{key:e.key}}},D=async function(r){try{const e=await v(`${y}/api/recipe/${r}`);i.recipe=V(e),i.bookmarks.some(t=>t.id===r)?i.recipe.bookmarked=!0:i.recipe.bookmarked=!1,console.log(i.recipe)}catch(e){throw console.error(`${e} 💥💥💥💥`),e}},K=async function(r){try{i.search.query=r;const e=await v(`${y}/api/recipe/search/${r}`);console.log(e),i.search.results=e.data.recipes.map(t=>({id:t.id,title:t.title,publisher:t.publisher,image:t.image_url,...t.key&&{key:t.key}})),i.search.page=1}catch(e){throw console.error(`${e} 💥💥💥💥`),e}},H=function(r=i.search.page){i.search.page=r;const e=(r-1)*i.search.resultsPerPage,t=r*i.search.resultsPerPage;return i.search.results.slice(e,t)},G=function(r){i.recipe.ingredients.forEach(e=>{e.quantity=e.quantity*r/i.recipe.servings}),i.recipe.servings=r},j=function(r){i.bookmarks.push(r),r.id===i.recipe.id&&(i.recipe.bookmarked=!0),v(`${y}/api/bookmarks/add`,{recipe:r})},J=function(r){const e=i.bookmarks.findIndex(t=>t.id===r);i.bookmarks.splice(e,1),r===i.recipe.id&&(i.recipe.bookmarked=!1),v(`${y}/api/bookmarks/remove`,{id:r})},Q=function(){v(`${y}/api/bookmarks`).then(r=>{const{bookmarks:e}=r;i.bookmarks=e})};Q();const Y=async function(r){const e=Object.entries(r).filter(n=>n[0].startsWith("ingredient")&&n[1]!=="").map(n=>{const s=n[1].split(",").map(c=>c.trim());if(s.length!==3)throw new Error("Wrong ingredient fromat! Please use the correct format :)");const[o,p,d]=s;return{quantity:o?+o:null,unit:p,description:d}}),t={title:r.title,source_url:r.sourceUrl,image_url:r.image,publisher:r.publisher,cooking_time:+r.cookingTime,servings:+r.servings,ingredients:e},a=await v(`${y}/api/recipe/upload`,t);i.recipe=V(a),j(i.recipe)},h="/assets/icons-LrhAoYAd.svg";class ${constructor(){u(this,"_data")}render(e,t=!0){if(!e||Array.isArray(e)&&e.length===0)return this.renderError();this._data=e;const a=this._generateMarkup();if(!t)return a;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",a)}update(e){this._data=e;const t=this._generateMarkup(),a=document.createRange().createContextualFragment(t),n=Array.from(a.querySelectorAll("*")),s=Array.from(this._parentElement.querySelectorAll("*"));n.forEach((o,p)=>{var c;const d=s[p];!o.isEqualNode(d)&&((c=o.firstChild)==null?void 0:c.nodeValue.trim())!==""&&(d.textContent=o.textContent),o.isEqualNode(d)||Array.from(o.attributes).forEach(g=>d.setAttribute(g.name,g.value))})}_clear(){this._parentElement.innerHTML=""}renderSpinner(){const e=`
      <div class="spinner">
        <svg>
          <use href="${h}#icon-loader"></use>
        </svg>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this._errorMessage){const t=`
      <div class="error">
        <div>
          <svg>
            <use href="${h}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${e}</p>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(e=this._message){const t=`
      <div class="message">
        <div>
          <svg>
            <use href="${h}#icon-smile"></use>
          </svg>
        </div>
        <p>${e}</p>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}}function z(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var R,T;function X(){if(T)return R;T=1,R=function(n){let s;if(n<0?(n=Math.abs(n),s="-"):s="",n===void 0)return"Your input was undefined.";if(isNaN(n))return`"${n}" is not a number.`;if(n==1e16)return`${s}9999999999999999`;if(n>1e16)return"Too many digits in your integer to maintain IEEE 754 Floating Point conversion accuracy.";if(Number.isInteger(n))return`${s}${n}`;if(n<1e-6)return"0";const o=n.toString(),p=o.split(".");let d=p[0],c;if(c=="0"&&d!=="0")return d;if(c=="0"&&d=="0")return"0";if(o.length>=17?c=p[1].slice(0,p[1].length-1):c=p[1],c=="99"&&d!=="0")return`${d} 99/100`;if(c=="99"&&d=="0")return"99/100";if(1-parseFloat(`.${c}`)<.0011&&(c="999"),c==null)return d;const g=c.split("").reverse().join(""),k=/^(\d+)\1{1,2}/;let _=g.match(k);if(_&&c.length>2){let f=_[0].split("").reverse().join(""),l=_[1].split("").reverse().join("");if(l.length>1){let b=l.split(""),N=1;for(let L=0;L<b.length;L++)N/=b[0]/b[L];N===1&&(l=b[0])}return l.length>1&&l.length%2===0&&(l=parseInt(l.slice(0,l.length/2),10)-parseInt(l.slice(l.length/2,l.length),10)===0?l.slice(0,l.length/2):l),r(c,l,f,d,s)}else return e(c,d,s)};function r(n,s,o,p,d){const g=n.length-o.length>=1?n.length-o.length:1,k=Math.pow(10,g),_=parseFloat(`0.${n}`),f=Math.pow(10,s.length),l=Math.round((_*f-_)*Math.pow(10,g)),b=(f-1)*k;return t(l,b,p,d,!0)}function e(n,s,o){const d=parseInt(n,10),c=Math.pow(10,n.length);return t(d,c,s,o,!1)}function t(n,s,o,p,d){const c=[2,3,5];if(d===!0)for(let l=3;l*l<=n;l+=2)n%l===0&&c.push(l);let g=0,k=1,_=n,f=s;for(;g<=c.length;)_%c[g]===0&&f%c[g]===0?(k=k*c[g],_=_/c[g],f=f/c[g]):g++;return a(f,_,o,p)}function a(n,s,o,p){return n===1&&s===1?(o=`${p}${(parseInt(o)+1).toString()}`,`${o}`):s===0?`${p}${o}`:o=="0"?`${p}${s}/${n}`:`${p}${o} ${s}/${n}`}return R}var Z=X();const ee=z(Z);class te extends ${constructor(){super(...arguments);u(this,"_parentElement",document.querySelector(".recipe"));u(this,"_errorMessage","We could not find that recipe. Please try another one!");u(this,"_message","")}addHandlerRender(t){["hashchange","load"].forEach(a=>window.addEventListener(a,t))}addHandlerUpdateServings(t){this._parentElement.addEventListener("click",function(a){const n=a.target.closest(".btn--update-servings");if(!n)return;const{updateTo:s}=n.dataset;+s>0&&t(+s)})}addHandlerAddBookmark(t){this._parentElement.addEventListener("click",function(a){a.target.closest(".btn--bookmark")&&t()})}_generateMarkup(){return`
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${h}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${h}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">
              <svg>
                <use href="${h}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">
              <svg>
                <use href="${h}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
          <svg>
            <use href="${h}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${h}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${h}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `}_generateMarkupIngredient(t){return`
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${h}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${t.quantity?ee(t.quantity).toString():""}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${t.unit}</span>
        ${t.description}
      </div>
    </li>
  `}}const m=new te;class re{constructor(){u(this,"_parentEl",document.querySelector(".search"))}getQuery(){const e=this._parentEl.querySelector(".search__field").value;return this._clearInput(),e}_clearInput(){this._parentEl.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentEl.addEventListener("submit",function(t){t.preventDefault(),e()})}}const U=new re;class ne extends ${constructor(){super(...arguments);u(this,"_parentElement","")}_generateMarkup(){const t=window.location.hash.slice(1);return`
      <li class="preview">
        <a class="preview__link ${this._data.id===t?"preview__link--active":""}" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${this._data.key?"":"hidden"}">
              <svg>
              <use href="${h}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `}}const x=new ne;class se extends ${constructor(){super(...arguments);u(this,"_parentElement",document.querySelector(".results"));u(this,"_errorMessage","No recipes found for your query! Please try again ;)");u(this,"_message","")}_generateMarkup(){return this._data.map(t=>x.render(t,!1)).join("")}}const M=new se;class ie extends ${constructor(){super(...arguments);u(this,"_parentElement",document.querySelector(".pagination"))}addHandlerClick(t){this._parentElement.addEventListener("click",function(a){const n=a.target.closest(".btn--inline");if(!n)return;const s=+n.dataset.goto;t(s)})}_generateMarkup(){const t=this._data.page,a=Math.ceil(this._data.results.length/this._data.resultsPerPage);return t===1&&a>1?`
        <button data-goto="${t+1}" class="btn--inline pagination__btn--next">
          <span>Page ${t+1}</span>
          <svg class="search__icon">
            <use href="${h}#icon-arrow-right"></use>
          </svg>
        </button>
      `:t===a&&a>1?`
        <button data-goto="${t-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${h}#icon-arrow-left"></use>
          </svg>
          <span>Page ${t-1}</span>
        </button>
      `:t<a?`
        <button data-goto="${t-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${h}#icon-arrow-left"></use>
          </svg>
          <span>Page ${t-1}</span>
        </button>
        <button data-goto="${t+1}" class="btn--inline pagination__btn--next">
          <span>Page ${t+1}</span>
          <svg class="search__icon">
            <use href="${h}#icon-arrow-right"></use>
          </svg>
        </button>
      `:""}}const I=new ie,ae=O().SERVER_URI;class oe extends ${constructor(...t){super(...t);u(this,"_parentElement",document.querySelector(".bookmarks__list"));u(this,"_errorMessage","No bookmarks yet. Find a nice recipe and bookmark it ;)");u(this,"_message","");u(this,"_button",document.querySelector(".nav__btn--bookmarks"));window.document.addEventListener("click",a=>{if(this._button)if(this._parentElement.contains(a.target)||(a.target===this._button||this._button.contains(a.target)?this._button.classList.toggle("show"):this._button.classList.remove("show")),this._button.classList.contains("show")){this.renderSpinner();try{v(`${ae}/api/bookmarks`).then(s=>{this.render(s.bookmarks)}).catch(()=>{this.render([])})}catch{this.render([])}}else this._clear()})}addHandlerRender(t){window.addEventListener("load",t)}_generateMarkup(){return this._data.map(t=>x.render(t,!1)).join("")}}const S=new oe;class ce extends ${constructor(){super();u(this,"_parentElement",document.querySelector(".upload"));u(this,"_message","Recipe was successfully uploaded :)");u(this,"_window",document.querySelector(".add-recipe-window"));u(this,"_overlay",document.querySelector(".overlay"));u(this,"_btnOpen",document.querySelector(".nav__btn--add-recipe"));u(this,"_btnClose",document.querySelector(".btn--close-modal"));this._addHandlerShowWindow(),this._addHandlerHideWindow()}toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}_addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}_addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUpload(t){this._parentElement.addEventListener("submit",function(a){a.preventDefault();const n=[...new FormData(this)],s=Object.fromEntries(n);t(s)})}_generateMarkup(){}}const E=new ce,le=async function(){try{const r=window.location.hash.slice(1);if(!r)return;m.renderSpinner(),M.update(H()),S.update(i.bookmarks),await D(r),m.render(i.recipe)}catch(r){m.renderError(),console.error(r)}},de=async function(){try{M.renderSpinner();const r=U.getQuery();if(!r)return;await K(r),M.render(H()),I.render(i.search)}catch(r){console.log(r)}},ue=function(r){M.render(H(r)),I.render(i.search)},pe=function(r){G(r),m.update(i.recipe)},he=function(){i.recipe.bookmarked?J(i.recipe.id):j(i.recipe),m.update(i.recipe),S.render(i.bookmarks)},ge=function(){S.render(i.bookmarks)},_e=async function(r){try{E.renderSpinner(),await Y(r),console.log(i.recipe),m.render(i.recipe),E.renderMessage(),S.render(i.bookmarks),window.history.pushState(null,"",`#${i.recipe.id}`),setTimeout(function(){E.toggleWindow()},B*1e3)}catch(e){console.error("💥",e),E.renderError(e.message)}},fe=function(){S.addHandlerRender(ge),m.addHandlerRender(le),m.addHandlerUpdateServings(pe),m.addHandlerAddBookmark(he),U.addHandlerSearch(de),I.addHandlerClick(ue),E.addHandlerUpload(_e)};q();fe();
