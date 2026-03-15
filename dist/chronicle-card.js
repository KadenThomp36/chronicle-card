function e(e,t,i,a){var r,o=arguments.length,s=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o<3?r(s):o>3?r(t,i,s):r(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new o(i,e,a)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",v=m.reactiveElementPolyfillSupport,b=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},_=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const o=a?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(i)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of a){const a=document.createElement("style"),r=t.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=i.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=a;const o=r.fromAttribute(t,e.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const o=this.constructor;if(!1===a&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??_)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,v?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,S=$.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+E,T=`<${O}>`,z=document,D=()=>z.createComment(""),F=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,U=/>/g,j=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,L=/"/g,R=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),J=new WeakMap,Y=z.createTreeWalker(z,129);function q(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,a=[];let r,o=2===t?"<svg>":3===t?"<math>":"",s=N;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(s.lastIndex=d,l=s.exec(i),null!==l);)d=s.lastIndex,s===N?"!--"===l[1]?s=I:void 0!==l[1]?s=U:void 0!==l[2]?(R.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=j):void 0!==l[3]&&(s=j):s===j?">"===l[0]?(s=r??N,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?j:'"'===l[3]?L:H):s===L||s===H?s=j:s===I||s===U?s=N:(s=j,r=void 0);const p=s===j&&e[t+1].startsWith("/>")?" ":"";o+=s===N?i+T:c>=0?(a.push(n),i.slice(0,c)+A+i.slice(c)+E+p):i+E+(-2===c?t:p)}return[q(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class V{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,o=0;const s=e.length-1,n=this.parts,[l,c]=K(e,t);if(this.el=V.createElement(l,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=Y.nextNode())&&n.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(A)){const t=c[o++],i=a.getAttribute(e).split(E),s=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?te:"?"===s[1]?ie:"@"===s[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(E)&&(n.push({type:6,index:r}),a.removeAttribute(e));if(R.test(a.tagName)){const e=a.textContent.split(E),t=e.length-1;if(t>0){a.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],D()),Y.nextNode(),n.push({type:2,index:++r});a.append(e[t],D())}}}else if(8===a.nodeType)if(a.data===O)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(E,e+1));)n.push({type:7,index:r}),e+=E.length-1}r++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,a){if(t===W)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const o=F(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,a)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??z).importNode(t,!0);Y.currentNode=a;let r=Y.nextNode(),o=0,s=0,n=i[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new Q(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new re(r,this,e)),this._$AV.push(t),n=i[++s]}o!==n?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=z,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),F(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=V.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Z(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=J.get(e.strings);return void 0===t&&J.set(e.strings,t=new V(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new Q(this.O(D()),this.O(D()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,a){const r=this.strings;let o=!1;if(void 0===r)e=X(this,e,t,0),o=!F(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const a=e;let s,n;for(e=r[0],s=0;s<r.length-1;s++)n=X(this,a[i+s],t,s),n===W&&(n=this._$AH[s]),o||=!F(n)||n!==this._$AH[s],n===G?e=G:e!==G&&(e+=(n??"")+r[s+1]),this._$AH[s]=n}o&&!a&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class ae extends ee{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??G)===W)return;const i=this._$AH,a=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==G&&(i===G||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const oe=$.litHtmlPolyfillSupport;oe?.(V,Q),($.litHtmlVersions??=[]).push("3.3.2");const se=globalThis;class ne extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new Q(t.insertBefore(D(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ne._$litElement$=!0,ne.finalized=!0,se.litElementHydrateSupport?.({LitElement:ne});const le=se.litElementPolyfillSupport;le?.({LitElement:ne}),(se.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:_},pe=(e=de,t,i)=>{const{kind:a,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function he(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return he({...e,state:!0,attribute:!1})}function me(e,t){return(t,i,a)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}const ge={layout:"vertical",show_layout_toggle:!0,max_events:50,days_back:7,time_format:"24h",show_header:!0,filters:{categories:[],severities:[],sources:[],entities:[],search:""},grouping:{enabled:!0,window_seconds:120,min_group_size:3,group_by:"category"},appearance:{card_height:"400px",compact:!1,show_images:!0,show_icons:!0,show_severity_badge:!0,show_source_badge:!1,animate_new_events:!0,severity_colors:{critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"}}},fe={critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"},ve={person:"mdi:walk",vehicle:"mdi:car",animal:"mdi:paw",pet:"mdi:paw",security:"mdi:shield-home",motion:"mdi:motion-sensor",door:"mdi:door",lock:"mdi:lock",camera:"mdi:cctv",light:"mdi:lightbulb",climate:"mdi:thermostat",automation:"mdi:robot",system:"mdi:cog",default:"mdi:calendar-clock"},be={person:"#FF9800",vehicle:"#2196F3",animal:"#43A047",pet:"#43A047",security:"#F44336",motion:"#9C27B0",door:"#795548",lock:"#607D8B",camera:"#FF5722",light:"#FFC107",climate:"#00BCD4",automation:"#3F51B5",system:"#9E9E9E",default:"#78909C"},ye=108e5,_e=[[["cat","kitten","feline"],"mdi:cat"],[["dog","puppy","canine"],"mdi:dog"],[["bird","robin","crow","pigeon","sparrow"],"mdi:bird"],[["fish","aquarium"],"mdi:fish"],[["rabbit","bunny"],"mdi:rabbit"],[["horse","pony"],"mdi:horse"],[["snake","reptile","lizard"],"mdi:snake"],[["bear"],"mdi:paw"],[["deer"],"mdi:deer"],[["insect","bug","spider","bee","wasp"],"mdi:bee"],[["animal","pet","wildlife"],"mdi:paw"],[["person","human","people","visitor","guest","face"],"mdi:walk"],[["baby","infant","child","kid"],"mdi:baby-face-outline"],[["meeting","appointment","interview"],"mdi:account-group"],[["car","automobile","sedan"],"mdi:car"],[["truck","lorry"],"mdi:truck"],[["motorcycle","motorbike","bike","bicycle"],"mdi:bike"],[["bus","transit"],"mdi:bus"],[["boat","ship"],"mdi:sail-boat"],[["airplane","plane","flight"],"mdi:airplane"],[["vehicle","transport"],"mdi:car"],[["package","parcel","delivery","mail","post","courier"],"mdi:package-variant-closed"],[["amazon"],"mdi:package-variant-closed"],[["alarm","alert","intrusion","break-in","breach"],"mdi:alarm-light"],[["security","surveillance","guard"],"mdi:shield-home"],[["smoke","fire","flame"],"mdi:fire"],[["flood","water leak","leak"],"mdi:water-alert"],[["co2","carbon monoxide","gas"],"mdi:molecule-co2"],[["doorbell","ring","knock"],"mdi:doorbell"],[["door","gate","entry","entrance","exit"],"mdi:door"],[["lock","unlock","locked","unlocked"],"mdi:lock"],[["window"],"mdi:window-closed-variant"],[["garage"],"mdi:garage"],[["motion","movement","activity","detected"],"mdi:motion-sensor"],[["camera","cctv","snapshot","recording","footage","clip"],"mdi:cctv"],[["light","lamp","bulb","lighting","illumin"],"mdi:lightbulb"],[["temperature","temp","thermostat","hvac","heat","cool"],"mdi:thermostat"],[["weather","rain","snow","storm","wind","sunny","cloud"],"mdi:weather-partly-cloudy"],[["humidity","moisture"],"mdi:water-percent"],[["vacuum","roomba","clean"],"mdi:robot-vacuum"],[["washer","laundry","wash"],"mdi:washing-machine"],[["dryer"],"mdi:tumble-dryer"],[["dishwasher","dishes"],"mdi:dishwasher"],[["oven","stove","cook","bake"],"mdi:stove"],[["fridge","refrigerator","freezer"],"mdi:fridge"],[["microwave"],"mdi:microwave"],[["coffee","espresso"],"mdi:coffee"],[["music","song","audio","speaker","playing"],"mdi:music"],[["tv","television","movie","video","stream","netflix","plex"],"mdi:television"],[["gaming","game","playstation","xbox","nintendo"],"mdi:gamepad-variant"],[["3d print","printer","bambu","print job","filament"],"mdi:printer-3d-nozzle"],[["health","heart","blood","medical","medicine"],"mdi:heart-pulse"],[["sleep","bedtime","nap"],"mdi:sleep"],[["workout","exercise","fitness","run","walk","step"],"mdi:run"],[["birthday","anniversary"],"mdi:cake-variant"],[["holiday","vacation","day off"],"mdi:beach"],[["reminder","todo","task"],"mdi:bell-ring"],[["calendar","event","schedule"],"mdi:calendar"],[["update","upgrade","firmware"],"mdi:update"],[["restart","reboot","reset"],"mdi:restart"],[["backup","snapshot"],"mdi:backup-restore"],[["error","fail","crash"],"mdi:alert-circle"],[["automation","script","routine","workflow"],"mdi:robot"],[["battery","charge","power"],"mdi:battery"],[["wifi","network","internet","connect"],"mdi:wifi"],[["bluetooth"],"mdi:bluetooth"],[["system","server","maintenance"],"mdi:cog"],[["solar","panel"],"mdi:solar-power"],[["energy","electricity","power","watt","kwh"],"mdi:flash"],[["water","irrigation","sprinkler"],"mdi:water"],[["gas","natural gas","propane"],"mdi:gas-cylinder"],[["trash","garbage","waste","bin","recycl"],"mdi:trash-can"],[["litter","litter box","kitty litter"],"mdi:cat"],[["food","feed","meal","eat","dinner","lunch","breakfast"],"mdi:food"],[["plant","garden","flower","grow"],"mdi:flower"],[["filter","air filter","hvac filter"],"mdi:air-filter"]],xe=[[["cat","kitten","feline"],"#7f41eb"],[["dog","puppy","canine"],"#8D6E63"],[["bird"],"#4CAF50"],[["animal","pet","wildlife"],"#43A047"],[["person","human","people","visitor","guest","face"],"#FF9800"],[["car","truck","vehicle","automobile","motorcycle"],"#2196F3"],[["package","delivery","mail","amazon"],"#795548"],[["alarm","alert","security","smoke","fire","intrusion"],"#F44336"],[["door","gate","lock","window","garage"],"#795548"],[["doorbell","ring","knock"],"#FF5722"],[["motion","movement","detected"],"#9C27B0"],[["camera","cctv","snapshot"],"#FF5722"],[["light","lamp","bulb"],"#FFC107"],[["temperature","thermostat","hvac","climate"],"#00BCD4"],[["weather"],"#42A5F5"],[["automation","script","routine"],"#3F51B5"],[["error","fail","crash"],"#D32F2F"],[["system","update","restart","maintenance"],"#9E9E9E"],[["trash","garbage","waste"],"#78909C"],[["plant","garden","flower"],"#4CAF50"],[["3d print","printer","bambu"],"#00ACC1"]];function we(e,t){const i=e.toLowerCase();for(const[e,a]of t)if(e.some(e=>i.includes(e)))return a}function $e(e,t,i,a,r){if(a){const r=[e,t,i].filter(Boolean).join(" ").toLowerCase();for(const[e,t]of Object.entries(a))if(r.includes(e.toLowerCase()))return t}const o=function(e,t,i){return we([e,t,i].filter(Boolean).join(" "),_e)}(e,t,i);return o||(r||(ve[t]?ve[t]:ve.default))}function ke(e,t,i,a,r){if(a){const r=[e,t,i].filter(Boolean).join(" ").toLowerCase();for(const[e,t]of Object.entries(a))if(r.includes(e.toLowerCase()))return t}if(r)return r;const o=function(e,t,i){return we([e,t,i].filter(Boolean).join(" "),xe)}(e,t,i);return o||(be[t]?be[t]:be.default)}function Se(e,t){return e?"string"==typeof e?e:e.dateTime||e.date||t:t}function Ce(e){if(!e&&0!==e)return"";const t=String(e),i=Number(e);return!isNaN(i)&&i>1e9&&i<1e13?new Date(1e3*i).toISOString():t}const Ae={door:{on:"Opened",off:"Closed"},opening:{on:"Opened",off:"Closed"},garage_door:{on:"Opened",off:"Closed"},window:{on:"Opened",off:"Closed"},lock:{on:"Unlocked",off:"Locked"},motion:{on:"Motion Detected",off:"Motion Cleared"},occupancy:{on:"Occupied",off:"Unoccupied"},presence:{on:"Present",off:"Away"},smoke:{on:"Smoke Detected",off:"Clear"},moisture:{on:"Wet",off:"Dry"},gas:{on:"Gas Detected",off:"Clear"},co:{on:"CO Detected",off:"Clear"},vibration:{on:"Vibration",off:"Still"},tamper:{on:"Tampered",off:"Secure"},safety:{on:"Unsafe",off:"Safe"},power:{on:"On",off:"Off"},plug:{on:"Plugged In",off:"Unplugged"},sound:{on:"Sound Detected",off:"Quiet"},problem:{on:"Problem",off:"OK"},connectivity:{on:"Connected",off:"Disconnected"},battery:{on:"Low",off:"Normal"},running:{on:"Running",off:"Stopped"},heat:{on:"Hot",off:"Normal"},cold:{on:"Cold",off:"Normal"},light:{on:"Light Detected",off:"Dark"}},Ee={lock:{locked:"Locked",unlocked:"Unlocked",jammed:"Jammed",locking:"Locking",unlocking:"Unlocking"},cover:{open:"Opened",closed:"Closed",opening:"Opening",closing:"Closing"},alarm_control_panel:{armed_away:"Armed Away",armed_home:"Armed Home",armed_night:"Armed Night",armed_vacation:"Armed Vacation",armed_custom_bypass:"Armed Custom",disarmed:"Disarmed",triggered:"Triggered",pending:"Pending",arming:"Arming"},person:{home:"Home",not_home:"Away"},device_tracker:{home:"Home",not_home:"Away"},light:{on:"On",off:"Off"},switch:{on:"On",off:"Off"},fan:{on:"On",off:"Off"},input_boolean:{on:"On",off:"Off"},climate:{off:"Off",heat:"Heating",cool:"Cooling",auto:"Auto",heat_cool:"Heat/Cool",fan_only:"Fan Only",dry:"Dry"},vacuum:{cleaning:"Cleaning",docked:"Docked",returning:"Returning",idle:"Idle",paused:"Paused",error:"Error"},media_player:{playing:"Playing",paused:"Paused",idle:"Idle",standby:"Standby",off:"Off",on:"On",buffering:"Buffering"}},Oe={door:"door",opening:"door",garage_door:"door",window:"door",lock:"lock",motion:"motion",occupancy:"motion",presence:"person",vibration:"motion",smoke:"security",gas:"security",co:"security",moisture:"climate",heat:"climate",cold:"climate",tamper:"security",safety:"security",problem:"system",connectivity:"system",battery:"system",power:"system",plug:"system",running:"system",sound:"motion",light:"light"},Te={person:"person",device_tracker:"person",sensor:"system",light:"light",switch:"automation",lock:"lock",cover:"door",climate:"climate",camera:"camera",alarm_control_panel:"security",automation:"automation",vacuum:"automation",media_player:"system",fan:"climate"};const ze=new class{constructor(){this.registry=new Map}register(e,t){this.registry.set(e,t)}create(e){const t=this.registry.get(e);if(!t)throw new Error(`[chronicle-card] Unknown adapter type: "${e}". Available types: ${Array.from(this.registry.keys()).join(", ")}`);return new t}has(e){return this.registry.has(e)}types(){return Array.from(this.registry.keys())}};ze.register("calendar",class{constructor(){this.type="calendar"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.entity;if(!i)return console.warn("[chronicle-card] CalendarAdapter: no entity configured"),[];try{const a=t.start.toISOString(),r=t.end.toISOString(),o=`calendars/${i}?start=${encodeURIComponent(a)}&end=${encodeURIComponent(r)}`,s=await e.callApi("GET",o);return Array.isArray(s)?s.map(t=>{const o=t.summary||"Untitled Event",s=t.description||"",n=function(e){const t=(e||"").toLowerCase(),i={person:["person","visitor","guest","meeting","appointment"],vehicle:["vehicle","car","delivery","parking"],security:["security","alarm","alert"],motion:["motion","movement"],pet:["pet","cat","dog","animal"],automation:["automation","script","routine"],system:["system","update","maintenance","restart"],climate:["climate","temperature","hvac","weather"],light:["light","lamp","lighting"]};for(const[e,a]of Object.entries(i))if(a.some(e=>t.includes(e)))return e;return"default"}(`${o} ${s}`),l=Se(t.start,a),c=t.uid||function(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return Math.abs(t).toString(36)}(`${o}:${l}`);return{id:`calendar:${i}:${c}`,sourceType:"calendar",sourceId:this.config.name||i,title:o,description:s,start:l,end:Se(t.end,r),icon:$e(o,n,void 0,this.config.icon_map,this.config.default_icon),color:ke(o,n,void 0,this.config.color_map,this.config.default_color),category:n,severity:this.config.default_severity||"info",entityId:i,entityName:e.states[i]?.attributes?.friendly_name||i,actions:this.config.actions,metadata:{location:t.location,recurrence_id:t.recurrence_id,uid:t.uid}}}):(console.warn("[chronicle-card] CalendarAdapter: unexpected response format"),[])}catch(e){return console.warn("[chronicle-card] CalendarAdapter: failed to fetch events",e),[]}}}),ze.register("rest",class{constructor(){this.type="rest"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.ws_params,a=this.config.url;if(!a&&!i)return console.warn("[chronicle-card] RestAdapter: no url or ws_params configured"),[];try{let t,r;if(i){const a=await e.callWS({...i});t="string"==typeof a?JSON.parse(a):a}else if(function(e){return!e.startsWith("http://")&&!e.startsWith("https://")}(a))t=await e.callApi("GET",a);else{const e=await fetch(a);if(!e.ok)return console.warn(`[chronicle-card] RestAdapter: HTTP ${e.status} from ${a}`),[];t=await e.json()}if(this.config.response_path){const e=function(e,t){const i=t.split(".");let a=e;for(const e of i){if(null==a||"object"!=typeof a)return;a=a[e]}return a}(t,this.config.response_path);if(!Array.isArray(e))return console.warn("[chronicle-card] RestAdapter: response_path did not resolve to an array"),[];r=e}else{if(!Array.isArray(t))return console.warn("[chronicle-card] RestAdapter: response is not an array and no response_path configured"),[];r=t}return r.map((e,t)=>this.mapItem(e,t))}catch(e){return console.warn("[chronicle-card] RestAdapter: failed to fetch events",e),[]}}classifyMedia(e){return e?e.startsWith("/media/")?{mediaContentId:`media-source://media_source/local/${e.slice(7)}`}:{mediaUrl:e}:{}}expandTemplate(e,t){return e.replace(/\{(\w+)\}/g,(e,i)=>{const a=t[i];return null!=a?String(a):""})}mapItem(e,t){const i=this.config.field_map||{},a=(t,a="")=>{const r=i[t];return r&&void 0!==e[r]?e[r]:void 0!==e[t]?e[t]:a},r=String(a("id",t)),o=String(a("title","Untitled")),s=String(a("category","default")),n=a("label",void 0);let l=a("mediaUrl",void 0);this.config.media_url_template&&(l=this.expandTemplate(this.config.media_url_template,e));const c=a("mediaContentId",void 0),d=this.classifyMedia(l),p=a("icon",void 0),h=a("color",void 0);return{id:`rest:${this.config.url||this.config.name||"ws"}:${r}`,sourceType:"rest",sourceId:this.config.name||this.config.url||"rest",title:o,description:String(a("description","")),start:Ce(a("start",(new Date).toISOString())),end:Ce(a("end","")),mediaUrl:d.mediaUrl,mediaContentId:c||d.mediaContentId,icon:p||$e(o,s,n,this.config.icon_map,this.config.default_icon),color:h||ke(o,s,n,this.config.color_map,this.config.default_color),category:s,label:n,severity:a("severity",this.config.default_severity||"info"),entityId:a("entityId",void 0),entityName:a("entityName",void 0),actions:this.config.actions,metadata:{source_url:this.config.url,raw_index:t,...a("metadata",void 0)||{}}}}}),ze.register("history",class{constructor(){this.type="history"}configure(e){this.config=e}getEntities(){const e=[];return this.config.entities?.length&&e.push(...this.config.entities),this.config.entity&&!e.includes(this.config.entity)&&e.push(this.config.entity),e}getStateFilter(e){const t=this.config.entity_config?.[e]?.state_filter;return t?.length?new Set(t):this.config.state_filter?.length?new Set(this.config.state_filter):null}async fetchEvents(e,t){const i=this.getEntities();if(0===i.length)return console.warn("[chronicle-card] HistoryAdapter: no entities configured"),[];try{const a=t.start.toISOString(),r=t.end.toISOString(),o=`history/period/${a}?filter_entity_id=${i.join(",")}&end_time=${r}&minimal_response`,s=await e.callApi("GET",o);if(!Array.isArray(s))return console.warn("[chronicle-card] HistoryAdapter: unexpected response format"),[];const n=[];for(const t of s)if(Array.isArray(t)&&0!==t.length)for(let i=1;i<t.length;i++){const a=t[i-1],r=t[i],o=r.entity_id||t[0].entity_id;if(a.state===r.state)continue;if("unavailable"===r.state||"unknown"===r.state)continue;if("unavailable"===a.state||"unknown"===a.state)continue;const s=this.getStateFilter(o);if(s&&!s.has(r.state))continue;const l=this.stateChangeToEvent(e,o,a,r);n.push(l)}return n}catch(e){return console.warn("[chronicle-card] HistoryAdapter: failed to fetch events",e),[]}}async subscribeLive(e,t){const i=this.getEntities();if(0===i.length)return()=>{};const a=new Set(i);return await e.connection.subscribeEvents(i=>{const r=i.data;if(!r.entity_id||!a.has(r.entity_id))return;if(!r.old_state||!r.new_state)return;if(r.old_state.state===r.new_state.state)return;if("unavailable"===r.new_state.state||"unknown"===r.new_state.state)return;if("unavailable"===r.old_state.state||"unknown"===r.old_state.state)return;const o=this.getStateFilter(r.entity_id);if(o&&!o.has(r.new_state.state))return;const s=this.stateChangeToEvent(e,r.entity_id,r.old_state,r.new_state);t(s)},"state_changed")}getDeviceClass(e,t,i){const a=e.states[t];return a?.attributes?.device_class?String(a.attributes.device_class):i.attributes?.device_class?String(i.attributes.device_class):""}humanizeState(e,t,i){const a=this.config.entity_config?.[e]?.state_map?.[t];if(a)return a;const r=this.config.state_map?.[t];if(r)return r;const o=e.split(".")[0];if("binary_sensor"===o&&i){const e=Ae[i];if(e?.[t])return e[t]}const s=Ee[o];return s?.[t]?s[t]:"on"===t?"On":"off"===t?"Off":t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," ")}detectCategory(e,t){const i=e.split(".")[0];return"binary_sensor"===i&&t?Oe[t]||"default":Te[i]||"default"}stripOverlap(e,t){const i=e.toLowerCase().split(/\s+/),a=t.split(/\s+/),r=a.map(e=>e.toLowerCase());for(let e=Math.min(i.length,r.length);e>0;e--){const o=i.slice(-e),s=r.slice(0,e);if(o.every((e,t)=>e===s[t])){return a.slice(e).join(" ")||t}}return t}stateChangeToEvent(e,t,i,a){const r=this.getDeviceClass(e,t,a),o=this.detectCategory(t,r),s=e.states[t]?.attributes?.friendly_name||t,n=this.config.entity_config?.[t],l=this.getEntities().length>1,c=n?.name||(l?s:this.config.name||s),d=this.humanizeState(t,a.state,r),p=this.humanizeState(t,i.state,r),h=`${c} ${this.stripOverlap(c,d)}`,u=`${this.stripOverlap(c,p)} → ${this.stripOverlap(c,d)}`,m=n?.icon||$e(h,o,void 0,this.config.icon_map,this.config.default_icon),g=n?.color||ke(h,o,void 0,this.config.color_map,this.config.default_color),f=n?.severity||this.config.default_severity||"info",v=n?.image_template||this.config.image_template,b=n?.tap_action||this.config.tap_action,y=n?.hold_action||this.config.hold_action,_=e.states[t],x=_?.attributes??a.attributes??{};return{id:`history:${t}:${a.last_changed}`,sourceType:"history",sourceId:this.config.name||"history",title:h,description:u,start:a.last_changed,end:a.last_changed,icon:m,color:g,category:o,severity:f,entityId:t,actions:this.config.actions,tapAction:b,holdAction:y,metadata:{old_state:i.state,new_state:a.state,old_label:p,new_label:d,device_class:r,last_updated:a.last_updated,attributes:x,source_name:this.config.name||"history",_image_template:v}}}}),ze.register("static",class{constructor(){this.type="static"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.events;if(!i||0===i.length)return console.warn("[chronicle-card] StaticAdapter: no events configured"),[];try{const e=this.config.name||"static";return i.map((i,a)=>{const r=i.category||"default",o=new Date(i.start);return(i.end?new Date(i.end):o)<t.start||o>t.end?null:{id:`static:${e}:${a}`,sourceType:"static",sourceId:e,title:i.title,description:i.description||"",start:i.start,end:i.end||i.start,icon:i.icon||this.config.default_icon||ve[r]||ve.default,color:i.color||this.config.default_color||be[r]||be.default,category:r,severity:i.severity||this.config.default_severity||"info",actions:this.config.actions,metadata:{static_index:a}}}).filter(e=>null!==e)}catch(e){return console.warn("[chronicle-card] StaticAdapter: failed to process events",e),[]}}});const De=new Map;async function Fe(e,t){if(!t)return;const i=De.get(t);if(i&&Date.now()-i.timestamp<ye)return i.url;!function(){const e=Date.now();for(const[t,i]of De)e-i.timestamp>ye&&De.delete(t)}();try{const i=await e.callWS({type:"media_source/resolve_media",media_content_id:t});return i&&i.url?(De.set(t,{url:i.url,timestamp:Date.now()}),i.url):void 0}catch{return}}const Pe=/\{[%{]/,Me="|||DELIM|||";function Ne(e){return Pe.test(e)}async function Ie(e,t,i){if(0===i.length)return[];const a=[];for(let r=0;r<i.length;r+=50){const o=i.slice(r,r+50),s=await Ue(e,t,o);a.push(...s)}return a}async function Ue(e,t,i){const a=["{% for _ctx in _events %}","{% set entity_id = _ctx.entity_id %}","{% set state = _ctx.state %}","{% set old_state = _ctx.old_state %}","{% set timestamp = _ctx.timestamp %}","{% set attributes = _ctx.attributes %}","{% set source_name = _ctx.source_name %}",t,`{% if not loop.last %}${Me}{% endif %}`,"{% endfor %}"].join("");try{const t=await async function(e,t,i={}){return new Promise((a,r)=>{let o,s=!1;const n=setTimeout(()=>{s||(s=!0,o?.(),r(new Error("Template render timed out")))},5e3);e.connection.subscribeMessage(e=>{s||(s=!0,clearTimeout(n),o?.(),a(e.result))},{type:"render_template",template:t,variables:i}).then(e=>{o=e,s&&o()}).catch(e=>{s||(s=!0,clearTimeout(n),r(e))})})}(e,a,{_events:i});return t.split(Me).map(e=>e.trim())}catch(e){return console.warn("[chronicle-card] Batch template render failed:",e),i.map(()=>"")}}class je{constructor(){this.adapters=[],this.allEvents=[],this.filteredItems=[],this.lastFetch=0,this.lastHash="",this.liveUnsubscribers=[],this.listeners=new Set,this.fetchPromise=null}get items(){return this.filteredItems}get events(){return this.allEvents}configure(e){this.config=e,this.adapters=[];for(const t of e.sources??[])try{const e=ze.create(t.type);e.configure(t),this.adapters.push(e)}catch(e){console.warn("[chronicle-card] Skipping source:",e)}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){for(const e of this.listeners)e()}async fetch(e,t=!1){const i=(this.config?.sources??[]).reduce((e,t)=>Math.min(e,1e3*(t.poll_interval??30)),3e4);if(t||!(Date.now()-this.lastFetch<i)){if(this.fetchPromise)return this.fetchPromise;this.fetchPromise=this._doFetch(e);try{await this.fetchPromise}finally{this.fetchPromise=null}}}async _doFetch(e){const t=this.config.days_back??ge.days_back??7,i=new Date,a={start:new Date(i.getTime()-24*t*60*60*1e3),end:i},r=await Promise.allSettled(this.adapters.map(t=>t.fetchEvents(e,a))),o=[];for(const e of r)"fulfilled"===e.status?o.push(...e.value):console.warn("[chronicle-card] Adapter fetch failed:",e.reason);const s=new Set,n=[];for(const e of o)s.has(e.id)||(s.add(e.id),n.push(e));n.sort((e,t)=>new Date(t.start).getTime()-new Date(e.start).getTime()),await this.resolveMedia(e,n),await this.resolveTemplates(e,n);const l=this.computeHash(n);l!==this.lastHash?(this.allEvents=n,this.lastHash=l,this.lastFetch=Date.now(),this.applyFiltersAndGroup()):this.lastFetch=Date.now()}applyFiltersAndGroup(){let e=[...this.allEvents];const t=this.config.filters??{};if(t.categories&&t.categories.length>0){const i=new Set(t.categories);e=e.filter(e=>i.has(e.category))}if(t.severities&&t.severities.length>0){const i=new Set(t.severities);e=e.filter(e=>i.has(e.severity))}if(t.sources&&t.sources.length>0){const i=new Set(t.sources);e=e.filter(e=>i.has(e.sourceId)||i.has(e.sourceType))}if(t.entities&&t.entities.length>0){const i=new Set(t.entities);e=e.filter(e=>e.entityId&&i.has(e.entityId))}if(t.search&&t.search.trim().length>0){const i=t.search.toLowerCase().trim();e=e.filter(e=>e.title.toLowerCase().includes(i)||e.description.toLowerCase().includes(i)||e.category.toLowerCase().includes(i)||e.label&&e.label.toLowerCase().includes(i))}const i=this.config.max_events??ge.max_events??50;e.length>i&&(e=e.slice(0,i));const a={enabled:!0,window_seconds:120,min_group_size:3,group_by:"category",...this.config.grouping};this.filteredItems=function(e,t){if(!t.enabled||"none"===t.group_by||0===e.length)return[...e];const i=1e3*(t.window_seconds??120),a=t.min_group_size??3,r=t.group_by??"category",o=[];let s=[],n=null,l=null;const c=e=>{switch(r){case"category":return e.category;case"source":return`${e.sourceType}:${e.sourceId}`;case"entity":return e.entityId??"";default:return""}},d=e=>{const t=e.length,i=e[0],a=new Set(e.map(e=>e.label||e.category).filter(Boolean));if(1===a.size)return`${t} ${[...a][0]} events`;switch(r){case"source":return`${t} ${i.sourceId} events`;case"entity":return`${t} ${i.entityName||i.entityId||"entity"} events`;default:return`${t} ${i.category} events`}},p=()=>{if(0!==s.length){if(s.length>=a){const e=s[0];o.push({representative:e,events:s,summary:d(s),expanded:!1})}else o.push(...s);s=[],n=null,l=null}};for(const t of e){const e=c(t),a=new Date(t.start).getTime();if(null===n){n=e,l=a,s.push(t);continue}const r=null!==l&&Math.abs(a-l)<=i;e===n&&r?(s.push(t),l=a):(p(),n=e,l=a,s.push(t))}return p(),o}(e,a),this.notify()}async injectLiveEvent(e,t){this.allEvents.some(t=>t.id===e.id)||(t&&await this.resolveTemplates(t,[e]),this.allEvents.unshift(e),this.lastHash=this.computeHash(this.allEvents),this.applyFiltersAndGroup())}async subscribeLive(e){this.unsubscribeLive();for(const t of this.adapters)if(t.subscribeLive)try{const i=await t.subscribeLive(e,t=>{this.injectLiveEvent(t,e)});this.liveUnsubscribers.push(i)}catch(e){console.warn("[chronicle-card] Live subscription failed:",e)}}unsubscribeLive(){for(const e of this.liveUnsubscribers)try{e()}catch{}this.liveUnsubscribers=[]}toggleGroup(e){e.expanded=!e.expanded,this.notify()}async resolveMedia(e,t){const i=t.filter(e=>e.mediaContentId&&!e.mediaUrl);if(0===i.length)return;const a=await Promise.allSettled(i.map(t=>Fe(e,t.mediaContentId)));for(let e=0;e<i.length;e++){const t=a[e];"fulfilled"===t.status&&t.value&&(i[e].mediaUrl=t.value)}}async resolveTemplates(e,t){const i=new Map;for(const e of t){const t=e.metadata?._image_template;if(!t||!Ne(t)||e.mediaUrl)continue;const a=i.get(t)||[];a.push(e),i.set(t,a)}if(0===i.size)return;const a=[];for(const[t,r]of i)a.push((async()=>{const i=r.map(e=>({entity_id:e.entityId||"",state:e.metadata?.new_state||"",old_state:e.metadata?.old_state||"",timestamp:e.start,attributes:e.metadata?.attributes||{},source_name:e.metadata?.source_name||""}));try{const a=await Ie(e,t,i);for(let e=0;e<r.length;e++){const t=a[e]?.trim();t&&(r[e].mediaUrl=t)}}catch(e){console.warn("[chronicle-card] Template resolution failed:",e)}})());await Promise.allSettled(a)}computeHash(e){return 0===e.length?"0":`${e.length}:${e[0]?.id}:${e[e.length-1]?.id}`}}function He(e){return"events"in e&&Array.isArray(e.events)}const Le=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Re=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Be(e){if(e instanceof Date)return isNaN(e.getTime())?new Date:e;const t=new Date(e);return isNaN(t.getTime())?new Date:t}function We(e){return e<10?`0${e}`:String(e)}function Ge(e,t){const i=Be(e),a=i.getHours(),r=We(i.getMinutes());if("24h"===t)return`${We(a)}:${r}`;return`${0===a?12:a>12?a-12:a}:${r} ${a>=12?"PM":"AM"}`}function Je(e){const t=Be(e);return`${Le[t.getDay()]}, ${Re[t.getMonth()]} ${t.getDate()}`}function Ye(e){const t=Be(e),i=(new Date).getTime()-t.getTime();if(i<0)return Je(t);const a=Math.floor(i/1e3),r=Math.floor(a/60),o=Math.floor(r/60);return a<60?"just now":r<60?`${r} min ago`:o<24&&function(e){const t=Be(e),i=new Date;return t.getFullYear()===i.getFullYear()&&t.getMonth()===i.getMonth()&&t.getDate()===i.getDate()}(t)?`${o}h ago`:function(e){const t=Be(e),i=new Date;return i.setDate(i.getDate()-1),t.getFullYear()===i.getFullYear()&&t.getMonth()===i.getMonth()&&t.getDate()===i.getDate()}(t)?"Yesterday":Je(t)}let qe=class extends ne{constructor(){super(...arguments),this.severity="info"}render(){const e=this.customColors?.[this.severity]??fe[this.severity]??fe.info;return B`
      <span class="badge" style="background-color: ${e}">
        ${this.severity}
      </span>
    `}};qe.styles=s`
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 3px 7px;
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
  `,e([he()],qe.prototype,"severity",void 0),e([he()],qe.prototype,"customColors",void 0),qe=e([ce("chronicle-severity-badge")],qe);let Ke=class extends ne{render(){return B`
      <button @click=${this._handleClick}>
        ${this.action.icon?B`<ha-icon .icon=${this.action.icon}></ha-icon>`:""}
        ${this.action.label}
      </button>
    `}async _handleClick(e){if(e.stopPropagation(),this.action)switch(this.action.type){case"service":{if(!this.hass||!this.action.service)return;const[e,t]=this.action.service.split(".");e&&t&&await this.hass.callService(e,t,this.action.serviceData??{},this.action.target);break}case"navigate":this.action.url&&(this.action.url.startsWith("http")?window.open(this.action.url,"_blank"):(history.pushState(null,"",this.action.url),window.dispatchEvent(new Event("location-changed"))));break;case"fire-event":if(this.action.eventType){const e=new CustomEvent(this.action.eventType,{bubbles:!0,composed:!0,detail:this.action.eventData??{}});this.dispatchEvent(e)}}}};Ke.styles=s`
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
  `,e([he({attribute:!1})],Ke.prototype,"hass",void 0),e([he({attribute:!1})],Ke.prototype,"action",void 0),Ke=e([ce("chronicle-action-button")],Ke);let Ve=class extends ne{constructor(){super(...arguments),this.compact=!1,this.timeFormat="24h",this.animated=!1,this._holdTimer=null,this._holdFired=!1,this._startX=0,this._startY=0}render(){const e=this.event;if(!e)return G;const t=!1!==this.appearance?.show_images,i=!1!==this.appearance?.show_icons,a=!1!==this.appearance?.show_severity_badge,r=Ge(e.start,this.timeFormat);return B`
      <div class="event-row">
        ${i?B`
          <div class="icon-wrap" style="background-color: ${e.color}">
            <ha-icon .icon=${o=e.icon,o&&o.startsWith("mdi:")?o:ve.default} style="color: ${function(e,t=.82){const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);if(!i)return"#ffffff";const a=Math.round(parseInt(i[1],16)+(255-parseInt(i[1],16))*t),r=Math.round(parseInt(i[2],16)+(255-parseInt(i[2],16))*t),o=Math.round(parseInt(i[3],16)+(255-parseInt(i[3],16))*t);return`#${a.toString(16).padStart(2,"0")}${r.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}`}(e.color)}"></ha-icon>
          </div>
        `:""}

        <div class="event-item"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @contextmenu=${e=>{this.event.holdAction&&e.preventDefault()}}
        >
          <div class="content">
            <div class="top-row">
              <span class="title">${e.title}</span>
              ${a&&"info"!==e.severity?B`
                <chronicle-severity-badge
                  .severity=${e.severity}
                  .customColors=${this.appearance?.severity_colors}
                ></chronicle-severity-badge>
              `:""}
              <span class="time">${r}</span>
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
    `;var o}_onPointerDown(e){this._holdFired=!1,this._startX=e.clientX,this._startY=e.clientY,this._holdTimer=setTimeout(()=>{this._holdFired=!0,this._handleAction("hold")},500)}_onPointerUp(e){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null);const t=e.clientX-this._startX,i=e.clientY-this._startY;Math.abs(t)>10||Math.abs(i)>10||this._holdFired||this._handleAction("tap")}_onPointerCancel(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_handleAction(e){const t="hold"===e?this.event.holdAction:this.event.tapAction;if(t)switch(t.action){case"more-info":if(this.event.entityId){const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this.event.entityId}});document.body.dispatchEvent(e)}break;case"navigate":if(t.navigation_path){history.pushState(null,"",t.navigation_path);const e=new CustomEvent("location-changed",{bubbles:!0,composed:!0});window.dispatchEvent(e)}break;case"call-service":if(t.service&&this.hass){const[e,i]=t.service.split(".",2);e&&i&&this.hass.callService(e,i,t.service_data??{},t.target)}break;case"none":break;default:"tap"===e&&this.dispatchEvent(new CustomEvent("chronicle-show-detail",{bubbles:!0,composed:!0,detail:{event:this.event}}))}else"tap"===e&&this.dispatchEvent(new CustomEvent("chronicle-show-detail",{bubbles:!0,composed:!0,detail:{event:this.event}}))}};Ve.styles=s`
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
  `,e([he({attribute:!1})],Ve.prototype,"event",void 0),e([he({attribute:!1})],Ve.prototype,"appearance",void 0),e([he({attribute:!1})],Ve.prototype,"hass",void 0),e([he({type:Boolean})],Ve.prototype,"compact",void 0),e([he({type:String})],Ve.prototype,"timeFormat",void 0),e([he({type:Boolean,reflect:!0})],Ve.prototype,"animated",void 0),Ve=e([ce("chronicle-event-item")],Ve);let Xe=class extends ne{constructor(){super(...arguments),this.compact=!1,this.timeFormat="24h"}render(){const e=this.group;if(!e)return G;const t=e.representative,i=e.events[0],a=e.events[e.events.length-1],r=Ge(i.start,this.timeFormat),o=Ge(a.start,this.timeFormat),s=r===o?r:`${r} – ${o}`,n=!1!==this.appearance?.show_images?e.events.map(e=>e.mediaUrl).filter(Boolean):[],l=n.slice(0,3),c=n.length-3;return B`
      <div>
        <div class="group-row">
          <div class="icon-wrap" style="background-color: ${t.color}">
            <ha-icon .icon=${d=t.icon,d&&d.startsWith("mdi:")?d:ve.default} style="color: ${function(e,t=.82){const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);if(!i)return"#ffffff";const a=Math.round(parseInt(i[1],16)+(255-parseInt(i[1],16))*t),r=Math.round(parseInt(i[2],16)+(255-parseInt(i[2],16))*t),o=Math.round(parseInt(i[3],16)+(255-parseInt(i[3],16))*t);return`#${a.toString(16).padStart(2,"0")}${r.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}`}(t.color)}"></ha-icon>
            <span class="count-badge">${e.events.length}</span>
          </div>

          <div class="group-header" @click=${this._toggle}>
            <div class="content">
              <div class="top-row">
                <span class="summary">${e.summary}</span>
                <span class="time-range">${s}</span>
              </div>
            </div>

            ${l.length>0?B`
              <div class="thumb-strip">
                ${l.map((e,t)=>2===t&&c>0?B`
                        <div class="thumb-more-wrap">
                          <img src=${e} alt="" loading="lazy" />
                          <span class="more-count">+${c}</span>
                        </div>
                      `:B`<img class="thumb" src=${e} alt="" loading="lazy" />`)}
              </div>
            `:""}

            <ha-icon
              class="chevron ${e.expanded?"open":""}"
              icon="mdi:chevron-down"
            ></ha-icon>
          </div>
        </div>

        <div class="children ${e.expanded?"expanded":""}">
          <div class="children-inner">
            ${e.expanded?B`
              <div class="children-content">
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
      </div>
    `;var d}_toggle(){this.dispatchEvent(new CustomEvent("chronicle-toggle-group",{bubbles:!0,composed:!0,detail:{group:this.group}}))}};Xe.styles=s`
    :host {
      display: block;
    }

    /* ── Outer row — mirrors event-item's .event-row exactly ── */
    .group-row {
      display: flex;
      align-items: flex-start;
      position: relative;
    }

    /* ── Icon — identical to event-item ── */
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

    .count-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      min-width: 17px;
      height: 17px;
      border-radius: 9px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      font-variant-numeric: tabular-nums;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(3,169,244,0.25);
    }

    /* ── Clickable header — mirrors event-item's .event-item ── */
    .group-header {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.15s ease, box-shadow 0.15s ease;
      border: 1px solid transparent;
    }
    .group-header:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border-color: var(--divider-color, rgba(127,127,127,0.08));
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    }
    .group-header:active {
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

    /* ── Top row — title + time, same as event-item ── */
    .top-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .summary {
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
    .time-range {
      font-size: 10.5px;
      font-weight: 500;
      color: var(--secondary-text-color, #999);
      white-space: nowrap;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.2px;
    }

    /* ── Thumbnail strip ── */
    .thumb-strip {
      display: flex;
      flex-shrink: 0;
      align-items: center;
    }
    .thumb-strip .thumb {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      object-fit: cover;
      margin-left: -6px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      display: block;
      flex-shrink: 0;
    }
    .thumb-strip .thumb:first-child {
      margin-left: 0;
    }
    .thumb-more-wrap {
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      overflow: hidden;
      margin-left: -6px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      flex-shrink: 0;
    }
    .thumb-more-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: blur(2px) brightness(0.65);
    }
    .thumb-more-wrap .more-count {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    .chevron {
      flex-shrink: 0;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      color: var(--secondary-text-color, #999);
      --mdc-icon-size: 18px;
      margin-top: 2px;
    }
    .chevron.open {
      transform: rotate(180deg);
    }

    /* ── Expand/collapse via CSS grid — no max-height lag ── */
    .children {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      margin-left: 42px;
    }
    .children.expanded {
      grid-template-rows: 1fr;
    }
    .children-inner {
      overflow: hidden;
    }
    .children-content {
      padding: 4px 0 4px 10px;
      border-left: 2px solid var(--divider-color, rgba(127,127,127,0.12));
    }

    :host([compact]) .summary { font-size: 12px; }
  `,e([he({attribute:!1})],Xe.prototype,"group",void 0),e([he({attribute:!1})],Xe.prototype,"appearance",void 0),e([he({attribute:!1})],Xe.prototype,"hass",void 0),e([he({type:Boolean})],Xe.prototype,"compact",void 0),e([he({type:String})],Xe.prototype,"timeFormat",void 0),Xe=e([ce("chronicle-event-group")],Xe);let Ze=class extends ne{constructor(){super(...arguments),this.label="",this.eventCount=0}render(){return B`
      <div class="date-header">
        <span class="label">${this.label}</span>
        <span class="line"></span>
        ${this.eventCount>0?B`<span class="count">${this.eventCount}</span>`:""}
      </div>
    `}};Ze.styles=s`
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
  `,e([he()],Ze.prototype,"label",void 0),e([he()],Ze.prototype,"eventCount",void 0),Ze=e([ce("chronicle-date-header")],Ze);let Qe=class extends ne{constructor(){super(...arguments),this.message="No events found"}render(){return B`
      <div class="empty">
        <div class="icon-ring">
          <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>
        </div>
        <span class="text">${this.message}</span>
      </div>
    `}};Qe.styles=s`
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
  `,e([he()],Qe.prototype,"message",void 0),Qe=e([ce("chronicle-empty-state")],Qe);let et=class extends ne{constructor(){super(...arguments),this.items=[],this.compact=!1,this.timeFormat="24h",this.animateNew=!0}render(){if(!this.items||0===this.items.length)return B`<chronicle-empty-state></chronicle-empty-state>`;const e=this._groupByDate(this.items),t=this.appearance?.card_height??"400px";return B`
      <div class="timeline-container" style=${"auto"===t?"":`max-height: ${t}`}>
        <div class="timeline-inner">
          ${e.map(e=>B`
            <div class="date-section">
              <chronicle-date-header
                .label=${e.label}
                .eventCount=${this._countEvents(e.items)}
              ></chronicle-date-header>
              ${e.items.map(e=>He(e)?B`
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
    `}_groupByDate(e){const t=new Map,i=new Date,a=this._dateKey(i),r=this._dateKey(new Date(i.getTime()-864e5));for(const i of e){const e=He(i)?i.representative.start:i.start,o=this._dateKey(new Date(e));if(!t.has(o)){let i;if(o===a)i="Today";else if(o===r)i="Yesterday";else{i=new Date(e).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}t.set(o,{dateKey:o,label:i,items:[]})}t.get(o).items.push(i)}return Array.from(t.values())}_dateKey(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}_countEvents(e){let t=0;for(const i of e)t+=He(i)?i.events.length:1;return t}};function tt(e){return e&&e.startsWith("mdi:")?e:ve.default}et.styles=s`
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
  `,e([he({attribute:!1})],et.prototype,"items",void 0),e([he({attribute:!1})],et.prototype,"appearance",void 0),e([he({attribute:!1})],et.prototype,"hass",void 0),e([he({type:Boolean})],et.prototype,"compact",void 0),e([he({type:String})],et.prototype,"timeFormat",void 0),e([he({type:Boolean})],et.prototype,"animateNew",void 0),et=e([ce("chronicle-vertical-timeline")],et);let it=class extends ne{constructor(){super(...arguments),this.items=[],this.timeFormat="24h"}render(){return this.items&&0!==this.items.length?B`
      <div class="wrapper">
        <button class="scroll-btn left" @click=${()=>this._scroll(-200)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>

        <div class="scroll-container">
          ${this.items.map(e=>He(e)?e.expanded?this._renderExpandedGroup(e):this._renderGroupCard(e):this._renderEventCard(e))}
        </div>

        <button class="scroll-btn right" @click=${()=>this._scroll(200)}>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>
    `:B`<chronicle-empty-state></chronicle-empty-state>`}_renderEventCard(e){const t=!1!==this.appearance?.show_images,i=e.color;return B`
      <div class="event-card" @click=${()=>this._showDetail(e)}>
        ${t&&e.mediaUrl?B`<img class="card-media" src=${e.mediaUrl} alt="" loading="lazy" />`:B`
            <div class="card-placeholder" style="background-color: ${e.color}">
              <ha-icon .icon=${tt(e.icon)}></ha-icon>
            </div>
          `}
        <div class="card-body">
          <div class="card-title">
            <span class="card-severity" style="background-color: ${i}"></span>
            ${e.title}
          </div>
          <div class="card-time">${Ye(e.start)}</div>
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
              <ha-icon .icon=${tt(t.icon)}></ha-icon>
              <span class="group-badge">${e.events.length}</span>
            </div>
          `}
        <div class="group-body">
          <div class="group-title">${e.summary}</div>
          <div class="group-time">${Ye(t.start)}</div>
        </div>
      </div>
    `}_renderExpandedGroup(e){const t=!1!==this.appearance?.show_images;return B`
      <div class="group-expanded">
        ${e.events.map(e=>B`
          <div class="event-card" @click=${()=>this._showDetail(e)}>
            ${t&&e.mediaUrl?B`<img class="card-media" src=${e.mediaUrl} alt="" loading="lazy" />`:B`
                <div class="card-placeholder" style="background-color: ${e.color}">
                  <ha-icon .icon=${tt(e.icon)}></ha-icon>
                </div>
              `}
            <div class="card-body">
              <div class="card-title">
                <span class="card-severity" style="background-color: ${e.color}"></span>
                ${e.title}
              </div>
              <div class="card-time">${Ye(e.start)}</div>
            </div>
          </div>
        `)}
        <div class="group-collapse-btn" @click=${()=>this._toggleGroup(e)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </div>
      </div>
    `}_scroll(e){this.scrollEl?.scrollBy({left:e,behavior:"smooth"})}_showDetail(e){this.dispatchEvent(new CustomEvent("chronicle-show-detail",{bubbles:!0,composed:!0,detail:{event:e}}))}_toggleGroup(e){this.dispatchEvent(new CustomEvent("chronicle-toggle-group",{bubbles:!0,composed:!0,detail:{group:e}}))}};it.styles=s`
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
  `,e([he({attribute:!1})],it.prototype,"items",void 0),e([he({attribute:!1})],it.prototype,"appearance",void 0),e([he({attribute:!1})],it.prototype,"hass",void 0),e([he({type:String})],it.prototype,"timeFormat",void 0),e([me(".scroll-container")],it.prototype,"scrollEl",void 0),it=e([ce("chronicle-horizontal-timeline")],it);let at=class extends ne{constructor(){super(...arguments),this._event=null,this._open=!1,this._container=null}render(){return G}show(e){this._event=e,this._ensureContainer(),this._renderDialog(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{this._open=!0,this._renderDialog()})})}close(){this._open=!1,this._renderDialog(),setTimeout(()=>{this._event=null,this._removeContainer()},350)}_ensureContainer(){if(this._container)return;this._container=document.createElement("div"),this._container.id="chronicle-detail-overlay",document.body.appendChild(this._container);this._container.attachShadow({mode:"open"}).innerHTML=""}_removeContainer(){this._container&&(this._container.remove(),this._container=null)}_renderDialog(){if(!this._container)return;const e=this._container.shadowRoot;if(!e)return;const t=this._event,i=this._open;var a;e.innerHTML=`\n      <style>\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .overlay {\n          position: fixed;\n          top: 0; left: 0; right: 0; bottom: 0;\n          background: rgba(0, 0, 0, 0.5);\n          backdrop-filter: blur(4px);\n          -webkit-backdrop-filter: blur(4px);\n          z-index: 99999;\n          opacity: ${i?"1":"0"};\n          transition: opacity 0.3s ease;\n          pointer-events: ${i?"auto":"none"};\n        }\n\n        .dialog {\n          position: fixed;\n          z-index: 100000;\n          background: var(--card-background-color, #fff);\n          overflow-y: auto;\n          overscroll-behavior: contain;\n\n          /* Mobile: bottom sheet */\n          bottom: 0; left: 0; right: 0;\n          max-height: 88vh;\n          border-radius: 20px 20px 0 0;\n          box-shadow: 0 -2px 30px rgba(0, 0, 0, 0.2), 0 -1px 2px rgba(0,0,0,0.06);\n          transform: translateY(${i?"0":"100%"});\n          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n\n        @media (min-width: 600px) {\n          .dialog {\n            bottom: auto; left: 50%; right: auto;\n            top: 50%;\n            transform: translate(-50%, -50%) scale(${i?"1":"0.96"});\n            opacity: ${i?"1":"0"};\n            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;\n            border-radius: 18px;\n            max-width: 460px;\n            width: 92vw;\n            max-height: 82vh;\n            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0,0,0,0.08);\n          }\n        }\n\n        .handle {\n          width: 32px; height: 4px;\n          border-radius: 2px;\n          background: var(--divider-color, rgba(127,127,127,0.25));\n          margin: 10px auto 0;\n        }\n        @media (min-width: 600px) { .handle { display: none; } }\n\n        .media-wrap {\n          position: relative;\n          overflow: hidden;\n        }\n        .media {\n          width: 100%;\n          max-height: 240px;\n          object-fit: cover;\n          display: block;\n          background: var(--secondary-background-color, #f0f0f0);\n        }\n        .media-gradient {\n          position: absolute;\n          bottom: 0; left: 0; right: 0;\n          height: 48px;\n          background: linear-gradient(transparent, var(--card-background-color, #fff));\n          pointer-events: none;\n        }\n\n        .body { padding: 16px 20px 24px; }\n        .body-with-media { padding-top: 8px; }\n\n        .header {\n          display: flex;\n          align-items: flex-start;\n          gap: 12px;\n          margin-bottom: 16px;\n        }\n        .header-icon {\n          width: 40px; height: 40px;\n          border-radius: 50%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          flex-shrink: 0;\n          box-shadow: 0 2px 6px rgba(0,0,0,0.12);\n        }\n        .header-icon ha-icon {\n          --mdc-icon-size: 20px;\n          color: #fff;\n          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));\n        }\n        .header-text { flex: 1; min-width: 0; }\n        .header-title {\n          font-size: 17px;\n          font-weight: 700;\n          color: var(--primary-text-color, #333);\n          line-height: 1.3;\n          letter-spacing: -0.2px;\n        }\n        .header-time {\n          font-size: 12px;\n          color: var(--secondary-text-color, #888);\n          margin-top: 4px;\n          font-variant-numeric: tabular-nums;\n        }\n\n        .close-btn {\n          position: absolute;\n          top: 12px; right: 12px;\n          width: 32px; height: 32px;\n          border-radius: 50%;\n          border: none;\n          background: rgba(127,127,127,0.12);\n          backdrop-filter: blur(8px);\n          -webkit-backdrop-filter: blur(8px);\n          color: var(--primary-text-color, #333);\n          cursor: pointer;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          z-index: 2;\n          padding: 0;\n          transition: background 0.15s ease;\n          line-height: 0;\n        }\n        .close-btn:hover {\n          background: rgba(127,127,127,0.22);\n        }\n        .close-btn svg {\n          display: block;\n          width: 14px;\n          height: 14px;\n        }\n\n        .tags {\n          display: flex;\n          flex-wrap: wrap;\n          gap: 6px;\n          margin-bottom: 16px;\n        }\n        .tag {\n          font-size: 11px;\n          font-weight: 500;\n          padding: 3px 10px;\n          border-radius: 20px;\n          background: var(--divider-color, rgba(127,127,127,0.08));\n          color: var(--secondary-text-color, #777);\n          letter-spacing: 0.1px;\n        }\n        .severity-tag {\n          font-size: 10px;\n          font-weight: 600;\n          letter-spacing: 0.4px;\n          text-transform: uppercase;\n          padding: 4px 10px;\n          border-radius: 20px;\n          color: #fff;\n          display: inline-flex;\n          align-items: center;\n          justify-content: center;\n          line-height: 1;\n        }\n\n        .description {\n          font-size: 13.5px;\n          line-height: 1.65;\n          color: var(--primary-text-color, #444);\n          margin-bottom: 16px;\n          white-space: pre-wrap;\n          word-break: break-word;\n          opacity: 0.9;\n        }\n\n        .meta-table {\n          display: grid;\n          grid-template-columns: auto 1fr;\n          gap: 7px 14px;\n          font-size: 12px;\n          margin-bottom: 16px;\n          padding: 14px 16px;\n          background: var(--secondary-background-color, rgba(127,127,127,0.04));\n          border-radius: 12px;\n          border: 1px solid var(--divider-color, rgba(127,127,127,0.08));\n        }\n        .meta-label {\n          color: var(--secondary-text-color, #888);\n          font-weight: 500;\n          font-size: 11px;\n          text-transform: uppercase;\n          letter-spacing: 0.3px;\n        }\n        .meta-value {\n          color: var(--primary-text-color, #333);\n          font-size: 12.5px;\n        }\n\n        .more-info-btn {\n          display: inline-flex;\n          align-items: center;\n          gap: 6px;\n          padding: 8px 16px;\n          border-radius: 20px;\n          border: 1px solid var(--divider-color, rgba(127,127,127,0.2));\n          background: var(--secondary-background-color, rgba(127,127,127,0.06));\n          color: var(--primary-color, #03a9f4);\n          font-size: 12px;\n          font-weight: 600;\n          font-family: inherit;\n          cursor: pointer;\n          margin-bottom: 16px;\n          transition: background 0.15s ease, border-color 0.15s ease;\n          line-height: 1;\n        }\n        .more-info-btn:hover {\n          background: rgba(3, 169, 244, 0.08);\n          border-color: var(--primary-color, #03a9f4);\n        }\n        .more-info-btn svg {\n          display: block;\n        }\n      </style>\n\n      <div class="overlay"></div>\n      <div class="dialog">\n        ${t?`\n          <div class="handle"></div>\n          <button class="close-btn"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg></button>\n\n          ${t.mediaUrl?`\n            <div class="media-wrap">\n              <img class="media" src="${this._escHtml(t.mediaUrl)}" alt="" />\n              <div class="media-gradient"></div>\n            </div>\n          `:""}\n\n          <div class="body ${t.mediaUrl?"body-with-media":""}">\n            <div class="header">\n              <div class="header-icon" style="background-color: ${t.color}">\n                <ha-icon icon="${a=t.icon,a&&a.startsWith("mdi:")?a:ve.default}"></ha-icon>\n              </div>\n              <div class="header-text">\n                <div class="header-title">${this._escHtml(t.title)}</div>\n                <div class="header-time">${this._formatDateTime(t.start)}</div>\n              </div>\n            </div>\n\n            <div class="tags">\n              <span class="severity-tag" style="background-color: ${this._severityColor(t.severity)}">${t.severity}</span>\n              ${t.category?`<span class="tag">${this._escHtml(t.category)}</span>`:""}\n              ${t.label?`<span class="tag">${this._escHtml(t.label)}</span>`:""}\n              ${t.sourceType?`<span class="tag">${this._escHtml(t.sourceType)}</span>`:""}\n            </div>\n\n            ${t.description?`<div class="description">${this._escHtml(t.description)}</div>`:""}\n\n            ${t.entityId?`\n              <button class="more-info-btn" data-entity="${this._escHtml(t.entityId)}">\n                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/></svg>\n                More Info\n              </button>\n            `:""}\n\n            <div class="meta-table">\n              ${t.entityName?`\n                <span class="meta-label">Entity</span>\n                <span class="meta-value">${this._escHtml(t.entityName)}</span>\n              `:""}\n              ${t.entityId?`\n                <span class="meta-label">Entity ID</span>\n                <span class="meta-value">${this._escHtml(t.entityId)}</span>\n              `:""}\n              <span class="meta-label">Source</span>\n              <span class="meta-value">${this._escHtml(t.sourceId)}</span>\n              <span class="meta-label">Start</span>\n              <span class="meta-value">${this._formatDateTime(t.start)}</span>\n              ${t.end&&t.end!==t.start?`\n                <span class="meta-label">End</span>\n                <span class="meta-value">${this._formatDateTime(t.end)}</span>\n              `:""}\n            </div>\n          </div>\n        `:""}\n      </div>\n    `;const r=e.querySelector(".overlay"),o=e.querySelector(".close-btn"),s=e.querySelector(".more-info-btn");r?.addEventListener("click",()=>this.close()),o?.addEventListener("click",()=>this.close()),s?.addEventListener("click",()=>{const e=s.getAttribute("data-entity");e&&(this.close(),setTimeout(()=>{document.body.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))},100))})}_escHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}_severityColor(e){const t={critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"};return t[e]||t.info}_formatDateTime(e){try{return new Date(e).toLocaleString(void 0,{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}connectedCallback(){super.connectedCallback(),this._boundKeydown=this._handleKeydown.bind(this),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),this._boundKeydown&&document.removeEventListener("keydown",this._boundKeydown),this._removeContainer()}_handleKeydown(e){"Escape"===e.key&&this._open&&this.close()}};at.styles=s`
    :host { display: none; }
  `,e([he({attribute:!1})],at.prototype,"hass",void 0),e([ue()],at.prototype,"_event",void 0),e([ue()],at.prototype,"_open",void 0),at=e([ce("chronicle-detail-dialog")],at);let rt=class extends ne{constructor(){super(...arguments),this._items=[],this._layout="vertical",this._store=new je,this._liveSubscribed=!1}static getConfigElement(){return document.createElement("chronicle-card-editor")}static getStubConfig(){return{type:"custom:chronicle-card",title:"Timeline",layout:"vertical",sources:[]}}setConfig(e){if(!e)throw new Error("No configuration provided");this._config={...ge,...e,filters:{...ge.filters,...e.filters},grouping:{...ge.grouping,...e.grouping},appearance:{...ge.appearance,...e.appearance}},this._layout=this._config.layout??"vertical",this._store.configure(this._config),this._storeUnsub?.(),this._storeUnsub=this._store.subscribe(()=>{this._items=[...this._store.items]})}set hass(e){this._hass=e,this.requestUpdate(),this._store.fetch(e).catch(e=>{console.warn("[chronicle-card] Fetch error:",e)}),this._liveSubscribed||(this._liveSubscribed=!0,this._store.subscribeLive(e).catch(()=>{}))}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._hass&&this._store.subscribeLive(this._hass).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this._store.unsubscribeLive(),this._liveSubscribed=!1,this._storeUnsub?.()}render(){if(!this._config)return G;const e=!1!==this._config.show_header,t=!1!==this._config.show_layout_toggle,i=this._config.appearance??{},a=this._config.time_format??"24h",r=i.compact??!1,o=!1!==i.animate_new_events;return B`
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
                .timeFormat=${a}
                ?compact=${r}
                ?animateNew=${o}
              ></chronicle-vertical-timeline>
            `:B`
              <chronicle-horizontal-timeline
                .items=${this._items}
                .appearance=${i}
                .hass=${this.hass}
                .timeFormat=${a}
              ></chronicle-horizontal-timeline>
            `}
        </div>

        <chronicle-detail-dialog .hass=${this.hass}></chronicle-detail-dialog>
      </ha-card>
    `}_setLayout(e){this._layout=e}_onShowDetail(e){const t=e.detail.event;this._dialog&&this._dialog.show(t)}_onToggleGroup(e){const t=e.detail.group;this._store.toggleGroup(t)}getCardSize(){return 4}};rt.styles=s`
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
  `,e([ue()],rt.prototype,"_config",void 0),e([ue()],rt.prototype,"_items",void 0),e([ue()],rt.prototype,"_layout",void 0),e([me("chronicle-detail-dialog")],rt.prototype,"_dialog",void 0),rt=e([ce("chronicle-card")],rt);const ot={binary_sensor:[{value:"on",label:"On"},{value:"off",label:"Off"}],lock:[{value:"locked",label:"Locked"},{value:"unlocked",label:"Unlocked"},{value:"jammed",label:"Jammed"},{value:"locking",label:"Locking"},{value:"unlocking",label:"Unlocking"}],cover:[{value:"open",label:"Open"},{value:"closed",label:"Closed"},{value:"opening",label:"Opening"},{value:"closing",label:"Closing"}],light:[{value:"on",label:"On"},{value:"off",label:"Off"}],switch:[{value:"on",label:"On"},{value:"off",label:"Off"}],fan:[{value:"on",label:"On"},{value:"off",label:"Off"}],input_boolean:[{value:"on",label:"On"},{value:"off",label:"Off"}],person:[{value:"home",label:"Home"},{value:"not_home",label:"Away"}],device_tracker:[{value:"home",label:"Home"},{value:"not_home",label:"Away"}],alarm_control_panel:[{value:"armed_away",label:"Armed Away"},{value:"armed_home",label:"Armed Home"},{value:"armed_night",label:"Armed Night"},{value:"disarmed",label:"Disarmed"},{value:"triggered",label:"Triggered"},{value:"pending",label:"Pending"}],climate:[{value:"off",label:"Off"},{value:"heat",label:"Heating"},{value:"cool",label:"Cooling"},{value:"auto",label:"Auto"},{value:"fan_only",label:"Fan Only"},{value:"dry",label:"Dry"}],vacuum:[{value:"cleaning",label:"Cleaning"},{value:"docked",label:"Docked"},{value:"returning",label:"Returning"},{value:"idle",label:"Idle"},{value:"paused",label:"Paused"}],media_player:[{value:"playing",label:"Playing"},{value:"paused",label:"Paused"},{value:"idle",label:"Idle"},{value:"off",label:"Off"}]},st=[{value:"on",label:"On"},{value:"off",label:"Off"}];let nt=class extends ne{constructor(){super(...arguments),this.index=0}_getHint(){if("history"===this.source.type){const e=this._getHistoryEntities();if(1===e.length)return e[0];if(e.length>1)return`${e.length} entities`}return this.source.entity?this.source.entity:this.source.url?this.source.url:this.source.events?.length?`${this.source.events.length} event(s)`:""}_getHistoryEntities(){return this.source.entities?.length?this.source.entities:this.source.entity?[this.source.entity]:[]}_getStateOptions(e){const t=e.split(".")[0];return ot[t]||st}_getFriendlyName(e){return this.hass?.states[e]?.attributes?.friendly_name||e}render(){if(!this.source)return G;const e=this.source.name||"Unnamed",t=this._getHint(),i=this.source.type;return B`
      <details>
        <summary>
          <span class="type-badge ${i}">${{calendar:"calendar",rest:"rest",history:"entity state",static:"template"}[i]||i}</span>
          <span class="source-name">${e}</span>
          ${t?B`<span class="source-hint">${t}</span>`:G}
          <button class="remove-btn" @click=${this._remove}>Remove</button>
        </summary>
        <div class="source-body">
          <div class="row">
            <div class="field" style="flex:2;">
              <label>Source Type</label>
              <ha-select
                .value=${this.source.type}
                @change=${this._onTypeChange}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="calendar">Calendar Entity</mwc-list-item>
                <mwc-list-item value="rest">REST API</mwc-list-item>
                <mwc-list-item value="history">Entity State</mwc-list-item>
                <mwc-list-item value="static">Template</mwc-list-item>
              </ha-select>
            </div>
            <div class="field" style="flex:3;">
              <label>Name</label>
              <ha-textfield
                .value=${this.source.name??""}
                .label=${"Source display name"}
                @input=${e=>this._update("name",e.target.value)}
              ></ha-textfield>
            </div>
          </div>

          ${this._renderTypeFields()}

          <div class="section-label">Appearance</div>

          <div class="row">
            <div class="field">
              <label>Default Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${this.source.default_icon??""}
                @value-changed=${e=>this._update("default_icon",e.detail.value)}
              ></ha-icon-picker>
            </div>
            <div class="field">
              <label>Default Color</label>
              <input type="color" .value=${this.source.default_color??"#2196F3"} @input=${e=>this._update("default_color",e.target.value)} />
            </div>
            <div class="field">
              <label>Severity</label>
              <ha-select
                .value=${this.source.default_severity??"info"}
                @change=${e=>this._update("default_severity",e.target.value)}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="critical">Critical</mwc-list-item>
                <mwc-list-item value="warning">Warning</mwc-list-item>
                <mwc-list-item value="info">Info</mwc-list-item>
                <mwc-list-item value="debug">Debug</mwc-list-item>
              </ha-select>
            </div>
          </div>

          ${this._renderIconColorMaps()}
        </div>
      </details>
    `}_renderTypeFields(){switch(this.source.type){case"calendar":return B`
          <div class="field">
            <label>Calendar Entity</label>
            <ha-selector
              .hass=${this.hass}
              .selector=${{entity:{filter:[{domain:"calendar"}]}}}
              .value=${this.source.entity??""}
              .label=${"Calendar entity"}
              @value-changed=${e=>this._update("entity",e.detail.value)}
            ></ha-selector>
          </div>
        `;case"rest":return B`
          <div class="field">
            <label>API URL</label>
            <ha-textfield
              .value=${this.source.url??""}
              .label=${"llmvision/timeline/events?limit=50"}
              @input=${e=>this._update("url",e.target.value)}
            ></ha-textfield>
            <p class="help-text">Internal HA API path (no /api/ prefix needed) or full external URL</p>
          </div>
          <div class="field">
            <label>Response Path</label>
            <ha-textfield
              .value=${this.source.response_path??""}
              .label=${"events"}
              @input=${e=>this._update("response_path",e.target.value)}
            ></ha-textfield>
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
            <ha-textfield
              .value=${this.source.media_url_template??""}
              .label=${"/api/frigate/notifications/{id}/snapshot.jpg"}
              @input=${e=>this._update("media_url_template",e.target.value)}
            ></ha-textfield>
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
            <ha-textfield
              type="number"
              .value=${String(this.source.poll_interval??60)}
              .label=${"Poll interval"}
              @input=${e=>this._update("poll_interval",Number(e.target.value))}
            ></ha-textfield>
          </div>
        `;case"history":return B`
          <div class="field">
            <ha-selector
              .hass=${this.hass}
              .selector=${{entity:{multiple:!0}}}
              .value=${this._getHistoryEntities()}
              .label=${"Entities"}
              @value-changed=${this._onEntitiesChanged}
            ></ha-selector>
            <p class="help-text">Each state change becomes a timeline event.</p>
          </div>
          ${this._renderPerEntityConfig()}
          ${this._renderTemplateAndActions()}
          ${this._renderSourceLevelDefaults()}
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
        `;default:return G}}_renderPerEntityConfig(){const e=this._getHistoryEntities();return 0===e.length?G:B`
      <div class="section-label">Entity Settings</div>
      <p class="help-text" style="margin-bottom: 8px;">
        Expand an entity to customize its name, state filter, labels, icon, and severity.
        Unconfigured entities use smart defaults based on their device class.
      </p>
      ${e.map(e=>this._renderEntityPanel(e))}
    `}_renderEntityPanel(e){const t=this.source.entity_config?.[e]??{},i=this._getFriendlyName(e),a=Object.keys(t).length>0;e.split(".")[0];const r=this._getStateOptions(e),o=t.state_map?Object.entries(t.state_map):[];return B`
      <ha-expansion-panel
        .outlined=${!0}
        .header=${i}
        .secondary=${a?`${e} · customized`:e}
      >
        <div class="entity-panel-content">
          <!-- Custom name -->
          <ha-selector
            .hass=${this.hass}
            .selector=${{text:{}}}
            .value=${t.name??""}
            .label=${"Custom display name"}
            .helper=${"Override the entity's friendly name in the timeline"}
            @value-changed=${t=>this._updateEntityConfig(e,"name",t.detail.value)}
          ></ha-selector>

          <!-- State filter (chip-based multi-select) -->
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{options:r,multiple:!0,custom_value:!0,mode:"list"}}}
            .value=${t.state_filter??[]}
            .label=${"State filter"}
            .helper=${"Only log events for these states. Leave empty to log all changes."}
            @value-changed=${t=>this._updateEntityConfig(e,"state_filter",t.detail.value)}
          ></ha-selector>

          <!-- State labels (key-value pairs) -->
          ${o.length>0||t.state_map?B`
            <label>State Labels</label>
            ${o.map(([t,i],a)=>B`
              <div class="state-label-row">
                <ha-textfield
                  .value=${t}
                  .label=${"State value"}
                  @change=${t=>this._updateStateMapKey(e,a,t.target.value,i)}
                ></ha-textfield>
                <ha-textfield
                  .value=${i}
                  .label=${"Display label"}
                  @change=${i=>this._updateStateMapValue(e,t,i.target.value)}
                ></ha-textfield>
                <button
                  class="state-label-remove"
                  @click=${()=>this._removeStateMapEntry(e,t)}
                  title="Remove label"
                >&#x2715;</button>
              </div>
            `)}
          `:G}
          <button
            class="add-label-btn"
            @click=${()=>this._addStateMapEntry(e)}
          >+ Add state label</button>

          <!-- Icon override -->
          <div class="clearable-row">
            <ha-selector
              .hass=${this.hass}
              .selector=${{icon:{}}}
              .value=${t.icon??""}
              .label=${"Icon override"}
              @value-changed=${t=>this._updateEntityConfig(e,"icon",t.detail.value)}
            ></ha-selector>
            ${t.icon?B`
              <button class="clear-btn" @click=${()=>this._updateEntityConfig(e,"icon",void 0)} title="Clear icon override">&times;</button>
            `:G}
          </div>

          <!-- Color override -->
          <div class="clearable-row">
            <div class="field" style="flex:1;margin-bottom:0;">
              <label>Color override</label>
              <input
                type="color"
                .value=${t.color??this.source.default_color??"#2196F3"}
                @input=${t=>this._updateEntityConfig(e,"color",t.target.value)}
              />
            </div>
            ${t.color?B`
              <button class="clear-btn" @click=${()=>this._updateEntityConfig(e,"color",void 0)} title="Clear color override">&times;</button>
            `:G}
          </div>

          <!-- Severity override -->
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"",label:"Use source default"},{value:"critical",label:"Critical"},{value:"warning",label:"Warning"},{value:"info",label:"Info"},{value:"debug",label:"Debug"}],mode:"dropdown"}}}
            .value=${t.severity??""}
            .label=${"Severity override"}
            @value-changed=${t=>this._updateEntityConfig(e,"severity",t.detail.value||void 0)}
          ></ha-selector>

          <!-- Per-entity image template -->
          <ha-selector
            .hass=${this.hass}
            .selector=${{template:{}}}
            .value=${t.image_template??""}
            .label=${"Image template override"}
            .helper=${"Overrides the source-level image template for this entity"}
            @value-changed=${t=>this._updateEntityConfig(e,"image_template",t.detail.value||void 0)}
          ></ha-selector>

          <!-- Per-entity tap action -->
          <label>Tap Action</label>
          <ha-select
            .value=${t.tap_action?.action??""}
            @change=${t=>{const i=t.target.value;this._updateEntityConfig(e,"tap_action",i?{action:i}:void 0)}}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="">Use source default</mwc-list-item>
            <mwc-list-item value="more-info">More Info</mwc-list-item>
            <mwc-list-item value="navigate">Navigate</mwc-list-item>
            <mwc-list-item value="call-service">Call Service</mwc-list-item>
            <mwc-list-item value="none">None</mwc-list-item>
          </ha-select>

          <!-- Per-entity hold action -->
          <label>Hold Action</label>
          <ha-select
            .value=${t.hold_action?.action??""}
            @change=${t=>{const i=t.target.value;this._updateEntityConfig(e,"hold_action",i?{action:i}:void 0)}}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="">Use source default</mwc-list-item>
            <mwc-list-item value="more-info">More Info</mwc-list-item>
            <mwc-list-item value="navigate">Navigate</mwc-list-item>
            <mwc-list-item value="call-service">Call Service</mwc-list-item>
            <mwc-list-item value="none">None</mwc-list-item>
          </ha-select>
        </div>
      </ha-expansion-panel>
    `}_renderTemplateAndActions(){return"history"!==this.source.type?G:B`
      <div class="section-label">Image Template & Actions</div>
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .selector=${{template:{}}}
          .value=${this.source.image_template??""}
          .label=${"Image template (Jinja2)"}
          .helper=${"Dynamic thumbnail per event. Variables: entity_id, state, old_state, timestamp, attributes, source_name"}
          @value-changed=${e=>this._update("image_template",e.detail.value||void 0)}
        ></ha-selector>
      </div>
      <div class="row">
        <div class="field">
          ${this._renderActionEditor("tap_action","Tap Action",this.source.tap_action)}
        </div>
        <div class="field">
          ${this._renderActionEditor("hold_action","Hold Action",this.source.hold_action)}
        </div>
      </div>
      <p class="help-text">
        Default tap opens the detail dialog. "More Info" opens the entity's native HA dialog.
      </p>
    `}_renderActionEditor(e,t,i){return B`
      <label>${t}</label>
      <ha-select
        .value=${i?.action??""}
        @change=${t=>this._onActionTypeChange(e,t.target.value)}
        @closed=${e=>e.stopPropagation()}
      >
        <mwc-list-item value="">Default</mwc-list-item>
        <mwc-list-item value="more-info">More Info</mwc-list-item>
        <mwc-list-item value="navigate">Navigate</mwc-list-item>
        <mwc-list-item value="call-service">Call Service</mwc-list-item>
        <mwc-list-item value="none">None</mwc-list-item>
      </ha-select>
      ${"navigate"===i?.action?B`
        <ha-textfield
          .value=${i.navigation_path??""}
          .label=${"Navigation path"}
          @input=${t=>this._updateActionField(e,"navigation_path",t.target.value)}
          style="margin-top: 4px;"
        ></ha-textfield>
      `:G}
      ${"call-service"===i?.action?B`
        <ha-textfield
          .value=${i.service??""}
          .label=${"Service (e.g. light.toggle)"}
          @input=${t=>this._updateActionField(e,"service",t.target.value)}
          style="margin-top: 4px;"
        ></ha-textfield>
      `:G}
    `}_onActionTypeChange(e,t){if(t){const i=this.source[e]??{};this._update(e,{...i,action:t})}else this._update(e,void 0)}_updateActionField(e,t,i){const a=this.source[e]??{};this._update(e,{...a,[t]:i||void 0})}_renderSourceLevelDefaults(){const e=(this.source.state_filter?.length??0)>0,t=this.source.state_map&&Object.keys(this.source.state_map).length>0;return e||t?B`
      <ha-expansion-panel
        .outlined=${!0}
        .header=${"Source-Level Defaults"}
        .secondary=${"Legacy state_filter and state_map — per-entity settings override these"}
      >
        <div class="entity-panel-content">
          <div class="field">
            <label>State Filter (comma-separated)</label>
            <ha-textfield
              .value=${(this.source.state_filter??[]).join(", ")}
              .label=${"on, locked, open"}
              @input=${e=>{const t=e.target.value.trim();t?this._update("state_filter",t.split(",").map(e=>e.trim()).filter(Boolean)):this._update("state_filter",void 0)}}
            ></ha-textfield>
            <p class="help-text">Applies to all entities without a per-entity filter.</p>
          </div>
          <div class="field">
            <label>State Labels (JSON)</label>
            <textarea
              .value=${this._mapToString(this.source.state_map)}
              @change=${e=>this._onMapChange("state_map",e)}
              placeholder='{"on": "Opened", "off": "Closed"}'
              style="min-height:40px;"
            ></textarea>
            <p class="help-text">Applies to all entities without per-entity labels.</p>
          </div>
        </div>
      </ha-expansion-panel>
    `:G}_onEntitiesChanged(e){const t=e.detail.value;if(Array.isArray(t)&&(this._update("entities",t.length>0?t:void 0),this.source.entity&&this._update("entity",void 0),this.source.entity_config)){const e=new Set(t),i={};for(const[t,a]of Object.entries(this.source.entity_config))e.has(t)&&(i[t]=a);this._update("entity_config",Object.keys(i).length>0?i:void 0)}}_updateEntityConfig(e,t,i){const a={...this.source.entity_config??{}},r={...a[e]??{},[t]:i};(!i||Array.isArray(i)&&0===i.length)&&delete r[t],0===Object.keys(r).length?delete a[e]:a[e]=r,this._update("entity_config",Object.keys(a).length>0?a:void 0)}_addStateMapEntry(e){const t={...this.source.entity_config??{}},i={...t[e]??{}},a={...i.state_map??{},"":""};i.state_map=a,t[e]=i,this._update("entity_config",t)}_updateStateMapKey(e,t,i,a){const r={...this.source.entity_config??{}},o={...r[e]??{}},s=Object.entries(o.state_map??{});t<s.length&&s.splice(t,1),i&&s.push([i,a]),o.state_map=Object.fromEntries(s),0===Object.keys(o.state_map).length&&delete o.state_map,r[e]=o,0===Object.keys(o).length&&delete r[e],this._update("entity_config",Object.keys(r).length>0?r:void 0)}_updateStateMapValue(e,t,i){const a={...this.source.entity_config??{}},r={...a[e]??{}},o={...r.state_map??{},[t]:i};r.state_map=o,a[e]=r,this._update("entity_config",a)}_removeStateMapEntry(e,t){const i={...this.source.entity_config??{}},a={...i[e]??{}},r={...a.state_map??{}};delete r[t],0===Object.keys(r).length?delete a.state_map:a.state_map=r,0===Object.keys(a).length?delete i[e]:i[e]=a,this._update("entity_config",Object.keys(i).length>0?i:void 0)}_renderIconColorMaps(){return"static"===this.source.type?G:B`
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
    `}_fieldMapToString(){if(!this.source.field_map||0===Object.keys(this.source.field_map).length)return"";try{return JSON.stringify(this.source.field_map,null,2)}catch{return""}}_wsParamsToString(){if(!this.source.ws_params||0===Object.keys(this.source.ws_params).length)return"";try{return JSON.stringify(this.source.ws_params,null,2)}catch{return""}}_onWsParamsChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);"object"!=typeof e||Array.isArray(e)||this._update("ws_params",e)}catch{}else this._update("ws_params",void 0)}_onFieldMapChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);"object"!=typeof e||Array.isArray(e)||this._update("field_map",e)}catch{}else this._update("field_map",void 0)}_staticEventsToString(){if(!this.source.events||0===this.source.events.length)return"";try{return JSON.stringify(this.source.events,null,2)}catch{return""}}_onStaticEventsChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);Array.isArray(e)&&this._update("events",e)}catch{}else this._update("events",void 0)}_mapToString(e){if(!e||0===Object.keys(e).length)return"";try{return JSON.stringify(e)}catch{return""}}_onMapChange(e,t){const i=t.target.value.trim();if(i)try{const t=JSON.parse(i);"object"!=typeof t||Array.isArray(t)||this._update(e,t)}catch{}else this._update(e,void 0)}_onTypeChange(e){this._update("type",e.target.value)}_update(e,t){this.dispatchEvent(new CustomEvent("source-changed",{bubbles:!0,composed:!0,detail:{index:this.index,key:e,value:t}}))}_remove(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("source-removed",{bubbles:!0,composed:!0,detail:{index:this.index}}))}};nt.styles=s`
    :host {
      display: block;
      margin-bottom: 6px;
    }

    /* Collapsible source wrapper */
    details {
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 10px;
      overflow: hidden;
      background: var(--secondary-background-color, rgba(127,127,127,0.04));
    }
    summary {
      padding: 10px 12px;
      font-size: 13px;
      cursor: pointer;
      user-select: none;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    summary::-webkit-details-marker { display: none; }
    summary::before {
      content: '▸';
      transition: transform 0.15s ease;
      font-size: 10px;
      color: var(--secondary-text-color, #999);
      flex-shrink: 0;
    }
    details[open] > summary::before {
      transform: rotate(90deg);
    }

    .type-badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }
    .type-badge.calendar { background: rgba(33,150,243,0.12); color: #1976d2; }
    .type-badge.rest { background: rgba(156,39,176,0.12); color: #7b1fa2; }
    .type-badge.history { background: rgba(255,152,0,0.12); color: #e65100; }
    .type-badge.static { background: rgba(76,175,80,0.12); color: #2e7d32; }

    .source-name {
      font-weight: 500;
      color: var(--primary-text-color, #333);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    .source-hint {
      font-size: 11px;
      color: var(--secondary-text-color, #999);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
      flex: 1;
    }
    .remove-btn {
      border: none;
      background: none;
      color: var(--error-color, #db4437);
      cursor: pointer;
      font-size: 11px;
      padding: 3px 6px;
      border-radius: 4px;
      font-family: inherit;
      flex-shrink: 0;
      margin-left: auto;
    }
    .remove-btn:hover {
      background: rgba(219, 68, 55, 0.1);
    }

    .source-body {
      padding: 12px;
      border-top: 1px solid var(--divider-color, rgba(127,127,127,0.12));
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
    textarea {
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
    textarea:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    input[type="color"] {
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
    input[type="color"]:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    ha-textfield, ha-select, ha-entity-picker, ha-icon-picker, ha-selector {
      display: block;
      width: 100%;
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

    /* Per-entity expansion panels */
    ha-expansion-panel {
      margin-bottom: 4px;
      --expansion-panel-summary-padding: 8px 12px;
    }
    .entity-panel-content {
      padding: 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .state-label-row {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      margin-bottom: 4px;
    }
    .state-label-row ha-textfield {
      flex: 1;
    }
    .state-label-remove {
      border: none;
      background: none;
      color: var(--error-color, #db4437);
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      flex-shrink: 0;
      line-height: 1;
      margin-bottom: 8px;
    }
    .state-label-remove:hover {
      background: rgba(219, 68, 55, 0.1);
      border-radius: 4px;
    }
    .add-label-btn {
      border: 1px dashed var(--divider-color, rgba(127,127,127,0.3));
      background: transparent;
      color: var(--primary-color, #03a9f4);
      cursor: pointer;
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 6px;
      font-family: inherit;
    }
    .add-label-btn:hover {
      border-color: var(--primary-color, #03a9f4);
      background: rgba(3, 169, 244, 0.04);
    }

    .clearable-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .clearable-row > :first-child {
      flex: 1;
      min-width: 0;
    }
    .clear-btn {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 50%;
      background: var(--secondary-background-color, rgba(127,127,127,0.06));
      color: var(--secondary-text-color, #888);
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .clear-btn:hover {
      background: rgba(219, 68, 55, 0.1);
      color: var(--error-color, #db4437);
      border-color: var(--error-color, #db4437);
    }
  `,e([he({attribute:!1})],nt.prototype,"source",void 0),e([he({type:Number})],nt.prototype,"index",void 0),e([he({attribute:!1})],nt.prototype,"hass",void 0),nt=e([ce("chronicle-source-editor")],nt);let lt=class extends ne{connectedCallback(){super.connectedCallback(),customElements.get("ha-form")||customElements.get("hui-tile-card")?.getConfigElement(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement(),customElements.get("hui-action-editor")||customElements.get("hui-button-card")?.getConfigElement()}setConfig(e){this._config={...ge,...e,filters:{...ge.filters,...e.filters},grouping:{...ge.grouping,...e.grouping},appearance:{...ge.appearance,...e.appearance}}}render(){if(!this._config)return G;const e=this._config,t=e.grouping??{},i=e.appearance??{};return B`
      <div class="editor">
        <!-- General -->
        <details open>
          <summary>General</summary>
          <div class="section-body">
            <div class="field">
              <label>Title</label>
              <ha-textfield
                .value=${e.title??""}
                .label=${"Card title"}
                @input=${e=>this._set("title",e.target.value)}
              ></ha-textfield>
            </div>
            <div class="row">
              <div class="field">
                <label>Layout</label>
                <ha-select
                  .value=${e.layout??"vertical"}
                  @change=${e=>this._set("layout",e.target.value)}
                  @closed=${e=>e.stopPropagation()}
                >
                  <mwc-list-item value="vertical">Vertical</mwc-list-item>
                  <mwc-list-item value="horizontal">Horizontal</mwc-list-item>
                </ha-select>
              </div>
              <div class="field">
                <label>Time Format</label>
                <ha-select
                  .value=${e.time_format??"24h"}
                  @change=${e=>this._set("time_format",e.target.value)}
                  @closed=${e=>e.stopPropagation()}
                >
                  <mwc-list-item value="24h">24 Hour</mwc-list-item>
                  <mwc-list-item value="12h">12 Hour</mwc-list-item>
                </ha-select>
              </div>
            </div>
            <div class="row">
              <div class="field">
                <label>Max Events</label>
                <ha-textfield
                  type="number"
                  .value=${String(e.max_events??50)}
                  .label=${"Max events"}
                  @input=${e=>this._set("max_events",Number(e.target.value))}
                ></ha-textfield>
              </div>
              <div class="field">
                <label>Days Back</label>
                <ha-textfield
                  type="number"
                  .value=${String(e.days_back??7)}
                  .label=${"Days back"}
                  @input=${e=>this._set("days_back",Number(e.target.value))}
                ></ha-textfield>
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
              <button class="add-btn" @click=${()=>this._addSource("history")}>+ Entity State</button>
              <button class="add-btn" @click=${()=>this._addSource("static")}>+ Template</button>
            </div>
          </div>
        </details>

        <!-- Filters -->
        <details>
          <summary>Filters</summary>
          <div class="section-body">
            <div class="field">
              <label>Search</label>
              <ha-textfield
                .value=${e.filters?.search??""}
                .label=${"Filter events by keyword..."}
                @input=${e=>this._setNested("filters","search",e.target.value)}
              ></ha-textfield>
            </div>
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{select:{options:this._getCategoryOptions(),multiple:!0,custom_value:!0,mode:"list"}}}
                .value=${e.filters?.categories??[]}
                .label=${"Categories"}
                .helper=${"Filter timeline to specific event categories"}
                @value-changed=${e=>this._setNested("filters","categories",e.detail.value)}
              ></ha-selector>
            </div>
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{select:{options:[{value:"critical",label:"Critical"},{value:"warning",label:"Warning"},{value:"info",label:"Info"},{value:"debug",label:"Debug"}],multiple:!0}}}
                .value=${e.filters?.severities??[]}
                .label=${"Severities"}
                .helper=${"Filter timeline to specific severity levels"}
                @value-changed=${e=>this._setNested("filters","severities",e.detail.value)}
              ></ha-selector>
            </div>
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{select:{options:this._getSourceNameOptions(),multiple:!0,custom_value:!0}}}
                .value=${e.filters?.sources??[]}
                .label=${"Sources"}
                .helper=${"Filter timeline to specific source names"}
                @value-changed=${e=>this._setNested("filters","sources",e.detail.value)}
              ></ha-selector>
            </div>
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{entity:{multiple:!0}}}
                .value=${e.filters?.entities??[]}
                .label=${"Filter Entities"}
                @value-changed=${e=>this._setNested("filters","entities",e.detail.value??[])}
              ></ha-selector>
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
                <ha-textfield
                  type="number"
                  .value=${String(t.window_seconds??120)}
                  .label=${"Window seconds"}
                  @input=${e=>this._setNested("grouping","window_seconds",Number(e.target.value))}
                ></ha-textfield>
              </div>
              <div class="field">
                <label>Min Group Size</label>
                <ha-textfield
                  type="number"
                  .value=${String(t.min_group_size??3)}
                  .label=${"Min group size"}
                  @input=${e=>this._setNested("grouping","min_group_size",Number(e.target.value))}
                ></ha-textfield>
              </div>
            </div>
            <div class="field">
              <label>Group By</label>
              <ha-select
                .value=${t.group_by??"category"}
                @change=${e=>this._setNested("grouping","group_by",e.target.value)}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="category">Category</mwc-list-item>
                <mwc-list-item value="source">Source</mwc-list-item>
                <mwc-list-item value="entity">Entity</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
        </details>

        <!-- Appearance -->
        <details>
          <summary>Appearance</summary>
          <div class="section-body">
            <div class="field">
              <label>Card Height</label>
              <ha-textfield
                .value=${i.card_height??"400px"}
                .label=${"400px or auto"}
                @input=${e=>this._setNested("appearance","card_height",e.target.value)}
              ></ha-textfield>
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
      <ha-switch
        .checked=${e}
        @change=${e=>t(e.target.checked)}
      ></ha-switch>
    `}_set(e,t){this._config={...this._config,[e]:t},this._fire()}_setNested(e,t,i){const a=this._config[e]??{};this._config={...this._config,[e]:{...a,[t]:i}},this._fire()}_setSeverityColor(e,t){const i=this._config.appearance?.severity_colors??{};this._setNested("appearance","severity_colors",{...i,[e]:t})}_csvToArray(e){const t=e.trim();return t?t.split(",").map(e=>e.trim()).filter(Boolean):[]}_getCategoryOptions(){return[{value:"person",label:"Person"},{value:"vehicle",label:"Vehicle"},{value:"animal",label:"Animal"},{value:"pet",label:"Pet"},{value:"security",label:"Security"},{value:"motion",label:"Motion"},{value:"door",label:"Door"},{value:"lock",label:"Lock"},{value:"camera",label:"Camera"},{value:"light",label:"Light"},{value:"climate",label:"Climate"},{value:"automation",label:"Automation"},{value:"system",label:"System"}]}_getSourceNameOptions(){return(this._config.sources??[]).filter(e=>e.name).map(e=>({value:e.name,label:e.name}))}_addSource(e){const t=[...this._config.sources??[],{type:e,name:{calendar:"Calendar",rest:"REST API",history:"Entity State",static:"Template"}[e]}];this._config={...this._config,sources:t},this._fire()}_onSourceChanged(e){const{index:t,key:i,value:a}=e.detail,r=[...this._config.sources??[]];r[t]={...r[t],[i]:a},this._config={...this._config,sources:r},this._fire()}_onSourceRemoved(e){const{index:t}=e.detail,i=[...this._config.sources??[]];i.splice(t,1),this._config={...this._config,sources:i},this._fire()}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:this._config}}))}};lt.styles=s`
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
    input[type="color"] {
      width: 100%;
      height: 36px;
      padding: 2px 4px;
      cursor: pointer;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      box-sizing: border-box;
    }
    input[type="color"]:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    ha-textfield, ha-select, ha-entity-picker, ha-selector {
      display: block;
      width: 100%;
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

    /* ha-switch alignment */
    ha-switch {
      --mdc-theme-secondary: var(--primary-color, #03a9f4);
    }

  `,e([he({attribute:!1})],lt.prototype,"hass",void 0),e([ue()],lt.prototype,"_config",void 0),lt=e([ce("chronicle-card-editor")],lt);const ct=window;ct.customCards=ct.customCards||[],ct.customCards.push({type:"chronicle-card",name:"Chronicle Card",description:"A universal, extensible timeline card for Home Assistant",preview:!0,documentationURL:"https://github.com/chronicle-card/chronicle-card"}),console.info("%c CHRONICLE-CARD %c v1.9.0 ","color: #fff; background: #2196F3; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #2196F3; background: #e3f2fd; font-weight: 500; padding: 2px 6px; border-radius: 0 4px 4px 0;");
