function e(e,t,i,r){var a,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(o<3?a(s):o>3?a(t,i,s):a(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new o(i,e,r)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);a?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=r;const o=a.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){if(void 0!==e){const o=this.constructor;if(!1===r&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??x)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,v?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,T=`<${z}>`,F=document,D=()=>F.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,M="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,I=/>/g,H=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,R=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),J=new WeakMap,q=F.createTreeWalker(F,129);function Y(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,r=[];let a,o=2===t?"<svg>":3===t?"<math>":"",s=P;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(s.lastIndex=d,l=s.exec(i),null!==l);)d=s.lastIndex,s===P?"!--"===l[1]?s=U:void 0!==l[1]?s=I:void 0!==l[2]?(R.test(l[2])&&(a=RegExp("</"+l[2],"g")),s=H):void 0!==l[3]&&(s=H):s===H?">"===l[0]?(s=a??P,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?H:'"'===l[3]?L:j):s===L||s===j?s=H:s===U||s===I?s=P:(s=H,a=void 0);const p=s===H&&e[t+1].startsWith("/>")?" ":"";o+=s===P?i+T:c>=0?(r.push(n),i.slice(0,c)+C+i.slice(c)+E+p):i+E+(-2===c?t:p)}return[Y(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class V{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,o=0;const s=e.length-1,n=this.parts,[l,c]=K(e,t);if(this.el=V.createElement(l,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=q.nextNode())&&n.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(C)){const t=c[o++],i=r.getAttribute(e).split(E),s=/([.?@])?(.*)/.exec(t);n.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?te:"?"===s[1]?ie:"@"===s[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(E)&&(n.push({type:6,index:a}),r.removeAttribute(e));if(R.test(r.tagName)){const e=r.textContent.split(E),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],D()),q.nextNode(),n.push({type:2,index:++a});r.append(e[t],D())}}}else if(8===r.nodeType)if(r.data===z)n.push({type:2,index:a});else{let e=-1;for(;-1!==(e=r.data.indexOf(E,e+1));)n.push({type:7,index:a}),e+=E.length-1}a++}}static createElement(e,t){const i=F.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,r){if(t===W)return t;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const o=O(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(t=Z(e,a._$AS(e,t.values),a,r)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??F).importNode(t,!0);q.currentNode=r;let a=q.nextNode(),o=0,s=0,n=i[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new X(a,a.nextSibling,this,e):1===n.type?t=new n.ctor(a,n.name,n.strings,this,e):6===n.type&&(t=new ae(a,this,e)),this._$AV.push(t),n=i[++s]}o!==n?.index&&(a=q.nextNode(),o++)}return q.currentNode=F,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),O(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=V.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Q(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=J.get(e.strings);return void 0===t&&J.set(e.strings,t=new V(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const a of e)r===t.length?t.push(i=new X(this.O(D()),this.O(D()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,r){const a=this.strings;let o=!1;if(void 0===a)e=Z(this,e,t,0),o=!O(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const r=e;let s,n;for(e=a[0],s=0;s<a.length-1;s++)n=Z(this,r[i+s],t,s),n===W&&(n=this._$AH[s]),o||=!O(n)||n!==this._$AH[s],n===G?e=G:e!==G&&(e+=(n??"")+a[s+1]),this._$AH[s]=n}o&&!r&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class re extends ee{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??G)===W)return;const i=this._$AH,r=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const oe=$.litHtmlPolyfillSupport;oe?.(V,X),($.litHtmlVersions??=[]).push("3.3.2");const se=globalThis;class ne extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let a=r._$litPart$;if(void 0===a){const e=i?.renderBefore??null;r._$litPart$=a=new X(t.insertBefore(D(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ne._$litElement$=!0,ne.finalized=!0,se.litElementHydrateSupport?.({LitElement:ne});const le=se.litElementPolyfillSupport;le?.({LitElement:ne}),(se.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x},pe=(e=de,t,i)=>{const{kind:r,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,a,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];t.call(this,i),this.requestUpdate(r,a,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function he(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return he({...e,state:!0,attribute:!1})}function ge(e,t){return(t,i,r)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}const me={layout:"vertical",show_layout_toggle:!0,max_events:50,days_back:7,time_format:"24h",show_header:!0,filters:{categories:[],severities:[],sources:[],entities:[],search:""},grouping:{enabled:!0,window_seconds:120,min_group_size:3,group_by:"category"},appearance:{card_height:"400px",compact:!1,show_images:!0,show_icons:!0,show_severity_badge:!0,show_source_badge:!1,animate_new_events:!0,severity_colors:{critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"}}},fe={critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"},ve={person:"mdi:walk",vehicle:"mdi:car",animal:"mdi:paw",pet:"mdi:paw",security:"mdi:shield-home",motion:"mdi:motion-sensor",door:"mdi:door",lock:"mdi:lock",camera:"mdi:cctv",light:"mdi:lightbulb",climate:"mdi:thermostat",automation:"mdi:robot",system:"mdi:cog",default:"mdi:calendar-clock"},be={person:"#FF9800",vehicle:"#2196F3",animal:"#43A047",pet:"#43A047",security:"#F44336",motion:"#9C27B0",door:"#795548",lock:"#607D8B",camera:"#FF5722",light:"#FFC107",climate:"#00BCD4",automation:"#3F51B5",system:"#9E9E9E",default:"#78909C"},ye=108e5,xe=[[["cat","kitten","feline"],"mdi:cat"],[["dog","puppy","canine"],"mdi:dog"],[["bird","robin","crow","pigeon","sparrow"],"mdi:bird"],[["fish","aquarium"],"mdi:fish"],[["rabbit","bunny"],"mdi:rabbit"],[["horse","pony"],"mdi:horse"],[["snake","reptile","lizard"],"mdi:snake"],[["bear"],"mdi:paw"],[["deer"],"mdi:deer"],[["insect","bug","spider","bee","wasp"],"mdi:bee"],[["animal","pet","wildlife"],"mdi:paw"],[["person","human","people","visitor","guest","face"],"mdi:walk"],[["baby","infant","child","kid"],"mdi:baby-face-outline"],[["meeting","appointment","interview"],"mdi:account-group"],[["car","automobile","sedan"],"mdi:car"],[["truck","lorry"],"mdi:truck"],[["motorcycle","motorbike","bike","bicycle"],"mdi:bike"],[["bus","transit"],"mdi:bus"],[["boat","ship"],"mdi:sail-boat"],[["airplane","plane","flight"],"mdi:airplane"],[["vehicle","transport"],"mdi:car"],[["package","parcel","delivery","mail","post","courier"],"mdi:package-variant-closed"],[["amazon"],"mdi:package-variant-closed"],[["alarm","alert","intrusion","break-in","breach"],"mdi:alarm-light"],[["security","surveillance","guard"],"mdi:shield-home"],[["smoke","fire","flame"],"mdi:fire"],[["flood","water leak","leak"],"mdi:water-alert"],[["co2","carbon monoxide","gas"],"mdi:molecule-co2"],[["doorbell","ring","knock"],"mdi:doorbell"],[["door","gate","entry","entrance","exit"],"mdi:door"],[["lock","unlock","locked","unlocked"],"mdi:lock"],[["window"],"mdi:window-closed-variant"],[["garage"],"mdi:garage"],[["motion","movement","activity","detected"],"mdi:motion-sensor"],[["camera","cctv","snapshot","recording","footage","clip"],"mdi:cctv"],[["light","lamp","bulb","lighting","illumin"],"mdi:lightbulb"],[["temperature","temp","thermostat","hvac","heat","cool"],"mdi:thermostat"],[["weather","rain","snow","storm","wind","sunny","cloud"],"mdi:weather-partly-cloudy"],[["humidity","moisture"],"mdi:water-percent"],[["vacuum","roomba","clean"],"mdi:robot-vacuum"],[["washer","laundry","wash"],"mdi:washing-machine"],[["dryer"],"mdi:tumble-dryer"],[["dishwasher","dishes"],"mdi:dishwasher"],[["oven","stove","cook","bake"],"mdi:stove"],[["fridge","refrigerator","freezer"],"mdi:fridge"],[["microwave"],"mdi:microwave"],[["coffee","espresso"],"mdi:coffee"],[["music","song","audio","speaker","playing"],"mdi:music"],[["tv","television","movie","video","stream","netflix","plex"],"mdi:television"],[["gaming","game","playstation","xbox","nintendo"],"mdi:gamepad-variant"],[["3d print","printer","bambu","print job","filament"],"mdi:printer-3d-nozzle"],[["health","heart","blood","medical","medicine"],"mdi:heart-pulse"],[["sleep","bedtime","nap"],"mdi:sleep"],[["workout","exercise","fitness","run","walk","step"],"mdi:run"],[["birthday","anniversary"],"mdi:cake-variant"],[["holiday","vacation","day off"],"mdi:beach"],[["reminder","todo","task"],"mdi:bell-ring"],[["calendar","event","schedule"],"mdi:calendar"],[["update","upgrade","firmware"],"mdi:update"],[["restart","reboot","reset"],"mdi:restart"],[["backup","snapshot"],"mdi:backup-restore"],[["error","fail","crash"],"mdi:alert-circle"],[["automation","script","routine","workflow"],"mdi:robot"],[["battery","charge","power"],"mdi:battery"],[["wifi","network","internet","connect"],"mdi:wifi"],[["bluetooth"],"mdi:bluetooth"],[["system","server","maintenance"],"mdi:cog"],[["solar","panel"],"mdi:solar-power"],[["energy","electricity","power","watt","kwh"],"mdi:flash"],[["water","irrigation","sprinkler"],"mdi:water"],[["gas","natural gas","propane"],"mdi:gas-cylinder"],[["trash","garbage","waste","bin","recycl"],"mdi:trash-can"],[["litter","litter box","kitty litter"],"mdi:cat"],[["food","feed","meal","eat","dinner","lunch","breakfast"],"mdi:food"],[["plant","garden","flower","grow"],"mdi:flower"],[["filter","air filter","hvac filter"],"mdi:air-filter"]],_e=[[["cat","kitten","feline"],"#7f41eb"],[["dog","puppy","canine"],"#8D6E63"],[["bird"],"#4CAF50"],[["animal","pet","wildlife"],"#43A047"],[["person","human","people","visitor","guest","face"],"#FF9800"],[["car","truck","vehicle","automobile","motorcycle"],"#2196F3"],[["package","delivery","mail","amazon"],"#795548"],[["alarm","alert","security","smoke","fire","intrusion"],"#F44336"],[["door","gate","lock","window","garage"],"#795548"],[["doorbell","ring","knock"],"#FF5722"],[["motion","movement","detected"],"#9C27B0"],[["camera","cctv","snapshot"],"#FF5722"],[["light","lamp","bulb"],"#FFC107"],[["temperature","thermostat","hvac","climate"],"#00BCD4"],[["weather"],"#42A5F5"],[["automation","script","routine"],"#3F51B5"],[["error","fail","crash"],"#D32F2F"],[["system","update","restart","maintenance"],"#9E9E9E"],[["trash","garbage","waste"],"#78909C"],[["plant","garden","flower"],"#4CAF50"],[["3d print","printer","bambu"],"#00ACC1"]];function we(e,t){const i=e.toLowerCase();for(const[e,r]of t)if(e.some(e=>i.includes(e)))return r}function $e(e,t,i,r,a){if(r){const a=[e,t,i].filter(Boolean).join(" ").toLowerCase();for(const[e,t]of Object.entries(r))if(a.includes(e.toLowerCase()))return t}const o=function(e,t,i){return we([e,t,i].filter(Boolean).join(" "),xe)}(e,t,i);return o||(a||(ve[t]?ve[t]:ve.default))}function ke(e,t,i,r,a){if(r){const a=[e,t,i].filter(Boolean).join(" ").toLowerCase();for(const[e,t]of Object.entries(r))if(a.includes(e.toLowerCase()))return t}if(a)return a;const o=function(e,t,i){return we([e,t,i].filter(Boolean).join(" "),_e)}(e,t,i);return o||(be[t]?be[t]:be.default)}function Se(e,t){return e?"string"==typeof e?e:e.dateTime||e.date||t:t}function Ae(e){if(!e&&0!==e)return"";const t=String(e),i=Number(e);return!isNaN(i)&&i>1e9&&i<1e13?new Date(1e3*i).toISOString():t}const Ce={door:{on:"Opened",off:"Closed"},opening:{on:"Opened",off:"Closed"},garage_door:{on:"Opened",off:"Closed"},window:{on:"Opened",off:"Closed"},lock:{on:"Unlocked",off:"Locked"},motion:{on:"Motion Detected",off:"Motion Cleared"},occupancy:{on:"Occupied",off:"Unoccupied"},presence:{on:"Present",off:"Away"},smoke:{on:"Smoke Detected",off:"Clear"},moisture:{on:"Wet",off:"Dry"},gas:{on:"Gas Detected",off:"Clear"},co:{on:"CO Detected",off:"Clear"},vibration:{on:"Vibration",off:"Still"},tamper:{on:"Tampered",off:"Secure"},safety:{on:"Unsafe",off:"Safe"},power:{on:"On",off:"Off"},plug:{on:"Plugged In",off:"Unplugged"},sound:{on:"Sound Detected",off:"Quiet"},problem:{on:"Problem",off:"OK"},connectivity:{on:"Connected",off:"Disconnected"},battery:{on:"Low",off:"Normal"},running:{on:"Running",off:"Stopped"},heat:{on:"Hot",off:"Normal"},cold:{on:"Cold",off:"Normal"},light:{on:"Light Detected",off:"Dark"}},Ee={lock:{locked:"Locked",unlocked:"Unlocked",jammed:"Jammed",locking:"Locking",unlocking:"Unlocking"},cover:{open:"Opened",closed:"Closed",opening:"Opening",closing:"Closing"},alarm_control_panel:{armed_away:"Armed Away",armed_home:"Armed Home",armed_night:"Armed Night",armed_vacation:"Armed Vacation",armed_custom_bypass:"Armed Custom",disarmed:"Disarmed",triggered:"Triggered",pending:"Pending",arming:"Arming"},person:{home:"Home",not_home:"Away"},device_tracker:{home:"Home",not_home:"Away"},light:{on:"On",off:"Off"},switch:{on:"On",off:"Off"},fan:{on:"On",off:"Off"},input_boolean:{on:"On",off:"Off"},climate:{off:"Off",heat:"Heating",cool:"Cooling",auto:"Auto",heat_cool:"Heat/Cool",fan_only:"Fan Only",dry:"Dry"},vacuum:{cleaning:"Cleaning",docked:"Docked",returning:"Returning",idle:"Idle",paused:"Paused",error:"Error"},media_player:{playing:"Playing",paused:"Paused",idle:"Idle",standby:"Standby",off:"Off",on:"On",buffering:"Buffering"}},ze={door:"door",opening:"door",garage_door:"door",window:"door",lock:"lock",motion:"motion",occupancy:"motion",presence:"person",vibration:"motion",smoke:"security",gas:"security",co:"security",moisture:"climate",heat:"climate",cold:"climate",tamper:"security",safety:"security",problem:"system",connectivity:"system",battery:"system",power:"system",plug:"system",running:"system",sound:"motion",light:"light"},Te={person:"person",device_tracker:"person",sensor:"system",light:"light",switch:"automation",lock:"lock",cover:"door",climate:"climate",camera:"camera",alarm_control_panel:"security",automation:"automation",vacuum:"automation",media_player:"system",fan:"climate"};const Fe=new class{constructor(){this.registry=new Map}register(e,t){this.registry.set(e,t)}create(e){const t=this.registry.get(e);if(!t)throw new Error(`[chronicle-card] Unknown adapter type: "${e}". Available types: ${Array.from(this.registry.keys()).join(", ")}`);return new t}has(e){return this.registry.has(e)}types(){return Array.from(this.registry.keys())}};Fe.register("calendar",class{constructor(){this.type="calendar"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.entity;if(!i)return console.warn("[chronicle-card] CalendarAdapter: no entity configured"),[];try{const r=t.start.toISOString(),a=t.end.toISOString(),o=`calendars/${i}?start=${encodeURIComponent(r)}&end=${encodeURIComponent(a)}`,s=await e.callApi("GET",o);return Array.isArray(s)?s.map(t=>{const o=t.summary||"Untitled Event",s=t.description||"",n=function(e){const t=(e||"").toLowerCase(),i={person:["person","visitor","guest","meeting","appointment"],vehicle:["vehicle","car","delivery","parking"],security:["security","alarm","alert"],motion:["motion","movement"],pet:["pet","cat","dog","animal"],automation:["automation","script","routine"],system:["system","update","maintenance","restart"],climate:["climate","temperature","hvac","weather"],light:["light","lamp","lighting"]};for(const[e,r]of Object.entries(i))if(r.some(e=>t.includes(e)))return e;return"default"}(`${o} ${s}`),l=Se(t.start,r),c=t.uid||function(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return Math.abs(t).toString(36)}(`${o}:${l}`);return{id:`calendar:${i}:${c}`,sourceType:"calendar",sourceId:this.config.name||i,title:o,description:s,start:l,end:Se(t.end,a),icon:$e(o,n,void 0,this.config.icon_map,this.config.default_icon),color:ke(o,n,void 0,this.config.color_map,this.config.default_color),category:n,severity:this.config.default_severity||"info",entityId:i,entityName:e.states[i]?.attributes?.friendly_name||i,actions:this.config.actions,metadata:{location:t.location,recurrence_id:t.recurrence_id,uid:t.uid}}}):(console.warn("[chronicle-card] CalendarAdapter: unexpected response format"),[])}catch(e){return console.warn("[chronicle-card] CalendarAdapter: failed to fetch events",e),[]}}}),Fe.register("rest",class{constructor(){this.type="rest"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.ws_params,r=this.config.url;if(!r&&!i)return console.warn("[chronicle-card] RestAdapter: no url or ws_params configured"),[];try{let t,a;if(i){const r=await e.callWS({...i});t="string"==typeof r?JSON.parse(r):r}else if(function(e){return!e.startsWith("http://")&&!e.startsWith("https://")}(r))t=await e.callApi("GET",r);else{const e=await fetch(r);if(!e.ok)return console.warn(`[chronicle-card] RestAdapter: HTTP ${e.status} from ${r}`),[];t=await e.json()}if(this.config.response_path){const e=function(e,t){const i=t.split(".");let r=e;for(const e of i){if(null==r||"object"!=typeof r)return;r=r[e]}return r}(t,this.config.response_path);if(!Array.isArray(e))return console.warn("[chronicle-card] RestAdapter: response_path did not resolve to an array"),[];a=e}else{if(!Array.isArray(t))return console.warn("[chronicle-card] RestAdapter: response is not an array and no response_path configured"),[];a=t}return a.map((e,t)=>this.mapItem(e,t))}catch(e){return console.warn("[chronicle-card] RestAdapter: failed to fetch events",e),[]}}classifyMedia(e){return e?e.startsWith("/media/")?{mediaContentId:`media-source://media_source/local/${e.slice(7)}`}:{mediaUrl:e}:{}}expandTemplate(e,t){return e.replace(/\{(\w+)\}/g,(e,i)=>{const r=t[i];return null!=r?String(r):""})}mapItem(e,t){const i=this.config.field_map||{},r=(t,r="")=>{const a=i[t];return a&&void 0!==e[a]?e[a]:void 0!==e[t]?e[t]:r},a=String(r("id",t)),o=String(r("title","Untitled")),s=String(r("category","default")),n=r("label",void 0);let l=r("mediaUrl",void 0);this.config.media_url_template&&(l=this.expandTemplate(this.config.media_url_template,e));const c=r("mediaContentId",void 0),d=this.classifyMedia(l),p=r("icon",void 0),h=r("color",void 0);return{id:`rest:${this.config.url||this.config.name||"ws"}:${a}`,sourceType:"rest",sourceId:this.config.name||this.config.url||"rest",title:o,description:String(r("description","")),start:Ae(r("start",(new Date).toISOString())),end:Ae(r("end","")),mediaUrl:d.mediaUrl,mediaContentId:c||d.mediaContentId,icon:p||$e(o,s,n,this.config.icon_map,this.config.default_icon),color:h||ke(o,s,n,this.config.color_map,this.config.default_color),category:s,label:n,severity:r("severity",this.config.default_severity||"info"),entityId:r("entityId",void 0),entityName:r("entityName",void 0),actions:this.config.actions,metadata:{source_url:this.config.url,raw_index:t,...r("metadata",void 0)||{}}}}}),Fe.register("history",class{constructor(){this.type="history"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.entity;if(!i)return console.warn("[chronicle-card] HistoryAdapter: no entity configured"),[];const r=this.config.state_filter?.length?new Set(this.config.state_filter):null;try{const a=t.start.toISOString(),o=`history/period/${a}?filter_entity_id=${i}&end_time=${t.end.toISOString()}&minimal_response`,s=await e.callApi("GET",o);if(!Array.isArray(s))return console.warn("[chronicle-card] HistoryAdapter: unexpected response format"),[];const n=[];for(const t of s)if(Array.isArray(t)&&0!==t.length)for(let a=1;a<t.length;a++){const o=t[a-1],s=t[a],l=s.entity_id||t[0].entity_id||i;if(o.state===s.state)continue;if("unavailable"===s.state||"unknown"===s.state)continue;if("unavailable"===o.state||"unknown"===o.state)continue;if(r&&!r.has(s.state))continue;const c=this.stateChangeToEvent(e,l,o,s);n.push(c)}return n}catch(e){return console.warn("[chronicle-card] HistoryAdapter: failed to fetch events",e),[]}}async subscribeLive(e,t){const i=this.config.entity;if(!i)return()=>{};const r=this.config.state_filter?.length?new Set(this.config.state_filter):null;return await e.connection.subscribeEvents(a=>{const o=a.data;if(o.entity_id!==i)return;if(!o.old_state||!o.new_state)return;if(o.old_state.state===o.new_state.state)return;if("unavailable"===o.new_state.state||"unknown"===o.new_state.state)return;if("unavailable"===o.old_state.state||"unknown"===o.old_state.state)return;if(r&&!r.has(o.new_state.state))return;const s=this.stateChangeToEvent(e,i,o.old_state,o.new_state);t(s)},"state_changed")}getDeviceClass(e,t,i){const r=e.states[t];return r?.attributes?.device_class?String(r.attributes.device_class):i.attributes?.device_class?String(i.attributes.device_class):""}humanizeState(e,t,i){const r=this.config.state_map?.[t];if(r)return r;const a=e.split(".")[0];if("binary_sensor"===a&&i){const e=Ce[i];if(e?.[t])return e[t]}const o=Ee[a];return o?.[t]?o[t]:"on"===t?"On":"off"===t?"Off":t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," ")}detectCategory(e,t){const i=e.split(".")[0];return"binary_sensor"===i&&t?ze[t]||"default":Te[i]||"default"}stripOverlap(e,t){const i=e.toLowerCase().split(/\s+/),r=t.split(/\s+/),a=r.map(e=>e.toLowerCase());for(let e=Math.min(i.length,a.length);e>0;e--){const o=i.slice(-e),s=a.slice(0,e);if(o.every((e,t)=>e===s[t])){return r.slice(e).join(" ")||t}}return t}stateChangeToEvent(e,t,i,r){const a=this.getDeviceClass(e,t,r),o=this.detectCategory(t,a),s=e.states[t]?.attributes?.friendly_name||t,n=this.config.name||s,l=this.humanizeState(t,r.state,a),c=this.humanizeState(t,i.state,a),d=`${n} ${this.stripOverlap(n,l)}`,p=`${this.stripOverlap(n,c)} → ${this.stripOverlap(n,l)}`;return{id:`history:${t}:${r.last_changed}`,sourceType:"history",sourceId:this.config.name||"history",title:d,description:p,start:r.last_changed,end:r.last_changed,icon:$e(d,o,void 0,this.config.icon_map,this.config.default_icon),color:ke(d,o,void 0,this.config.color_map,this.config.default_color),category:o,severity:this.config.default_severity||"info",entityId:t,actions:this.config.actions,metadata:{old_state:i.state,new_state:r.state,old_label:c,new_label:l,device_class:a,last_updated:r.last_updated}}}}),Fe.register("static",class{constructor(){this.type="static"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.events;if(!i||0===i.length)return console.warn("[chronicle-card] StaticAdapter: no events configured"),[];try{const e=this.config.name||"static";return i.map((i,r)=>{const a=i.category||"default",o=new Date(i.start);return(i.end?new Date(i.end):o)<t.start||o>t.end?null:{id:`static:${e}:${r}`,sourceType:"static",sourceId:e,title:i.title,description:i.description||"",start:i.start,end:i.end||i.start,icon:i.icon||this.config.default_icon||ve[a]||ve.default,color:i.color||this.config.default_color||be[a]||be.default,category:a,severity:i.severity||this.config.default_severity||"info",actions:this.config.actions,metadata:{static_index:r}}}).filter(e=>null!==e)}catch(e){return console.warn("[chronicle-card] StaticAdapter: failed to process events",e),[]}}});const De=new Map;async function Oe(e,t){if(!t)return;const i=De.get(t);if(i&&Date.now()-i.timestamp<ye)return i.url;!function(){const e=Date.now();for(const[t,i]of De)e-i.timestamp>ye&&De.delete(t)}();try{const i=await e.callWS({type:"media_source/resolve_media",media_content_id:t});return i&&i.url?(De.set(t,{url:i.url,timestamp:Date.now()}),i.url):void 0}catch{return}}class Ne{constructor(){this.adapters=[],this.allEvents=[],this.filteredItems=[],this.lastFetch=0,this.lastHash="",this.liveUnsubscribers=[],this.listeners=new Set,this.fetchPromise=null}get items(){return this.filteredItems}get events(){return this.allEvents}configure(e){this.config=e,this.adapters=[];for(const t of e.sources??[])try{const e=Fe.create(t.type);e.configure(t),this.adapters.push(e)}catch(e){console.warn("[chronicle-card] Skipping source:",e)}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){for(const e of this.listeners)e()}async fetch(e,t=!1){const i=(this.config?.sources??[]).reduce((e,t)=>Math.min(e,1e3*(t.poll_interval??30)),3e4);if(t||!(Date.now()-this.lastFetch<i)){if(this.fetchPromise)return this.fetchPromise;this.fetchPromise=this._doFetch(e);try{await this.fetchPromise}finally{this.fetchPromise=null}}}async _doFetch(e){const t=this.config.days_back??me.days_back??7,i=new Date,r={start:new Date(i.getTime()-24*t*60*60*1e3),end:i},a=await Promise.allSettled(this.adapters.map(t=>t.fetchEvents(e,r))),o=[];for(const e of a)"fulfilled"===e.status?o.push(...e.value):console.warn("[chronicle-card] Adapter fetch failed:",e.reason);const s=new Set,n=[];for(const e of o)s.has(e.id)||(s.add(e.id),n.push(e));n.sort((e,t)=>new Date(t.start).getTime()-new Date(e.start).getTime()),await this.resolveMedia(e,n);const l=this.computeHash(n);l!==this.lastHash?(this.allEvents=n,this.lastHash=l,this.lastFetch=Date.now(),this.applyFiltersAndGroup()):this.lastFetch=Date.now()}applyFiltersAndGroup(){let e=[...this.allEvents];const t=this.config.filters??{};if(t.categories&&t.categories.length>0){const i=new Set(t.categories);e=e.filter(e=>i.has(e.category))}if(t.severities&&t.severities.length>0){const i=new Set(t.severities);e=e.filter(e=>i.has(e.severity))}if(t.sources&&t.sources.length>0){const i=new Set(t.sources);e=e.filter(e=>i.has(e.sourceId)||i.has(e.sourceType))}if(t.entities&&t.entities.length>0){const i=new Set(t.entities);e=e.filter(e=>e.entityId&&i.has(e.entityId))}if(t.search&&t.search.trim().length>0){const i=t.search.toLowerCase().trim();e=e.filter(e=>e.title.toLowerCase().includes(i)||e.description.toLowerCase().includes(i)||e.category.toLowerCase().includes(i)||e.label&&e.label.toLowerCase().includes(i))}const i=this.config.max_events??me.max_events??50;e.length>i&&(e=e.slice(0,i));const r={enabled:!0,window_seconds:120,min_group_size:3,group_by:"category",...this.config.grouping};this.filteredItems=function(e,t){if(!t.enabled||"none"===t.group_by||0===e.length)return[...e];const i=1e3*(t.window_seconds??120),r=t.min_group_size??3,a=t.group_by??"category",o=[];let s=[],n=null,l=null;const c=e=>{switch(a){case"category":return e.category;case"source":return`${e.sourceType}:${e.sourceId}`;case"entity":return e.entityId??"";default:return""}},d=e=>{const t=e.length,i=e[0],r=new Set(e.map(e=>e.label||e.category).filter(Boolean));if(1===r.size)return`${t} ${[...r][0]} events`;switch(a){case"source":return`${t} ${i.sourceId} events`;case"entity":return`${t} ${i.entityName||i.entityId||"entity"} events`;default:return`${t} ${i.category} events`}},p=()=>{if(0!==s.length){if(s.length>=r){const e=s[0];o.push({representative:e,events:s,summary:d(s),expanded:!1})}else o.push(...s);s=[],n=null,l=null}};for(const t of e){const e=c(t),r=new Date(t.start).getTime();if(null===n){n=e,l=r,s.push(t);continue}const a=null!==l&&Math.abs(r-l)<=i;e===n&&a?(s.push(t),l=r):(p(),n=e,l=r,s.push(t))}return p(),o}(e,r),this.notify()}injectLiveEvent(e){this.allEvents.some(t=>t.id===e.id)||(this.allEvents.unshift(e),this.lastHash=this.computeHash(this.allEvents),this.applyFiltersAndGroup())}async subscribeLive(e){this.unsubscribeLive();for(const t of this.adapters)if(t.subscribeLive)try{const i=await t.subscribeLive(e,e=>{this.injectLiveEvent(e)});this.liveUnsubscribers.push(i)}catch(e){console.warn("[chronicle-card] Live subscription failed:",e)}}unsubscribeLive(){for(const e of this.liveUnsubscribers)try{e()}catch{}this.liveUnsubscribers=[]}toggleGroup(e){e.expanded=!e.expanded,this.notify()}async resolveMedia(e,t){const i=t.filter(e=>e.mediaContentId&&!e.mediaUrl);if(0===i.length)return;const r=await Promise.allSettled(i.map(t=>Oe(e,t.mediaContentId)));for(let e=0;e<i.length;e++){const t=r[e];"fulfilled"===t.status&&t.value&&(i[e].mediaUrl=t.value)}}computeHash(e){return 0===e.length?"0":`${e.length}:${e[0]?.id}:${e[e.length-1]?.id}`}}function Me(e){return"events"in e&&Array.isArray(e.events)}const Pe=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Ue=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ie(e){if(e instanceof Date)return isNaN(e.getTime())?new Date:e;const t=new Date(e);return isNaN(t.getTime())?new Date:t}function He(e){return e<10?`0${e}`:String(e)}function je(e,t){const i=Ie(e),r=i.getHours(),a=He(i.getMinutes());if("24h"===t)return`${He(r)}:${a}`;return`${0===r?12:r>12?r-12:r}:${a} ${r>=12?"PM":"AM"}`}function Le(e){const t=Ie(e);return`${Pe[t.getDay()]}, ${Ue[t.getMonth()]} ${t.getDate()}`}function Re(e){const t=Ie(e),i=(new Date).getTime()-t.getTime();if(i<0)return Le(t);const r=Math.floor(i/1e3),a=Math.floor(r/60),o=Math.floor(a/60);return r<60?"just now":a<60?`${a} min ago`:o<24&&function(e){const t=Ie(e),i=new Date;return t.getFullYear()===i.getFullYear()&&t.getMonth()===i.getMonth()&&t.getDate()===i.getDate()}(t)?`${o}h ago`:function(e){const t=Ie(e),i=new Date;return i.setDate(i.getDate()-1),t.getFullYear()===i.getFullYear()&&t.getMonth()===i.getMonth()&&t.getDate()===i.getDate()}(t)?"Yesterday":Le(t)}let Be=class extends ne{constructor(){super(...arguments),this.severity="info"}render(){const e=this.customColors?.[this.severity]??fe[this.severity]??fe.info;return B`
      <span class="badge" style="background-color: ${e}">
        ${this.severity}
      </span>
    `}};Be.styles=s`
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
  `,e([he()],Be.prototype,"severity",void 0),e([he()],Be.prototype,"customColors",void 0),Be=e([ce("chronicle-severity-badge")],Be);let We=class extends ne{render(){return B`
      <button @click=${this._handleClick}>
        ${this.action.icon?B`<ha-icon .icon=${this.action.icon}></ha-icon>`:""}
        ${this.action.label}
      </button>
    `}async _handleClick(e){if(e.stopPropagation(),this.action)switch(this.action.type){case"service":{if(!this.hass||!this.action.service)return;const[e,t]=this.action.service.split(".");e&&t&&await this.hass.callService(e,t,this.action.serviceData??{},this.action.target);break}case"navigate":this.action.url&&(this.action.url.startsWith("http")?window.open(this.action.url,"_blank"):(history.pushState(null,"",this.action.url),window.dispatchEvent(new Event("location-changed"))));break;case"fire-event":if(this.action.eventType){const e=new CustomEvent(this.action.eventType,{bubbles:!0,composed:!0,detail:this.action.eventData??{}});this.dispatchEvent(e)}}}};We.styles=s`
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
  `,e([he({attribute:!1})],We.prototype,"hass",void 0),e([he({attribute:!1})],We.prototype,"action",void 0),We=e([ce("chronicle-action-button")],We);let Ge=class extends ne{constructor(){super(...arguments),this.compact=!1,this.timeFormat="24h",this.animated=!1}render(){const e=this.event;if(!e)return G;const t=!1!==this.appearance?.show_images,i=!1!==this.appearance?.show_icons,r=!1!==this.appearance?.show_severity_badge,a=je(e.start,this.timeFormat);return B`
      <div class="event-row">
        ${i?B`
          <div class="icon-wrap" style="background-color: ${e.color}">
            <ha-icon .icon=${o=e.icon,o&&o.startsWith("mdi:")?o:ve.default} style="color: ${function(e,t=.82){const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);if(!i)return"#ffffff";const r=Math.round(parseInt(i[1],16)+(255-parseInt(i[1],16))*t),a=Math.round(parseInt(i[2],16)+(255-parseInt(i[2],16))*t),o=Math.round(parseInt(i[3],16)+(255-parseInt(i[3],16))*t);return`#${r.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}`}(e.color)}"></ha-icon>
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
              <span class="time">${a}</span>
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
    `;var o}_showDetail(){this.dispatchEvent(new CustomEvent("chronicle-show-detail",{bubbles:!0,composed:!0,detail:{event:this.event}}))}};Ge.styles=s`
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
  `,e([he({attribute:!1})],Ge.prototype,"event",void 0),e([he({attribute:!1})],Ge.prototype,"appearance",void 0),e([he({attribute:!1})],Ge.prototype,"hass",void 0),e([he({type:Boolean})],Ge.prototype,"compact",void 0),e([he({type:String})],Ge.prototype,"timeFormat",void 0),e([he({type:Boolean,reflect:!0})],Ge.prototype,"animated",void 0),Ge=e([ce("chronicle-event-item")],Ge);let Je=class extends ne{constructor(){super(...arguments),this.compact=!1,this.timeFormat="24h"}render(){const e=this.group;if(!e)return G;const t=e.representative,i=e.events[0],r=e.events[e.events.length-1],a=je(i.start,this.timeFormat),o=je(r.start,this.timeFormat),s=a===o?a:`${a} – ${o}`,n=!1!==this.appearance?.show_images?e.events.map(e=>e.mediaUrl).filter(Boolean):[],l=n.slice(0,3),c=n.length-3;return B`
      <div>
        <div class="group-row">
          <div class="icon-wrap" style="background-color: ${t.color}">
            <ha-icon .icon=${d=t.icon,d&&d.startsWith("mdi:")?d:ve.default} style="color: ${function(e,t=.82){const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);if(!i)return"#ffffff";const r=Math.round(parseInt(i[1],16)+(255-parseInt(i[1],16))*t),a=Math.round(parseInt(i[2],16)+(255-parseInt(i[2],16))*t),o=Math.round(parseInt(i[3],16)+(255-parseInt(i[3],16))*t);return`#${r.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}`}(t.color)}"></ha-icon>
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
    `;var d}_toggle(){this.dispatchEvent(new CustomEvent("chronicle-toggle-group",{bubbles:!0,composed:!0,detail:{group:this.group}}))}};Je.styles=s`
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
  `,e([he({attribute:!1})],Je.prototype,"group",void 0),e([he({attribute:!1})],Je.prototype,"appearance",void 0),e([he({attribute:!1})],Je.prototype,"hass",void 0),e([he({type:Boolean})],Je.prototype,"compact",void 0),e([he({type:String})],Je.prototype,"timeFormat",void 0),Je=e([ce("chronicle-event-group")],Je);let qe=class extends ne{constructor(){super(...arguments),this.label="",this.eventCount=0}render(){return B`
      <div class="date-header">
        <span class="label">${this.label}</span>
        <span class="line"></span>
        ${this.eventCount>0?B`<span class="count">${this.eventCount}</span>`:""}
      </div>
    `}};qe.styles=s`
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
  `,e([he()],qe.prototype,"label",void 0),e([he()],qe.prototype,"eventCount",void 0),qe=e([ce("chronicle-date-header")],qe);let Ye=class extends ne{constructor(){super(...arguments),this.message="No events found"}render(){return B`
      <div class="empty">
        <div class="icon-ring">
          <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>
        </div>
        <span class="text">${this.message}</span>
      </div>
    `}};Ye.styles=s`
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
  `,e([he()],Ye.prototype,"message",void 0),Ye=e([ce("chronicle-empty-state")],Ye);let Ke=class extends ne{constructor(){super(...arguments),this.items=[],this.compact=!1,this.timeFormat="24h",this.animateNew=!0}render(){if(!this.items||0===this.items.length)return B`<chronicle-empty-state></chronicle-empty-state>`;const e=this._groupByDate(this.items),t=this.appearance?.card_height??"400px";return B`
      <div class="timeline-container" style=${"auto"===t?"":`max-height: ${t}`}>
        <div class="timeline-inner">
          ${e.map(e=>B`
            <div class="date-section">
              <chronicle-date-header
                .label=${e.label}
                .eventCount=${this._countEvents(e.items)}
              ></chronicle-date-header>
              ${e.items.map(e=>Me(e)?B`
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
    `}_groupByDate(e){const t=new Map,i=new Date,r=this._dateKey(i),a=this._dateKey(new Date(i.getTime()-864e5));for(const i of e){const e=Me(i)?i.representative.start:i.start,o=this._dateKey(new Date(e));if(!t.has(o)){let i;if(o===r)i="Today";else if(o===a)i="Yesterday";else{i=new Date(e).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}t.set(o,{dateKey:o,label:i,items:[]})}t.get(o).items.push(i)}return Array.from(t.values())}_dateKey(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}_countEvents(e){let t=0;for(const i of e)t+=Me(i)?i.events.length:1;return t}};function Ve(e){return e&&e.startsWith("mdi:")?e:ve.default}Ke.styles=s`
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
  `,e([he({attribute:!1})],Ke.prototype,"items",void 0),e([he({attribute:!1})],Ke.prototype,"appearance",void 0),e([he({attribute:!1})],Ke.prototype,"hass",void 0),e([he({type:Boolean})],Ke.prototype,"compact",void 0),e([he({type:String})],Ke.prototype,"timeFormat",void 0),e([he({type:Boolean})],Ke.prototype,"animateNew",void 0),Ke=e([ce("chronicle-vertical-timeline")],Ke);let Ze=class extends ne{constructor(){super(...arguments),this.items=[],this.timeFormat="24h"}render(){return this.items&&0!==this.items.length?B`
      <div class="wrapper">
        <button class="scroll-btn left" @click=${()=>this._scroll(-200)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>

        <div class="scroll-container">
          ${this.items.map(e=>Me(e)?e.expanded?this._renderExpandedGroup(e):this._renderGroupCard(e):this._renderEventCard(e))}
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
    `}_scroll(e){this.scrollEl?.scrollBy({left:e,behavior:"smooth"})}_showDetail(e){this.dispatchEvent(new CustomEvent("chronicle-show-detail",{bubbles:!0,composed:!0,detail:{event:e}}))}_toggleGroup(e){this.dispatchEvent(new CustomEvent("chronicle-toggle-group",{bubbles:!0,composed:!0,detail:{group:e}}))}};Ze.styles=s`
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
  `,e([he({attribute:!1})],Ze.prototype,"items",void 0),e([he({attribute:!1})],Ze.prototype,"appearance",void 0),e([he({attribute:!1})],Ze.prototype,"hass",void 0),e([he({type:String})],Ze.prototype,"timeFormat",void 0),e([ge(".scroll-container")],Ze.prototype,"scrollEl",void 0),Ze=e([ce("chronicle-horizontal-timeline")],Ze);let Qe=class extends ne{constructor(){super(...arguments),this._event=null,this._open=!1,this._container=null}render(){return G}show(e){this._event=e,this._ensureContainer(),this._renderDialog(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{this._open=!0,this._renderDialog()})})}close(){this._open=!1,this._renderDialog(),setTimeout(()=>{this._event=null,this._removeContainer()},350)}_ensureContainer(){if(this._container)return;this._container=document.createElement("div"),this._container.id="chronicle-detail-overlay",document.body.appendChild(this._container);this._container.attachShadow({mode:"open"}).innerHTML=""}_removeContainer(){this._container&&(this._container.remove(),this._container=null)}_renderDialog(){if(!this._container)return;const e=this._container.shadowRoot;if(!e)return;const t=this._event,i=this._open;var r;e.innerHTML=`\n      <style>\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .overlay {\n          position: fixed;\n          top: 0; left: 0; right: 0; bottom: 0;\n          background: rgba(0, 0, 0, 0.5);\n          backdrop-filter: blur(4px);\n          -webkit-backdrop-filter: blur(4px);\n          z-index: 99999;\n          opacity: ${i?"1":"0"};\n          transition: opacity 0.3s ease;\n          pointer-events: ${i?"auto":"none"};\n        }\n\n        .dialog {\n          position: fixed;\n          z-index: 100000;\n          background: var(--card-background-color, #fff);\n          overflow-y: auto;\n          overscroll-behavior: contain;\n\n          /* Mobile: bottom sheet */\n          bottom: 0; left: 0; right: 0;\n          max-height: 88vh;\n          border-radius: 20px 20px 0 0;\n          box-shadow: 0 -2px 30px rgba(0, 0, 0, 0.2), 0 -1px 2px rgba(0,0,0,0.06);\n          transform: translateY(${i?"0":"100%"});\n          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n\n        @media (min-width: 600px) {\n          .dialog {\n            bottom: auto; left: 50%; right: auto;\n            top: 50%;\n            transform: translate(-50%, -50%) scale(${i?"1":"0.96"});\n            opacity: ${i?"1":"0"};\n            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;\n            border-radius: 18px;\n            max-width: 460px;\n            width: 92vw;\n            max-height: 82vh;\n            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0,0,0,0.08);\n          }\n        }\n\n        .handle {\n          width: 32px; height: 4px;\n          border-radius: 2px;\n          background: var(--divider-color, rgba(127,127,127,0.25));\n          margin: 10px auto 0;\n        }\n        @media (min-width: 600px) { .handle { display: none; } }\n\n        .media-wrap {\n          position: relative;\n          overflow: hidden;\n        }\n        .media {\n          width: 100%;\n          max-height: 240px;\n          object-fit: cover;\n          display: block;\n          background: var(--secondary-background-color, #f0f0f0);\n        }\n        .media-gradient {\n          position: absolute;\n          bottom: 0; left: 0; right: 0;\n          height: 48px;\n          background: linear-gradient(transparent, var(--card-background-color, #fff));\n          pointer-events: none;\n        }\n\n        .body { padding: 16px 20px 24px; }\n        .body-with-media { padding-top: 8px; }\n\n        .header {\n          display: flex;\n          align-items: flex-start;\n          gap: 12px;\n          margin-bottom: 16px;\n        }\n        .header-icon {\n          width: 40px; height: 40px;\n          border-radius: 50%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          flex-shrink: 0;\n          box-shadow: 0 2px 6px rgba(0,0,0,0.12);\n        }\n        .header-icon ha-icon {\n          --mdc-icon-size: 20px;\n          color: #fff;\n          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));\n        }\n        .header-text { flex: 1; min-width: 0; }\n        .header-title {\n          font-size: 17px;\n          font-weight: 700;\n          color: var(--primary-text-color, #333);\n          line-height: 1.3;\n          letter-spacing: -0.2px;\n        }\n        .header-time {\n          font-size: 12px;\n          color: var(--secondary-text-color, #888);\n          margin-top: 4px;\n          font-variant-numeric: tabular-nums;\n        }\n\n        .close-btn {\n          position: absolute;\n          top: 12px; right: 12px;\n          width: 32px; height: 32px;\n          border-radius: 50%;\n          border: none;\n          background: rgba(127,127,127,0.12);\n          backdrop-filter: blur(8px);\n          -webkit-backdrop-filter: blur(8px);\n          color: var(--primary-text-color, #333);\n          cursor: pointer;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          z-index: 2;\n          padding: 0;\n          transition: background 0.15s ease;\n          line-height: 0;\n        }\n        .close-btn:hover {\n          background: rgba(127,127,127,0.22);\n        }\n        .close-btn svg {\n          display: block;\n          width: 14px;\n          height: 14px;\n        }\n\n        .tags {\n          display: flex;\n          flex-wrap: wrap;\n          gap: 6px;\n          margin-bottom: 16px;\n        }\n        .tag {\n          font-size: 11px;\n          font-weight: 500;\n          padding: 3px 10px;\n          border-radius: 20px;\n          background: var(--divider-color, rgba(127,127,127,0.08));\n          color: var(--secondary-text-color, #777);\n          letter-spacing: 0.1px;\n        }\n        .severity-tag {\n          font-size: 10px;\n          font-weight: 600;\n          letter-spacing: 0.4px;\n          text-transform: uppercase;\n          padding: 4px 10px;\n          border-radius: 20px;\n          color: #fff;\n          display: inline-flex;\n          align-items: center;\n          justify-content: center;\n          line-height: 1;\n        }\n\n        .description {\n          font-size: 13.5px;\n          line-height: 1.65;\n          color: var(--primary-text-color, #444);\n          margin-bottom: 16px;\n          white-space: pre-wrap;\n          word-break: break-word;\n          opacity: 0.9;\n        }\n\n        .meta-table {\n          display: grid;\n          grid-template-columns: auto 1fr;\n          gap: 7px 14px;\n          font-size: 12px;\n          margin-bottom: 16px;\n          padding: 14px 16px;\n          background: var(--secondary-background-color, rgba(127,127,127,0.04));\n          border-radius: 12px;\n          border: 1px solid var(--divider-color, rgba(127,127,127,0.08));\n        }\n        .meta-label {\n          color: var(--secondary-text-color, #888);\n          font-weight: 500;\n          font-size: 11px;\n          text-transform: uppercase;\n          letter-spacing: 0.3px;\n        }\n        .meta-value {\n          color: var(--primary-text-color, #333);\n          font-size: 12.5px;\n        }\n      </style>\n\n      <div class="overlay"></div>\n      <div class="dialog">\n        ${t?`\n          <div class="handle"></div>\n          <button class="close-btn"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg></button>\n\n          ${t.mediaUrl?`\n            <div class="media-wrap">\n              <img class="media" src="${this._escHtml(t.mediaUrl)}" alt="" />\n              <div class="media-gradient"></div>\n            </div>\n          `:""}\n\n          <div class="body ${t.mediaUrl?"body-with-media":""}">\n            <div class="header">\n              <div class="header-icon" style="background-color: ${t.color}">\n                <ha-icon icon="${r=t.icon,r&&r.startsWith("mdi:")?r:ve.default}"></ha-icon>\n              </div>\n              <div class="header-text">\n                <div class="header-title">${this._escHtml(t.title)}</div>\n                <div class="header-time">${this._formatDateTime(t.start)}</div>\n              </div>\n            </div>\n\n            <div class="tags">\n              <span class="severity-tag" style="background-color: ${this._severityColor(t.severity)}">${t.severity}</span>\n              ${t.category?`<span class="tag">${this._escHtml(t.category)}</span>`:""}\n              ${t.label?`<span class="tag">${this._escHtml(t.label)}</span>`:""}\n              ${t.sourceType?`<span class="tag">${this._escHtml(t.sourceType)}</span>`:""}\n            </div>\n\n            ${t.description?`<div class="description">${this._escHtml(t.description)}</div>`:""}\n\n            <div class="meta-table">\n              ${t.entityName?`\n                <span class="meta-label">Entity</span>\n                <span class="meta-value">${this._escHtml(t.entityName)}</span>\n              `:""}\n              ${t.entityId?`\n                <span class="meta-label">Entity ID</span>\n                <span class="meta-value">${this._escHtml(t.entityId)}</span>\n              `:""}\n              <span class="meta-label">Source</span>\n              <span class="meta-value">${this._escHtml(t.sourceId)}</span>\n              <span class="meta-label">Start</span>\n              <span class="meta-value">${this._formatDateTime(t.start)}</span>\n              ${t.end&&t.end!==t.start?`\n                <span class="meta-label">End</span>\n                <span class="meta-value">${this._formatDateTime(t.end)}</span>\n              `:""}\n            </div>\n          </div>\n        `:""}\n      </div>\n    `;const a=e.querySelector(".overlay"),o=e.querySelector(".close-btn");a?.addEventListener("click",()=>this.close()),o?.addEventListener("click",()=>this.close())}_escHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}_severityColor(e){const t={critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"};return t[e]||t.info}_formatDateTime(e){try{return new Date(e).toLocaleString(void 0,{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}connectedCallback(){super.connectedCallback(),this._boundKeydown=this._handleKeydown.bind(this),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),this._boundKeydown&&document.removeEventListener("keydown",this._boundKeydown),this._removeContainer()}_handleKeydown(e){"Escape"===e.key&&this._open&&this.close()}};Qe.styles=s`
    :host { display: none; }
  `,e([he({attribute:!1})],Qe.prototype,"hass",void 0),e([ue()],Qe.prototype,"_event",void 0),e([ue()],Qe.prototype,"_open",void 0),Qe=e([ce("chronicle-detail-dialog")],Qe);let Xe=class extends ne{constructor(){super(...arguments),this._items=[],this._layout="vertical",this._store=new Ne,this._liveSubscribed=!1}static getConfigElement(){return document.createElement("chronicle-card-editor")}static getStubConfig(){return{type:"custom:chronicle-card",title:"Timeline",layout:"vertical",sources:[]}}setConfig(e){if(!e)throw new Error("No configuration provided");this._config={...me,...e,filters:{...me.filters,...e.filters},grouping:{...me.grouping,...e.grouping},appearance:{...me.appearance,...e.appearance}},this._layout=this._config.layout??"vertical",this._store.configure(this._config),this._storeUnsub?.(),this._storeUnsub=this._store.subscribe(()=>{this._items=[...this._store.items]})}set hass(e){this._hass=e,this.requestUpdate(),this._store.fetch(e).catch(e=>{console.warn("[chronicle-card] Fetch error:",e)}),this._liveSubscribed||(this._liveSubscribed=!0,this._store.subscribeLive(e).catch(()=>{}))}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._hass&&this._store.subscribeLive(this._hass).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this._store.unsubscribeLive(),this._liveSubscribed=!1,this._storeUnsub?.()}render(){if(!this._config)return G;const e=!1!==this._config.show_header,t=!1!==this._config.show_layout_toggle,i=this._config.appearance??{},r=this._config.time_format??"24h",a=i.compact??!1,o=!1!==i.animate_new_events;return B`
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
                ?compact=${a}
                ?animateNew=${o}
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
    `}_setLayout(e){this._layout=e}_onShowDetail(e){const t=e.detail.event;this._dialog&&this._dialog.show(t)}_onToggleGroup(e){const t=e.detail.group;this._store.toggleGroup(t)}getCardSize(){return 4}};Xe.styles=s`
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
  `,e([ue()],Xe.prototype,"_config",void 0),e([ue()],Xe.prototype,"_items",void 0),e([ue()],Xe.prototype,"_layout",void 0),e([ge("chronicle-detail-dialog")],Xe.prototype,"_dialog",void 0),Xe=e([ce("chronicle-card")],Xe);let et=class extends ne{constructor(){super(...arguments),this.index=0}_getHint(){return this.source.entity?this.source.entity:this.source.url?this.source.url:this.source.events?.length?`${this.source.events.length} event(s)`:""}render(){if(!this.source)return G;const e=this.source.name||"Unnamed",t=this._getHint(),i=this.source.type;return B`
      <details>
        <summary>
          <span class="type-badge ${i}">${i}</span>
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
                @selected=${this._onTypeChange}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="calendar">Calendar Entity</mwc-list-item>
                <mwc-list-item value="rest">REST API</mwc-list-item>
                <mwc-list-item value="history">Entity History</mwc-list-item>
                <mwc-list-item value="static">Static Events</mwc-list-item>
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
                @selected=${e=>this._update("default_severity",e.detail.value)}
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
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this.source.entity??""}
              .includeDomains=${["calendar"]}
              allow-custom-entity
              @value-changed=${e=>this._update("entity",e.detail.value)}
            ></ha-entity-picker>
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
            <label>Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this.source.entity??""}
              allow-custom-entity
              @value-changed=${e=>this._update("entity",e.detail.value)}
            ></ha-entity-picker>
            <p class="help-text">Each state change becomes a timeline event.</p>
          </div>
          <div class="field">
            <label>State Filter (comma-separated, optional)</label>
            <ha-textfield
              .value=${(this.source.state_filter??[]).join(", ")}
              .label=${"on, locked, open"}
              @input=${e=>{const t=e.target.value.trim();t?this._update("state_filter",t.split(",").map(e=>e.trim()).filter(Boolean)):this._update("state_filter",void 0)}}
            ></ha-textfield>
            <p class="help-text">Only log events when the new state matches one of these values. Leave empty to log all state changes.</p>
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
    `}_fieldMapToString(){if(!this.source.field_map||0===Object.keys(this.source.field_map).length)return"";try{return JSON.stringify(this.source.field_map,null,2)}catch{return""}}_wsParamsToString(){if(!this.source.ws_params||0===Object.keys(this.source.ws_params).length)return"";try{return JSON.stringify(this.source.ws_params,null,2)}catch{return""}}_onWsParamsChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);"object"!=typeof e||Array.isArray(e)||this._update("ws_params",e)}catch{}else this._update("ws_params",void 0)}_onFieldMapChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);"object"!=typeof e||Array.isArray(e)||this._update("field_map",e)}catch{}else this._update("field_map",void 0)}_staticEventsToString(){if(!this.source.events||0===this.source.events.length)return"";try{return JSON.stringify(this.source.events,null,2)}catch{return""}}_onStaticEventsChange(e){const t=e.target.value.trim();if(t)try{const e=JSON.parse(t);Array.isArray(e)&&this._update("events",e)}catch{}else this._update("events",void 0)}_mapToString(e){if(!e||0===Object.keys(e).length)return"";try{return JSON.stringify(e)}catch{return""}}_onMapChange(e,t){const i=t.target.value.trim();if(i)try{const t=JSON.parse(i);"object"!=typeof t||Array.isArray(t)||this._update(e,t)}catch{}else this._update(e,void 0)}_onTypeChange(e){this._update("type",e.detail?.value??e.target.value)}_update(e,t){this.dispatchEvent(new CustomEvent("source-changed",{bubbles:!0,composed:!0,detail:{index:this.index,key:e,value:t}}))}_remove(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("source-removed",{bubbles:!0,composed:!0,detail:{index:this.index}}))}};et.styles=s`
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
    ha-textfield {
      display: block;
      width: 100%;
    }
    ha-select {
      display: block;
      width: 100%;
    }
    ha-entity-picker {
      display: block;
      width: 100%;
    }
    ha-icon-picker {
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
  `,e([he({attribute:!1})],et.prototype,"source",void 0),e([he({type:Number})],et.prototype,"index",void 0),e([he({attribute:!1})],et.prototype,"hass",void 0),et=e([ce("chronicle-source-editor")],et);let tt=class extends ne{connectedCallback(){super.connectedCallback(),customElements.get("ha-form")||customElements.get("hui-tile-card")?.getConfigElement(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement()}setConfig(e){this._config={...me,...e,filters:{...me.filters,...e.filters},grouping:{...me.grouping,...e.grouping},appearance:{...me.appearance,...e.appearance}}}render(){if(!this._config)return G;const e=this._config,t=e.grouping??{},i=e.appearance??{};return B`
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
                  @selected=${e=>this._set("layout",e.detail.value)}
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
                  @selected=${e=>this._set("time_format",e.detail.value)}
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
              <button class="add-btn" @click=${()=>this._addSource("history")}>+ History</button>
              <button class="add-btn" @click=${()=>this._addSource("static")}>+ Static</button>
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
              <label>Categories (comma-separated)</label>
              <ha-textfield
                .value=${(e.filters?.categories??[]).join(", ")}
                .label=${"motion, door, security, person"}
                @input=${e=>this._setNested("filters","categories",this._csvToArray(e.target.value))}
              ></ha-textfield>
            </div>
            <div class="field">
              <label>Severities</label>
              <div class="severity-checks">
                ${["critical","warning","info","debug"].map(t=>{const i=(e.filters?.severities??[]).includes(t);return B`
                    <label class="check-label">
                      <input type="checkbox" .checked=${i} @change=${e=>this._toggleSeverityFilter(t,e.target.checked)} />
                      <span>${t.charAt(0).toUpperCase()+t.slice(1)}</span>
                    </label>
                  `})}
              </div>
            </div>
            <div class="field">
              <label>Sources (comma-separated)</label>
              <ha-textfield
                .value=${(e.filters?.sources??[]).join(", ")}
                .label=${"Frigate, Front Door History"}
                @input=${e=>this._setNested("filters","sources",this._csvToArray(e.target.value))}
              ></ha-textfield>
            </div>
            <div class="field">
              <label>Filter Entities</label>
              ${(e.filters?.entities??[]).map((e,t)=>B`
                <div class="row" style="margin-bottom: 4px; align-items: center;">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${e}
                    allow-custom-entity
                    @value-changed=${e=>this._updateFilterEntity(t,e.detail.value)}
                    style="flex: 1;"
                  ></ha-entity-picker>
                  <button
                    class="remove-entity-btn"
                    @click=${()=>this._removeFilterEntity(t)}
                    title="Remove entity"
                    style="border: none; background: none; color: var(--error-color, #db4437); cursor: pointer; font-size: 18px; padding: 4px 8px; flex-shrink: 0;"
                  >&#x2715;</button>
                </div>
              `)}
              <ha-entity-picker
                .hass=${this.hass}
                .value=${""}
                allow-custom-entity
                @value-changed=${e=>this._addFilterEntity(e.detail.value)}
              ></ha-entity-picker>
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
                @selected=${e=>this._setNested("grouping","group_by",e.detail.value)}
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
    `}_set(e,t){this._config={...this._config,[e]:t},this._fire()}_setNested(e,t,i){const r=this._config[e]??{};this._config={...this._config,[e]:{...r,[t]:i}},this._fire()}_setSeverityColor(e,t){const i=this._config.appearance?.severity_colors??{};this._setNested("appearance","severity_colors",{...i,[e]:t})}_csvToArray(e){const t=e.trim();return t?t.split(",").map(e=>e.trim()).filter(Boolean):[]}_addFilterEntity(e){if(!e)return;const t=[...this._config.filters?.entities??[]];t.includes(e)||(t.push(e),this._setNested("filters","entities",t))}_removeFilterEntity(e){const t=[...this._config.filters?.entities??[]];t.splice(e,1),this._setNested("filters","entities",t)}_updateFilterEntity(e,t){const i=[...this._config.filters?.entities??[]];t?i[e]=t:i.splice(e,1),this._setNested("filters","entities",i)}_toggleSeverityFilter(e,t){const i=[...this._config.filters?.severities??[]];if(t&&!i.includes(e))i.push(e);else if(!t){const t=i.indexOf(e);t>=0&&i.splice(t,1)}this._setNested("filters","severities",i)}_addSource(e){const t=[...this._config.sources??[],{type:e,name:{calendar:"Calendar",rest:"REST API",history:"History",static:"Static"}[e]}];this._config={...this._config,sources:t},this._fire()}_onSourceChanged(e){const{index:t,key:i,value:r}=e.detail,a=[...this._config.sources??[]];a[t]={...a[t],[i]:r},this._config={...this._config,sources:a},this._fire()}_onSourceRemoved(e){const{index:t}=e.detail,i=[...this._config.sources??[]];i.splice(t,1),this._config={...this._config,sources:i},this._fire()}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:this._config}}))}};tt.styles=s`
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
    input[type="checkbox"] {
      width: auto;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
    ha-textfield {
      display: block;
      width: 100%;
    }
    ha-select {
      display: block;
      width: 100%;
    }
    ha-entity-picker {
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

    .severity-checks {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .check-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: var(--primary-text-color, #333);
      cursor: pointer;
      text-transform: none;
      letter-spacing: 0;
      font-weight: 400;
    }
    .check-label input[type="checkbox"] {
      cursor: pointer;
    }
  `,e([he({attribute:!1})],tt.prototype,"hass",void 0),e([ue()],tt.prototype,"_config",void 0),tt=e([ce("chronicle-card-editor")],tt);const it=window;it.customCards=it.customCards||[],it.customCards.push({type:"chronicle-card",name:"Chronicle Card",description:"A universal, extensible timeline card for Home Assistant",preview:!0,documentationURL:"https://github.com/chronicle-card/chronicle-card"}),console.info("%c CHRONICLE-CARD %c v1.8.1 ","color: #fff; background: #2196F3; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #2196F3; background: #e3f2fd; font-weight: 500; padding: 2px 6px; border-radius: 0 4px 4px 0;");
