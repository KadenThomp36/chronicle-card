function e(e,t,i,r){var o,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let a=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new a(i,e,r)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!c(e,t),_={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const a=r?.call(this);o?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),o=t.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=r;const a=o.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){const a=this.constructor;if(!1===r&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??x)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==o||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,v?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+E,z=`<${T}>`,D=document,O=()=>D.createComment(""),F=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,U="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,H=/>/g,I=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,R=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),J=new WeakMap,q=D.createTreeWalker(D,129);function Y(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,r=[];let o,a=2===t?"<svg>":3===t?"<math>":"",n=P;for(let t=0;t<i;t++){const i=e[t];let s,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===P?"!--"===c[1]?n=M:void 0!==c[1]?n=H:void 0!==c[2]?(R.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=I):void 0!==c[3]&&(n=I):n===I?">"===c[0]?(n=o??P,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,s=c[1],n=void 0===c[3]?I:'"'===c[3]?L:j):n===L||n===j?n=I:n===M||n===H?n=P:(n=I,o=void 0);const p=n===I&&e[t+1].startsWith("/>")?" ":"";a+=n===P?i+z:l>=0?(r.push(s),i.slice(0,l)+C+i.slice(l)+E+p):i+E+(-2===l?t:p)}return[Y(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class V{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,a=0;const n=e.length-1,s=this.parts,[c,l]=K(e,t);if(this.el=V.createElement(c,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=q.nextNode())&&s.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(C)){const t=l[a++],i=r.getAttribute(e).split(E),n=/([.?@])?(.*)/.exec(t);s.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?te:"?"===n[1]?ie:"@"===n[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(E)&&(s.push({type:6,index:o}),r.removeAttribute(e));if(R.test(r.tagName)){const e=r.textContent.split(E),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],O()),q.nextNode(),s.push({type:2,index:++o});r.append(e[t],O())}}}else if(8===r.nodeType)if(r.data===T)s.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(E,e+1));)s.push({type:7,index:o}),e+=E.length-1}o++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,r){if(t===W)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const a=F(t)?void 0:t._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(e),o._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=Z(e,o._$AS(e,t.values),o,r)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);q.currentNode=r;let o=q.nextNode(),a=0,n=0,s=i[0];for(;void 0!==s;){if(a===s.index){let t;2===s.type?t=new X(o,o.nextSibling,this,e):1===s.type?t=new s.ctor(o,s.name,s.strings,this,e):6===s.type&&(t=new oe(o,this,e)),this._$AV.push(t),s=i[++n]}a!==s?.index&&(o=q.nextNode(),a++)}return q.currentNode=D,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),F(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=V.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Q(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=J.get(e.strings);return void 0===t&&J.set(e.strings,t=new V(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new X(this.O(O()),this.O(O()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,r){const o=this.strings;let a=!1;if(void 0===o)e=Z(this,e,t,0),a=!F(e)||e!==this._$AH&&e!==W,a&&(this._$AH=e);else{const r=e;let n,s;for(e=o[0],n=0;n<o.length-1;n++)s=Z(this,r[i+n],t,n),s===W&&(s=this._$AH[n]),a||=!F(s)||s!==this._$AH[n],s===G?e=G:e!==G&&(e+=(s??"")+o[n+1]),this._$AH[n]=s}a&&!r&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class re extends ee{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??G)===W)return;const i=this._$AH,r=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ae=$.litHtmlPolyfillSupport;ae?.(V,X),($.litHtmlVersions??=[]).push("3.3.2");const ne=globalThis;class se extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let o=r._$litPart$;if(void 0===o){const e=i?.renderBefore??null;r._$litPart$=o=new X(t.insertBefore(O(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}se._$litElement$=!0,se.finalized=!0,ne.litElementHydrateSupport?.({LitElement:se});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:se}),(ne.litElementVersions??=[]).push("4.2.2");const le=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x},pe=(e=de,t,i)=>{const{kind:r,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const o=this[r];t.call(this,i),this.requestUpdate(r,o,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function he(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return he({...e,state:!0,attribute:!1})}function ge(e,t){return(t,i,r)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}const me={layout:"vertical",show_layout_toggle:!0,max_events:50,days_back:7,time_format:"24h",show_header:!0,filters:{categories:[],severities:[],sources:[],entities:[],search:""},grouping:{enabled:!0,window_seconds:120,min_group_size:3,group_by:"category"},appearance:{card_height:"400px",compact:!1,show_images:!0,show_icons:!0,show_severity_badge:!0,show_source_badge:!1,animate_new_events:!0,severity_colors:{critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"}}},fe={critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"},ve={person:"mdi:walk",vehicle:"mdi:car",animal:"mdi:paw",pet:"mdi:paw",security:"mdi:shield-home",motion:"mdi:motion-sensor",door:"mdi:door",lock:"mdi:lock",camera:"mdi:cctv",light:"mdi:lightbulb",climate:"mdi:thermostat",automation:"mdi:robot",system:"mdi:cog",default:"mdi:calendar-clock"},be={person:"#FF9800",vehicle:"#2196F3",animal:"#43A047",pet:"#43A047",security:"#F44336",motion:"#9C27B0",door:"#795548",lock:"#607D8B",camera:"#FF5722",light:"#FFC107",climate:"#00BCD4",automation:"#3F51B5",system:"#9E9E9E",default:"#78909C"},ye=108e5,xe=[[["cat","kitten","feline"],"mdi:cat"],[["dog","puppy","canine"],"mdi:dog"],[["bird","robin","crow","pigeon","sparrow"],"mdi:bird"],[["fish","aquarium"],"mdi:fish"],[["rabbit","bunny"],"mdi:rabbit"],[["horse","pony"],"mdi:horse"],[["snake","reptile","lizard"],"mdi:snake"],[["bear"],"mdi:paw"],[["deer"],"mdi:deer"],[["insect","bug","spider","bee","wasp"],"mdi:bee"],[["animal","pet","wildlife"],"mdi:paw"],[["person","human","people","visitor","guest","face"],"mdi:walk"],[["baby","infant","child","kid"],"mdi:baby-face-outline"],[["meeting","appointment","interview"],"mdi:account-group"],[["car","automobile","sedan"],"mdi:car"],[["truck","lorry"],"mdi:truck"],[["motorcycle","motorbike","bike","bicycle"],"mdi:bike"],[["bus","transit"],"mdi:bus"],[["boat","ship"],"mdi:sail-boat"],[["airplane","plane","flight"],"mdi:airplane"],[["vehicle","transport"],"mdi:car"],[["package","parcel","delivery","mail","post","courier"],"mdi:package-variant-closed"],[["amazon"],"mdi:package-variant-closed"],[["alarm","alert","intrusion","break-in","breach"],"mdi:alarm-light"],[["security","surveillance","guard"],"mdi:shield-home"],[["smoke","fire","flame"],"mdi:fire"],[["flood","water leak","leak"],"mdi:water-alert"],[["co2","carbon monoxide","gas"],"mdi:molecule-co2"],[["doorbell","ring","knock"],"mdi:doorbell"],[["door","gate","entry","entrance","exit"],"mdi:door"],[["lock","unlock","locked","unlocked"],"mdi:lock"],[["window"],"mdi:window-closed-variant"],[["garage"],"mdi:garage"],[["motion","movement","activity","detected"],"mdi:motion-sensor"],[["camera","cctv","snapshot","recording","footage","clip"],"mdi:cctv"],[["light","lamp","bulb","lighting","illumin"],"mdi:lightbulb"],[["temperature","temp","thermostat","hvac","heat","cool"],"mdi:thermostat"],[["weather","rain","snow","storm","wind","sunny","cloud"],"mdi:weather-partly-cloudy"],[["humidity","moisture"],"mdi:water-percent"],[["vacuum","roomba","clean"],"mdi:robot-vacuum"],[["washer","laundry","wash"],"mdi:washing-machine"],[["dryer"],"mdi:tumble-dryer"],[["dishwasher","dishes"],"mdi:dishwasher"],[["oven","stove","cook","bake"],"mdi:stove"],[["fridge","refrigerator","freezer"],"mdi:fridge"],[["microwave"],"mdi:microwave"],[["coffee","espresso"],"mdi:coffee"],[["music","song","audio","speaker","playing"],"mdi:music"],[["tv","television","movie","video","stream","netflix","plex"],"mdi:television"],[["gaming","game","playstation","xbox","nintendo"],"mdi:gamepad-variant"],[["3d print","printer","bambu","print job","filament"],"mdi:printer-3d-nozzle"],[["health","heart","blood","medical","medicine"],"mdi:heart-pulse"],[["sleep","bedtime","nap"],"mdi:sleep"],[["workout","exercise","fitness","run","walk","step"],"mdi:run"],[["birthday","anniversary"],"mdi:cake-variant"],[["holiday","vacation","day off"],"mdi:beach"],[["reminder","todo","task"],"mdi:bell-ring"],[["calendar","event","schedule"],"mdi:calendar"],[["update","upgrade","firmware"],"mdi:update"],[["restart","reboot","reset"],"mdi:restart"],[["backup","snapshot"],"mdi:backup-restore"],[["error","fail","crash"],"mdi:alert-circle"],[["automation","script","routine","workflow"],"mdi:robot"],[["battery","charge","power"],"mdi:battery"],[["wifi","network","internet","connect"],"mdi:wifi"],[["bluetooth"],"mdi:bluetooth"],[["system","server","maintenance"],"mdi:cog"],[["solar","panel"],"mdi:solar-power"],[["energy","electricity","power","watt","kwh"],"mdi:flash"],[["water","irrigation","sprinkler"],"mdi:water"],[["gas","natural gas","propane"],"mdi:gas-cylinder"],[["trash","garbage","waste","bin","recycl"],"mdi:trash-can"],[["litter","litter box","kitty litter"],"mdi:cat"],[["food","feed","meal","eat","dinner","lunch","breakfast"],"mdi:food"],[["plant","garden","flower","grow"],"mdi:flower"],[["filter","air filter","hvac filter"],"mdi:air-filter"]],_e=[[["cat","kitten","feline"],"#7f41eb"],[["dog","puppy","canine"],"#8D6E63"],[["bird"],"#4CAF50"],[["animal","pet","wildlife"],"#43A047"],[["person","human","people","visitor","guest","face"],"#FF9800"],[["car","truck","vehicle","automobile","motorcycle"],"#2196F3"],[["package","delivery","mail","amazon"],"#795548"],[["alarm","alert","security","smoke","fire","intrusion"],"#F44336"],[["door","gate","lock","window","garage"],"#795548"],[["doorbell","ring","knock"],"#FF5722"],[["motion","movement","detected"],"#9C27B0"],[["camera","cctv","snapshot"],"#FF5722"],[["light","lamp","bulb"],"#FFC107"],[["temperature","thermostat","hvac","climate"],"#00BCD4"],[["weather"],"#42A5F5"],[["automation","script","routine"],"#3F51B5"],[["error","fail","crash"],"#D32F2F"],[["system","update","restart","maintenance"],"#9E9E9E"],[["trash","garbage","waste"],"#78909C"],[["plant","garden","flower"],"#4CAF50"],[["3d print","printer","bambu"],"#00ACC1"]];function we(e,t){const i=e.toLowerCase();for(const[e,r]of t)if(e.some(e=>i.includes(e)))return r}function $e(e,t,i,r,o){if(r){const o=[e,t,i].filter(Boolean).join(" ").toLowerCase();for(const[e,t]of Object.entries(r))if(o.includes(e.toLowerCase()))return t}const a=function(e,t,i){return we([e,t,i].filter(Boolean).join(" "),xe)}(e,t,i);return a||(o||(ve[t]?ve[t]:ve.default))}function ke(e,t,i,r,o){if(r){const o=[e,t,i].filter(Boolean).join(" ").toLowerCase();for(const[e,t]of Object.entries(r))if(o.includes(e.toLowerCase()))return t}const a=function(e,t,i){return we([e,t,i].filter(Boolean).join(" "),_e)}(e,t,i);return a||(o||(be[t]?be[t]:be.default))}function Se(e,t){return e?"string"==typeof e?e:e.dateTime||e.date||t:t}function Ae(e){if(!e&&0!==e)return"";const t=String(e),i=Number(e);return!isNaN(i)&&i>1e9&&i<1e13?new Date(1e3*i).toISOString():t}const Ce={door:{on:"Opened",off:"Closed"},opening:{on:"Opened",off:"Closed"},garage_door:{on:"Opened",off:"Closed"},window:{on:"Opened",off:"Closed"},lock:{on:"Unlocked",off:"Locked"},motion:{on:"Motion Detected",off:"Motion Cleared"},occupancy:{on:"Occupied",off:"Unoccupied"},presence:{on:"Present",off:"Away"},smoke:{on:"Smoke Detected",off:"Clear"},moisture:{on:"Wet",off:"Dry"},gas:{on:"Gas Detected",off:"Clear"},co:{on:"CO Detected",off:"Clear"},vibration:{on:"Vibration",off:"Still"},tamper:{on:"Tampered",off:"Secure"},safety:{on:"Unsafe",off:"Safe"},power:{on:"On",off:"Off"},plug:{on:"Plugged In",off:"Unplugged"},sound:{on:"Sound Detected",off:"Quiet"},problem:{on:"Problem",off:"OK"},connectivity:{on:"Connected",off:"Disconnected"},battery:{on:"Low",off:"Normal"},running:{on:"Running",off:"Stopped"},heat:{on:"Hot",off:"Normal"},cold:{on:"Cold",off:"Normal"},light:{on:"Light Detected",off:"Dark"}},Ee={lock:{locked:"Locked",unlocked:"Unlocked",jammed:"Jammed",locking:"Locking",unlocking:"Unlocking"},cover:{open:"Opened",closed:"Closed",opening:"Opening",closing:"Closing"},alarm_control_panel:{armed_away:"Armed Away",armed_home:"Armed Home",armed_night:"Armed Night",armed_vacation:"Armed Vacation",armed_custom_bypass:"Armed Custom",disarmed:"Disarmed",triggered:"Triggered",pending:"Pending",arming:"Arming"},person:{home:"Home",not_home:"Away"},device_tracker:{home:"Home",not_home:"Away"},light:{on:"On",off:"Off"},switch:{on:"On",off:"Off"},fan:{on:"On",off:"Off"},input_boolean:{on:"On",off:"Off"},climate:{off:"Off",heat:"Heating",cool:"Cooling",auto:"Auto",heat_cool:"Heat/Cool",fan_only:"Fan Only",dry:"Dry"},vacuum:{cleaning:"Cleaning",docked:"Docked",returning:"Returning",idle:"Idle",paused:"Paused",error:"Error"},media_player:{playing:"Playing",paused:"Paused",idle:"Idle",standby:"Standby",off:"Off",on:"On",buffering:"Buffering"}},Te={door:"door",opening:"door",garage_door:"door",window:"door",lock:"lock",motion:"motion",occupancy:"motion",presence:"person",vibration:"motion",smoke:"security",gas:"security",co:"security",moisture:"climate",heat:"climate",cold:"climate",tamper:"security",safety:"security",problem:"system",connectivity:"system",battery:"system",power:"system",plug:"system",running:"system",sound:"motion",light:"light"},ze={person:"person",device_tracker:"person",sensor:"system",light:"light",switch:"automation",lock:"lock",cover:"door",climate:"climate",camera:"camera",alarm_control_panel:"security",automation:"automation",vacuum:"automation",media_player:"system",fan:"climate"};const De=new class{constructor(){this.registry=new Map}register(e,t){this.registry.set(e,t)}create(e){const t=this.registry.get(e);if(!t)throw new Error(`[chronicle-card] Unknown adapter type: "${e}". Available types: ${Array.from(this.registry.keys()).join(", ")}`);return new t}has(e){return this.registry.has(e)}types(){return Array.from(this.registry.keys())}};De.register("calendar",class{constructor(){this.type="calendar"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.entity;if(!i)return console.warn("[chronicle-card] CalendarAdapter: no entity configured"),[];try{const r=t.start.toISOString(),o=t.end.toISOString(),a=`calendars/${i}?start=${encodeURIComponent(r)}&end=${encodeURIComponent(o)}`,n=await e.callApi("GET",a);return Array.isArray(n)?n.map(t=>{const a=t.summary||"Untitled Event",n=t.description||"",s=function(e){const t=(e||"").toLowerCase(),i={person:["person","visitor","guest","meeting","appointment"],vehicle:["vehicle","car","delivery","parking"],security:["security","alarm","alert"],motion:["motion","movement"],pet:["pet","cat","dog","animal"],automation:["automation","script","routine"],system:["system","update","maintenance","restart"],climate:["climate","temperature","hvac","weather"],light:["light","lamp","lighting"]};for(const[e,r]of Object.entries(i))if(r.some(e=>t.includes(e)))return e;return"default"}(`${a} ${n}`),c=Se(t.start,r),l=t.uid||function(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return Math.abs(t).toString(36)}(`${a}:${c}`);return{id:`calendar:${i}:${l}`,sourceType:"calendar",sourceId:this.config.name||i,title:a,description:n,start:c,end:Se(t.end,o),icon:$e(a,s,void 0,this.config.icon_map,this.config.default_icon),color:ke(a,s,void 0,this.config.color_map,this.config.default_color),category:s,severity:this.config.default_severity||"info",entityId:i,entityName:e.states[i]?.attributes?.friendly_name||i,actions:this.config.actions,metadata:{location:t.location,recurrence_id:t.recurrence_id,uid:t.uid}}}):(console.warn("[chronicle-card] CalendarAdapter: unexpected response format"),[])}catch(e){return console.warn("[chronicle-card] CalendarAdapter: failed to fetch events",e),[]}}}),De.register("rest",class{constructor(){this.type="rest"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.ws_params,r=this.config.url;if(!r&&!i)return console.warn("[chronicle-card] RestAdapter: no url or ws_params configured"),[];try{let t,o;if(i){const r=await e.callWS({...i});t="string"==typeof r?JSON.parse(r):r}else if(function(e){return!e.startsWith("http://")&&!e.startsWith("https://")}(r))t=await e.callApi("GET",r);else{const e=await fetch(r);if(!e.ok)return console.warn(`[chronicle-card] RestAdapter: HTTP ${e.status} from ${r}`),[];t=await e.json()}if(this.config.response_path){const e=function(e,t){const i=t.split(".");let r=e;for(const e of i){if(null==r||"object"!=typeof r)return;r=r[e]}return r}(t,this.config.response_path);if(!Array.isArray(e))return console.warn("[chronicle-card] RestAdapter: response_path did not resolve to an array"),[];o=e}else{if(!Array.isArray(t))return console.warn("[chronicle-card] RestAdapter: response is not an array and no response_path configured"),[];o=t}return o.map((e,t)=>this.mapItem(e,t))}catch(e){return console.warn("[chronicle-card] RestAdapter: failed to fetch events",e),[]}}classifyMedia(e){return e?e.startsWith("/media/")?{mediaContentId:`media-source://media_source/local/${e.slice(7)}`}:{mediaUrl:e}:{}}expandTemplate(e,t){return e.replace(/\{(\w+)\}/g,(e,i)=>{const r=t[i];return null!=r?String(r):""})}mapItem(e,t){const i=this.config.field_map||{},r=(t,r="")=>{const o=i[t];return o&&void 0!==e[o]?e[o]:void 0!==e[t]?e[t]:r},o=String(r("id",t)),a=String(r("title","Untitled")),n=String(r("category","default")),s=r("label",void 0);let c=r("mediaUrl",void 0);this.config.media_url_template&&(c=this.expandTemplate(this.config.media_url_template,e));const l=r("mediaContentId",void 0),d=this.classifyMedia(c),p=r("icon",void 0),h=r("color",void 0);return{id:`rest:${this.config.url||this.config.name||"ws"}:${o}`,sourceType:"rest",sourceId:this.config.name||this.config.url||"rest",title:a,description:String(r("description","")),start:Ae(r("start",(new Date).toISOString())),end:Ae(r("end","")),mediaUrl:d.mediaUrl,mediaContentId:l||d.mediaContentId,icon:p||$e(a,n,s,this.config.icon_map,this.config.default_icon),color:h||ke(a,n,s,this.config.color_map,this.config.default_color),category:n,label:s,severity:r("severity",this.config.default_severity||"info"),entityId:r("entityId",void 0),entityName:r("entityName",void 0),actions:this.config.actions,metadata:{source_url:this.config.url,raw_index:t,...r("metadata",void 0)||{}}}}}),De.register("history",class{constructor(){this.type="history"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.getEntities();if(0===i.length)return console.warn("[chronicle-card] HistoryAdapter: no entities configured"),[];try{const r=t.start.toISOString(),o=t.end.toISOString(),a=`history/period/${r}?filter_entity_id=${i.join(",")}&end_time=${o}&minimal_response`,n=await e.callApi("GET",a);if(!Array.isArray(n))return console.warn("[chronicle-card] HistoryAdapter: unexpected response format"),[];const s=[];for(const t of n)if(Array.isArray(t)&&0!==t.length)for(let i=1;i<t.length;i++){const r=t[i-1],o=t[i],a=o.entity_id||t[0].entity_id;if(!a)continue;if("unavailable"===o.state||"unknown"===o.state)continue;if("unavailable"===r.state||"unknown"===r.state)continue;const n=this.stateChangeToEvent(e,a,r,o);s.push(n)}return s}catch(e){return console.warn("[chronicle-card] HistoryAdapter: failed to fetch events",e),[]}}async subscribeLive(e,t){const i=new Set(this.getEntities());return await e.connection.subscribeEvents(r=>{const o=r.data,a=o.entity_id;if(!a||!i.has(a))return;if(!o.old_state||!o.new_state)return;if(o.old_state.state===o.new_state.state)return;if("unavailable"===o.new_state.state||"unknown"===o.new_state.state)return;if("unavailable"===o.old_state.state||"unknown"===o.old_state.state)return;const n=this.stateChangeToEvent(e,a,o.old_state,o.new_state);t(n)},"state_changed")}getEntities(){const e=[];return this.config.entity&&e.push(this.config.entity),this.config.entities&&e.push(...this.config.entities),e}getDeviceClass(e,t,i){const r=e.states[t];return r?.attributes?.device_class?String(r.attributes.device_class):i.attributes?.device_class?String(i.attributes.device_class):""}humanizeState(e,t,i){const r=this.config.state_map?.[t];if(r)return r;const o=e.split(".")[0];if("binary_sensor"===o&&i){const e=Ce[i];if(e?.[t])return e[t]}const a=Ee[o];return a?.[t]?a[t]:"on"===t?"On":"off"===t?"Off":t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," ")}detectCategory(e,t){const i=e.split(".")[0];return"binary_sensor"===i&&t?Te[t]||"default":ze[i]||"default"}stateChangeToEvent(e,t,i,r){const o=this.getDeviceClass(e,t,r),a=this.detectCategory(t,o),n=e.states[t]?.attributes?.friendly_name||t,s=this.humanizeState(t,r.state,o),c=this.humanizeState(t,i.state,o),l=`${n} ${s}`,d=`${c} → ${s}`;return{id:`history:${t}:${r.last_changed}`,sourceType:"history",sourceId:this.config.name||"history",title:l,description:d,start:r.last_changed,end:r.last_changed,icon:$e(l,a,void 0,this.config.icon_map,this.config.default_icon),color:ke(l,a,void 0,this.config.color_map,this.config.default_color),category:a,severity:this.config.default_severity||"info",entityId:t,entityName:n,actions:this.config.actions,metadata:{old_state:i.state,new_state:r.state,old_label:c,new_label:s,device_class:o,last_updated:r.last_updated}}}}),De.register("static",class{constructor(){this.type="static"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.events;if(!i||0===i.length)return console.warn("[chronicle-card] StaticAdapter: no events configured"),[];try{const e=this.config.name||"static";return i.map((i,r)=>{const o=i.category||"default",a=new Date(i.start);return(i.end?new Date(i.end):a)<t.start||a>t.end?null:{id:`static:${e}:${r}`,sourceType:"static",sourceId:e,title:i.title,description:i.description||"",start:i.start,end:i.end||i.start,icon:i.icon||this.config.default_icon||ve[o]||ve.default,color:i.color||this.config.default_color||be[o]||be.default,category:o,severity:i.severity||this.config.default_severity||"info",actions:this.config.actions,metadata:{static_index:r}}}).filter(e=>null!==e)}catch(e){return console.warn("[chronicle-card] StaticAdapter: failed to process events",e),[]}}});const Oe=new Map;async function Fe(e,t){if(!t)return;const i=Oe.get(t);if(i&&Date.now()-i.timestamp<ye)return i.url;!function(){const e=Date.now();for(const[t,i]of Oe)e-i.timestamp>ye&&Oe.delete(t)}();try{const i=await e.callWS({type:"media_source/resolve_media",media_content_id:t});return i&&i.url?(Oe.set(t,{url:i.url,timestamp:Date.now()}),i.url):void 0}catch{return}}class Ne{constructor(){this.adapters=[],this.allEvents=[],this.filteredItems=[],this.lastFetch=0,this.lastHash="",this.liveUnsubscribers=[],this.listeners=new Set,this.fetchPromise=null}get items(){return this.filteredItems}get events(){return this.allEvents}configure(e){this.config=e,this.adapters=[];for(const t of e.sources??[])try{const e=De.create(t.type);e.configure(t),this.adapters.push(e)}catch(e){console.warn("[chronicle-card] Skipping source:",e)}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){for(const e of this.listeners)e()}async fetch(e,t=!1){const i=(this.config?.sources??[]).reduce((e,t)=>Math.min(e,1e3*(t.poll_interval??30)),3e4);if(t||!(Date.now()-this.lastFetch<i)){if(this.fetchPromise)return this.fetchPromise;this.fetchPromise=this._doFetch(e);try{await this.fetchPromise}finally{this.fetchPromise=null}}}async _doFetch(e){const t=this.config.days_back??me.days_back??7,i=new Date,r={start:new Date(i.getTime()-24*t*60*60*1e3),end:i},o=await Promise.allSettled(this.adapters.map(t=>t.fetchEvents(e,r))),a=[];for(const e of o)"fulfilled"===e.status?a.push(...e.value):console.warn("[chronicle-card] Adapter fetch failed:",e.reason);const n=new Set,s=[];for(const e of a)n.has(e.id)||(n.add(e.id),s.push(e));s.sort((e,t)=>new Date(t.start).getTime()-new Date(e.start).getTime()),await this.resolveMedia(e,s);const c=this.computeHash(s);c!==this.lastHash?(this.allEvents=s,this.lastHash=c,this.lastFetch=Date.now(),this.applyFiltersAndGroup()):this.lastFetch=Date.now()}applyFiltersAndGroup(){let e=[...this.allEvents];const t=this.config.filters??{};if(t.categories&&t.categories.length>0){const i=new Set(t.categories);e=e.filter(e=>i.has(e.category))}if(t.severities&&t.severities.length>0){const i=new Set(t.severities);e=e.filter(e=>i.has(e.severity))}if(t.sources&&t.sources.length>0){const i=new Set(t.sources);e=e.filter(e=>i.has(e.sourceId)||i.has(e.sourceType))}if(t.entities&&t.entities.length>0){const i=new Set(t.entities);e=e.filter(e=>e.entityId&&i.has(e.entityId))}if(t.search&&t.search.trim().length>0){const i=t.search.toLowerCase().trim();e=e.filter(e=>e.title.toLowerCase().includes(i)||e.description.toLowerCase().includes(i)||e.category.toLowerCase().includes(i)||e.label&&e.label.toLowerCase().includes(i))}const i=this.config.max_events??me.max_events??50;e.length>i&&(e=e.slice(0,i));const r={enabled:!0,window_seconds:120,min_group_size:3,group_by:"category",...this.config.grouping};this.filteredItems=function(e,t){if(!t.enabled||"none"===t.group_by||0===e.length)return[...e];const i=1e3*(t.window_seconds??120),r=t.min_group_size??3,o=t.group_by??"category",a=[];let n=[],s=null,c=null;const l=e=>{switch(o){case"category":return e.category;case"source":return`${e.sourceType}:${e.sourceId}`;case"entity":return e.entityId??"";default:return""}},d=()=>{if(0!==n.length){if(n.length>=r){const e=n[0],t=e.category||e.sourceType;a.push({representative:e,events:n,summary:`${n.length} ${t} events`,expanded:!1})}else a.push(...n);n=[],s=null,c=null}};for(const t of e){const e=l(t),r=new Date(t.start).getTime();if(null===s){s=e,c=r,n.push(t);continue}const o=null!==c&&Math.abs(r-c)<=i;e===s&&o||(d(),s=e,c=r),n.push(t)}return d(),a}(e,r),this.notify()}injectLiveEvent(e){this.allEvents.some(t=>t.id===e.id)||(this.allEvents.unshift(e),this.lastHash=this.computeHash(this.allEvents),this.applyFiltersAndGroup())}async subscribeLive(e){this.unsubscribeLive();for(const t of this.adapters)if(t.subscribeLive)try{const i=await t.subscribeLive(e,e=>{this.injectLiveEvent(e)});this.liveUnsubscribers.push(i)}catch(e){console.warn("[chronicle-card] Live subscription failed:",e)}}unsubscribeLive(){for(const e of this.liveUnsubscribers)try{e()}catch{}this.liveUnsubscribers=[]}toggleGroup(e){e.expanded=!e.expanded,this.notify()}async resolveMedia(e,t){const i=t.filter(e=>e.mediaContentId&&!e.mediaUrl);if(0===i.length)return;const r=await Promise.allSettled(i.map(t=>Fe(e,t.mediaContentId)));for(let e=0;e<i.length;e++){const t=r[e];"fulfilled"===t.status&&t.value&&(i[e].mediaUrl=t.value)}}computeHash(e){return 0===e.length?"0":`${e.length}:${e[0]?.id}:${e[e.length-1]?.id}`}}function Ue(e){return"events"in e&&Array.isArray(e.events)}const Pe=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Me=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function He(e){if(e instanceof Date)return isNaN(e.getTime())?new Date:e;const t=new Date(e);return isNaN(t.getTime())?new Date:t}function Ie(e){return e<10?`0${e}`:String(e)}function je(e,t){const i=He(e),r=i.getHours(),o=Ie(i.getMinutes());if("24h"===t)return`${Ie(r)}:${o}`;return`${0===r?12:r>12?r-12:r}:${o} ${r>=12?"PM":"AM"}`}function Le(e){const t=He(e);return`${Pe[t.getDay()]}, ${Me[t.getMonth()]} ${t.getDate()}`}function Re(e){const t=He(e),i=(new Date).getTime()-t.getTime();if(i<0)return Le(t);const r=Math.floor(i/1e3),o=Math.floor(r/60),a=Math.floor(o/60);return r<60?"just now":o<60?`${o} min ago`:a<24&&function(e){const t=He(e),i=new Date;return t.getFullYear()===i.getFullYear()&&t.getMonth()===i.getMonth()&&t.getDate()===i.getDate()}(t)?`${a}h ago`:function(e){const t=He(e),i=new Date;return i.setDate(i.getDate()-1),t.getFullYear()===i.getFullYear()&&t.getMonth()===i.getMonth()&&t.getDate()===i.getDate()}(t)?"Yesterday":Le(t)}let Be=class extends se{constructor(){super(...arguments),this.severity="info"}render(){const e=this.customColors?.[this.severity]??fe[this.severity]??fe.info;return B`
      <span class="badge" style="background-color: ${e}">
        ${this.severity}
      </span>
    `}};Be.styles=n`
    :host {
      display: inline-flex;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 16px;
      padding: 0 7px;
      border-radius: 20px;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: #fff;
      line-height: 1;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  `,e([he()],Be.prototype,"severity",void 0),e([he()],Be.prototype,"customColors",void 0),Be=e([le("chronicle-severity-badge")],Be);let We=class extends se{render(){return B`
      <button @click=${this._handleClick}>
        ${this.action.icon?B`<ha-icon .icon=${this.action.icon}></ha-icon>`:""}
        ${this.action.label}
      </button>
    `}async _handleClick(e){if(e.stopPropagation(),this.action)switch(this.action.type){case"service":{if(!this.hass||!this.action.service)return;const[e,t]=this.action.service.split(".");e&&t&&await this.hass.callService(e,t,this.action.serviceData??{},this.action.target);break}case"navigate":this.action.url&&(this.action.url.startsWith("http")?window.open(this.action.url,"_blank"):(history.pushState(null,"",this.action.url),window.dispatchEvent(new Event("location-changed"))));break;case"fire-event":if(this.action.eventType){const e=new CustomEvent(this.action.eventType,{bubbles:!0,composed:!0,detail:this.action.eventData??{}});this.dispatchEvent(e)}}}};We.styles=n`
    :host {
      display: inline-flex;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.15));
      border-radius: 20px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color, #333);
      font-size: 10.5px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
      font-family: inherit;
      line-height: 1.4;
      letter-spacing: 0.1px;
    }
    button:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-color: var(--primary-color, #03a9f4);
      box-shadow: 0 1px 4px rgba(3,169,244,0.25);
    }
    button:active {
      transform: scale(0.97);
    }
    ha-icon {
      --mdc-icon-size: 13px;
    }
  `,e([he({attribute:!1})],We.prototype,"hass",void 0),e([he({attribute:!1})],We.prototype,"action",void 0),We=e([le("chronicle-action-button")],We);let Ge=class extends se{constructor(){super(...arguments),this.compact=!1,this.timeFormat="24h",this.animated=!1}render(){const e=this.event;if(!e)return G;const t=!1!==this.appearance?.show_images,i=!1!==this.appearance?.show_icons,r=!1!==this.appearance?.show_severity_badge,o=je(e.start,this.timeFormat);return B`
      <div class="event-row">
        ${i?B`
          <div class="icon-wrap" style="background-color: ${e.color}">
            <ha-icon .icon=${a=e.icon,a&&a.startsWith("mdi:")?a:ve.default}></ha-icon>
          </div>
        `:""}

        <div class="event-item" @click=${this._showDetail}>
          <div class="content">
            <div class="top-row">
              <span class="title">${e.title}</span>
              ${r&&"info"!==e.severity?B`
                <chronicle-severity-badge
                  .severity=${e.severity}
                  .customColors=${this.appearance?.severity_colors}
                ></chronicle-severity-badge>
              `:""}
              <span class="time">${o}</span>
            </div>
            ${e.description?B`<div class="description">${e.description}</div>`:""}
            <div class="meta-row">
              ${e.category?B`<span class="category-tag">${e.category}</span>`:""}
              ${e.label?B`<span class="category-tag">${e.label}</span>`:""}
              ${e.entityName?B`<span class="category-tag">${e.entityName}</span>`:""}
            </div>
            ${e.actions&&e.actions.length>0?B`
              <div class="actions-row">
                ${e.actions.map(e=>B`
                  <chronicle-action-button .action=${e} .hass=${this.hass}></chronicle-action-button>
                `)}
              </div>
            `:""}
          </div>

          ${t&&e.mediaUrl?B`
            <img class="thumbnail" src=${e.mediaUrl} alt="" loading="lazy" />
          `:""}
        </div>
      </div>
    `;var a}_showDetail(){this.dispatchEvent(new CustomEvent("chronicle-show-detail",{bubbles:!0,composed:!0,detail:{event:this.event}}))}};Ge.styles=n`
    :host {
      display: block;
    }
    :host([animated]) .event-item {
      animation: chronicle-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes chronicle-slide-in {
      from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .event-row {
      display: flex;
      align-items: flex-start;
      position: relative;
    }

    /* Icon sits outside the hoverable card area, over the timeline line */
    .icon-wrap {
      flex-shrink: 0;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.12);
      z-index: 2;
      margin-top: 9px;
      margin-right: 8px;
    }
    .icon-wrap ha-icon {
      --mdc-icon-size: 17px;
      color: #fff;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
    }
    :host([compact]) .icon-wrap {
      width: 26px;
      height: 26px;
      margin-right: 6px;
    }
    :host([compact]) .icon-wrap ha-icon {
      --mdc-icon-size: 13px;
    }

    .event-item {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s ease, box-shadow 0.2s ease;
      border: 1px solid transparent;
    }
    .event-item:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border-color: var(--divider-color, rgba(127,127,127,0.08));
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    }
    .event-item:active {
      transform: scale(0.99);
      transition: transform 0.1s ease;
    }

    .content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .top-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
      min-width: 0;
      letter-spacing: -0.15px;
      line-height: 1.35;
    }
    .time {
      font-size: 10.5px;
      font-weight: 500;
      color: var(--secondary-text-color, #999);
      white-space: nowrap;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.2px;
    }

    .description {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.45;
      opacity: 0.85;
    }

    .meta-row {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
      margin-top: 1px;
    }
    .category-tag {
      font-size: 10px;
      font-weight: 500;
      padding: 1px 7px;
      border-radius: 20px;
      background: var(--divider-color, rgba(127,127,127,0.08));
      color: var(--secondary-text-color, #888);
      letter-spacing: 0.15px;
      line-height: 1.6;
    }

    .thumbnail {
      flex-shrink: 0;
      width: 52px;
      height: 52px;
      border-radius: 10px;
      object-fit: cover;
      background: var(--divider-color, rgba(127,127,127,0.08));
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .event-item:hover .thumbnail {
      transform: scale(1.03);
      box-shadow: 0 2px 8px rgba(0,0,0,0.14);
    }
    :host([compact]) .thumbnail {
      width: 36px;
      height: 36px;
      border-radius: 8px;
    }

    .actions-row {
      display: flex;
      gap: 6px;
      margin-top: 4px;
      flex-wrap: wrap;
    }

    :host([compact]) .content { gap: 0; }
    :host([compact]) .title { font-size: 12px; }
    :host([compact]) .description,
    :host([compact]) .meta-row,
    :host([compact]) .actions-row { display: none; }
  `,e([he({attribute:!1})],Ge.prototype,"event",void 0),e([he({attribute:!1})],Ge.prototype,"appearance",void 0),e([he({attribute:!1})],Ge.prototype,"hass",void 0),e([he({type:Boolean})],Ge.prototype,"compact",void 0),e([he({type:String})],Ge.prototype,"timeFormat",void 0),e([he({type:Boolean,reflect:!0})],Ge.prototype,"animated",void 0),Ge=e([le("chronicle-event-item")],Ge);let Je=class extends se{constructor(){super(...arguments),this.compact=!1,this.timeFormat="24h"}render(){const e=this.group;if(!e)return G;const t=e.representative,i=e.events[0],r=e.events[e.events.length-1],o=`${je(i.start,this.timeFormat)} — ${je(r.start,this.timeFormat)}`,a=!1!==this.appearance?.show_images?e.events.map(e=>e.mediaUrl).filter(Boolean).slice(0,3):[],n=e.events.filter(e=>e.mediaUrl).length-3;return B`
      <div>
        <div class="group-row">
          <div class="icon-wrap" style="background-color: ${t.color}">
            <ha-icon .icon=${s=t.icon,s&&s.startsWith("mdi:")?s:ve.default}></ha-icon>
            <span class="count-badge">${e.events.length}</span>
          </div>

          <div class="group-header" @click=${this._toggle}>
            <div class="content">
              <div class="summary">${e.summary}</div>
              <div class="time-range">${o}</div>
            </div>

            ${a.length>0?B`
              <div class="thumb-strip">
                ${a.map((e,t)=>2===t&&n>0?B`<span class="thumb-more" data-count="+${n}"><img src=${e} alt="" loading="lazy" /></span>`:B`<img src=${e} alt="" loading="lazy" />`)}
              </div>
            `:""}

            <ha-icon
              class="expand-icon ${e.expanded?"expanded":""}"
              icon="mdi:chevron-down"
            ></ha-icon>
          </div>
        </div>

        <div class="children ${e.expanded?"expanded":"collapsed"}">
          ${e.expanded?B`
            <div class="children-inner">
              ${e.events.map(e=>B`
                <chronicle-event-item
                  .event=${e}
                  .appearance=${this.appearance}
                  .hass=${this.hass}
                  .timeFormat=${this.timeFormat}
                  ?compact=${this.compact}
                ></chronicle-event-item>
              `)}
            </div>
          `:""}
        </div>
      </div>
    `;var s}_toggle(){this.dispatchEvent(new CustomEvent("chronicle-toggle-group",{bubbles:!0,composed:!0,detail:{group:this.group}}))}};Je.styles=n`
    :host {
      display: block;
    }

    .group-row {
      display: flex;
      align-items: flex-start;
      position: relative;
    }

    /* Icon sits outside the hoverable area, matching event-item */
    .icon-wrap {
      flex-shrink: 0;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.12);
      z-index: 2;
      margin-top: 9px;
      margin-right: 8px;
      position: relative;
    }
    .icon-wrap ha-icon {
      --mdc-icon-size: 17px;
      color: #fff;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
    }

    .count-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 16px;
      height: 16px;
      border-radius: 8px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 3px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      font-variant-numeric: tabular-nums;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(3,169,244,0.25);
    }

    .group-header {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s ease, box-shadow 0.2s ease;
      border: 1px solid transparent;
    }
    .group-header:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border-color: var(--divider-color, rgba(127,127,127,0.08));
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    }

    .content {
      flex: 1;
      min-width: 0;
    }
    .summary {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      letter-spacing: -0.15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.35;
    }
    .time-range {
      font-size: 10.5px;
      font-weight: 500;
      color: var(--secondary-text-color, #999);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1px;
      margin-top: 2px;
    }

    /* Thumbnail strip — up to 3 small images */
    .thumb-strip {
      display: flex;
      flex-shrink: 0;
      gap: 0;
      margin-right: 4px;
    }
    .thumb-strip img {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      object-fit: cover;
      margin-left: -6px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .thumb-strip img:first-child {
      margin-left: 0;
    }
    .thumb-strip .thumb-more {
      position: relative;
      overflow: hidden;
    }
    .thumb-strip .thumb-more img {
      filter: blur(2px) brightness(0.7);
    }
    .thumb-strip .thumb-more::after {
      content: attr(data-count);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }

    .expand-icon {
      flex-shrink: 0;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      color: var(--secondary-text-color, #999);
      --mdc-icon-size: 18px;
    }
    .expand-icon.expanded {
      transform: rotate(180deg);
    }

    /* Expanded children — indented with subtle background band */
    .children {
      margin-left: 42px;
      overflow: hidden;
      border-radius: 12px;
    }
    .children.collapsed {
      max-height: 0;
      opacity: 0;
      transition: max-height 0.25s ease, opacity 0.15s ease;
    }
    .children.expanded {
      max-height: 4000px;
      opacity: 1;
      transition: max-height 0.4s ease, opacity 0.2s ease 0.05s;
    }
    .children-inner {
      padding: 4px 0 4px 8px;
      border-left: 2px solid var(--divider-color, rgba(127,127,127,0.12));
      background: var(--secondary-background-color, rgba(127,127,127,0.025));
      border-radius: 8px;
    }
  `,e([he({attribute:!1})],Je.prototype,"group",void 0),e([he({attribute:!1})],Je.prototype,"appearance",void 0),e([he({attribute:!1})],Je.prototype,"hass",void 0),e([he({type:Boolean})],Je.prototype,"compact",void 0),e([he({type:String})],Je.prototype,"timeFormat",void 0),Je=e([le("chronicle-event-group")],Je);let qe=class extends se{constructor(){super(...arguments),this.label="",this.eventCount=0}render(){return B`
      <div class="date-header">
        <span class="label">${this.label}</span>
        <span class="line"></span>
        ${this.eventCount>0?B`<span class="count">${this.eventCount}</span>`:""}
      </div>
    `}};qe.styles=n`
    :host {
      display: block;
    }
    .date-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 0 6px 42px;
      user-select: none;
    }
    .label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--secondary-text-color, #888);
      white-space: nowrap;
      opacity: 0.85;
    }
    .line {
      flex: 1;
      height: 1px;
      background: linear-gradient(
        to right,
        var(--divider-color, rgba(127,127,127,0.18)),
        transparent
      );
    }
    .count {
      font-size: 9.5px;
      font-weight: 600;
      color: var(--secondary-text-color, #999);
      background: var(--divider-color, rgba(127,127,127,0.1));
      border-radius: 10px;
      padding: 2px 8px;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.2px;
    }
  `,e([he()],qe.prototype,"label",void 0),e([he()],qe.prototype,"eventCount",void 0),qe=e([le("chronicle-date-header")],qe);let Ye=class extends se{constructor(){super(...arguments),this.message="No events found"}render(){return B`
      <div class="empty">
        <div class="icon-ring">
          <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>
        </div>
        <span class="text">${this.message}</span>
      </div>
    `}};Ye.styles=n`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 140px;
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 36px 16px;
      text-align: center;
    }
    .icon-ring {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 2px dashed var(--divider-color, rgba(127,127,127,0.18));
      display: flex;
      align-items: center;
      justify-content: center;
      animation: chronicle-pulse 3s ease-in-out infinite;
    }
    @keyframes chronicle-pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.04); }
    }
    ha-icon {
      --mdc-icon-size: 24px;
      color: var(--secondary-text-color, #999);
      opacity: 0.5;
    }
    .text {
      font-size: 12.5px;
      color: var(--secondary-text-color, #999);
      font-weight: 400;
      letter-spacing: 0.1px;
      opacity: 0.7;
    }
  `,e([he()],Ye.prototype,"message",void 0),Ye=e([le("chronicle-empty-state")],Ye);let Ke=class extends se{constructor(){super(...arguments),this.items=[],this.compact=!1,this.timeFormat="24h",this.animateNew=!0}render(){if(!this.items||0===this.items.length)return B`<chronicle-empty-state></chronicle-empty-state>`;const e=this._groupByDate(this.items),t=this.appearance?.card_height??"400px";return B`
      <div class="timeline-container" style=${"auto"===t?"":`max-height: ${t}`}>
        <div class="timeline-inner">
          ${e.map(e=>B`
            <div class="date-section">
              <chronicle-date-header
                .label=${e.label}
                .eventCount=${this._countEvents(e.items)}
              ></chronicle-date-header>
              ${e.items.map(e=>Ue(e)?B`
                    <chronicle-event-group
                      .group=${e}
                      .appearance=${this.appearance}
                      .hass=${this.hass}
                      .timeFormat=${this.timeFormat}
                      ?compact=${this.compact}
                    ></chronicle-event-group>
                  `:B`
                    <chronicle-event-item
                      .event=${e}
                      .appearance=${this.appearance}
                      .hass=${this.hass}
                      .timeFormat=${this.timeFormat}
                      ?compact=${this.compact}
                    ></chronicle-event-item>
                  `)}
            </div>
          `)}
        </div>
      </div>
    `}_groupByDate(e){const t=new Map,i=new Date,r=this._dateKey(i),o=this._dateKey(new Date(i.getTime()-864e5));for(const i of e){const e=Ue(i)?i.representative.start:i.start,a=this._dateKey(new Date(e));if(!t.has(a)){let i;if(a===r)i="Today";else if(a===o)i="Yesterday";else{i=new Date(e).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}t.set(a,{dateKey:a,label:i,items:[]})}t.get(a).items.push(i)}return Array.from(t.values())}_dateKey(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}_countEvents(e){let t=0;for(const i of e)t+=Ue(i)?i.events.length:1;return t}};function Ve(e){return e&&e.startsWith("mdi:")?e:ve.default}Ke.styles=n`
    :host {
      display: block;
    }

    .timeline-container {
      position: relative;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      scrollbar-color: var(--divider-color, rgba(127,127,127,0.15)) transparent;
    }
    .timeline-container::-webkit-scrollbar {
      width: 4px;
    }
    .timeline-container::-webkit-scrollbar-track {
      background: transparent;
    }
    .timeline-container::-webkit-scrollbar-thumb {
      background: var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 4px;
    }

    .timeline-inner {
      position: relative;
    }

    /* Vertical timeline line — centered on icon column (17px = half of 34px icon) */
    .timeline-inner::before {
      content: '';
      position: absolute;
      left: 16px;
      top: 28px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--divider-color, rgba(127,127,127,0.15)) 4%,
        var(--divider-color, rgba(127,127,127,0.15)) 92%,
        transparent 100%
      );
      border-radius: 2px;
    }

    .date-section {
      margin-bottom: 2px;
    }
    .date-section:last-child {
      margin-bottom: 0;
    }
  `,e([he({attribute:!1})],Ke.prototype,"items",void 0),e([he({attribute:!1})],Ke.prototype,"appearance",void 0),e([he({attribute:!1})],Ke.prototype,"hass",void 0),e([he({type:Boolean})],Ke.prototype,"compact",void 0),e([he({type:String})],Ke.prototype,"timeFormat",void 0),e([he({type:Boolean})],Ke.prototype,"animateNew",void 0),Ke=e([le("chronicle-vertical-timeline")],Ke);let Ze=class extends se{constructor(){super(...arguments),this.items=[],this.timeFormat="24h"}render(){return this.items&&0!==this.items.length?B`
      <div class="wrapper">
        <button class="scroll-btn left" @click=${()=>this._scroll(-200)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>

        <div class="scroll-container">
          ${this.items.map(e=>Ue(e)?e.expanded?this._renderExpandedGroup(e):this._renderGroupCard(e):this._renderEventCard(e))}
        </div>

        <button class="scroll-btn right" @click=${()=>this._scroll(200)}>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>
    `:B`<chronicle-empty-state></chronicle-empty-state>`}_renderEventCard(e){const t=!1!==this.appearance?.show_images,i=e.color;return B`
      <div class="event-card" @click=${()=>this._showDetail(e)}>
        ${t&&e.mediaUrl?B`<img class="card-media" src=${e.mediaUrl} alt="" loading="lazy" />`:B`
            <div class="card-placeholder" style="background-color: ${e.color}">
              <ha-icon .icon=${Ve(e.icon)}></ha-icon>
            </div>
          `}
        <div class="card-body">
          <div class="card-title">
            <span class="card-severity" style="background-color: ${i}"></span>
            ${e.title}
          </div>
          <div class="card-time">${Re(e.start)}</div>
        </div>
      </div>
    `}_renderGroupCard(e){const t=e.representative,i=!1!==this.appearance?.show_images;return B`
      <div class="group-card" @click=${()=>this._toggleGroup(e)}>
        ${i&&t.mediaUrl?B`
            <div class="group-media" style="padding: 0;">
              <img class="card-media" src=${t.mediaUrl} alt="" loading="lazy" />
              <span class="group-badge">${e.events.length}</span>
            </div>
          `:B`
            <div class="group-media" style="background-color: ${t.color}">
              <ha-icon .icon=${Ve(t.icon)}></ha-icon>
              <span class="group-badge">${e.events.length}</span>
            </div>
          `}
        <div class="group-body">
          <div class="group-title">${e.summary}</div>
          <div class="group-time">${Re(t.start)}</div>
        </div>
      </div>
    `}_renderExpandedGroup(e){const t=!1!==this.appearance?.show_images;return B`
      <div class="group-expanded">
        ${e.events.map(e=>B`
          <div class="event-card" @click=${()=>this._showDetail(e)}>
            ${t&&e.mediaUrl?B`<img class="card-media" src=${e.mediaUrl} alt="" loading="lazy" />`:B`
                <div class="card-placeholder" style="background-color: ${e.color}">
                  <ha-icon .icon=${Ve(e.icon)}></ha-icon>
                </div>
              `}
            <div class="card-body">
              <div class="card-title">
                <span class="card-severity" style="background-color: ${e.color}"></span>
                ${e.title}
              </div>
              <div class="card-time">${Re(e.start)}</div>
            </div>
          </div>
        `)}
        <div class="group-collapse-btn" @click=${()=>this._toggleGroup(e)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </div>
      </div>
    `}_scroll(e){this.scrollEl?.scrollBy({left:e,behavior:"smooth"})}_showDetail(e){this.dispatchEvent(new CustomEvent("chronicle-show-detail",{bubbles:!0,composed:!0,detail:{event:e}}))}_toggleGroup(e){this.dispatchEvent(new CustomEvent("chronicle-toggle-group",{bubbles:!0,composed:!0,detail:{group:e}}))}};Ze.styles=n`
    :host {
      display: block;
    }

    .wrapper {
      position: relative;
    }

    .scroll-container {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      padding: 8px 4px 12px;
    }
    .scroll-container::-webkit-scrollbar {
      display: none;
    }

    .scroll-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: 0 1px 6px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.06);
      color: var(--primary-text-color, #333);
      cursor: pointer;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, box-shadow 0.15s ease;
    }
    .scroll-btn:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    }
    .scroll-btn.left { left: 4px; }
    .scroll-btn.right { right: 4px; }
    .scroll-btn ha-icon {
      --mdc-icon-size: 16px;
    }

    .event-card {
      flex-shrink: 0;
      width: 152px;
      scroll-snap-align: start;
      border-radius: 14px;
      overflow: hidden;
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border: 1px solid var(--divider-color, rgba(127,127,127,0.08));
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .event-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    }
    .event-card:active {
      transform: translateY(-1px) scale(0.99);
    }

    .card-media {
      width: 100%;
      height: 88px;
      object-fit: cover;
      display: block;
      background: var(--divider-color, rgba(127,127,127,0.08));
    }
    .card-placeholder {
      width: 100%;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-placeholder ha-icon {
      --mdc-icon-size: 26px;
      color: #fff;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
    }

    .card-body {
      padding: 8px 10px 10px;
    }
    .card-title {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
      letter-spacing: -0.1px;
    }
    .card-time {
      font-size: 10px;
      color: var(--secondary-text-color, #999);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1px;
    }
    .card-severity {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 4px;
      vertical-align: middle;
      box-shadow: 0 0 3px currentColor;
    }

    /* Group card — collapsed state */
    .group-card {
      flex-shrink: 0;
      width: 152px;
      scroll-snap-align: start;
      border-radius: 14px;
      overflow: hidden;
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border: 1px solid var(--divider-color, rgba(127,127,127,0.08));
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .group-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    }
    .group-card:active {
      transform: translateY(-1px) scale(0.99);
    }
    .group-media {
      width: 100%;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .group-media .card-media {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover;
    }
    .group-media ha-icon {
      --mdc-icon-size: 26px;
      color: #fff;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
    }
    .group-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      min-width: 22px;
      height: 22px;
      border-radius: 11px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    }
    .group-body {
      padding: 8px 10px 10px;
    }
    .group-title {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
      letter-spacing: -0.1px;
    }
    .group-time {
      font-size: 10px;
      color: var(--secondary-text-color, #999);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1px;
    }

    /* Expanded group — unfurled inline */
    .group-expanded {
      flex-shrink: 0;
      display: flex;
      gap: 6px;
      scroll-snap-align: start;
      padding: 4px;
      border-radius: 16px;
      background: var(--divider-color, rgba(127,127,127,0.06));
      border: 1px solid var(--divider-color, rgba(127,127,127,0.1));
      transition: background 0.2s ease;
    }
    .group-expanded .event-card {
      width: 140px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.12));
    }
    .group-expanded .card-media,
    .group-expanded .card-placeholder {
      height: 76px;
    }

    /* Collapse button inside expanded group */
    .group-collapse-btn {
      flex-shrink: 0;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 10px;
      transition: background 0.15s ease;
    }
    .group-collapse-btn:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.08));
    }
    .group-collapse-btn ha-icon {
      --mdc-icon-size: 16px;
      color: var(--secondary-text-color, #999);
    }
  `,e([he({attribute:!1})],Ze.prototype,"items",void 0),e([he({attribute:!1})],Ze.prototype,"appearance",void 0),e([he({attribute:!1})],Ze.prototype,"hass",void 0),e([he({type:String})],Ze.prototype,"timeFormat",void 0),e([ge(".scroll-container")],Ze.prototype,"scrollEl",void 0),Ze=e([le("chronicle-horizontal-timeline")],Ze);let Qe=class extends se{constructor(){super(...arguments),this._event=null,this._open=!1,this._container=null}render(){return G}show(e){this._event=e,this._ensureContainer(),this._renderDialog(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{this._open=!0,this._renderDialog()})})}close(){this._open=!1,this._renderDialog(),setTimeout(()=>{this._event=null,this._removeContainer()},350)}_ensureContainer(){if(this._container)return;this._container=document.createElement("div"),this._container.id="chronicle-detail-overlay",document.body.appendChild(this._container);this._container.attachShadow({mode:"open"}).innerHTML=""}_removeContainer(){this._container&&(this._container.remove(),this._container=null)}_renderDialog(){if(!this._container)return;const e=this._container.shadowRoot;if(!e)return;const t=this._event,i=this._open;var r;e.innerHTML=`\n      <style>\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .overlay {\n          position: fixed;\n          top: 0; left: 0; right: 0; bottom: 0;\n          background: rgba(0, 0, 0, 0.5);\n          backdrop-filter: blur(4px);\n          -webkit-backdrop-filter: blur(4px);\n          z-index: 99999;\n          opacity: ${i?"1":"0"};\n          transition: opacity 0.3s ease;\n          pointer-events: ${i?"auto":"none"};\n        }\n\n        .dialog {\n          position: fixed;\n          z-index: 100000;\n          background: var(--card-background-color, #fff);\n          overflow-y: auto;\n          overscroll-behavior: contain;\n\n          /* Mobile: bottom sheet */\n          bottom: 0; left: 0; right: 0;\n          max-height: 88vh;\n          border-radius: 20px 20px 0 0;\n          box-shadow: 0 -2px 30px rgba(0, 0, 0, 0.2), 0 -1px 2px rgba(0,0,0,0.06);\n          transform: translateY(${i?"0":"100%"});\n          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n\n        @media (min-width: 600px) {\n          .dialog {\n            bottom: auto; left: 50%; right: auto;\n            top: 50%;\n            transform: translate(-50%, -50%) scale(${i?"1":"0.96"});\n            opacity: ${i?"1":"0"};\n            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;\n            border-radius: 18px;\n            max-width: 460px;\n            width: 92vw;\n            max-height: 82vh;\n            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0,0,0,0.08);\n          }\n        }\n\n        .handle {\n          width: 32px; height: 4px;\n          border-radius: 2px;\n          background: var(--divider-color, rgba(127,127,127,0.25));\n          margin: 10px auto 0;\n        }\n        @media (min-width: 600px) { .handle { display: none; } }\n\n        .media-wrap {\n          position: relative;\n          overflow: hidden;\n        }\n        .media {\n          width: 100%;\n          max-height: 240px;\n          object-fit: cover;\n          display: block;\n          background: var(--secondary-background-color, #f0f0f0);\n        }\n        .media-gradient {\n          position: absolute;\n          bottom: 0; left: 0; right: 0;\n          height: 48px;\n          background: linear-gradient(transparent, var(--card-background-color, #fff));\n          pointer-events: none;\n        }\n\n        .body { padding: 16px 20px 24px; }\n        .body-with-media { padding-top: 8px; }\n\n        .header {\n          display: flex;\n          align-items: flex-start;\n          gap: 12px;\n          margin-bottom: 16px;\n        }\n        .header-icon {\n          width: 40px; height: 40px;\n          border-radius: 50%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          flex-shrink: 0;\n          box-shadow: 0 2px 6px rgba(0,0,0,0.12);\n        }\n        .header-icon ha-icon {\n          --mdc-icon-size: 20px;\n          color: #fff;\n          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));\n        }\n        .header-text { flex: 1; min-width: 0; }\n        .header-title {\n          font-size: 17px;\n          font-weight: 700;\n          color: var(--primary-text-color, #333);\n          line-height: 1.3;\n          letter-spacing: -0.2px;\n        }\n        .header-time {\n          font-size: 12px;\n          color: var(--secondary-text-color, #888);\n          margin-top: 4px;\n          font-variant-numeric: tabular-nums;\n        }\n\n        .close-btn {\n          position: absolute;\n          top: 12px; right: 12px;\n          width: 30px; height: 30px;\n          border-radius: 50%;\n          border: none;\n          background: rgba(127,127,127,0.12);\n          backdrop-filter: blur(8px);\n          -webkit-backdrop-filter: blur(8px);\n          color: var(--primary-text-color, #333);\n          cursor: pointer;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          z-index: 2;\n          padding: 0;\n          transition: background 0.15s ease;\n        }\n        .close-btn:hover {\n          background: rgba(127,127,127,0.22);\n        }\n        .close-btn svg {\n          display: block;\n        }\n\n        .tags {\n          display: flex;\n          flex-wrap: wrap;\n          gap: 6px;\n          margin-bottom: 16px;\n        }\n        .tag {\n          font-size: 11px;\n          font-weight: 500;\n          padding: 3px 10px;\n          border-radius: 20px;\n          background: var(--divider-color, rgba(127,127,127,0.08));\n          color: var(--secondary-text-color, #777);\n          letter-spacing: 0.1px;\n        }\n        .severity-tag {\n          font-size: 10px;\n          font-weight: 600;\n          letter-spacing: 0.4px;\n          text-transform: uppercase;\n          height: 22px;\n          padding: 0 10px;\n          border-radius: 20px;\n          color: #fff;\n          display: inline-flex;\n          align-items: center;\n          justify-content: center;\n          line-height: 1;\n        }\n\n        .description {\n          font-size: 13.5px;\n          line-height: 1.65;\n          color: var(--primary-text-color, #444);\n          margin-bottom: 16px;\n          white-space: pre-wrap;\n          word-break: break-word;\n          opacity: 0.9;\n        }\n\n        .meta-table {\n          display: grid;\n          grid-template-columns: auto 1fr;\n          gap: 7px 14px;\n          font-size: 12px;\n          margin-bottom: 16px;\n          padding: 14px 16px;\n          background: var(--secondary-background-color, rgba(127,127,127,0.04));\n          border-radius: 12px;\n          border: 1px solid var(--divider-color, rgba(127,127,127,0.08));\n        }\n        .meta-label {\n          color: var(--secondary-text-color, #888);\n          font-weight: 500;\n          font-size: 11px;\n          text-transform: uppercase;\n          letter-spacing: 0.3px;\n        }\n        .meta-value {\n          color: var(--primary-text-color, #333);\n          font-size: 12.5px;\n        }\n      </style>\n\n      <div class="overlay"></div>\n      <div class="dialog">\n        ${t?`\n          <div class="handle"></div>\n          <button class="close-btn"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg></button>\n\n          ${t.mediaUrl?`\n            <div class="media-wrap">\n              <img class="media" src="${this._escHtml(t.mediaUrl)}" alt="" />\n              <div class="media-gradient"></div>\n            </div>\n          `:""}\n\n          <div class="body ${t.mediaUrl?"body-with-media":""}">\n            <div class="header">\n              <div class="header-icon" style="background-color: ${t.color}">\n                <ha-icon icon="${r=t.icon,r&&r.startsWith("mdi:")?r:ve.default}"></ha-icon>\n              </div>\n              <div class="header-text">\n                <div class="header-title">${this._escHtml(t.title)}</div>\n                <div class="header-time">${this._formatDateTime(t.start)}</div>\n              </div>\n            </div>\n\n            <div class="tags">\n              <span class="severity-tag" style="background-color: ${this._severityColor(t.severity)}">${t.severity}</span>\n              ${t.category?`<span class="tag">${this._escHtml(t.category)}</span>`:""}\n              ${t.label?`<span class="tag">${this._escHtml(t.label)}</span>`:""}\n              ${t.sourceType?`<span class="tag">${this._escHtml(t.sourceType)}</span>`:""}\n            </div>\n\n            ${t.description?`<div class="description">${this._escHtml(t.description)}</div>`:""}\n\n            <div class="meta-table">\n              ${t.entityName?`\n                <span class="meta-label">Entity</span>\n                <span class="meta-value">${this._escHtml(t.entityName)}</span>\n              `:""}\n              ${t.entityId?`\n                <span class="meta-label">Entity ID</span>\n                <span class="meta-value">${this._escHtml(t.entityId)}</span>\n              `:""}\n              <span class="meta-label">Source</span>\n              <span class="meta-value">${this._escHtml(t.sourceId)}</span>\n              <span class="meta-label">Start</span>\n              <span class="meta-value">${this._formatDateTime(t.start)}</span>\n              ${t.end&&t.end!==t.start?`\n                <span class="meta-label">End</span>\n                <span class="meta-value">${this._formatDateTime(t.end)}</span>\n              `:""}\n            </div>\n          </div>\n        `:""}\n      </div>\n    `;const o=e.querySelector(".overlay"),a=e.querySelector(".close-btn");o?.addEventListener("click",()=>this.close()),a?.addEventListener("click",()=>this.close())}_escHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}_severityColor(e){const t={critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"};return t[e]||t.info}_formatDateTime(e){try{return new Date(e).toLocaleString(void 0,{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}connectedCallback(){super.connectedCallback(),this._boundKeydown=this._handleKeydown.bind(this),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),this._boundKeydown&&document.removeEventListener("keydown",this._boundKeydown),this._removeContainer()}_handleKeydown(e){"Escape"===e.key&&this._open&&this.close()}};Qe.styles=n`
    :host { display: none; }
  `,e([he({attribute:!1})],Qe.prototype,"hass",void 0),e([ue()],Qe.prototype,"_event",void 0),e([ue()],Qe.prototype,"_open",void 0),Qe=e([le("chronicle-detail-dialog")],Qe);let Xe=class extends se{constructor(){super(...arguments),this._items=[],this._layout="vertical",this._store=new Ne,this._liveSubscribed=!1}static getConfigElement(){return document.createElement("chronicle-card-editor")}static getStubConfig(){return{type:"custom:chronicle-card",title:"Timeline",layout:"vertical",sources:[]}}setConfig(e){if(!e)throw new Error("No configuration provided");this._config={...me,...e,filters:{...me.filters,...e.filters},grouping:{...me.grouping,...e.grouping},appearance:{...me.appearance,...e.appearance}},this._layout=this._config.layout??"vertical",this._store.configure(this._config),this._storeUnsub?.(),this._storeUnsub=this._store.subscribe(()=>{this._items=[...this._store.items]})}set hass(e){this._hass=e,this.requestUpdate(),this._store.fetch(e).catch(e=>{console.warn("[chronicle-card] Fetch error:",e)}),this._liveSubscribed||(this._liveSubscribed=!0,this._store.subscribeLive(e).catch(()=>{}))}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._hass&&this._store.subscribeLive(this._hass).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this._store.unsubscribeLive(),this._liveSubscribed=!1,this._storeUnsub?.()}render(){if(!this._config)return G;const e=!1!==this._config.show_header,t=!1!==this._config.show_layout_toggle,i=this._config.appearance??{},r=this._config.time_format??"24h",o=i.compact??!1,a=!1!==i.animate_new_events;return B`
      <ha-card>
        ${e?B`
          <div class="card-header">
            <span class="title">${this._config.title??""}</span>
            ${t?B`
              <div class="header-actions">
                <button
                  class="layout-toggle ${"vertical"===this._layout?"active":""}"
                  @click=${()=>this._setLayout("vertical")}
                  title="Vertical timeline"
                >
                  <ha-icon icon="mdi:view-sequential"></ha-icon>
                </button>
                <button
                  class="layout-toggle ${"horizontal"===this._layout?"active":""}"
                  @click=${()=>this._setLayout("horizontal")}
                  title="Horizontal timeline"
                >
                  <ha-icon icon="mdi:view-carousel"></ha-icon>
                </button>
              </div>
            `:""}
          </div>
        `:""}

        <div class="card-content" @chronicle-show-detail=${this._onShowDetail} @chronicle-toggle-group=${this._onToggleGroup}>
          ${"vertical"===this._layout?B`
              <chronicle-vertical-timeline
                .items=${this._items}
                .appearance=${i}
                .hass=${this.hass}
                .timeFormat=${r}
                ?compact=${o}
                ?animateNew=${a}
              ></chronicle-vertical-timeline>
            `:B`
              <chronicle-horizontal-timeline
                .items=${this._items}
                .appearance=${i}
                .hass=${this.hass}
                .timeFormat=${r}
              ></chronicle-horizontal-timeline>
            `}
        </div>

        <chronicle-detail-dialog .hass=${this.hass}></chronicle-detail-dialog>
      </ha-card>
    `}_setLayout(e){this._layout=e}_onShowDetail(e){const t=e.detail.event;this._dialog&&this._dialog.show(t)}_onToggleGroup(e){const t=e.detail.group;this._store.toggleGroup(t)}getCardSize(){return 4}};Xe.styles=n`
    :host {
      display: block;
      contain: content;
    }

    ha-card {
      overflow: hidden;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border-radius: var(--ha-card-border-radius, 12px);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 6px;
    }

    .title {
      font-size: 15px;
      font-weight: 700;
      color: var(--primary-text-color, #333);
      letter-spacing: -0.3px;
    }

    .header-actions {
      display: flex;
      gap: 3px;
    }

    .layout-toggle {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: var(--secondary-text-color, #999);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .layout-toggle:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.08));
      color: var(--primary-text-color, #333);
    }
    .layout-toggle.active {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      box-shadow: 0 1px 4px rgba(3,169,244,0.25);
    }
    .layout-toggle ha-icon {
      --mdc-icon-size: 17px;
    }

    .card-content {
      padding: 0 16px 14px;
    }
  `,e([ue()],Xe.prototype,"_config",void 0),e([ue()],Xe.prototype,"_items",void 0),e([ue()],Xe.prototype,"_layout",void 0),e([ge("chronicle-detail-dialog")],Xe.prototype,"_dialog",void 0),Xe=e([le("chronicle-card")],Xe);let et=class extends se{constructor(){super(...arguments),this.index=0}render(){return this.source?B`
      <div class="source-card">
        <div class="source-header">
          <div class="field" style="flex:1; margin-bottom:0; margin-right:8px;">
            <label>Source Type</label>
            <select .value=${this.source.type} @change=${this._onTypeChange}>
              <option value="calendar">Calendar Entity</option>
              <option value="rest">REST API</option>
              <option value="history">Entity History</option>
              <option value="static">Static Events</option>
            </select>
          </div>
          <button class="remove-btn" @click=${this._remove}>Remove</button>
        </div>

        <div class="field">
          <label>Name</label>
          <input type="text" .value=${this.source.name??""} @input=${e=>this._update("name",e.target.value)} placeholder="Source display name" />
        </div>

        ${this._renderTypeFields()}

        <div class="section-label">Appearance</div>

        <div class="row">
          <div class="field">
            <label>Default Icon</label>
            <input type="text" .value=${this.source.default_icon??""} @input=${e=>this._update("default_icon",e.target.value)} placeholder="mdi:calendar-clock" />
          </div>
          <div class="field">
            <label>Default Color</label>
            <input type="color" .value=${this.source.default_color??"#2196F3"} @input=${e=>this._update("default_color",e.target.value)} />
          </div>
          <div class="field">
            <label>Severity</label>
            <select .value=${this.source.default_severity??"info"} @change=${e=>this._update("default_severity",e.target.value)}>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>
        </div>

        ${this._renderIconColorMaps()}
      </div>
    `:G}_renderTypeFields(){switch(this.source.type){case"calendar":return B`
          <div class="field">
            <label>Calendar Entity</label>
            <input type="text" .value=${this.source.entity??""} @input=${e=>this._update("entity",e.target.value)} placeholder="calendar.my_calendar" />
          </div>
        `;case"rest":return B`
          <div class="field">
            <label>API URL</label>
            <input type="text" .value=${this.source.url??""} @input=${e=>this._update("url",e.target.value)} placeholder="llmvision/timeline/events?limit=50" />
            <p class="help-text">Internal HA API path (no /api/ prefix needed) or full external URL</p>
          </div>
          <div class="field">
            <label>Response Path</label>
            <input type="text" .value=${this.source.response_path??""} @input=${e=>this._update("response_path",e.target.value)} placeholder="events" />
            <p class="help-text">Dot-path to the array in the JSON response (e.g. "events" or "data.items")</p>
          </div>
          <div class="field">
            <label>Field Map (JSON)</label>
            <textarea
              .value=${this._fieldMapToString()}
              @change=${this._onFieldMapChange}
              placeholder='{"id":"uid","title":"title","start":"start","mediaUrl":"key_frame"}'
            ></textarea>
            <p class="help-text">Maps response fields to: id, title, description, start, end, mediaUrl, category, label, entityId</p>
          </div>
          <div class="field">
            <label>Media URL Template</label>
            <input type="text" .value=${this.source.media_url_template??""} @input=${e=>this._update("media_url_template",e.target.value)} placeholder="/api/frigate/notifications/{id}/snapshot.jpg" />
            <p class="help-text">Build image URL from response fields using {field} placeholders. Overrides mediaUrl field mapping.</p>
          </div>
          <div class="field">
            <label>WebSocket Params (JSON)</label>
            <textarea
              .value=${this._wsParamsToString()}
              @change=${this._onWsParamsChange}
              placeholder='{"type":"frigate/events/get","instance_id":"frigate","labels":["cat"],"limit":25}'
            ></textarea>
            <p class="help-text">Use WebSocket instead of REST. Overrides API URL. Required for Frigate events.</p>
          </div>
          <div class="field">
            <label>Poll Interval (seconds)</label>
            <input type="number" .value=${String(this.source.poll_interval??60)} @input=${e=>this._update("poll_interval",Number(e.target.value))} min="5" />
          </div>
        `;case"history":return B`
          <div class="field">
            <label>Entities (comma-separated)</label>
            <input type="text"
              .value=${(this.source.entities??[]).join(", ")}
              @input=${e=>this._update("entities",e.target.value.split(",").map(e=>e.trim()).filter(Boolean))}
              placeholder="binary_sensor.front_door, lock.front_door_lock"
            />
            <p class="help-text">Each state change becomes a timeline event. Titles use device class for human-readable labels (e.g. "Front Door Opened").</p>
          </div>
          <div class="field">
            <label>State Labels (JSON, optional)</label>
            <textarea
              .value=${this._mapToString(this.source.state_map)}
              @change=${e=>this._onMapChange("state_map",e)}
              placeholder='{"on": "Opened", "off": "Closed"}'
              style="min-height:40px;"
            ></textarea>
            <p class="help-text">Override how raw state values are displayed. Device class labels are used automatically when not specified.</p>
          </div>
        `;case"static":return B`
          <div class="field">
            <label>Events (JSON array)</label>
            <textarea
              .value=${this._staticEventsToString()}
              @change=${this._onStaticEventsChange}
              placeholder='[{"title":"Filter Change","start":"2026-04-01T10:00:00","icon":"mdi:air-filter"}]'
            ></textarea>
            <p class="help-text">Define events directly. Fields: title, start, end, description, icon, color, severity, category</p>
          </div>
        `;default:return G}}_renderIconColorMaps(){return"static"===this.source.type?G:B`
      <div class="section-label">Category Mapping (optional)</div>
      <div class="row">
        <div class="field">
          <label>Icon Map (JSON)</label>
          <textarea
            .value=${this._mapToString(this.source.icon_map)}
            @change=${e=>this._onMapChange("icon_map",e)}
            placeholder='{"person":"mdi:walk","vehicle":"mdi:car"}'
            style="min-height:40px;"
          ></textarea>
        </div>
        <div class="field">
          <label>Color Map (JSON)</label>
          <textarea
            .value=${this._mapToString(this.source.color_map)}
            @change=${e=>this._onMapChange("color_map",e)}
            placeholder='{"person":"#FF9800","vehicle":"#2196F3"}'
            style="min-height:40px;"
          ></textarea>
        </div>
      </div>
    `}_fieldMapToString(){if(!this.source.field_map||0===Object.keys(this.source.field_map).length)return"";try{return JSON.stringify(this.source.field_map,null,2)}catch{return""}}_wsParamsToString(){if(!this.source.ws_params||0===Object.keys(this.source.ws_params).length)return"";try{return JSON.stringify(this.source.ws_params,null,2)}catch{return""}}_onWsParamsChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);"object"!=typeof e||Array.isArray(e)||this._update("ws_params",e)}catch{}else this._update("ws_params",void 0)}_onFieldMapChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);"object"!=typeof e||Array.isArray(e)||this._update("field_map",e)}catch{}else this._update("field_map",void 0)}_staticEventsToString(){if(!this.source.events||0===this.source.events.length)return"";try{return JSON.stringify(this.source.events,null,2)}catch{return""}}_onStaticEventsChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);Array.isArray(e)&&this._update("events",e)}catch{}else this._update("events",void 0)}_mapToString(e){if(!e||0===Object.keys(e).length)return"";try{return JSON.stringify(e)}catch{return""}}_onMapChange(e,t){const i=t.target.value.trim();if(i)try{const t=JSON.parse(i);"object"!=typeof t||Array.isArray(t)||this._update(e,t)}catch{}else this._update(e,void 0)}_onTypeChange(e){this._update("type",e.target.value)}_update(e,t){this.dispatchEvent(new CustomEvent("source-changed",{bubbles:!0,composed:!0,detail:{index:this.index,key:e,value:t}}))}_remove(){this.dispatchEvent(new CustomEvent("source-removed",{bubbles:!0,composed:!0,detail:{index:this.index}}))}};et.styles=n`
    :host {
      display: block;
    }
    .source-card {
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 8px;
      background: var(--secondary-background-color, rgba(127,127,127,0.04));
    }
    .source-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .remove-btn {
      border: none;
      background: none;
      color: var(--error-color, #db4437);
      cursor: pointer;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: inherit;
    }
    .remove-btn:hover {
      background: rgba(219, 68, 55, 0.1);
    }
    .field {
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      gap: 8px;
    }
    .row .field { flex: 1; }
    label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
      font-size: 13px;
      font-family: inherit;
      box-sizing: border-box;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    textarea {
      min-height: 60px;
      resize: vertical;
      font-family: monospace;
      font-size: 12px;
    }
    .section-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color, #777);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 12px 0 6px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, rgba(127,127,127,0.12));
    }
    .help-text {
      font-size: 11px;
      color: var(--secondary-text-color, #999);
      margin: 2px 0 0;
      line-height: 1.4;
    }
  `,e([he({attribute:!1})],et.prototype,"source",void 0),e([he({type:Number})],et.prototype,"index",void 0),e([he({attribute:!1})],et.prototype,"hass",void 0),et=e([le("chronicle-source-editor")],et);let tt=class extends se{setConfig(e){this._config={...me,...e,filters:{...me.filters,...e.filters},grouping:{...me.grouping,...e.grouping},appearance:{...me.appearance,...e.appearance}}}render(){if(!this._config)return G;const e=this._config,t=e.grouping??{},i=e.appearance??{};return B`
      <div class="editor">
        <!-- General -->
        <details open>
          <summary>General</summary>
          <div class="section-body">
            <div class="field">
              <label>Title</label>
              <input type="text" .value=${e.title??""} @input=${e=>this._set("title",e.target.value)} />
            </div>
            <div class="row">
              <div class="field">
                <label>Layout</label>
                <select .value=${e.layout??"vertical"} @change=${e=>this._set("layout",e.target.value)}>
                  <option value="vertical">Vertical</option>
                  <option value="horizontal">Horizontal</option>
                </select>
              </div>
              <div class="field">
                <label>Time Format</label>
                <select .value=${e.time_format??"24h"} @change=${e=>this._set("time_format",e.target.value)}>
                  <option value="24h">24 Hour</option>
                  <option value="12h">12 Hour</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="field">
                <label>Max Events</label>
                <input type="number" .value=${String(e.max_events??50)} @input=${e=>this._set("max_events",Number(e.target.value))} />
              </div>
              <div class="field">
                <label>Days Back</label>
                <input type="number" .value=${String(e.days_back??7)} @input=${e=>this._set("days_back",Number(e.target.value))} />
              </div>
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Header</span>
              ${this._renderToggle(!1!==e.show_header,e=>this._set("show_header",e))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Layout Toggle</span>
              ${this._renderToggle(!1!==e.show_layout_toggle,e=>this._set("show_layout_toggle",e))}
            </div>
          </div>
        </details>

        <!-- Sources -->
        <details>
          <summary>Sources (${(e.sources??[]).length})</summary>
          <div class="section-body"
            @source-changed=${this._onSourceChanged}
            @source-removed=${this._onSourceRemoved}
          >
            ${(e.sources??[]).map((e,t)=>B`
              <chronicle-source-editor
                .source=${e}
                .index=${t}
                .hass=${this.hass}
              ></chronicle-source-editor>
            `)}
            <div class="add-source-row">
              <button class="add-btn" @click=${()=>this._addSource("calendar")}>+ Calendar</button>
              <button class="add-btn" @click=${()=>this._addSource("rest")}>+ REST API</button>
              <button class="add-btn" @click=${()=>this._addSource("history")}>+ History</button>
              <button class="add-btn" @click=${()=>this._addSource("static")}>+ Static</button>
            </div>
          </div>
        </details>

        <!-- Grouping -->
        <details>
          <summary>Grouping</summary>
          <div class="section-body">
            <div class="toggle-row">
              <span class="toggle-label">Enable Grouping</span>
              ${this._renderToggle(!1!==t.enabled,e=>this._setNested("grouping","enabled",e))}
            </div>
            <div class="row">
              <div class="field">
                <label>Window (seconds)</label>
                <input type="number" .value=${String(t.window_seconds??120)} @input=${e=>this._setNested("grouping","window_seconds",Number(e.target.value))} />
              </div>
              <div class="field">
                <label>Min Group Size</label>
                <input type="number" .value=${String(t.min_group_size??3)} @input=${e=>this._setNested("grouping","min_group_size",Number(e.target.value))} />
              </div>
            </div>
            <div class="field">
              <label>Group By</label>
              <select .value=${t.group_by??"category"} @change=${e=>this._setNested("grouping","group_by",e.target.value)}>
                <option value="category">Category</option>
                <option value="source">Source</option>
                <option value="entity">Entity</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </details>

        <!-- Appearance -->
        <details>
          <summary>Appearance</summary>
          <div class="section-body">
            <div class="field">
              <label>Card Height</label>
              <input type="text" .value=${i.card_height??"400px"} @input=${e=>this._setNested("appearance","card_height",e.target.value)} placeholder="400px or auto" />
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Compact Mode</span>
              ${this._renderToggle(i.compact??!1,e=>this._setNested("appearance","compact",e))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Images</span>
              ${this._renderToggle(!1!==i.show_images,e=>this._setNested("appearance","show_images",e))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Icons</span>
              ${this._renderToggle(!1!==i.show_icons,e=>this._setNested("appearance","show_icons",e))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Severity Badge</span>
              ${this._renderToggle(!1!==i.show_severity_badge,e=>this._setNested("appearance","show_severity_badge",e))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Animate New Events</span>
              ${this._renderToggle(!1!==i.animate_new_events,e=>this._setNested("appearance","animate_new_events",e))}
            </div>

            <div style="margin-top: 12px;">
              <label>Severity Colors</label>
              <div class="row">
                <div class="field">
                  <label>Critical</label>
                  <input type="color" .value=${i.severity_colors?.critical??"#D32F2F"} @input=${e=>this._setSeverityColor("critical",e.target.value)} />
                </div>
                <div class="field">
                  <label>Warning</label>
                  <input type="color" .value=${i.severity_colors?.warning??"#FF9800"} @input=${e=>this._setSeverityColor("warning",e.target.value)} />
                </div>
                <div class="field">
                  <label>Info</label>
                  <input type="color" .value=${i.severity_colors?.info??"#2196F3"} @input=${e=>this._setSeverityColor("info",e.target.value)} />
                </div>
                <div class="field">
                  <label>Debug</label>
                  <input type="color" .value=${i.severity_colors?.debug??"#9E9E9E"} @input=${e=>this._setSeverityColor("debug",e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    `}_renderToggle(e,t){return B`
      <label class="switch">
        <input type="checkbox" .checked=${e} @change=${e=>t(e.target.checked)} />
        <span class="slider"></span>
      </label>
    `}_set(e,t){this._config={...this._config,[e]:t},this._fire()}_setNested(e,t,i){const r=this._config[e]??{};this._config={...this._config,[e]:{...r,[t]:i}},this._fire()}_setSeverityColor(e,t){const i=this._config.appearance?.severity_colors??{};this._setNested("appearance","severity_colors",{...i,[e]:t})}_addSource(e){const t=[...this._config.sources??[],{type:e,name:{calendar:"Calendar",rest:"REST API",history:"History",static:"Static"}[e]}];this._config={...this._config,sources:t},this._fire()}_onSourceChanged(e){const{index:t,key:i,value:r}=e.detail,o=[...this._config.sources??[]];o[t]={...o[t],[i]:r},this._config={...this._config,sources:o},this._fire()}_onSourceRemoved(e){const{index:t}=e.detail,i=[...this._config.sources??[]];i.splice(t,1),this._config={...this._config,sources:i},this._fire()}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:this._config}}))}};tt.styles=n`
    :host {
      display: block;
    }

    .editor {
      padding: 4px 0;
    }

    details {
      margin-bottom: 4px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.15));
      border-radius: 10px;
      overflow: hidden;
    }
    summary {
      padding: 12px 14px;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      cursor: pointer;
      user-select: none;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--secondary-background-color, rgba(127,127,127,0.04));
    }
    summary::-webkit-details-marker { display: none; }
    summary::before {
      content: '▸';
      transition: transform 0.15s ease;
      font-size: 11px;
      color: var(--secondary-text-color, #999);
    }
    details[open] > summary::before {
      transform: rotate(90deg);
    }

    .section-body {
      padding: 12px 14px;
    }

    .field {
      margin-bottom: 12px;
    }
    label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    input, select {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
      font-size: 13px;
      font-family: inherit;
      box-sizing: border-box;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    input[type="color"] {
      height: 36px;
      padding: 2px 4px;
      cursor: pointer;
    }

    .row {
      display: flex;
      gap: 12px;
    }
    .row .field { flex: 1; }

    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
    }
    .toggle-label {
      font-size: 13px;
      color: var(--primary-text-color, #333);
    }

    .add-source-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px 6px;
      border: 2px dashed var(--divider-color, rgba(127,127,127,0.25));
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      font-family: inherit;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .add-btn:hover {
      border-color: var(--primary-color, #03a9f4);
      background: rgba(3, 169, 244, 0.04);
    }

    /* Toggle switch */
    .switch {
      position: relative;
      width: 40px;
      height: 22px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: var(--divider-color, #ccc);
      border-radius: 11px;
      transition: background 0.2s ease;
    }
    .slider::before {
      content: '';
      position: absolute;
      height: 18px;
      width: 18px;
      left: 2px;
      bottom: 2px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s ease;
    }
    .switch input:checked + .slider {
      background: var(--primary-color, #03a9f4);
    }
    .switch input:checked + .slider::before {
      transform: translateX(18px);
    }
  `,e([he({attribute:!1})],tt.prototype,"hass",void 0),e([ue()],tt.prototype,"_config",void 0),tt=e([le("chronicle-card-editor")],tt);const it=window;it.customCards=it.customCards||[],it.customCards.push({type:"chronicle-card",name:"Chronicle Card",description:"A universal, extensible timeline card for Home Assistant",preview:!0,documentationURL:"https://github.com/chronicle-card/chronicle-card"}),console.info("%c CHRONICLE-CARD %c v1.7.1 ","color: #fff; background: #2196F3; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #2196F3; background: #e3f2fd; font-weight: 500; padding: 2px 6px; border-radius: 0 4px 4px 0;");
