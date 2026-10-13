function e(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(i,e,o)},s=(e,o)=>{if(i)e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of o){const o=document.createElement("style"),r=t.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,e.appendChild(o)}},c=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,g=globalThis,f=g.trustedTypes,y=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&d(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:r}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const n=o?.call(this);r?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=o;const n=r.fromAttribute(t,e.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(e,t,i,o=!1,r){if(void 0!==e){const n=this.constructor;if(!1===o&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??x)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==r||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,v?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,A=e=>e,S=k.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+I,T=`<${z}>`,D=document,O=()=>D.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,j="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,M=/>/g,L=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,G=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),q=new WeakMap,V=D.createTreeWalker(D,129);function J(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,o=[];let r,n=2===t?"<svg>":3===t?"<math>":"",a=F;for(let t=0;t<i;t++){const i=e[t];let s,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===F?"!--"===c[1]?a=N:void 0!==c[1]?a=M:void 0!==c[2]?(B.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=L):void 0!==c[3]&&(a=L):a===L?">"===c[0]?(a=r??F,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,s=c[1],a=void 0===c[3]?L:'"'===c[3]?H:R):a===H||a===R?a=L:a===N||a===M?a=F:(a=L,r=void 0);const h=a===L&&e[t+1].startsWith("/>")?" ":"";n+=a===F?i+T:l>=0?(o.push(s),i.slice(0,l)+C+i.slice(l)+I+h):i+I+(-2===l?t:h)}return[J(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Z{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0;const a=e.length-1,s=this.parts,[c,l]=Y(e,t);if(this.el=Z.createElement(c,i),V.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=V.nextNode())&&s.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(C)){const t=l[n++],i=o.getAttribute(e).split(I),a=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?oe:"@"===a[1]?re:te}),o.removeAttribute(e)}else e.startsWith(I)&&(s.push({type:6,index:r}),o.removeAttribute(e));if(B.test(o.tagName)){const e=o.textContent.split(I),t=e.length-1;if(t>0){o.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],O()),V.nextNode(),s.push({type:2,index:++r});o.append(e[t],O())}}}else if(8===o.nodeType)if(o.data===z)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(I,e+1));)s.push({type:7,index:r}),e+=I.length-1}r++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,o){if(t===W)return t;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const n=P(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,o)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??D).importNode(t,!0);V.currentNode=o;let r=V.nextNode(),n=0,a=0,s=i[0];for(;void 0!==s;){if(n===s.index){let t;2===s.type?t=new ee(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new ne(r,this,e)),this._$AV.push(t),s=i[++a]}n!==s?.index&&(r=V.nextNode(),n++)}return V.currentNode=D,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),P(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Q(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new ee(this.O(O()),this.O(O()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(e,t=this,i,o){const r=this.strings;let n=!1;if(void 0===r)e=X(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==W,n&&(this._$AH=e);else{const o=e;let a,s;for(e=r[0],a=0;a<r.length-1;a++)s=X(this,o[i+a],t,a),s===W&&(s=this._$AH[a]),n||=!P(s)||s!==this._$AH[a],s===K?e=K:e!==K&&(e+=(s??"")+r[a+1]),this._$AH[a]=s}n&&!o&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class oe extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class re extends te{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??K)===W)return;const i=this._$AH,o=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==K&&(i===K||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(Z,ee),(k.litHtmlVersions??=[]).push("3.3.2");const se=(e,t,i)=>{const o=i?.renderBefore??t;let r=o._$litPart$;if(void 0===r){const e=i?.renderBefore??null;o._$litPart$=r=new ee(t.insertBefore(O(),e),e,void 0,i??{})}return r._$AI(e),r},ce=globalThis;class le extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}le._$litElement$=!0,le.finalized=!0,ce.litElementHydrateSupport?.({LitElement:le});const de=ce.litElementPolyfillSupport;de?.({LitElement:le}),(ce.litElementVersions??=[]).push("4.2.2");const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:x},ue=(e=pe,t,i)=>{const{kind:o,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,r,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];t.call(this,i),this.requestUpdate(o,r,e,!0,i)}}throw Error("Unsupported decorator location: "+o)};function me(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return me({...e,state:!0,attribute:!1})}function fe(e,t){return(t,i,o)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}const ye={layout:"vertical",show_layout_toggle:!0,max_events:50,days_back:7,days_forward:0,show_header:!0,filters:{categories:[],severities:[],sources:[],entities:[],search:"",exclude_categories:[],exclude_severities:[],exclude_sources:[],exclude_entities:[],exclude_search:""},grouping:{enabled:!0,window_seconds:120,min_group_size:3,group_by:"category"},appearance:{card_height:"400px",compact:!1,show_images:!0,show_icons:!0,show_severity_badge:!0,show_category:!0,animate_new_events:!0,severity_colors:{critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"}}};function ve(e){return"events"in e&&Array.isArray(e.events)}const be={critical:"#D32F2F",warning:"#FF9800",info:"#2196F3",debug:"#9E9E9E"},_e={person:"mdi:walk",vehicle:"mdi:car",animal:"mdi:paw",pet:"mdi:paw",security:"mdi:shield-home",motion:"mdi:motion-sensor",door:"mdi:door",lock:"mdi:lock",camera:"mdi:cctv",light:"mdi:lightbulb",climate:"mdi:thermostat",automation:"mdi:robot",system:"mdi:cog",default:"mdi:calendar-clock"},xe={person:"#FF9800",vehicle:"#2196F3",animal:"#43A047",pet:"#43A047",security:"#F44336",motion:"#9C27B0",door:"#795548",lock:"#607D8B",camera:"#FF5722",light:"#FFC107",climate:"#00BCD4",automation:"#3F51B5",system:"#9E9E9E",default:"#78909C"},we="chronicle-card",$e="chronicle-card-editor",ke=108e5,Ae=[[["cat","kitten","feline"],"mdi:cat"],[["dog","puppy","canine"],"mdi:dog"],[["bird","robin","crow","pigeon","sparrow"],"mdi:bird"],[["fish","aquarium"],"mdi:fish"],[["rabbit","bunny"],"mdi:rabbit"],[["horse","pony"],"mdi:horse"],[["snake","reptile","lizard"],"mdi:snake"],[["bear"],"mdi:paw"],[["deer"],"mdi:deer"],[["insect","bug","spider","bee","wasp"],"mdi:bee"],[["animal","pet","wildlife"],"mdi:paw"],[["person","human","people","visitor","guest","face"],"mdi:walk"],[["baby","infant","child","kid"],"mdi:baby-face-outline"],[["meeting","appointment","interview"],"mdi:account-group"],[["car","automobile","sedan"],"mdi:car"],[["truck","lorry"],"mdi:truck"],[["motorcycle","motorbike","bike","bicycle"],"mdi:bike"],[["bus","transit"],"mdi:bus"],[["boat","ship"],"mdi:sail-boat"],[["airplane","plane","flight"],"mdi:airplane"],[["vehicle","transport"],"mdi:car"],[["package","parcel","delivery","mail","post","courier"],"mdi:package-variant-closed"],[["amazon"],"mdi:package-variant-closed"],[["alarm","alert","intrusion","break-in","breach"],"mdi:alarm-light"],[["security","surveillance","guard"],"mdi:shield-home"],[["smoke","fire","flame"],"mdi:fire"],[["flood","water leak","leak"],"mdi:water-alert"],[["co2","carbon monoxide","gas"],"mdi:molecule-co2"],[["doorbell","ring","knock"],"mdi:doorbell"],[["door","gate","entry","entrance","exit"],"mdi:door"],[["lock","unlock","locked","unlocked"],"mdi:lock"],[["window"],"mdi:window-closed-variant"],[["garage"],"mdi:garage"],[["motion","movement","activity","detected"],"mdi:motion-sensor"],[["camera","cctv","snapshot","recording","footage","clip"],"mdi:cctv"],[["light","lamp","bulb","lighting","illumin"],"mdi:lightbulb"],[["temperature","temp","thermostat","hvac","heat","cool"],"mdi:thermostat"],[["weather","rain","snow","storm","wind","sunny","cloud"],"mdi:weather-partly-cloudy"],[["humidity","moisture"],"mdi:water-percent"],[["vacuum","roomba","clean"],"mdi:robot-vacuum"],[["washer","laundry","wash"],"mdi:washing-machine"],[["dryer"],"mdi:tumble-dryer"],[["dishwasher","dishes"],"mdi:dishwasher"],[["oven","stove","cook","bake"],"mdi:stove"],[["fridge","refrigerator","freezer"],"mdi:fridge"],[["microwave"],"mdi:microwave"],[["coffee","espresso"],"mdi:coffee"],[["music","song","audio","speaker","playing"],"mdi:music"],[["tv","television","movie","video","stream","netflix","plex"],"mdi:television"],[["gaming","game","playstation","xbox","nintendo"],"mdi:gamepad-variant"],[["3d print","printer","bambu","print job","filament"],"mdi:printer-3d-nozzle"],[["health","heart","blood","medical","medicine"],"mdi:heart-pulse"],[["sleep","bedtime","nap"],"mdi:sleep"],[["workout","exercise","fitness","run","walk","step"],"mdi:run"],[["birthday","anniversary"],"mdi:cake-variant"],[["holiday","vacation","day off"],"mdi:beach"],[["reminder","todo","task"],"mdi:bell-ring"],[["calendar","event","schedule"],"mdi:calendar"],[["update","upgrade","firmware"],"mdi:update"],[["restart","reboot","reset"],"mdi:restart"],[["backup","snapshot"],"mdi:backup-restore"],[["error","fail","crash"],"mdi:alert-circle"],[["automation","script","routine","workflow"],"mdi:robot"],[["battery","charge","power"],"mdi:battery"],[["wifi","network","internet","connect"],"mdi:wifi"],[["bluetooth"],"mdi:bluetooth"],[["system","server","maintenance"],"mdi:cog"],[["solar","panel"],"mdi:solar-power"],[["energy","electricity","power","watt","kwh"],"mdi:flash"],[["water","irrigation","sprinkler"],"mdi:water"],[["gas","natural gas","propane"],"mdi:gas-cylinder"],[["trash","garbage","waste","bin","recycl"],"mdi:trash-can"],[["litter","litter box","kitty litter"],"mdi:cat"],[["food","feed","meal","eat","dinner","lunch","breakfast"],"mdi:food"],[["plant","garden","flower","grow"],"mdi:flower"],[["filter","air filter","hvac filter"],"mdi:air-filter"]],Se=[[["cat","kitten","feline"],"#7f41eb"],[["dog","puppy","canine"],"#8D6E63"],[["bird"],"#4CAF50"],[["animal","pet","wildlife"],"#43A047"],[["person","human","people","visitor","guest","face"],"#FF9800"],[["car","truck","vehicle","automobile","motorcycle"],"#2196F3"],[["package","delivery","mail","amazon"],"#795548"],[["alarm","alert","security","smoke","fire","intrusion"],"#F44336"],[["door","gate","lock","window","garage"],"#795548"],[["doorbell","ring","knock"],"#FF5722"],[["motion","movement","detected"],"#9C27B0"],[["camera","cctv","snapshot"],"#FF5722"],[["light","lamp","bulb"],"#FFC107"],[["temperature","thermostat","hvac","climate"],"#00BCD4"],[["weather"],"#42A5F5"],[["automation","script","routine"],"#3F51B5"],[["error","fail","crash"],"#D32F2F"],[["system","update","restart","maintenance"],"#9E9E9E"],[["trash","garbage","waste"],"#78909C"],[["plant","garden","flower"],"#4CAF50"],[["3d print","printer","bambu"],"#00ACC1"]];function Ee(e,t){const i=e.toLowerCase();for(const[e,o]of t)if(e.some(e=>i.includes(e)))return o}function Ce(e,t,i,o,r){if(o){const r=[e,t,i].filter(Boolean).join(" ").toLowerCase();for(const[e,t]of Object.entries(o))if(r.includes(e.toLowerCase()))return t}const n=function(e,t,i){return Ee([e,t,i].filter(Boolean).join(" "),Ae)}(e,t,i);return n||(r||(_e[t]?_e[t]:_e.default))}function Ie(e,t,i,o,r){if(o){const r=[e,t,i].filter(Boolean).join(" ").toLowerCase();for(const[e,t]of Object.entries(o))if(r.includes(e.toLowerCase()))return t}if(r)return r;const n=function(e,t,i){return Ee([e,t,i].filter(Boolean).join(" "),Se)}(e,t,i);return n||(xe[t]?xe[t]:xe.default)}function ze(e,t){return e?"string"==typeof e?e:e.dateTime||e.date||t:t}function Te(e,t){const i=t.split(".");let o=e;for(const e of i){if(null==o||"object"!=typeof o)return;o=o[e]}return o}function De(e){if(!e&&0!==e)return"";const t=String(e),i=Number(e);return!isNaN(i)&&i>1e9&&i<1e13?new Date(1e3*i).toISOString():t}const Oe=e=>new Date(1e3*e).toISOString(),Pe=new Set(["unavailable","unknown"]),Ue={door:"door",opening:"door",garage_door:"door",window:"door",lock:"lock",motion:"motion",occupancy:"motion",presence:"person",vibration:"motion",smoke:"security",gas:"security",co:"security",moisture:"climate",heat:"climate",cold:"climate",tamper:"security",safety:"security",problem:"system",connectivity:"system",battery:"system",power:"system",plug:"system",running:"system",sound:"motion",light:"light"},je={person:"person",device_tracker:"person",sensor:"system",light:"light",switch:"automation",lock:"lock",cover:"door",climate:"climate",camera:"camera",alarm_control_panel:"security",automation:"automation",vacuum:"automation",media_player:"system",fan:"climate"};let Fe={language:void 0,hour12:void 0,timeZone:void 0};const Ne=new Map;function Me(e){try{return new Intl.DateTimeFormat(e),e}catch{return}}function Le(e,t,i=!1){let o=Ne.get(e);if(!o){const r=i?"en-US":Fe.language;try{o=new Intl.DateTimeFormat(r,{timeZone:Fe.timeZone,...t})}catch{o=new Intl.DateTimeFormat(r,t)}Ne.set(e,o)}return o}function Re(e){if(e instanceof Date)return isNaN(e.getTime())?new Date:e;const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e),i=t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3])):new Date(e);return isNaN(i.getTime())?new Date:i}function He(e){return Re(e).getTime()}function Be(e){return Le("time",{hour:"numeric",minute:"2-digit",hour12:Fe.hour12}).format(Re(e))}function Ge(e){return Le("datetime",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:Fe.hour12}).format(Re(e))}function We(e){return Le("date",{weekday:"short",month:"short",day:"numeric"}).format(e)}function Ke(e){const t=Le("key",{year:"numeric",month:"2-digit",day:"2-digit"},!0).formatToParts(Re(e)),i=e=>t.find(t=>t.type===e)?.value;return`${i("year")}-${i("month")}-${i("day")}`}function qe(e,t){const i=e=>{const[t,i,o]=e.split("-").map(Number);return Date.UTC(t,i-1,o)};return Math.round((i(t)-i(e))/864e5)}function Ve(){return new Intl.RelativeTimeFormat(Fe.language,{numeric:"auto"})}function Je(e){const t=Re(e),i=qe(Ke(new Date),Ke(t));if(Math.abs(i)<=1){const e=Ve().format(i,"day");return e.charAt(0).toLocaleUpperCase()+e.slice(1)}return We(t)}function Ye(e){const t=Re(e),i=Math.round((t.getTime()-Date.now())/1e3),o=Ve();if(Math.abs(i)<60)return o.format(0,"second");if(Math.abs(i)<3600)return o.format(Math.trunc(i/60),"minute");const r=qe(Ke(new Date),Ke(t));return 0===r?o.format(Math.trunc(i/3600),"hour"):1===Math.abs(r)?o.format(r,"day"):We(t)}function Ze(e){if(!Fe.timeZone)return 6e4*-new Date(e).getTimezoneOffset();const t=Le("offset",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hourCycle:"h23"},!0).formatToParts(new Date(e)),i=e=>Number(t.find(t=>t.type===e)?.value);return Date.UTC(i("year"),i("month")-1,i("day"),i("hour"),i("minute"),i("second"))-1e3*Math.floor(e/1e3)}function Xe(e){const[t,i,o]=Ke(new Date).split("-").map(Number),r=Date.UTC(t,i-1,o+e);let n=r-Ze(r);return n=r-Ze(n),new Date(n)}const Qe={person:"person",device_tracker:"person",light:"light",switch:"automation",lock:"lock",cover:"door",climate:"climate",camera:"camera",alarm_control_panel:"security",automation:"automation",script:"automation",scene:"automation",vacuum:"automation",media_player:"system",fan:"climate",sensor:"system"};const et=new class{constructor(){this.registry=new Map}register(e,t){this.registry.set(e,t)}create(e){const t=this.registry.get(e);if(!t)throw new Error(`[chronicle-card] Unknown adapter type: "${e}". Available types: ${Array.from(this.registry.keys()).join(", ")}`);return new t}has(e){return this.registry.has(e)}types(){return Array.from(this.registry.keys())}};et.register("calendar",class{constructor(){this.type="calendar"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.entity;if(!i)return console.warn("[chronicle-card] CalendarAdapter: no entity configured"),[];try{const o=t.start.toISOString(),r=t.end.toISOString(),n=`calendars/${i}?start=${encodeURIComponent(o)}&end=${encodeURIComponent(r)}`,a=await e.callApi("GET",n);return Array.isArray(a)?a.map(t=>{const n=t.summary||"Untitled Event",a=t.description||"",s=function(e){const t=(e||"").toLowerCase(),i={person:["person","visitor","guest","meeting","appointment"],vehicle:["vehicle","car","delivery","parking"],security:["security","alarm","alert"],motion:["motion","movement"],pet:["pet","cat","dog","animal"],automation:["automation","script","routine"],system:["system","update","maintenance","restart"],climate:["climate","temperature","hvac","weather"],light:["light","lamp","lighting"]};for(const[e,o]of Object.entries(i))if(o.some(e=>t.includes(e)))return e;return"default"}(`${n} ${a}`),c=ze(t.start,o),l=t.uid||function(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return Math.abs(t).toString(36)}(`${n}:${c}`);return{id:`calendar:${i}:${l}`,sourceType:"calendar",sourceId:this.config.name||i,title:n,description:a,start:c,end:ze(t.end,r),icon:Ce(n,s,void 0,this.config.icon_map,this.config.default_icon),color:Ie(n,s,void 0,this.config.color_map,this.config.default_color),category:s,severity:this.config.default_severity||"info",entityId:i,entityName:e.states[i]?.attributes?.friendly_name||i,actions:this.config.actions,tapAction:this.config.tap_action,holdAction:this.config.hold_action,metadata:{location:t.location,recurrence_id:t.recurrence_id,uid:t.uid}}}):(console.warn("[chronicle-card] CalendarAdapter: unexpected response format"),[])}catch(e){return console.warn("[chronicle-card] CalendarAdapter: failed to fetch events",e),[]}}}),et.register("rest",class{constructor(){this.type="rest"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.ws_params,o=this.config.url;if(!o&&!i)return console.warn("[chronicle-card] RestAdapter: no url or ws_params configured"),[];try{let t,r;if(i){const o={...i};"string"==typeof o.type&&o.type.startsWith("frigate/")&&!o.instance_id&&(o.instance_id="frigate");const r=await e.callWS(o);t="string"==typeof r?JSON.parse(r):r}else if(function(e){return!e.startsWith("http://")&&!e.startsWith("https://")}(o)){const i=o.replace(/^\/api\//,"").replace(/^\/+/,"");t=await e.callApi("GET",i)}else{const e=await fetch(o);if(!e.ok)return console.warn(`[chronicle-card] RestAdapter: HTTP ${e.status} from ${o}`),[];const i=await e.text();try{t=JSON.parse(i)}catch{const e=i.split("\n").filter(e=>e.trim());if(!(e.length>0))throw new Error("Response is not valid JSON or NDJSON");t=e.map(e=>JSON.parse(e))}}if(this.config.response_path){const e=Te(t,this.config.response_path);if(!Array.isArray(e))return console.warn("[chronicle-card] RestAdapter: response_path did not resolve to an array"),[];r=e}else{if(!Array.isArray(t))return console.warn("[chronicle-card] RestAdapter: response is not an array and no response_path configured"),[];r=t}return r.map((e,t)=>this.mapItem(e,t))}catch(e){return console.warn("[chronicle-card] RestAdapter: failed to fetch events",e),[]}}classifyMedia(e){return e?e.startsWith("/media/")?{mediaContentId:`media-source://media_source/local/${e.slice(7)}`}:{mediaUrl:e}:{}}expandTemplate(e,t){return e.replace(/\{(\w+)\}/g,(e,i)=>{const o=t[i];return null!=o?String(o):""})}mapItem(e,t){const i=this.config.field_map||{},o=(t,o="")=>{const r=i[t];if(r){const t=r.includes(".")?Te(e,r):e[r];if(void 0!==t)return t}return void 0!==e[t]?e[t]:o},r=String(o("id",t)),n=String(o("title","Untitled")),a=String(o("category","default")),s=o("label",void 0);let c=o("mediaUrl",void 0);this.config.media_url_template&&(c=this.expandTemplate(this.config.media_url_template,e));const l=o("mediaContentId",void 0),d=this.classifyMedia(c),h=o("icon",void 0),p=o("color",void 0);return{id:`rest:${this.config.url||this.config.name||"ws"}:${r}`,sourceType:"rest",sourceId:this.config.name||this.config.url||"rest",title:n,description:String(o("description","")),start:De(o("start",(new Date).toISOString())),end:De(o("end","")),mediaUrl:d.mediaUrl,mediaContentId:l||d.mediaContentId,icon:h||Ce(n,a,s,this.config.icon_map,this.config.default_icon),color:p||Ie(n,a,s,this.config.color_map,this.config.default_color),category:a,label:s,severity:o("severity",this.config.default_severity||"info"),entityId:o("entityId",void 0),entityName:o("entityName",void 0),actions:this.config.actions,tapAction:this.config.tap_action,holdAction:this.config.hold_action,metadata:{source_url:this.config.url,raw_index:t,raw_id:r,...this.config.clip_url_template?{clip_url:this.expandTemplate(this.config.clip_url_template,e)}:{},...o("metadata",void 0)||{}}}}}),et.register("history",class{constructor(){this.type="history"}configure(e){this.config=e}getEntities(){const e=[];return this.config.entities?.length&&e.push(...this.config.entities),this.config.entity&&!e.includes(this.config.entity)&&e.push(this.config.entity),e}getStateFilter(e){const t=this.config.entity_config?.[e]?.state_filter;return t?.length?new Set(t.map(e=>e.toLowerCase())):this.config.state_filter?.length?new Set(this.config.state_filter.map(e=>e.toLowerCase())):null}needsAttributes(){const e=Object.values(this.config.entity_config??{});return!!(this.config.image_template||this.config.clip_template||this.config.show_attributes?.length||e.some(e=>e.image_template||e.clip_template||e.show_attributes?.length))}isTransition(e,t,i){if(null==i.state||null==t.state)return!1;if(t.state===i.state)return!1;if(Pe.has(i.state)||Pe.has(t.state))return!1;const o=this.getStateFilter(e);return!o||o.has(i.state.toLowerCase())}async fetchEvents(e,t){const i=this.getEntities();if(0===i.length)return console.warn("[chronicle-card] HistoryAdapter: no entities configured"),[];try{const o=this.needsAttributes(),r=Math.min(t.end.getTime(),Date.now()),n=await e.callWS({type:"history/history_during_period",start_time:t.start.toISOString(),end_time:new Date(r).toISOString(),entity_ids:i,minimal_response:!o,no_attributes:!o,significant_changes_only:!0});if(!n||"object"!=typeof n)return console.warn("[chronicle-card] HistoryAdapter: unexpected response format"),[];const a=[];for(const[t,i]of Object.entries(n)){if(!Array.isArray(i))continue;let o;for(const r of i){const i=Oe(r.lc??r.lu),n={entity_id:t,state:r.s,attributes:r.a??o?.attributes,last_changed:i,last_updated:Oe(r.lu)};o&&this.isTransition(t,o,n)&&a.push(this.stateChangeToEvent(e,t,o,n)),o=n}}return a}catch(e){return console.warn("[chronicle-card] HistoryAdapter: failed to fetch events",e),[]}}processStateChanges(e,t){const i=[];for(const o of this.getEntities()){const r=e.states[o],n=t.states[o];r&&n&&r!==n&&(this.isTransition(o,n,r)&&i.push(this.stateChangeToEvent(e,o,n,r)))}return i}getDeviceClass(e,t,i){const o=e.states[t];return o?.attributes?.device_class?String(o.attributes.device_class):i.attributes?.device_class?String(i.attributes.device_class):""}humanizeState(e,t,i){const o=t.entity_id,r=this.config.entity_config?.[o]?.state_map?.[i]??this.config.state_map?.[i];if(r)return r;if(e.formatEntityState)try{return e.formatEntityState(t,i)}catch{}return i.charAt(0).toUpperCase()+i.slice(1).replace(/_/g," ")}detectCategory(e,t){const i=e.split(".")[0];return"binary_sensor"===i&&t?Ue[t]||"default":je[i]||"default"}stripOverlap(e,t){const i=e.toLowerCase().split(/\s+/),o=t.split(/\s+/),r=o.map(e=>e.toLowerCase());for(let e=Math.min(i.length,r.length);e>0;e--){const n=i.slice(-e),a=r.slice(0,e);if(n.every((e,t)=>e===a[t])){return o.slice(e).join(" ")||t}}return t}formatAttributes(e,t,i,o){return i.map(i=>{const r=o[i];if(null==r||""===r||"object"==typeof r)return null;const n=e.formatEntityAttributeName?.(t,i)??i.replace(/_/g," ");let a;try{a=e.formatEntityAttributeValue?.(t,i,r)??String(r)}catch{a=String(r)}return`${n}: ${a}`}).filter(Boolean).join(" · ")}stateChangeToEvent(e,t,i,o){const r=this.getDeviceClass(e,t,o),n=this.detectCategory(t,r),a=e.states[t],s=a?.attributes?.friendly_name||t,c=this.config.entity_config?.[t],l=this.getEntities().length>1,d=c?.name||(l?s:this.config.name||s),h={...a?.attributes??{},...o.attributes??{}},p=a??{entity_id:t,state:o.state,attributes:h,last_changed:o.last_changed,last_updated:o.last_updated},u=this.humanizeState(e,p,o.state),m=this.humanizeState(e,p,i.state),g=`${d} ${this.stripOverlap(d,u)}`,f=`${this.stripOverlap(d,m)} → ${this.stripOverlap(d,u)}`,y=c?.show_attributes??this.config.show_attributes,v=y?.length?this.formatAttributes(e,p,y,h):"",b=c?.state_icon?.[o.state]||this.config.state_icon?.[o.state]||c?.icon||Ce(g,n,void 0,this.config.icon_map,this.config.default_icon),_=c?.state_color?.[o.state]||this.config.state_color?.[o.state]||c?.color||Ie(g,n,void 0,this.config.color_map,this.config.default_color),x=c?.severity||this.config.default_severity||"info",w=new Date(o.last_changed).toISOString();return{id:`history:${t}:${new Date(w).getTime()}`,sourceType:"history",sourceId:this.config.name||"history",title:g,description:f,details:v||void 0,start:w,end:w,icon:b,color:_,category:n,severity:x,entityId:t,actions:this.config.actions,tapAction:c?.tap_action||this.config.tap_action,holdAction:c?.hold_action||this.config.hold_action,metadata:{old_state:i.state,new_state:o.state,old_label:m,new_label:u,device_class:r,last_updated:o.last_updated,attributes:h,source_name:this.config.name||"history",_image_template:c?.image_template||this.config.image_template,_clip_template:c?.clip_template||this.config.clip_template}}}}),et.register("static",class{constructor(){this.type="static"}configure(e){this.config=e}async fetchEvents(e,t){const i=this.config.events;if(!i||0===i.length)return console.warn("[chronicle-card] StaticAdapter: no events configured"),[];try{const e=this.config.name||"static";return i.map((i,o)=>{const r=i.category||"default",n=Re(i.start);return(i.end?Re(i.end):n)<t.start||n>t.end?null:{id:`static:${e}:${o}`,sourceType:"static",sourceId:e,title:i.title,description:i.description||"",start:i.start,end:i.end||i.start,icon:i.icon||this.config.default_icon||_e[r]||_e.default,color:i.color||this.config.default_color||xe[r]||xe.default,category:r,severity:i.severity||this.config.default_severity||"info",actions:this.config.actions,tapAction:this.config.tap_action,holdAction:this.config.hold_action,metadata:{static_index:o}}}).filter(e=>null!==e)}catch(e){return console.warn("[chronicle-card] StaticAdapter: failed to process events",e),[]}}}),et.register("logbook",class{constructor(){this.type="logbook"}configure(e){this.config=e}getEntities(){const e=[];return this.config.entities?.length&&e.push(...this.config.entities),this.config.entity&&!e.includes(this.config.entity)&&e.push(this.config.entity),e}async fetchEvents(e,t){const i=this.getEntities();if(0===i.length)return console.warn("[chronicle-card] LogbookAdapter: no entities configured"),[];try{const o=await e.callWS({type:"logbook/get_events",start_time:t.start.toISOString(),end_time:new Date(Math.min(t.end.getTime(),Date.now())).toISOString(),entity_ids:i});return Array.isArray(o)?o.filter(e=>e&&null!=e.when).map(t=>this.entryToEvent(e,t)):[]}catch(e){return console.warn("[chronicle-card] LogbookAdapter: failed to fetch events",e),[]}}whenToISO(e){if("string"==typeof e){const t=new Date(e);return isNaN(t.getTime())?(new Date).toISOString():t.toISOString()}return new Date(e>1e12?e:1e3*e).toISOString()}entryToEvent(e,t){const i=t.entity_id,o=t.domain||i?.split(".")[0]||"",r=Qe[o]||"default",n=i?this.config.entity_config?.[i]:void 0,a=i?e.states[i]?.attributes?.friendly_name:void 0,s=n?.name||t.name||a||i||"Logbook",c=t.message||(t.state?`→ ${t.state}`:""),l=c?`${s} ${c}`:s,d=this.whenToISO(t.when),h=n?.icon||t.icon||Ce(l,r,void 0,this.config.icon_map,this.config.default_icon),p=n?.color||Ie(l,r,void 0,this.config.color_map,this.config.default_color),u=n?.severity||this.config.default_severity||"info";return{id:`logbook:${i||o||"ha"}:${d}`,sourceType:"logbook",sourceId:this.config.name||"logbook",title:l,description:t.message||"",start:d,end:d,icon:h,color:p,category:r,severity:u,entityId:i,entityName:s,actions:this.config.actions,tapAction:n?.tap_action||this.config.tap_action,holdAction:n?.hold_action||this.config.hold_action,metadata:{domain:o,state:t.state,context_service:t.context_service,context_event_type:t.context_event_type,source_name:this.config.name||"logbook"}}}});const tt={en:{"chronicle.no_events":"No events","chronicle.group_events":"{count} {label} events","chronicle.detail.more_info":"More Info","chronicle.detail.entity":"Entity","chronicle.detail.entity_id":"Entity ID","chronicle.detail.source":"Source","chronicle.detail.start":"Start","chronicle.detail.end":"End","chronicle.detail.location":"Location","chronicle.detail.open_clip":"Open clip","chronicle.detail.close":"Close","chronicle.severity.critical":"Critical","chronicle.severity.warning":"Warning","chronicle.severity.info":"Info","chronicle.severity.debug":"Debug"},de:{"chronicle.no_events":"Keine Ereignisse","chronicle.group_events":"{count} {label} Ereignisse","chronicle.detail.more_info":"Mehr Infos","chronicle.detail.entity":"Entität","chronicle.detail.entity_id":"Entitäts-ID","chronicle.detail.source":"Quelle","chronicle.detail.start":"Start","chronicle.detail.end":"Ende","chronicle.detail.location":"Ort","chronicle.detail.open_clip":"Clip öffnen","chronicle.detail.close":"Schließen","chronicle.severity.critical":"Kritisch","chronicle.severity.warning":"Warnung","chronicle.severity.info":"Info","chronicle.severity.debug":"Debug"},fr:{"chronicle.no_events":"Aucun événement","chronicle.group_events":"{count} événements {label}","chronicle.detail.more_info":"Plus d'infos","chronicle.detail.entity":"Entité","chronicle.detail.entity_id":"ID d'entité","chronicle.detail.source":"Source","chronicle.detail.start":"Début","chronicle.detail.end":"Fin","chronicle.detail.location":"Lieu","chronicle.detail.open_clip":"Ouvrir le clip","chronicle.detail.close":"Fermer","chronicle.severity.critical":"Critique","chronicle.severity.warning":"Avertissement","chronicle.severity.info":"Info","chronicle.severity.debug":"Débogage"},es:{"chronicle.no_events":"Sin eventos","chronicle.group_events":"{count} eventos de {label}","chronicle.detail.more_info":"Más información","chronicle.detail.entity":"Entidad","chronicle.detail.entity_id":"ID de entidad","chronicle.detail.source":"Fuente","chronicle.detail.start":"Inicio","chronicle.detail.end":"Fin","chronicle.detail.location":"Ubicación","chronicle.detail.open_clip":"Abrir clip","chronicle.detail.close":"Cerrar","chronicle.severity.critical":"Crítico","chronicle.severity.warning":"Advertencia","chronicle.severity.info":"Info","chronicle.severity.debug":"Depuración"},it:{"chronicle.no_events":"Nessun evento","chronicle.group_events":"{count} eventi {label}","chronicle.detail.more_info":"Maggiori info","chronicle.detail.entity":"Entità","chronicle.detail.entity_id":"ID entità","chronicle.detail.source":"Sorgente","chronicle.detail.start":"Inizio","chronicle.detail.end":"Fine","chronicle.detail.location":"Luogo","chronicle.detail.open_clip":"Apri clip","chronicle.detail.close":"Chiudi","chronicle.severity.critical":"Critico","chronicle.severity.warning":"Avviso","chronicle.severity.info":"Info","chronicle.severity.debug":"Debug"},pt:{"chronicle.no_events":"Sem eventos","chronicle.group_events":"{count} eventos de {label}","chronicle.detail.more_info":"Mais informações","chronicle.detail.entity":"Entidade","chronicle.detail.entity_id":"ID da entidade","chronicle.detail.source":"Fonte","chronicle.detail.start":"Início","chronicle.detail.end":"Fim","chronicle.detail.location":"Local","chronicle.detail.open_clip":"Abrir clipe","chronicle.detail.close":"Fechar","chronicle.severity.critical":"Crítico","chronicle.severity.warning":"Aviso","chronicle.severity.info":"Info","chronicle.severity.debug":"Depuração"},nl:{"chronicle.no_events":"Geen gebeurtenissen","chronicle.group_events":"{count} {label} gebeurtenissen","chronicle.detail.more_info":"Meer info","chronicle.detail.entity":"Entiteit","chronicle.detail.entity_id":"Entiteits-ID","chronicle.detail.source":"Bron","chronicle.detail.start":"Start","chronicle.detail.end":"Einde","chronicle.detail.location":"Locatie","chronicle.detail.open_clip":"Clip openen","chronicle.detail.close":"Sluiten","chronicle.severity.critical":"Kritiek","chronicle.severity.warning":"Waarschuwing","chronicle.severity.info":"Info","chronicle.severity.debug":"Debug"},sv:{"chronicle.no_events":"Inga händelser","chronicle.group_events":"{count} {label}-händelser","chronicle.detail.more_info":"Mer info","chronicle.detail.entity":"Entitet","chronicle.detail.entity_id":"Entitets-ID","chronicle.detail.source":"Källa","chronicle.detail.start":"Start","chronicle.detail.end":"Slut","chronicle.detail.location":"Plats","chronicle.detail.open_clip":"Öppna klipp","chronicle.detail.close":"Stäng","chronicle.severity.critical":"Kritisk","chronicle.severity.warning":"Varning","chronicle.severity.info":"Info","chronicle.severity.debug":"Felsökning"},pl:{"chronicle.no_events":"Brak zdarzeń","chronicle.group_events":"{count} zdarzeń: {label}","chronicle.detail.more_info":"Więcej informacji","chronicle.detail.entity":"Encja","chronicle.detail.entity_id":"ID encji","chronicle.detail.source":"Źródło","chronicle.detail.start":"Początek","chronicle.detail.end":"Koniec","chronicle.detail.location":"Lokalizacja","chronicle.detail.open_clip":"Otwórz klip","chronicle.detail.close":"Zamknij","chronicle.severity.critical":"Krytyczny","chronicle.severity.warning":"Ostrzeżenie","chronicle.severity.info":"Info","chronicle.severity.debug":"Debug"}};let it="en";function ot(e,t){const i=it,o=tt[i];if(o&&void 0!==o[e])return o[e];const r=i.split("-")[0];if(r!==i){const t=tt[r];if(t&&void 0!==t[e])return t[e]}const n=tt.en;return n&&void 0!==n[e]?n[e]:e}function rt(e){let t=e.events[0];for(const i of e.events)He(i.start)<He(t.start)&&(t=i);return t.id}function nt(e,t){if(!t.enabled||"none"===t.group_by||0===e.length)return[...e];const i=1e3*(t.window_seconds??120),o=t.min_group_size??3,r=t.group_by??"category",n=[];let a=[],s=null,c=null;const l=e=>{switch(r){case"category":return e.category;case"source":return`${e.sourceType}:${e.sourceId}`;case"entity":return e.entityId??"";default:return""}},d=e=>{const i=e.length,o=e[0];if(t.group_name)return t.group_name.replace(/\{count\}/g,String(i)).replace(/\{label\}/g,o.label||o.category||"").replace(/\{source\}/g,o.sourceId||"").replace(/\{entity\}/g,o.entityName||o.entityId||"");const n=e=>ot("chronicle.group_events").replace("{count}",String(i)).replace("{label}",e);switch(r){case"source":return n(o.sourceId);case"entity":return n(o.entityName||o.entityId||"entity")}const a=new Set(e.map(e=>e.label||e.category).filter(Boolean));return 1===a.size?n([...a][0]):n(o.category)},h=()=>{if(0!==a.length){if(a.length>=o){const e=a[0];n.push({representative:e,events:a,summary:d(a),expanded:!1})}else n.push(...a);a=[],s=null,c=null}};for(const t of e){const e=l(t),o=He(t.start);if(null===s){s=e,c=o,a.push(t);continue}const r=null!==c&&Math.abs(o-c)<=i;e===s&&r?(a.push(t),c=o):(h(),s=e,c=o,a.push(t))}return h(),n}const at=new Map;async function st(e,t){if(!t)return;const i=at.get(t);if(i&&Date.now()-i.timestamp<ke)return i.url;!function(){const e=Date.now();for(const[t,i]of at)e-i.timestamp>ke&&at.delete(t)}();try{const i=await e.callWS({type:"media_source/resolve_media",media_content_id:t});return i&&i.url?(at.set(t,{url:i.url,timestamp:Date.now()}),i.url):void 0}catch{return}}const ct=/\{[%{]/;function lt(e){return ct.test(e)}async function dt(e,t,i={}){return new Promise((o,r)=>{let n,a=!1;const s=setTimeout(()=>{a||(a=!0,n?.(),r(new Error("Template render timed out")))},5e3);e.connection.subscribeMessage(e=>{a||(a=!0,clearTimeout(s),n?.(),o(e.result))},{type:"render_template",template:t,variables:i,timeout:5}).then(e=>{n=e,a&&n()}).catch(e=>{a||(a=!0,clearTimeout(s),r(e))})})}function ht(e){if(e.name)return e.name;switch(e.type){case"calendar":return e.entity||"calendar";case"rest":return e.url||"rest";default:return e.type}}function pt(e){return He(ve(e)?e.representative.start:e.start)}function ut(e,t){return e.id===t.id||e.sourceType===t.sourceType&&e.entityId===t.entityId&&e.title===t.title&&Math.abs(He(e.start)-He(t.start))<1e3}const mt=(e,t)=>He(t.start)-He(e.start),gt=[{key:"_image_template",apply:(e,t)=>{e.mediaUrl=t},has:e=>!!e.mediaUrl},{key:"_clip_template",apply:(e,t)=>{e.metadata={...e.metadata,clip_url:t}},has:e=>!!e.metadata?.clip_url}],ft=new Map;class yt{constructor(){this.adapters=[],this.allEvents=[],this.filteredItems=[],this.lastFetch=0,this.lastHash="",this.listeners=new Set,this.fetchPromise=null,this.generation=0,this.expandedGroups=new Set,this.recentLive=new Map}get items(){return this.filteredItems}get events(){return this.allEvents}get pollInterval(){return(this.config?.sources??[]).reduce((e,t)=>Math.min(e,1e3*(t.poll_interval??30)),3e4)}configure(e){this.config=e,this.generation++,this.lastFetch=0,this.lastHash="",this.fetchPromise=null,this.recentLive.clear(),this.adapters=[];for(const t of e.sources??[])try{const e=et.create(t.type);e.configure(t),this.adapters.push(e)}catch(e){console.warn("[chronicle-card] Skipping source:",e)}this.allEvents.length&&this.applyFiltersAndGroup()}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){for(const e of this.listeners)e()}async fetch(e,t=!1){if(!this.config)return;if(!t&&Date.now()-this.lastFetch<this.pollInterval)return;if(this.fetchPromise)return this.fetchPromise;const i=this._doFetch(e,this.generation);this.fetchPromise=i;try{await i}finally{this.fetchPromise===i&&(this.fetchPromise=null)}}async _doFetch(e,t){this.lastFetch=Date.now();const i=function(e){const t=new Date,i=Math.max(0,e.days_back??ye.days_back??7),o=Math.max(0,e.days_forward??0);return{start:Number.isInteger(i)?Xe(-i):new Date(t.getTime()-864e5*i),end:0===o?t:Number.isInteger(o)?Xe(o+1):new Date(t.getTime()+864e5*o)}}(this.config),o=await Promise.allSettled(this.adapters.map(t=>t.fetchEvents(e,i))),r=[];for(const e of o)"fulfilled"===e.status?r.push(...e.value):console.warn("[chronicle-card] Adapter fetch failed:",e.reason);const n=new Set,a=[];for(const e of r)n.has(e.id)||(n.add(e.id),a.push(e));const s=Date.now();for(const[e,t]of this.recentLive)s-t.at>12e4||a.some(e=>ut(e,t.event))?this.recentLive.delete(e):(n.add(e),a.push(t.event));if(a.sort(mt),await this.resolveMedia(e,a),await this.resolveTemplates(e,a),t!==this.generation)return;const c=this.computeHash(a);c!==this.lastHash&&(this.allEvents=a,this.lastHash=c,this.applyFiltersAndGroup())}async processStateChanges(e,t){if(e.states===t.states)return;const i=this.generation,o=[];for(const i of this.adapters){const r=i.processStateChanges?.(e,t);r?.length&&o.push(...r)}const r=o.filter(e=>!this.allEvents.some(t=>ut(t,e)));if(0===r.length)return;if(await this.resolveMedia(e,r),await this.resolveTemplates(e,r),i!==this.generation)return;const n=r.filter(e=>!this.allEvents.some(t=>ut(t,e)));if(0!==n.length){for(const e of n)this.recentLive.set(e.id,{event:e,at:Date.now()});this.allEvents=[...n,...this.allEvents].sort(mt),this.lastHash=this.computeHash(this.allEvents),this.applyFiltersAndGroup()}}applyFiltersAndGroup(){let e=[...this.allEvents];const t=this.config.filters??{};if(t.categories&&t.categories.length>0){const i=new Set(t.categories);e=e.filter(e=>i.has(e.category))}if(t.severities&&t.severities.length>0){const i=new Set(t.severities);e=e.filter(e=>i.has(e.severity))}if(t.sources&&t.sources.length>0){const i=new Set(t.sources);e=e.filter(e=>i.has(e.sourceId)||i.has(e.sourceType))}if(t.entities&&t.entities.length>0){const i=new Set(t.entities);e=e.filter(e=>e.entityId&&i.has(e.entityId))}const i=(e,t)=>e.title.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)||e.category.toLowerCase().includes(t)||!(!e.label||!e.label.toLowerCase().includes(t));if(t.search&&t.search.trim().length>0){const o=t.search.toLowerCase().trim();e=e.filter(e=>i(e,o))}if(t.exclude_categories&&t.exclude_categories.length>0){const i=new Set(t.exclude_categories);e=e.filter(e=>!i.has(e.category))}if(t.exclude_severities&&t.exclude_severities.length>0){const i=new Set(t.exclude_severities);e=e.filter(e=>!i.has(e.severity))}if(t.exclude_sources&&t.exclude_sources.length>0){const i=new Set(t.exclude_sources);e=e.filter(e=>!i.has(e.sourceId)&&!i.has(e.sourceType))}if(t.exclude_entities&&t.exclude_entities.length>0){const i=new Set(t.exclude_entities);e=e.filter(e=>!e.entityId||!i.has(e.entityId))}if(t.exclude_search&&t.exclude_search.trim().length>0){const o=t.exclude_search.toLowerCase().trim();e=e.filter(e=>!i(e,o))}const o=this.config.max_events??ye.max_events??50;e.length>o&&(e=e.slice(0,o));const r={...ye.grouping,...this.config.grouping},n=new Map;for(const e of this.config.sources??[])e.grouping&&n.set(ht(e),{...r,...e.grouping});let a;if(0===n.size)a=nt(e,r);else{const t=new Map,i=[];for(const o of e)if(n.has(o.sourceId)){const e=t.get(o.sourceId)??[];e.push(o),t.set(o.sourceId,e)}else i.push(o);a=[];for(const[e,i]of t)a.push(...nt(i,n.get(e)));a.push(...nt(i,r)),a.sort((e,t)=>pt(t)-pt(e))}for(const e of a)ve(e)&&(e.expanded=this.expandedGroups.has(rt(e)));this.filteredItems=a,this.notify()}toggleGroup(e){const t=rt(e);this.expandedGroups.has(t)?this.expandedGroups.delete(t):this.expandedGroups.add(t),this.filteredItems=this.filteredItems.map(e=>ve(e)&&rt(e)===t?{...e,expanded:!e.expanded}:e),this.notify()}async resolveMedia(e,t){const i=t.filter(e=>e.mediaContentId&&!e.mediaUrl);if(0===i.length)return;const o=await Promise.allSettled(i.map(t=>st(e,t.mediaContentId)));for(let e=0;e<i.length;e++){const t=o[e];"fulfilled"===t.status&&t.value&&(i[e].mediaUrl=t.value)}}async resolveTemplates(e,t){const i=[];for(const e of t)for(const t of gt){const o=e.metadata?.[t.key];"string"==typeof o&&o.trim()&&!t.has(e)&&(lt(o)?i.push({event:e,template:o,apply:t.apply}):t.apply(e,o.trim()))}if(0===i.length)return;const o=e=>({entity_id:e.entityId||"",state:e.metadata?.new_state||"",old_state:e.metadata?.old_state||"",timestamp:e.start,attributes:e.metadata?.attributes||{},source_name:e.metadata?.source_name||""});for(let t=0;t<i.length;t+=50)await Promise.allSettled(i.slice(t,t+50).map(async t=>{const i=o(t.event),r=`${t.template}\0${JSON.stringify(i)}`;let n=ft.get(r);if(void 0===n){try{n=(await dt(e,t.template,{...i})??"").trim()}catch(e){return void console.warn("[chronicle-card] Template resolution failed:",e)}ft.size>=1e3&&ft.delete(ft.keys().next().value),ft.set(r,n)}n&&t.apply(t.event,n)}))}computeHash(e){return e.map(e=>`${e.id}|${e.title}|${e.description}|${e.details??""}|${e.mediaUrl??""}|${e.metadata?.clip_url??""}`).join("\n")}}const vt=/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,bt=/^(?:rgb|rgba|hsl|hsla)\(\s*[0-9.,%\s/-]+\s*\)$/i,_t=/^[a-zA-Z]{3,20}$/;function xt(e,t="#78909C"){if("string"!=typeof e)return t;const i=e.trim();return vt.test(i)||bt.test(i)||_t.test(i)?i:t}function wt(e,t=.82){const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);if(!i)return"#ffffff";return`#${[i[1],i[2],i[3]].map(e=>(e=>Math.round(parseInt(e,16)+(255-parseInt(e,16))*t))(e).toString(16).padStart(2,"0")).join("")}`}function $t(e,t){return t&&t[e]?t[e]:be[e]??be.info}function kt(e){return e&&/^[a-z0-9_-]+:[a-z0-9_-]+$/i.test(e)?e:_e.default}function At(e,t){if("string"==typeof e)return function(e,t){const i=t.metadata??{},o={};for(const[e,t]of Object.entries(i))null!=t&&"object"!=typeof t&&(o[e]=t);return Object.assign(o,{id:i.raw_id??t.id,title:t.title,description:t.description,entity:t.entityId??"",entity_id:t.entityId??"",source:t.sourceId,category:t.category,severity:t.severity,start:t.start,end:t.end,media_url:t.mediaUrl??""}),e.replace(/\{([\w.]+)\}/g,(e,t)=>null!=o[t]?String(o[t]):e)}(e,t);if(Array.isArray(e))return e.map(e=>At(e,t));if(e&&"object"==typeof e){const i={};for(const[o,r]of Object.entries(e))i[o]=At(r,t);return i}return e}function St(e,t){return At(e,t)}function Et(e,t,i,o="tap"){const r=St(i,t);("more-info"!==r.action||t.entityId||r.entity)&&e.dispatchEvent(new CustomEvent("hass-action",{bubbles:!0,composed:!0,detail:{config:{entity:t.entityId,[`${o}_action`]:r},action:o}}))}function Ct(e,t,i){const o="hold"===i?t.holdAction:t.tapAction;o&&"default"!==o.action?Et(e,t,o,i):"tap"===i&&e.dispatchEvent(new CustomEvent("chronicle-show-detail",{bubbles:!0,composed:!0,detail:{event:t}}))}let It=class extends le{constructor(){super(...arguments),this.severity="info"}render(){const e=xt($t(this.severity,this.customColors));return G`
      <span class="badge" style="background-color: ${e}">
        ${ot(`chronicle.severity.${this.severity}`)}
      </span>
    `}};It.styles=a`
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
  `,e([me()],It.prototype,"severity",void 0),e([me({attribute:!1})],It.prototype,"customColors",void 0),It=e([he("chronicle-severity-badge")],It);let zt=class extends le{render(){return G`
      <button @click=${this._handleClick} @pointerdown=${e=>e.stopPropagation()}>
        ${this.action.icon?G`<ha-icon .icon=${this.action.icon}></ha-icon>`:""}
        ${this.action.label}
      </button>
    `}_handleClick(e){if(e.stopPropagation(),!this.action||!this.event)return;if(!this.action.action&&"fire-event"===this.action.type)return void(this.action.eventType&&this.dispatchEvent(new CustomEvent(this.action.eventType,{bubbles:!0,composed:!0,detail:St(this.action.eventData??{},this.event)})));const t=function(e){const{label:t,icon:i,type:o,serviceData:r,url:n,eventType:a,eventData:s,...c}=e;if(e.action)return c;switch(o){case"service":return e.service?{action:"perform-action",perform_action:e.service,data:r,target:e.target}:void 0;case"navigate":if(!n)return;return/^https?:\/\//.test(n)?{action:"url",url_path:n}:{action:"navigate",navigation_path:n};default:return}}(this.action);t&&Et(this,this.event,t)}};zt.styles=a`
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
  `,e([me({attribute:!1})],zt.prototype,"action",void 0),e([me({attribute:!1})],zt.prototype,"event",void 0),zt=e([he("chronicle-action-button")],zt);let Tt=class extends le{constructor(){super(...arguments),this.compact=!1,this.animated=!1,this._holdTimer=null,this._pressed=!1,this._holdFired=!1,this._startX=0,this._startY=0}render(){const e=this.event;if(!e)return K;const t=!1!==this.appearance?.show_images,i=!1!==this.appearance?.show_icons,o=!1!==this.appearance?.show_severity_badge,r=!1!==this.appearance?.show_category,n=this.compact?!0===this.appearance?.show_description:!1!==this.appearance?.show_description,a=/^\d{4}-\d{2}-\d{2}$/.test(e.start)?"":Be(e.start),s=xt(e.color);return G`
      <div class="event-row">
        ${i?G`
          <div class="icon-wrap" style="background-color: ${s}">
            <ha-icon .icon=${kt(e.icon)} style="color: ${wt(s)}"></ha-icon>
          </div>
        `:K}

        <div class="event-item"
          role="button"
          tabindex="0"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._cancelHold}
          @pointerleave=${this._cancelHold}
          @keydown=${this._onKeyDown}
          @contextmenu=${e=>{this.event.holdAction&&e.preventDefault()}}
        >
          <div class="content">
            <div class="top-row">
              <span class="title">${e.title}</span>
              ${o&&"info"!==e.severity?G`
                <chronicle-severity-badge
                  .severity=${e.severity}
                  .customColors=${this.appearance?.severity_colors}
                ></chronicle-severity-badge>
              `:K}
              ${a?G`<span class="time">${a}</span>`:K}
            </div>
            ${n&&e.description?G`<div class="description">${e.description}</div>`:K}
            ${e.details?G`<div class="details">${e.details}</div>`:K}
            <div class="meta-row">
              ${r&&e.category?G`<span class="category-tag">${e.category}</span>`:K}
              ${r&&e.label?G`<span class="category-tag">${e.label}</span>`:K}
              ${r&&e.entityName?G`<span class="category-tag">${e.entityName}</span>`:K}
            </div>
            ${e.actions&&e.actions.length>0?G`
              <div class="actions-row">
                ${e.actions.map(t=>G`
                  <chronicle-action-button .action=${t} .event=${e}></chronicle-action-button>
                `)}
              </div>
            `:K}
          </div>

          ${t&&e.mediaUrl?G`
            <img class="thumbnail" src=${e.mediaUrl} alt="" loading="lazy" />
          `:K}
        </div>
      </div>
    `}_onPointerDown(e){0===e.button&&(this._pressed=!0,this._holdFired=!1,this._startX=e.clientX,this._startY=e.clientY,this._holdTimer=setTimeout(()=>{this._holdFired=!0,this._handleAction("hold")},500))}_onPointerUp(e){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null),this._pressed&&(this._pressed=!1,Math.abs(e.clientX-this._startX)>10||Math.abs(e.clientY-this._startY)>10||this._holdFired||this._handleAction("tap"))}_cancelHold(){this._pressed=!1,this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_onKeyDown(e){e.target===e.currentTarget&&("Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._handleAction("tap")))}_handleAction(e){Ct(this,this.event,e)}};Tt.styles=a`
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
    .event-item:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
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

    .details {
      font-size: 11.5px;
      color: var(--secondary-text-color, #888);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.4;
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
    :host([compact]) .details { font-size: 11px; }
    :host([compact]) .meta-row,
    :host([compact]) .actions-row { display: none; }
  `,e([me({attribute:!1})],Tt.prototype,"event",void 0),e([me({attribute:!1})],Tt.prototype,"appearance",void 0),e([me({type:Boolean,reflect:!0})],Tt.prototype,"compact",void 0),e([me({type:Boolean,reflect:!0})],Tt.prototype,"animated",void 0),Tt=e([he("chronicle-event-item")],Tt);let Dt=class extends le{constructor(){super(...arguments),this.compact=!1}render(){const e=this.group;if(!e)return K;const t=e.representative,i=e.events.map(e=>He(e.start)),o=Be(new Date(Math.min(...i))),r=Be(new Date(Math.max(...i))),n=o===r?o:`${o} – ${r}`,a=!1!==this.appearance?.show_images?e.events.map(e=>e.mediaUrl).filter(Boolean):[],s=a.slice(0,3),c=a.length-3;return G`
      <div>
        <div class="group-row">
          <div class="icon-wrap" style="background-color: ${xt(t.color)}">
            <ha-icon .icon=${kt(t.icon)} style="color: ${wt(xt(t.color))}"></ha-icon>
            <span class="count-badge">${e.events.length}</span>
          </div>

          <div class="group-header"
            role="button"
            tabindex="0"
            aria-expanded=${e.expanded?"true":"false"}
            @click=${this._toggle}
            @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggle())}}
          >
            <div class="content">
              <div class="top-row">
                <span class="summary">${e.summary}</span>
                <span class="time-range">${n}</span>
              </div>
            </div>

            ${s.length>0?G`
              <div class="thumb-strip">
                ${s.map((e,t)=>2===t&&c>0?G`
                        <div class="thumb-more-wrap">
                          <img src=${e} alt="" loading="lazy" />
                          <span class="more-count">+${c}</span>
                        </div>
                      `:G`<img class="thumb" src=${e} alt="" loading="lazy" />`)}
              </div>
            `:K}

            <ha-icon
              class="chevron ${e.expanded?"open":K}"
              icon="mdi:chevron-down"
            ></ha-icon>
          </div>
        </div>

        <div class="children ${e.expanded?"expanded":K}">
          <div class="children-inner">
            ${e.expanded?G`
              <div class="children-content">
                ${e.events.map(e=>G`
                  <chronicle-event-item
                    .event=${e}
                    .appearance=${this.appearance}
                    ?compact=${this.compact}
                  ></chronicle-event-item>
                `)}
              </div>
            `:K}
          </div>
        </div>
      </div>
    `}_toggle(){this.dispatchEvent(new CustomEvent("chronicle-toggle-group",{bubbles:!0,composed:!0,detail:{group:this.group}}))}};Dt.styles=a`
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
    .group-header:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
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
  `,e([me({attribute:!1})],Dt.prototype,"group",void 0),e([me({attribute:!1})],Dt.prototype,"appearance",void 0),e([me({type:Boolean,reflect:!0})],Dt.prototype,"compact",void 0),Dt=e([he("chronicle-event-group")],Dt);let Ot=class extends le{constructor(){super(...arguments),this.label="",this.eventCount=0}render(){return G`
      <div class="date-header">
        <span class="label">${this.label}</span>
        <span class="line"></span>
        ${this.eventCount>0?G`<span class="count">${this.eventCount}</span>`:""}
      </div>
    `}};Ot.styles=a`
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
  `,e([me()],Ot.prototype,"label",void 0),e([me()],Ot.prototype,"eventCount",void 0),Ot=e([he("chronicle-date-header")],Ot);let Pt=class extends le{constructor(){super(...arguments),this.message=""}render(){return G`
      <div class="empty">
        <div class="icon-ring">
          <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>
        </div>
        <span class="text">${this.message||ot("chronicle.no_events")}</span>
      </div>
    `}};Pt.styles=a`
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
  `,e([me()],Pt.prototype,"message",void 0),Pt=e([he("chronicle-empty-state")],Pt);let Ut=class extends le{constructor(){super(...arguments),this.items=[],this.compact=!1,this.animateNew=!0,this._seen=new Set,this._fresh=new Set}willUpdate(e){if(!e.has("items"))return;const t=new Set;for(const e of this.items??[])for(const i of ve(e)?e.events:[e])t.add(i.id);this._fresh=this._seen.size&&this.animateNew?new Set([...t].filter(e=>!this._seen.has(e))):new Set,this._seen=t}render(){if(!this.items||0===this.items.length)return G`<chronicle-empty-state></chronicle-empty-state>`;const e=this._groupByDate(this.items),t=this.appearance?.card_height??"400px",i="fill"===t||"100%"===t,o=i||"auto"===t?"":`max-height: ${t}`;return this.classList.toggle("fill",i),G`
      <div class="timeline-container" style=${o}>
        <div class="timeline-inner">
          ${e.map(e=>G`
            <div class="date-section">
              <chronicle-date-header
                .label=${e.label}
                .eventCount=${this._countEvents(e.items)}
              ></chronicle-date-header>
              ${e.items.map(e=>ve(e)?G`
                    <chronicle-event-group
                      .group=${e}
                      .appearance=${this.appearance}
                      ?compact=${this.compact}
                    ></chronicle-event-group>
                  `:G`
                    <chronicle-event-item
                      .event=${e}
                      .appearance=${this.appearance}
                      ?compact=${this.compact}
                      ?animated=${this._fresh.has(e.id)}
                    ></chronicle-event-item>
                  `)}
            </div>
          `)}
        </div>
      </div>
    `}_groupByDate(e){const t=new Map;for(const i of e){const e=ve(i)?i.representative.start:i.start,o=Ke(e);let r=t.get(o);r||(r={dateKey:o,label:Je(e),items:[]},t.set(o,r)),r.items.push(i)}return Array.from(t.values())}_countEvents(e){let t=0;for(const i of e)t+=ve(i)?i.events.length:1;return t}};Ut.styles=a`
    :host {
      display: block;
    }

    /* Fill mode — host + container stretch to the parent's available height
       (set by chronicle-card's :host([fill]) flex chain). */
    :host(.fill) {
      height: 100%;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    :host(.fill) .timeline-container {
      flex: 1 1 auto;
      min-height: 0;
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
  `,e([me({attribute:!1})],Ut.prototype,"items",void 0),e([me({attribute:!1})],Ut.prototype,"appearance",void 0),e([me({type:Boolean})],Ut.prototype,"compact",void 0),e([me({type:Boolean})],Ut.prototype,"animateNew",void 0),Ut=e([he("chronicle-vertical-timeline")],Ut);const jt=e=>t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),e())};let Ft=class extends le{constructor(){super(...arguments),this.items=[]}render(){if(!this.items||0===this.items.length)return G`<chronicle-empty-state></chronicle-empty-state>`;const e=this.appearance?.card_height;return G`
      <div class="wrapper">
        <button class="scroll-btn left" aria-label="Scroll left" @click=${()=>this._scroll(-200)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>

        <div class="scroll-container" style=${e&&"auto"!==e?`height: ${"fill"===e||"100%"===e?"100%":e}; align-items: center;`:""}>
          ${this.items.map(e=>ve(e)?e.expanded?this._renderExpandedGroup(e):this._renderGroupCard(e):this._renderEventCard(e))}
        </div>

        <button class="scroll-btn right" aria-label="Scroll right" @click=${()=>this._scroll(200)}>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>
    `}_renderEventCard(e){const t=!1!==this.appearance?.show_images,i=xt(e.color);return G`
      <div class="event-card" role="button" tabindex="0"
        @click=${()=>this._activate(e)}
        @keydown=${jt(()=>this._activate(e))}
      >
        ${t&&e.mediaUrl?G`<img class="card-media" src=${e.mediaUrl} alt="" loading="lazy" />`:G`
            <div class="card-placeholder" style="background-color: ${i}">
              <ha-icon .icon=${kt(e.icon)}></ha-icon>
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
    `}_renderGroupCard(e){const t=e.representative,i=!1!==this.appearance?.show_images;return G`
      <div class="group-card" role="button" tabindex="0" aria-expanded="false"
        @click=${()=>this._toggleGroup(e)}
        @keydown=${jt(()=>this._toggleGroup(e))}
      >
        ${i&&t.mediaUrl?G`
            <div class="group-media" style="padding: 0;">
              <img class="card-media" src=${t.mediaUrl} alt="" loading="lazy" />
              <span class="group-badge">${e.events.length}</span>
            </div>
          `:G`
            <div class="group-media" style="background-color: ${xt(t.color)}">
              <ha-icon .icon=${kt(t.icon)}></ha-icon>
              <span class="group-badge">${e.events.length}</span>
            </div>
          `}
        <div class="group-body">
          <div class="group-title">${e.summary}</div>
          <div class="group-time">${Ye(t.start)}</div>
        </div>
      </div>
    `}_renderExpandedGroup(e){const t=!1!==this.appearance?.show_images;return G`
      <div class="group-expanded">
        ${e.events.map(e=>G`
          <div class="event-card" role="button" tabindex="0"
        @click=${()=>this._activate(e)}
        @keydown=${jt(()=>this._activate(e))}
      >
            ${t&&e.mediaUrl?G`<img class="card-media" src=${e.mediaUrl} alt="" loading="lazy" />`:G`
                <div class="card-placeholder" style="background-color: ${xt(e.color)}">
                  <ha-icon .icon=${kt(e.icon)}></ha-icon>
                </div>
              `}
            <div class="card-body">
              <div class="card-title">
                <span class="card-severity" style="background-color: ${xt(e.color)}"></span>
                ${e.title}
              </div>
              <div class="card-time">${Ye(e.start)}</div>
            </div>
          </div>
        `)}
        <div class="group-collapse-btn" role="button" tabindex="0" aria-expanded="true"
          @click=${()=>this._toggleGroup(e)}
          @keydown=${jt(()=>this._toggleGroup(e))}
        >
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </div>
      </div>
    `}_scroll(e){this.scrollEl?.scrollBy({left:e,behavior:"smooth"})}_activate(e){Ct(this,e,"tap")}_toggleGroup(e){this.dispatchEvent(new CustomEvent("chronicle-toggle-group",{bubbles:!0,composed:!0,detail:{group:e}}))}};Ft.styles=a`
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
    .event-card:focus-visible,
    .group-card:focus-visible,
    .group-collapse-btn:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
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
  `,e([me({attribute:!1})],Ft.prototype,"items",void 0),e([me({attribute:!1})],Ft.prototype,"appearance",void 0),e([fe(".scroll-container")],Ft.prototype,"scrollEl",void 0),Ft=e([he("chronicle-horizontal-timeline")],Ft);const Nt=/\.(mp4|webm|mov|m3u8|mkv|ogv)([?#]|$)/i,Mt=a`
  :host {
    font-family: var(--ha-font-family-body, Roboto, Noto, sans-serif);
    -webkit-font-smoothing: antialiased;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 99999;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .open .overlay { opacity: 1; pointer-events: auto; }

  .dialog {
    position: fixed;
    z-index: 100000;
    background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
    color: var(--primary-text-color, #333);
    overflow-y: auto;
    overscroll-behavior: contain;
    outline: none;

    /* Mobile: bottom sheet */
    bottom: 0; left: 0; right: 0;
    max-height: 88vh;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -2px 30px rgba(0, 0, 0, 0.2), 0 -1px 2px rgba(0,0,0,0.06);
    transform: translateY(100%);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .open .dialog { transform: translateY(0); }

  @media (min-width: 600px) {
    .dialog {
      bottom: auto; left: 50%; right: auto;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.96);
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
      border-radius: var(--ha-dialog-border-radius, 18px);
      max-width: 460px;
      width: 92vw;
      max-height: 82vh;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0,0,0,0.08);
    }
    .open .dialog { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .overlay, .dialog { transition: none; }
  }

  .handle {
    width: 32px; height: 4px;
    border-radius: 2px;
    background: var(--divider-color, rgba(127,127,127,0.25));
    margin: 10px auto 0;
  }
  @media (min-width: 600px) { .handle { display: none; } }

  .media-wrap { position: relative; overflow: hidden; }
  .media {
    width: 100%;
    max-height: 240px;
    object-fit: cover;
    display: block;
    background: var(--secondary-background-color, #f0f0f0);
  }
  video.media { object-fit: contain; background: #000; }
  .media-gradient {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 48px;
    background: linear-gradient(transparent, var(--ha-dialog-surface-background, var(--card-background-color, #fff)));
    pointer-events: none;
  }
  .clip-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 8px 20px 0;
    font-size: 12px;
    font-weight: 500;
    color: var(--primary-color, #03a9f4);
    text-decoration: none;
  }
  .clip-link ha-icon { --mdc-icon-size: 14px; }

  .body { padding: 16px 20px 24px; }
  .body-with-media { padding-top: 8px; }

  .header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  }
  .header-icon {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  }
  .header-icon ha-icon {
    --mdc-icon-size: 20px;
    color: #fff;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
  }
  .header-text { flex: 1; min-width: 0; padding-right: 28px; }
  .header-title {
    font-size: 17px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.2px;
  }
  .header-time {
    font-size: 12px;
    color: var(--secondary-text-color, #888);
    margin-top: 4px;
    font-variant-numeric: tabular-nums;
  }

  .close-btn {
    position: absolute;
    top: 12px; right: 12px;
    width: 32px; height: 32px;
    border-radius: 50%;
    border: none;
    background: rgba(127,127,127,0.12);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--primary-text-color, #333);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: background 0.15s ease;
  }
  .close-btn:hover { background: rgba(127,127,127,0.22); }
  .close-btn ha-icon { --mdc-icon-size: 18px; }
  .close-btn:focus-visible, .more-info-btn:focus-visible, .clip-link:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
  }
  .tag {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    background: var(--divider-color, rgba(127,127,127,0.08));
    color: var(--secondary-text-color, #777);
    letter-spacing: 0.1px;
  }
  .severity-tag {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    color: #fff;
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

  .description {
    font-size: 13.5px;
    line-height: 1.65;
    margin-bottom: 16px;
    white-space: pre-wrap;
    word-break: break-word;
    opacity: 0.9;
  }
  .details {
    font-size: 12.5px;
    color: var(--secondary-text-color, #888);
    margin: -8px 0 16px;
  }

  .meta-table {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 7px 14px;
    font-size: 12px;
    margin-bottom: 16px;
    padding: 14px 16px;
    background: var(--secondary-background-color, rgba(127,127,127,0.04));
    border-radius: 12px;
    border: 1px solid var(--divider-color, rgba(127,127,127,0.08));
  }
  .meta-label {
    color: var(--secondary-text-color, #888);
    font-weight: 500;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .meta-value { font-size: 12.5px; word-break: break-word; }

  .more-info-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
    background: var(--secondary-background-color, rgba(127,127,127,0.06));
    color: var(--primary-color, #03a9f4);
    font-size: 12px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    margin-bottom: 16px;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .more-info-btn:hover { border-color: var(--primary-color, #03a9f4); }
  .more-info-btn ha-icon { --mdc-icon-size: 16px; }
`;let Lt=class extends le{constructor(){super(...arguments),this._event=null,this._open=!1,this._clipFailed=!1,this._container=null,this._returnFocus=null,this._onKeydown=e=>{"Escape"===e.key&&this._open&&(e.stopPropagation(),this.close())}}render(){return K}show(e){clearTimeout(this._closeTimer),this._event=e,this._clipFailed=!1,this._returnFocus=document.activeElement,this._ensureContainer(),this._renderDialog(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{this._open=!0,this._renderDialog(),this._container?.shadowRoot?.querySelector(".close-btn")?.focus()})})}close(){this._open&&(this._open=!1,this._renderDialog(),this._returnFocus?.focus?.(),this._closeTimer=setTimeout(()=>{this._event=null,this._removeContainer()},350))}_ensureContainer(){if(this._container)return;this._container=document.createElement("div"),this._container.className="chronicle-detail-overlay",document.body.appendChild(this._container);const e=this._container.attachShadow({mode:"open"});s(e,[Mt])}_removeContainer(){this._container?.remove(),this._container=null}_renderDialog(){const e=this._container?.shadowRoot;e&&se(this._template(),e)}_template(){const e=this._event;if(!e)return K;const t=e.metadata?.clip_url||"",i=!!t&&!this._clipFailed,o=i?t:e.mediaUrl||"",r=i||Nt.test(o),n=e.metadata?.location,a=xt($t(e.severity,this.severityColors)),s=!!e.entityId&&["history","logbook","calendar"].includes(e.sourceType);return G`
      <div class=${this._open?"open":""}>
        <div class="overlay" @click=${()=>this.close()}></div>
        <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="chronicle-dialog-title" tabindex="-1">
          <div class="handle"></div>
          <button class="close-btn" aria-label=${ot("chronicle.detail.close")} @click=${()=>this.close()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>

          ${o?G`
            <div class="media-wrap">
              ${r?G`<video class="media" src=${o} controls autoplay muted loop playsinline
                    poster=${i&&e.mediaUrl?e.mediaUrl:K}
                    @error=${()=>this._onClipError(i)}></video>`:G`<img class="media" src=${o} alt="" /><div class="media-gradient"></div>`}
            </div>
          `:K}
          ${t?G`
            <a class="clip-link" href=${t} target="_blank" rel="noopener">
              <ha-icon icon="mdi:open-in-new"></ha-icon>${ot("chronicle.detail.open_clip")}
            </a>
          `:K}

          <div class="body ${o?"body-with-media":""}">
            <div class="header">
              <div class="header-icon" style="background-color: ${xt(e.color)}">
                <ha-icon .icon=${kt(e.icon)}></ha-icon>
              </div>
              <div class="header-text">
                <div class="header-title" id="chronicle-dialog-title">${e.title}</div>
                <div class="header-time">${Ge(e.start)}</div>
              </div>
            </div>

            <div class="tags">
              <span class="severity-tag" style="background-color: ${a}">
                ${ot(`chronicle.severity.${e.severity}`)}
              </span>
              ${e.category?G`<span class="tag">${e.category}</span>`:K}
              ${e.label?G`<span class="tag">${e.label}</span>`:K}
              ${e.sourceType?G`<span class="tag">${e.sourceType}</span>`:K}
            </div>

            ${e.description?G`<div class="description">${e.description}</div>`:K}
            ${e.details?G`<div class="details">${e.details}</div>`:K}

            ${s?G`
              <button class="more-info-btn" @click=${()=>this._moreInfo(e.entityId)}>
                <ha-icon icon="mdi:information-outline"></ha-icon>
                ${ot("chronicle.detail.more_info")}
              </button>
            `:K}

            <div class="meta-table">
              ${e.entityName?this._row("chronicle.detail.entity",e.entityName):K}
              ${e.entityId?this._row("chronicle.detail.entity_id",e.entityId):K}
              ${this._row("chronicle.detail.source",e.sourceId)}
              ${n?this._row("chronicle.detail.location",n):K}
              ${this._row("chronicle.detail.start",Ge(e.start))}
              ${e.end&&e.end!==e.start?this._row("chronicle.detail.end",Ge(e.end)):K}
            </div>
          </div>
        </div>
      </div>
    `}_row(e,t){return G`
      <span class="meta-label">${ot(e)}</span>
      <span class="meta-value">${t}</span>
    `}_onClipError(e){e&&!this._clipFailed&&(this._clipFailed=!0,this._renderDialog())}_moreInfo(e){this.close(),setTimeout(()=>{this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))},100)}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._onKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._onKeydown),clearTimeout(this._closeTimer),this._open=!1,this._removeContainer()}};Lt.styles=a`:host { display: none; }`,e([me({attribute:!1})],Lt.prototype,"severityColors",void 0),Lt=e([he("chronicle-detail-dialog")],Lt);let Rt,Ht=class extends le{constructor(){super(...arguments),this._items=[],this._layout="vertical",this._localeKey="",this._store=new yt}static getConfigElement(){return document.createElement($e)}static getStubConfig(e){const t=Object.keys(e?.states??{}),i=t.find(e=>e.startsWith("calendar.")),o=t.filter(e=>/^(binary_sensor|lock|cover|person|light)\./.test(e)).slice(0,3);return{title:"Timeline",sources:i?[{type:"calendar",entity:i}]:o.length?[{type:"history",entities:o}]:[]}}setConfig(e){if(!e)throw new Error("No configuration provided");if(void 0!==e.sources&&!Array.isArray(e.sources))throw new Error('"sources" must be a list');if(this._rawConfig&&JSON.stringify(this._rawConfig)===JSON.stringify(e))return;const t=this._rawConfig?.layout!==e.layout;this._rawConfig=e,this._config={...ye,...e,sources:e.sources??[],filters:{...ye.filters,...e.filters},grouping:{...ye.grouping,...e.grouping},appearance:{...ye.appearance,...e.appearance}},t&&(this._layout=this._config.layout??"vertical"),this._store.configure(this._config),this._hass&&this.isConnected&&this._fetch(!0),this.isConnected&&this._startPolling()}set hass(e){const t=this._hass;this._hass=e;const i=[this._config?.language,e.locale?.language,e.language,e.locale?.time_format,e.locale?.time_zone,e.config?.time_zone].join("|");i!==this._localeKey&&(this._localeKey=i),this.isConnected&&this._config&&(t?this._store.processStateChanges(e,t).catch(e=>{console.warn("[chronicle-card] Live update error:",e)}):this._fetch(!1))}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._storeUnsub?.(),this._storeUnsub=this._store.subscribe(()=>{this._items=[...this._store.items]}),this._items=[...this._store.items],this._startPolling(),this._hass&&this._config&&this._fetch(!1)}disconnectedCallback(){super.disconnectedCallback(),this._storeUnsub?.(),this._storeUnsub=void 0,this._stopPolling()}_fetch(e){this._hass&&(this._syncLocale(),this._store.fetch(this._hass,e).catch(e=>{console.warn("[chronicle-card] Fetch error:",e)}))}_startPolling(){this._stopPolling(),this._config&&(this._pollTimer=setInterval(()=>this._fetch(!0),this._store.pollInterval))}_stopPolling(){this._pollTimer&&clearInterval(this._pollTimer),this._pollTimer=void 0}_syncLocale(){const e=this._config?.language||this._hass?.locale?.language||this._hass?.language||"en";!function(e){it=e}(e),function(e,t,i){let o;if(i)o="12h"===i;else switch(e?.locale?.time_format){case"12":o=!0;break;case"24":o=!1;break;case"system":o=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hour12;break;default:o=void 0}const r="server"===e?.locale?.time_zone?e.config?.time_zone:void 0,n={language:Me(t),hour12:o,timeZone:r};n.language===Fe.language&&n.hour12===Fe.hour12&&n.timeZone===Fe.timeZone||(Fe=n,Ne.clear())}(this._hass,e,this._config?.time_format)}get _fill(){const e=this._config?.appearance?.card_height;return"fill"===e||"100%"===e||"number"==typeof this._config?.grid_options?.rows}willUpdate(e){super.willUpdate(e),this.toggleAttribute("fill",this._fill)}render(){if(!this._config)return K;this._syncLocale();const e=!1!==this._config.show_header,t=!1!==this._config.show_layout_toggle,i={...this._config.appearance,...this._fill?{card_height:"fill"}:{}},o=i.compact??!1,r=!1!==i.animate_new_events;return G`
      <ha-card>
        ${e&&(this._config.title||t)?G`
          <div class="card-header">
            <span class="title">${this._config.title??""}</span>
            ${t?G`
              <div class="header-actions">
                ${this._renderToggle("vertical","mdi:view-sequential","Vertical timeline")}
                ${this._renderToggle("horizontal","mdi:view-carousel","Horizontal timeline")}
              </div>
            `:K}
          </div>
        `:K}

        <div class="card-content" @chronicle-show-detail=${this._onShowDetail} @chronicle-toggle-group=${this._onToggleGroup}>
          ${"vertical"===this._layout?G`
              <chronicle-vertical-timeline
                .items=${this._items}
                .appearance=${i}
                ?compact=${o}
                ?animateNew=${r}
              ></chronicle-vertical-timeline>
            `:G`
              <chronicle-horizontal-timeline
                .items=${this._items}
                .appearance=${i}
              ></chronicle-horizontal-timeline>
            `}
        </div>

        <chronicle-detail-dialog .severityColors=${i.severity_colors}></chronicle-detail-dialog>
      </ha-card>
    `}_renderToggle(e,t,i){const o=this._layout===e;return G`
      <button
        class="layout-toggle ${o?"active":""}"
        aria-pressed=${o?"true":"false"}
        aria-label=${i}
        title=${i}
        @click=${()=>{this._layout=e}}
      >
        <ha-icon .icon=${t}></ha-icon>
      </button>
    `}_onShowDetail(e){this._dialog?.show(e.detail.event)}_onToggleGroup(e){this._store.toggleGroup(e.detail.group)}getCardSize(){const e=!1!==this._config?.show_header?1:0,t=this._config?.appearance?.card_height??"400px",i=/^(\d+)px$/.exec(t);return e+(i?Math.ceil(Number(i[1])/50):6)}getGridOptions(){return{columns:12,min_columns:6,min_rows:3}}};Ht.styles=a`
    :host {
      display: block;
      contain: content;
    }

    /* Fill mode — stretch the whole chain to the height the dashboard gives us. */
    :host([fill]) {
      height: 100%;
    }

    ha-card {
      overflow: hidden;
    }

    :host([fill]) ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    :host([fill]) .card-content {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    :host([fill]) .card-content > * {
      flex: 1 1 auto;
      min-height: 0;
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
      color: var(--ha-card-header-color, var(--primary-text-color, #333));
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
    .layout-toggle:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 1px;
    }
    .layout-toggle.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .layout-toggle ha-icon {
      --mdc-icon-size: 17px;
    }

    .card-content {
      padding: 0 16px 14px;
    }
  `,e([ge()],Ht.prototype,"_config",void 0),e([ge()],Ht.prototype,"_items",void 0),e([ge()],Ht.prototype,"_layout",void 0),e([ge()],Ht.prototype,"_localeKey",void 0),e([fe("chronicle-detail-dialog")],Ht.prototype,"_dialog",void 0),Ht=e([he("chronicle-card")],Ht);const Bt=[{value:"category",label:"Category"},{value:"source",label:"Source"},{value:"entity",label:"Entity"},{value:"none",label:"None"}],Gt=e=>!!e&&"object"==typeof e&&!Array.isArray(e),Wt=e=>null==e||""===e||Array.isArray(e)&&0===e.length||Gt(e)&&0===Object.keys(e).length,Kt=(e,t)=>JSON.stringify(e)===JSON.stringify(t);function qt(e,t,i){const o={};for(const[r,n]of Object.entries(e)){if(Wt(n))continue;const e=!!t&&r in t,a=i?.[r];if(Gt(n)){const e=qt(n,Gt(t?.[r])?t[r]:void 0,Gt(a)?a:void 0);Object.keys(e).length&&(o[r]=e);continue}!e&&void 0!==a&&Kt(n,a)||(o[r]=n)}return o}function Vt(e){if("string"!=typeof e)return;let t=e.trim().replace(/^#/,"");return 3===t.length&&(t=t.split("").map(e=>e+e).join("")),/^[0-9a-f]{6}$/i.test(t)?[0,2,4].map(e=>parseInt(t.slice(e,e+2),16)):void 0}function Jt(e){return Array.isArray(e)&&3===e.length?`#${e.map(e=>Math.max(0,Math.min(255,Math.round(Number(e)))).toString(16).padStart(2,"0")).join("")}`:"string"==typeof e?e:void 0}function Yt(e,t,i){const o={...e};for(const e of t)e in o&&(o[e]=i(o[e]));return o}function Zt(e,t){const i=new Set(["title","name","entity","entities","icon","tap_action","hold_action","state_color"]);return o=>{const r=o.name??"";if(i.has(r)){const t=e?.localize?.(`ui.panel.lovelace.editor.card.generic.${r}`);if(t)return t}return t[r]??o.title??r}}const Xt=[{value:"history",label:"Entity state (history)"},{value:"logbook",label:"Logbook"},{value:"calendar",label:"Calendar"},{value:"rest",label:"REST / WebSocket API"},{value:"static",label:"Static events"}],Qt={select:{mode:"dropdown",options:[{value:"critical",label:"Critical"},{value:"warning",label:"Warning"},{value:"info",label:"Info"},{value:"debug",label:"Debug"}]}},ei={binary_sensor:["on","off"],switch:["on","off"],light:["on","off"],fan:["on","off"],input_boolean:["on","off"],lock:["locked","unlocked","jammed","locking","unlocking","open"],cover:["open","closed","opening","closing"],person:["home","not_home"],device_tracker:["home","not_home"],alarm_control_panel:["armed_away","armed_home","armed_night","armed_vacation","disarmed","triggered","pending","arming"],vacuum:["cleaning","docked","returning","idle","paused","error"],media_player:["playing","paused","idle","standby","off","on"]},ti={type:"Source type",url:"API URL",ws_params:"WebSocket command",response_path:"Response path",field_map:"Field map",media_url_template:"Media URL template",clip_url_template:"Clip URL template",poll_interval:"Poll interval",show_attributes:"Show attributes",image_template:"Image template",clip_template:"Clip template",events:"Events",actions:"Action buttons",default_icon:"Default icon",default_color:"Default color",default_severity:"Default severity",severity:"Severity",color:"Color",icon_map:"Icon map",color_map:"Color map",state_filter:"Only these states",state_map:"State labels",state_icon:"Icon per state",state_color:"Color per state",grouping:"Grouping override",window_seconds:"Window",min_group_size:"Minimum group size",group_by:"Group by",group_name:"Group name",entity_config:"Per-entity settings"},ii={name:"Shown in the timeline and usable in filters.",url:"Internal HA API path (e.g. /api/…) or a full external URL.",ws_params:"Use a WebSocket command instead of the URL, e.g. {type: frigate/events/get, limit: 50}.",response_path:"Dot-path to the array in the response, e.g. data.items.",field_map:"Map response fields to: id, title, description, start, end, mediaUrl, category, label, entityId.",media_url_template:"Image URL built from response fields, e.g. /api/frigate/notifications/{id}/snapshot.jpg",clip_url_template:"Video URL played in the detail dialog, e.g. /api/frigate/notifications/{id}/clip.mp4",poll_interval:"Seconds between refreshes (default 30).",show_attributes:"Attribute values shown under each event.",image_template:"A URL/path, or a Jinja2 template. Variables: entity_id, state, old_state, timestamp, attributes, source_name. Use /local/ or proxy URLs — camera_proxy needs auth that images can't send.",clip_template:"Video URL/path or Jinja2 template (same variables as the image template), played in the detail dialog.",events:"List of events: title, start, end, description, icon, color, severity, category.",actions:"Buttons under each event. Native actions use tap_action keys (action: perform-action, …); strings support {field} placeholders.",tap_action:'"Default action" opens the Chronicle detail dialog. Strings support {field} placeholders such as {id} or {entity_id}.',icon_map:"Category/keyword → icon, e.g. {person: mdi:walk}.",color_map:'Category/keyword → color, e.g. {person: "#FF9800"}.',state_filter:"Only log changes into these states. Empty = all changes.",state_map:'Raw state → label, e.g. {"on": Opened}.',state_icon:'Raw state → icon, e.g. {"on": mdi:door-open}.',state_color:'Raw state → color, e.g. {"on": "#4CAF50"}.',window_seconds:"Leave empty to inherit the card-level grouping.",entity_config:"Overrides for individual entities."};let oi=class extends le{constructor(){super(...arguments),this.index=0}get _entities(){const e=[...this.source.entities??[]];return this.source.entity&&!e.includes(this.source.entity)&&e.push(this.source.entity),e}_friendlyName(e){return this.hass?.states[e]?.attributes?.friendly_name||e}_attributeOptions(e){const t=new Set(["friendly_name","icon","entity_picture","supported_features","device_class","unit_of_measurement","attribution","restored"]),i=new Map;for(const o of e){const e=this.hass?.states[o];for(const o of Object.keys(e?.attributes??{}))t.has(o)||i.has(o)||i.set(o,e&&this.hass?.formatEntityAttributeName?.(e,o)||o)}return[...i].map(([e,t])=>({value:e,label:t}))}_stateFilterSelector(e){if(function(e,t,i){const o=/^(\d+)\.(\d+)/.exec(e?.config?.version??"");if(!o)return!1;const[r,n]=[Number(o[1]),Number(o[2])];return r>t||r===t&&n>=i}(this.hass,2025,9))return{state:{entity_id:e,multiple:!0}};const t=this.hass?.states[e],i=t?.attributes??{},o=[...new Set([...ei[e.split(".")[0]]??[],...Array.isArray(i.options)?i.options:[],...Array.isArray(i.hvac_modes)?i.hvac_modes:[],...t?[t.state]:[]])].map(e=>({value:e,label:t&&this.hass?.formatEntityState?.(t,e)||e}));return{select:{multiple:!0,custom_value:!0,mode:"dropdown",options:o}}}_entitySchema(e,t){const i=[{name:"name",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"icon",selector:{icon:{}}},{name:"color",selector:{color_rgb:{}}},{name:"severity",selector:Qt}]}],o=[{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}}];return"history"!==t?[...i,...o]:[...i,{name:"state_filter",selector:this._stateFilterSelector(e)},{name:"show_attributes",selector:{select:{multiple:!0,custom_value:!0,mode:"dropdown",options:this._attributeOptions([e])}}},{name:"state_map",selector:{object:{}}},{name:"state_icon",selector:{object:{}}},{name:"state_color",selector:{object:{}}},{name:"image_template",selector:{template:{}}},{name:"clip_template",selector:{template:{}}},...o]}get _schema(){const e=this.source.type,t=this._entities,i={name:"",type:"grid",schema:[{name:"type",required:!0,selector:{select:{mode:"dropdown",options:Xt}}},{name:"name",selector:{text:{}}}]},o={name:"poll_interval",selector:{number:{min:5,max:86400,mode:"box",unit_of_measurement:"s"}}};let r=[];switch(e){case"calendar":r=[{name:"entity",selector:{entity:{filter:{domain:"calendar"}}}}];break;case"rest":r=[{name:"url",selector:{text:{}}},{name:"ws_params",selector:{object:{}}},{name:"response_path",selector:{text:{}}},{name:"field_map",selector:{object:{}}},{name:"media_url_template",selector:{text:{}}},{name:"clip_url_template",selector:{text:{}}},o];break;case"history":r=[{name:"entities",selector:{entity:{multiple:!0}}},{name:"show_attributes",selector:{select:{multiple:!0,custom_value:!0,mode:"dropdown",options:this._attributeOptions(t)}}},{name:"image_template",selector:{template:{}}},{name:"clip_template",selector:{template:{}}}];break;case"logbook":r=[{name:"entities",selector:{entity:{multiple:!0}}},o];break;case"static":r=[{name:"events",selector:{object:{}}}]}const n="history"!==e&&"logbook"!==e||!t.length?[]:[{type:"expandable",name:"entity_config",title:"Per-entity settings",icon:"mdi:tune",schema:t.map(t=>({type:"expandable",name:t,title:this._friendlyName(t),schema:this._entitySchema(t,e)}))}];return[i,...r,...n,{type:"expandable",title:"Interactions",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"actions",selector:{object:{}}}]},{type:"expandable",title:"Appearance",icon:"mdi:palette-outline",schema:[{name:"",type:"grid",schema:[{name:"default_icon",selector:{icon:{}}},{name:"default_color",selector:{color_rgb:{}}},{name:"default_severity",selector:Qt}]},..."static"===e?[]:[{name:"icon_map",selector:{object:{}}},{name:"color_map",selector:{object:{}}}]]},{type:"expandable",name:"grouping",title:"Grouping override",icon:"mdi:group",schema:[{name:"",type:"grid",schema:[{name:"window_seconds",selector:{number:{min:0,max:86400,mode:"box",unit_of_measurement:"s"}}},{name:"min_group_size",selector:{number:{min:2,max:100,mode:"box"}}}]},{name:"group_by",selector:{select:{mode:"dropdown",options:Bt}}},{name:"group_name",selector:{text:{}}}]}]}get _data(){const e={...this.source};if("history"===e.type||"logbook"===e.type){e.entities=this._entities,delete e.entity;const t=this.source.entity_config??{};e.entity_config=Object.fromEntries(this._entities.map(e=>[e,Yt({...t[e]},["color"],Vt)]))}return Yt(e,["default_color"],Vt)}_hint(){const e=this._entities;return 1===e.length?this._friendlyName(e[0]):e.length>1?`${e.length} entities`:this.source.url?this.source.url:this.source.ws_params?.type?String(this.source.ws_params.type):this.source.events?.length?`${this.source.events.length} events`:""}render(){if(!this.source||!this.hass)return K;const e=Xt.find(e=>e.value===this.source.type)?.label??this.source.type,t=this._hint();return G`
      <ha-expansion-panel
        outlined
        .header=${this.source.name||e}
        .secondary=${t?`${e} · ${t}`:e}
      >
        <div class="body">
          <ha-form
            .hass=${this.hass}
            .data=${this._data}
            .schema=${this._schema}
            .computeLabel=${Zt(this.hass,ti)}
            .computeHelper=${e=>ii[e.name??""]}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <button class="remove" @click=${this._remove}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>Remove source
          </button>
        </div>
      </ha-expansion-panel>
    `}_valueChanged(e){e.stopPropagation();const t=Yt({...e.detail.value},["default_color"],Jt);if("history"===t.type||"logbook"===t.type){delete t.entity;const e=new Set(t.entities??[]),i=t.entity_config??{};t.entity_config=Object.fromEntries(Object.entries(i).filter(([t])=>e.has(t)).map(([e,t])=>[e,qt(Yt(t,["color"],Jt),void 0,void 0)]))}const i=qt(t,void 0,void 0);this.dispatchEvent(new CustomEvent("source-changed",{bubbles:!0,composed:!0,detail:{index:this.index,source:i}}))}_remove(){this.dispatchEvent(new CustomEvent("source-removed",{bubbles:!0,composed:!0,detail:{index:this.index}}))}};oi.styles=a`
    :host { display: block; margin-bottom: 8px; }
    .body { padding: 0 0 8px; }
    .remove {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 12px;
      padding: 6px 12px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
      border-radius: 18px;
      background: transparent;
      color: var(--error-color, #db4437);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .remove:hover, .remove:focus-visible { border-color: var(--error-color, #db4437); outline: none; }
    .remove ha-icon { --mdc-icon-size: 16px; }
  `,e([me({attribute:!1})],oi.prototype,"hass",void 0),e([me({attribute:!1})],oi.prototype,"source",void 0),e([me({type:Number})],oi.prototype,"index",void 0),oi=e([he("chronicle-source-editor")],oi);const ri=[{value:"critical",label:"Critical"},{value:"warning",label:"Warning"},{value:"info",label:"Info"},{value:"debug",label:"Debug"}],ni=["person","vehicle","animal","pet","security","motion","door","lock","camera","light","climate","automation","system"].map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)})),ai=[{type:"history",label:"Entity state",icon:"mdi:history"},{type:"logbook",label:"Logbook",icon:"mdi:format-list-bulleted"},{type:"calendar",label:"Calendar",icon:"mdi:calendar"},{type:"rest",label:"REST / WebSocket",icon:"mdi:api"},{type:"static",label:"Static events",icon:"mdi:playlist-edit"}],si=["critical","warning","info","debug"],ci={...ye,appearance:{...ye.appearance,severity_colors:Yt(ye.appearance.severity_colors,si,e=>Jt(Vt(e)))}},li={layout:"Layout",time_format:"Time format",max_events:"Max events",days_back:"Days back",days_forward:"Days forward",show_header:"Show header",show_layout_toggle:"Show layout toggle",filters:"Filters",search:"Search",categories:"Categories",severities:"Severities",sources:"Sources",entities:"Entities",exclude_search:"Exclude search",exclude_categories:"Exclude categories",exclude_severities:"Exclude severities",exclude_sources:"Exclude sources",exclude_entities:"Exclude entities",grouping:"Grouping",enabled:"Group similar events",window_seconds:"Window",min_group_size:"Minimum group size",group_by:"Group by",group_name:"Group name",appearance:"Appearance",card_height:"Card height",compact:"Compact mode",show_description:"Show description",show_images:"Show images",show_icons:"Show icons",show_severity_badge:"Show severity badge",show_category:"Show category tags",animate_new_events:"Animate new events",severity_colors:"Severity colors",critical:"Critical",warning:"Warning",info:"Info",debug:"Debug"},di={time_format:"Leave empty to follow your Home Assistant profile.",days_back:"Whole numbers are calendar days (0 = today since midnight); decimals are a rolling window.",days_forward:"Show upcoming calendar/static events. 0 = none.",search:"Only show events containing this text.",exclude_search:"Hide events containing this text.",group_name:"Custom summary. Placeholders: {count}, {label}, {source}, {entity}.",card_height:'A fixed height (e.g. 400px), "fill" for Panel layout, or "auto" to grow with content. In a sections view, resizing the card height also fills.',compact:'Single-line events. Descriptions are hidden unless "Show description" is enabled explicitly.',show_description:'Secondary line such as "Off → On".'};let hi=class extends le{constructor(){super(...arguments),this._computeHelper=e=>di[e.name??""]}connectedCallback(){super.connectedCallback(),(customElements.get("ha-form")&&customElements.get("hui-action-editor")?Promise.resolve():(Rt??=(async()=>{try{const e=await(window.loadCardHelpers?.());for(const t of["tile","button"]){e?.createCardElement({type:t,entity:"sun.sun"});const i=`hui-${t}-card`;await Promise.race([customElements.whenDefined(i),new Promise(e=>setTimeout(e,2e3))]);const o=customElements.get(i);await(o?.getConfigElement?.())}}catch{}await Promise.all(["ha-form","ha-expansion-panel"].map(e=>Promise.race([customElements.whenDefined(e),new Promise(e=>setTimeout(e,5e3))])))})(),Rt)).then(()=>this.requestUpdate())}setConfig(e){this._config=e}get _generalSchema(){return[{name:"title",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"vertical",label:"Vertical"},{value:"horizontal",label:"Horizontal"}]}}},{name:"time_format",selector:{select:{mode:"dropdown",options:[{value:"24h",label:"24 hour"},{value:"12h",label:"12 hour"}]}}},{name:"days_back",selector:{number:{min:0,max:365,step:"any",mode:"box",unit_of_measurement:"days"}}},{name:"days_forward",selector:{number:{min:0,max:365,step:"any",mode:"box",unit_of_measurement:"days"}}},{name:"max_events",selector:{number:{min:1,max:1e3,mode:"box"}}}]},{name:"",type:"grid",schema:[{name:"show_header",selector:{boolean:{}}},{name:"show_layout_toggle",selector:{boolean:{}}}]}]}get _optionsSchema(){const e=(this._config?.sources??[]).filter(e=>e.name).map(e=>({value:e.name,label:e.name})),t=(e,t=!0)=>({select:{multiple:!0,custom_value:t,mode:"dropdown",options:e}});return[{type:"expandable",name:"filters",title:"Filters",icon:"mdi:filter-outline",schema:[{name:"search",selector:{text:{}}},{name:"categories",selector:t(ni)},{name:"severities",selector:t(ri,!1)},{name:"sources",selector:t(e)},{name:"entities",selector:{entity:{multiple:!0}}},{type:"expandable",title:"Exclusions",icon:"mdi:filter-remove-outline",schema:[{name:"exclude_search",selector:{text:{}}},{name:"exclude_categories",selector:t(ni)},{name:"exclude_severities",selector:t(ri,!1)},{name:"exclude_sources",selector:t(e)},{name:"exclude_entities",selector:{entity:{multiple:!0}}}]}]},{type:"expandable",name:"grouping",title:"Grouping",icon:"mdi:group",schema:[{name:"enabled",selector:{boolean:{}}},{name:"",type:"grid",schema:[{name:"window_seconds",selector:{number:{min:0,max:86400,mode:"box",unit_of_measurement:"s"}}},{name:"min_group_size",selector:{number:{min:2,max:100,mode:"box"}}}]},{name:"group_by",selector:{select:{mode:"dropdown",options:Bt}}},{name:"group_name",selector:{text:{}}}]},{type:"expandable",name:"appearance",title:"Appearance",icon:"mdi:palette-outline",schema:[{name:"card_height",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"400px",label:"400px"},{value:"auto",label:"Auto (grow with content)"},{value:"fill",label:"Fill available space"}]}}},{name:"",type:"grid",schema:[{name:"compact",selector:{boolean:{}}},{name:"show_description",selector:{boolean:{}}},{name:"show_images",selector:{boolean:{}}},{name:"show_icons",selector:{boolean:{}}},{name:"show_severity_badge",selector:{boolean:{}}},{name:"show_category",selector:{boolean:{}}},{name:"animate_new_events",selector:{boolean:{}}}]},{type:"expandable",name:"severity_colors",title:"Severity colors",schema:[{name:"",type:"grid",schema:si.map(e=>({name:e,selector:{color_rgb:{}}}))}]}]}]}get _displayData(){const e=this._config,t={...ye.appearance,...e.appearance};return{...ye,...e,filters:{...ye.filters,...e.filters},grouping:{...ye.grouping,...e.grouping},appearance:{...t,show_description:t.show_description??!t.compact,severity_colors:Yt({...ye.appearance.severity_colors,...t.severity_colors},si,Vt)}}}render(){if(!this._config||!this.hass)return K;const e=this._displayData,t=Zt(this.hass,li),i=this._config.sources??[];return G`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${this._generalSchema}
        .computeLabel=${t}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._formChanged}
      ></ha-form>

      <div class="sources">
        <div class="sources-header">Sources <span class="count">${i.length}</span></div>
        ${0===i.length?G`<p class="empty">Add a source to start building the timeline.</p>`:K}
        ${i.map((e,t)=>G`
          <chronicle-source-editor
            .hass=${this.hass}
            .source=${e}
            .index=${t}
            @source-changed=${this._sourceChanged}
            @source-removed=${this._sourceRemoved}
          ></chronicle-source-editor>
        `)}
        <div class="add-row">
          ${ai.map(e=>G`
            <button class="add-btn" @click=${()=>this._addSource(e.type)}>
              <ha-icon .icon=${e.icon}></ha-icon>${e.label}
            </button>
          `)}
        </div>
      </div>

      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${this._optionsSchema}
        .computeLabel=${t}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._formChanged}
      ></ha-form>
    `}_formChanged(e){e.stopPropagation();const t={...e.detail.value},i={...t.appearance};i.severity_colors&&(i.severity_colors=Yt(i.severity_colors,si,Jt));const o=this._config?.appearance;void 0===o?.show_description&&i.show_description===!o?.compact&&delete i.show_description,t.appearance=i,this._commit(t)}_sourceChanged(e){e.stopPropagation();const{index:t,source:i}=e.detail,o=[...this._config.sources??[]];o[t]=i,this._commit({...this._config,sources:o})}_sourceRemoved(e){e.stopPropagation();const t=[...this._config.sources??[]];t.splice(e.detail.index,1),this._commit({...this._config,sources:t})}_addSource(e){const t=ai.find(t=>t.type===e)?.label??e,i=[...this._config.sources??[],{type:e,name:t}];this._commit({...this._config,sources:i})}_commit(e){const t=this._config,{type:i,sources:o,...r}=e,n=qt(r,t,ci),a=[...Object.keys(t).filter(e=>e in n),...Object.keys(n).filter(e=>!(e in t))],s={type:i??t.type,...Object.fromEntries(a.map(e=>[e,n[e]])),sources:o??t.sources??[]};this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:s}}))}};hi.styles=a`
    :host { display: block; }
    .sources {
      margin: 16px 0;
    }
    .sources-header {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .sources-header .count {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .empty {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin: 0 0 8px;
    }
    .add-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .add-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px dashed var(--divider-color, rgba(127,127,127,0.3));
      border-radius: 18px;
      background: transparent;
      color: var(--primary-color);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .add-btn:hover, .add-btn:focus-visible {
      border-color: var(--primary-color);
      outline: none;
    }
    .add-btn ha-icon { --mdc-icon-size: 16px; }
  `,e([me({attribute:!1})],hi.prototype,"hass",void 0),e([ge()],hi.prototype,"_config",void 0),hi=e([he($e)],hi);const pi=/^(binary_sensor|lock|cover|person|device_tracker|alarm_control_panel|climate|vacuum)\./,ui=window;ui.customCards=ui.customCards||[],ui.customCards.push({type:we,name:"Chronicle Card",description:"A universal, extensible timeline card for Home Assistant",preview:!0,documentationURL:"https://github.com/KadenThomp36/chronicle-card",getEntitySuggestion:(e,t)=>{const i=e.states[t]?.attributes?.friendly_name||t;return t.startsWith("calendar.")?{config:{type:`custom:${we}`,title:i,days_forward:7,sources:[{type:"calendar",entity:t}]}}:pi.test(t)?{config:{type:`custom:${we}`,title:i,sources:[{type:"history",entities:[t]}]}}:null}}),console.info("%c CHRONICLE-CARD %c v1.14.0 ","color: #fff; background: #2196F3; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #2196F3; background: #e3f2fd; font-weight: 500; padding: 2px 6px; border-radius: 0 4px 4px 0;");
