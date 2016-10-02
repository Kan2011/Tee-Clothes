 /*!
 * GEClient v1.0.2
 * www.global-e.com
 *
 * Copyright (c) Global-E 
 *
 * GEClient is the base class for the Global-E widgets library
 * It define all the needed configuration, per client, it also exposes several utilities that are used by 
 * Global-E Server SDK (PHP/.Net) 
 *
 * Authors        Eden Zaharoni
 */

//Device Detector
(function () {
    
    var e, t, n, r, i, s, o, u, a, f; e = window.device;
    window.device = {}; n = window.document.documentElement; f = window.navigator.userAgent.toLowerCase();
    device.ios = function ()
    { return device.iphone() || device.ipod() || device.ipad() }; device.iphone = function () { return r("iphone") }; device.ipod = function () { return r("ipod") }; device.ipad = function () { return r("ipad") }; device.android = function () { return r("android") }; device.androidPhone = function () { return device.android() && r("mobile") }; device.androidTablet = function () { return device.android() && !r("mobile") }; device.blackberry = function () { return r("blackberry") || r("bb10") || r("rim") }; device.blackberryPhone = function () { return device.blackberry() && !r("tablet") }; device.blackberryTablet = function () { return device.blackberry() && r("tablet") }; device.windows = function () { return r("windows") }; device.windowsPhone = function () { return device.windows() && r("phone") }; device.windowsTablet = function () { return device.windows() && r("touch") && !device.windowsPhone() }; device.fxos = function () { return (r("(mobile;") || r("(tablet;")) && r("; rv:") }; device.fxosPhone = function () { return device.fxos() && r("mobile") }; device.fxosTablet = function () { return device.fxos() && r("tablet") }; device.meego = function () { return r("meego") }; device.cordova = function () { return window.cordova && location.protocol === "file:" }; device.nodeWebkit = function () { return typeof window.process === "object" }; device.mobile = function () { return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego() }; device.tablet = function () { return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet() }; device.desktop = function () { return !device.tablet() && !device.mobile() }; device.portrait = function () { return window.innerHeight / window.innerWidth > 1 }; device.landscape = function () { return window.innerHeight / window.innerWidth < 1 }; device.noConflict = function () { window.device = e; return this }; r = function (e) { return f.indexOf(e) !== -1 }; s = function (e) { var t; t = new RegExp(e, "i"); return n.className.match(t) }; t = function (e) { if (!s(e)) { return n.className += " " + e } }; u = function (e) { if (s(e)) { return n.className = n.className.replace(e, "") } }
}).call(this);
//Main Class
function GEClient() {
    //This property is merchant specific!
    this.MerchantID = null;
    this.IsMobile = device.mobile();
    this.IsTablet = device.tablet();
    this.MobileScriptLoaded = false;
    this.InMobileInitiation = false;
    this.InABDataInitiation = false;
    this.PopupReposition = null;//func to repos popups
    this.PopupRepositionContext = null;
    this.InTracking = false;
    this.MobileDetectionEnabled = true;
    this.ForceMobileDetection = false;
    this.Country = null;
    this.PopupOpacity = null;
    this.LoadShippingSwitcherCalled = false;
    this.CookieDomain =  document.domain;
    this.Currency = null;
    this.Exception = null;
    this.ScriptsVersion = null;
    this.Culture = null;
    this.LogErrors = true;
    this.waitOn = false;
    this.SkinEnvironmentCode = "live";
    this.FadeFX = true;
    this.GEBaseURL = "https://web.global-e.com/"; //GE base url
    this.GE_DATA_COOKIE = "GlobalE_Data"; //Data cookie name [showWelcome|cultureCode|currencyCode|countryISO]
    this.GE_USB_COOKIE = "GlobalE_USB_Data"; //Cookie for unsupported browsers
    this.GE_CT_COOKIE = "GlobalE_CT_Data"; //if allowed by merchant will store the current user guid
    this.GE_CT_TRACKED = "GlobalE_CT_Tracked"; //if not full tracking is allowed, this cookie will be created to prevent further tracking while it exists
    this.GE_DATA_WELCOME_COOKIE = "GlobalE_Welcome_Data";
    this.GE_DATA_COOKIE_EXP = 3;//(DAYS) Data cookie expiration
    this.GE_USB_COOKIE_EXP = 1;
    this.GE_CT_COOKIE_EXP = 365 * 10; //client guid cookie
    this.WelcomeManager = { Base: this, IsShown: false, Initiated: false };
    this.UnSupportaedPlatform = { Base: this };
    this.CheckoutManager = { Base: this };
    this.MobileManager = { Base: this };
    this.AlwaysShowWelcome = false;
    this.ShowWelcome = true;//default
    this.CultureChanged = false; //in current context
    this.PassFullQS = true;
    this.OnBeforeWelcomeCallback = [];
    this.OnBeforeSwitcherCallback = [];
    this.OnShippingCountryChangedCallback = [];
    this.OnWelcomeShownCallback = [];
    this.OnChangeShippingCountryClickedCallback = [];
    this.OnCheckoutStepLoadedCallback = [];
    this.OnClientEventCallback = [];
    this.QuerySessionValidityCallback = null;
    this.MPH = null;
    this.OnBeforePopupOpenCallback = null;
    this.OnLoadCallBack = null;
    this.DynContent = [];
    this.ABEnabled = false;
    this.ABData = null;
    this.ABID = null;
    this.ABGrpID = null;
    this.ShowPopupOverlay = true;
    this.Context = "CLIENT";
    this.CID = null;//only relevant if merchant allows tracking
    this.SESID = null //only relevant if merchant allows tracking
    this.DBG = false;
    this.Prefetcher = new GEPrefetcher(this);
    this.WelcomeUrl = null;
    this.SwitcherUrl = null;
    this.SwitcherScriptsArr = [];
    this.SSQ = [];
    this.OnShippingSwitcherClosedCallback = [];
    this.QueuePriorities = {
        "SetMerchantParameters": 1,
        "ScriptsURL": 2
    };
    var self = this;

    this.DOMReady(function () {
        self.Prefetcher.Prefetch();
    });

    this.PopupData = {
        welcome: { callback : this.OnBeforeWelcomeCallback, invoked:0 },
        switcher: {callback : this.OnBeforeSwitcherCallback, invoked : 0 }
    };


    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) { 
                return typeof args[number] !== 'undefined'
                  ? args[number]
                  : match
                ;
            });
        };
    }

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fun /*, thisp*/) {
            var len = this.length >>> 0;
            if (typeof fun !== "function") {
                throw new TypeError();
            }

            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in this) {
                    fun.call(thisp, this[i], i, this);
                }
            }
        };
    }
    String.prototype.bool = function () {
        return (/^true$/i).test(this);
    };
 

    if (this.GetQueryParam("geskinmode") !== null) {
        this.SkinEnvironment(this.GetQueryParam("geskinmode"));
    }
    if (this.GetQueryParam("geismobile") !== null && this.GetQueryParam("geismobile") === "true") {
        this.IsMobile = true;
        this.ForceMobileDetection = true;
    }
    if (this.GetQueryParam("geistablet") != null && this.GetQueryParam("geistablet") === "true") {
        this.IsTablet = true;
        this.ForceMobileDetection = true;
    }
    if (this.GetQueryParam("gesw") != null && this.GetQueryParam("gesw") == "false") {
        this.ShowWelcome = false;
    }
}

function GEPrefetcher(client) {
    this.Base = client;
}

//Load prefetching URL to speed checkout load times
GEPrefetcher.prototype.Prefetch = function () {
    try
    {
        var cacheBuster = GlobalE.MPH.Get(MPH.K.CacheBuster, MPH.T.String);
    
        //get merchant and country
        var mId = this.Base.MerchantID;
        //Get current country
        var cookieData = this.Base.GetCookie(GlobalE.GE_DATA_COOKIE, true) ||
                { countryISO: 'IL' };
       
            var country = cookieData.countryISO;
       

        var url = this.Base.GetCDNUrl();
        url += "shared/prefetcher/" + mId + "/" + country;
        if (cacheBuster != null) {
            url += "?cb=" + cacheBuster;
        }
        //create iframe
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", url);
        iframe.setAttribute("width", "1px");
        iframe.setAttribute("height", "1px");
        iframe.style.display = "none";
     
        document.getElementsByTagName("body")[0].appendChild(iframe);
    }
    catch (err) {
        console.log("prefetch error!");
    }
}

GEClient.prototype.GetPopupCallbackData = function (popup) {
    for (var item in this.PopupData) {
        if (item == popup) {
            return this.PopupData[item];
        }
    }
}
GEClient.prototype.IsPlatformSupported = function () {
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var ieversion = new Number(RegExp.$1);
        if (ieversion <= 7) {
            return false;
        } 
    }

    return true;
}
GEClient.prototype.Wait = function () {
    this.waitOn = true;
}
GEClient.prototype.Release = function () {
    this.waitOn = false;
}
GEClient.prototype.HandleQAction = function (data) {
   
    var action = data[0];
    var arr = Array.prototype.slice.apply(data)
    arr = arr.slice(1);
 
    switch (action) {
        case "ShippingSwitcher":       
            this.SSQ.push(arr);
            break;
        default:
            GlobalE[action].apply(GlobalE, arr);
            break;
    }
}
GEClient.prototype.SetContext = function (context) {
    this.Context = context;
}
GEClient.prototype.OnBeforePopupOpen = function (callback) {
    this.OnBeforePopupOpenCallback = callback;
}
GEClient.prototype.QuerySessionValidity = function (callback) {
    this.QuerySessionValidityCallback = callback;
}
GEClient.prototype.OnCheckoutStepLoaded = function (callback) {    
    this.OnCheckoutStepLoadedCallback.push(callback);
}
GEClient.prototype.OnClientEvent = function (callback) { 
    this.OnClientEventCallback.push(callback);
}
GEClient.prototype.OnBeforeWelcome = function (callback) {
    this.OnBeforeWelcomeCallback.push(callback);
}
GEClient.prototype.OnShippingCountryChanged = function (callback) {
    this.OnShippingCountryChangedCallback.push(callback);
}
GEClient.prototype.OnWelcomeShown = function (callback) {
    this.OnWelcomeShownCallback.push(callback);
}
GEClient.prototype.OnChangeShippingCountryClicked = function (callback) {
    this.OnChangeShippingCountryClickedCallback.push(callback)
}
GEClient.prototype.OnBeforeSwitcher = function (callback) {
    this.OnBeforeSwitcherCallback.push(callback);
}
GEClient.prototype.DynamicContent = function (popup, key, value) {
    popup = popup.toLowerCase();
    if (this.DynContent[popup] == null) {
        this.DynContent[popup] = [];
    }
    this.DynContent[popup].push({ "key": key, "value": value });
}
GEClient.prototype.OnShippingSwitcherClosed = function (callback) {
    this.OnShippingSwitcherClosedCallback.push(callback);
 
}
GEClient.prototype.ActionExec = function () {
    GlobalE.HandleQAction(arguments);
}
//Check is an object is undefined
GEClient.prototype.IsUndefined = function(obj){
    if (typeof obj == "undefined" || obj==null)
        return true;
    else
        return false;
}
GEClient.prototype.IsUndefinedOrEmpty = function (obj) {
    if (this.IsUndefined(obj)) return true;
    if (typeof obj == "string" && obj == "") return true;
    return false;
}
//Gets a client cookie, if isJson is true, the cookie content is return after json deserialization
GEClient.prototype.GetCookie = function(c_name,isJson)
{
    try{
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1)
        {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1)
        {
            c_value = null;
        }
        else
        {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start,c_end));
        }

        if (!this.IsUndefined(isJson) && isJson)
        {
            return JSON.parse(c_value);
        }

        return c_value;
    }
    catch (ex) {
        this.HandleError(ex, "GetCookie");
    }
}
GEClient.prototype.SetParam = function (paramName, paramValue) {
    this[paramName] = paramValue;
}

//Sets a cookie, if isJson is true, the value is serialized to json
GEClient.prototype.SetCookie = function(c_name,value,exdays,isJson)
{
    try {
        if (this.CookieDomain == null) {
            this.CookieDomain = document.domain;
        }
        if (!this.IsUndefined(isJson) && isJson)
        {
            value = JSON.stringify(value);
        }
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + ";domain=" + this.CookieDomain + ";path=/";  
        document.cookie = c_name + "=" + c_value;    
    }
    catch (ex) {
        this.HandleError(ex, "SetCookie");
    }
}

GEClient.prototype.AddMeta = function (name, content) {
    //check for existing
    var prevMeta = document.querySelector("meta[name=" + name + "]");
    if (prevMeta != null) {
        //remove existing viewport
        prevMeta.parentElement.removeChild(prevMeta);        
    }
    var meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    document.getElementsByTagName("head")[0].appendChild(meta);
}

//Adds a <script> tag to the head
GEClient.prototype.AddScript = function (url, onLoad, isAsync) {
    try
    {
       
        isAsync = this.IsUndefined(isAsync) ? false : isAsync;
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = url;
        s.async = (isAsync) ? true : false;

        if (!this.IsUndefined(onLoad)) {
            this.RegisterScriptLoad(s, onLoad);
        }      
        document.getElementsByTagName("head")[0].appendChild(s);
    }
    catch (ex) {
        this.HandleError(ex, "AddScript");
    }
}

GEClient.prototype.HandleError = function (ex, f) {
    if (this.LogErrors) {
        console.log("Exception in GEClient." + f + " : " + ex.message);
    }
}

GEClient.prototype.IsStylesheetAdded = function (href) {
    try{
        var links = document.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            if (links[i].getAttribute("rel") == "stylesheet") {
                if (links[i].getAttribute("href") == href) {
                    return true;
                }
            }
        }

        return false;
    }
    catch (ex) {
        this.HandleError(ex, "IsStylesheetAdded");
    }
}
GEClient.prototype.AddStyleString = function (id, cssString) {
 
    var styleObj = document.getElementById(id);
    if (!styleObj) {
        styleObj = document.createElement("style");
        styleObj.id = id;
        styleObj.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(styleObj);
    }
    if (styleObj.styleSheet) {
        styleObj.styleSheet.cssText = cssString;
    } else {
        if (styleObj.childNodes.length > 0) {
            //Removed on 30/6 - adding styles will not remove previous styles
            //styleObj.removeChild(styleObj.childNodes[0]);
        }
        styleObj.appendChild(document.createTextNode(cssString));
    }    
}

//Adds a <link with a css file to the head 
GEClient.prototype.AddStyle = function (url, onLoad) {
    try{
        if (this.IsStylesheetAdded(url)) {
            if (!this.IsUndefined(onLoad)) {
                onLoad();
            }
            return;
        }
        var s = document.createElement("link");
        s.rel = "stylesheet";
        s.type = "text/css";
        s.href = url;
      
        if (!this.IsUndefined(onLoad)) {
            this.RegisterScriptLoad(s, onLoad);
        }

        document.getElementsByTagName("head")[0].appendChild(s);
    }
    catch (ex) {
        this.HandleError(ex, "AddStyle");
    }
}
GEClient.prototype.GetReloadURL = function () {
    var curHash = location.hash;
    var finalURL = "";
    if (curHash != "") {
        //hash exists
        finalURL = this.AddParameter(window.location.href, "geRpwh", new Date().getTime(), false);
    }
    else {
        finalURL = window.location.href;
    }

    return finalURL.replace(/((glCountry|glCurrency)=.*?(&|$))+/i, "");

}
GEClient.prototype.AddParameter = function (url, parameterName, parameterValue, atStart/*Add param before others*/) {
    replaceDuplicates = true;
    if (url.indexOf('#') > 0) {
        var cl = url.indexOf('#');
        urlhash = url.substring(url.indexOf('#'), url.length);
    } else {
        urlhash = '';
        cl = url.length;
    }
    sourceUrl = url.substring(0, cl);

    var urlParts = sourceUrl.split("?");
    var newQueryString = "";

    if (urlParts.length > 1) {
        var parameters = urlParts[1].split("&");
        for (var i = 0; (i < parameters.length) ; i++) {
            var parameterParts = parameters[i].split("=");
            if (!(replaceDuplicates && parameterParts[0] == parameterName)) {
                if (newQueryString == "")
                    newQueryString = "?";
                else
                    newQueryString += "&";
                newQueryString += parameterParts[0] + "=" + (parameterParts[1] ? parameterParts[1] : '');
            }
        }
    }
    if (newQueryString == "")
        newQueryString = "?";

    if (atStart) {
        newQueryString = '?' + parameterName + "=" + parameterValue + (newQueryString.length > 1 ? '&' + newQueryString.substring(1) : '');
    } else {
        if (newQueryString !== "" && newQueryString != '?')
            newQueryString += "&";
        newQueryString += parameterName + "=" + (parameterValue ? parameterValue : '');
    }
    return urlParts[0] + newQueryString + urlhash;
};

GEClient.prototype.ReloadPage = function (optUrl) {
    if (this.waitOn) {
        var self = this;
        //wait was activated
        setTimeout(function () {
            self.ReloadPage(optUrl);
        }, 300);
    }
    else {
        if (this.IsUndefined(optUrl)) {     
            window.location = this.GetReloadURL();
        }
        else {
            window.location = optUrl;
        }
    }
}
//When needed to change shippment country or payment currency, this method can be called
GEClient.prototype.UpdateCustomerInfo = function (countryISO, currencyCode, doReload, optUrl) {
    try{
        var data = this.GetCookie(this.GE_DATA_COOKIE, true);
 
        if (this.IsUndefined(data)) {
            data = {};
        }
        if (!this.IsUndefined(countryISO) && countryISO.length == 2) {
            //update country iso
            data.countryISO = countryISO;
        }
        if (!this.IsUndefined(currencyCode) && currencyCode.length == 3) {
            //update currency iso
            data.currencyCode = currencyCode;
        }

        this.SetCookie(this.GE_DATA_COOKIE, data, this.GE_DATA_COOKIE_EXP, true);

 
        if (!this.IsUndefined(doReload) && doReload) {
            this.ReloadPage(optUrl);
        }
    }
    catch (ex) {
        this.HandleError(ex, "UpdateCustomerInfo");
    }
}
 

 
GEClient.prototype.AttachEvent = function (evnt, elem, func) {

    try {
         if (elem.addEventListener)  // W3C DOM
        {
            elem.addEventListener(evnt, func, false);
        }  
         else if (elem.attachEvent) { // IE DOM                   
            elem.attachEvent("on" + evnt, func);
        }  
        else { // No much to do
            elem[evnt] = func;
        }
    }
    catch (ex) {
        this.HandleError(ex, "AttachEvent");
    }
}

//Cross Browser event triggering 
GEClient.prototype.FireEvent = function (element, eventName, optArgs) {
    try{
        var e = null;
        if (document.createEvent) {
            //others
            e = document.createEvent('HTMLEvents');
            e.data = optArgs;
            e.initEvent(eventName, true, true);
            element.dispatchEvent(e);
        }
        else if (document.createEventObject) {
            //ie
            e = document.createEventObject();
            e.data = optArgs;         
            element.fireEvent('on' + eventName, e);
        }
       
    }
    catch (ex) {        
        this.HandleError(ex, "FireEvent");
    }
}


GEClient.prototype.IsStylesheetExist = function (url) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var ss = document.styleSheets[i];
        if (ss.href == url) {
            return true;
        }
    }

    return false;
}

//Helper Method - registers onload on script/link elements
GEClient.prototype.RegisterScriptLoad = function (scriptElement, callback) {
 
    try{
        var self = this;
        var fired = [];
        var linkCount = document.styleSheets.length;
        //for nonIE browsers
        scriptElement.onload = function () {
            if (fired.length == 0) {                
                fired.push(true);
                callback();
            }
        }
        if (self.DetectIE()) {
            this.IELoad(scriptElement, callback, fired);
        }

    }
    catch (ex) {
        this.HandleError(ex, "RegisterScriptLoad");
    }
}
GEClient.prototype.IELoad = function (script, callback, fired) {  
    var self = this;
    if (script.readyState == 'loaded' || script.readyState == 'completed') {       
        if (fired.length == 0) {
            fired.push(true);
            callback();
        }
    } else {
        console.log("settimeout");
        if (fired.length == 0) {
            setTimeout(function () { self.IELoad(script, callback, fired); }, 100);
        }
    }
}
GEClient.prototype.DetectIE = function () {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // IE 12 / Spartan
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge (IE 12+)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
//LOADER HELPERS

GEClient.prototype.SetOpacity = function (elementId, opacity) {
 
    var element = document.getElementById(elementId);
    element.style.opacity = opacity / 100;
    element.style.filter = 'alpha(opacity=' + opacity + ')';
}
GEClient.prototype.FadeProc = function (eID,i, timer, speed, stopOpacity, optCallback) {
        setTimeout(function () {
            GlobalE.SetOpacity(eID, i);
        }, timer * speed);

        if (i == stopOpacity) {
            setTimeout(function () {
                //done
                if (optCallback) {
                    optCallback();
                };
            }, timer * speed);
        }
}
GEClient.prototype.Fade = function (eID, startOpacity, stopOpacity, duration, optCallback) {
    if (!document.getElementById(eID)) return;
    var speed = Math.round(duration / 100);
    var timer = 0;
    var self = this;
    if (startOpacity < stopOpacity) { // fade in
        for (var i = startOpacity; i <= stopOpacity; i++) {
            this.FadeProc(eID,i, timer, speed, stopOpacity, optCallback);
            timer++;
        } return;
    }
    for (var i = startOpacity; i >= stopOpacity; i--) { // fade out
        this.FadeProc(eID,i, timer, speed, stopOpacity, optCallback);
        timer++;
    }
}

GEClient.prototype.SetCookieDomain = function (domain) { 
    this.CookieDomain = domain;
}


GEClient.prototype.CloseUnsupportedPlatformPopup = function (e) { 
    var overlay = document.getElementById("uspOverlay");
    var content = document.getElementById("uspContent");

    document.getElementsByTagName("body")[0].removeChild(overlay);
    document.getElementsByTagName("body")[0].removeChild(content);
}

GEClient.prototype.SkinEnvironment = function (code) { 
    if (code != "test" && code != "live") return;
    this.SkinEnvironmentCode = code; 
}
GEClient.prototype.SetDebug = function () { 
    //this.AlwaysShowWelcome = true;
    this.DBG = true;
}

GEClient.prototype.ScriptsURL = function (url) {
    if (!/\/$/.test(url)) {
        url += "/";
    }
    this.GEBaseURL = url;       
}
GEClient.prototype.OnLoad = function (callback) {   
    this.OnLoadCallBack = callback;
}

var popupStackCallbacks = [];
 
GEClient.prototype.RegisterOnBeforePopup = function (popup, country, culture, currency, complete) {
    var data = this.GetPopupCallbackData(popup);

    if (data.callback.length == 0) {
        if (!this.IsUndefined(complete)) {
            complete();
        }
        return;
    }

    data.invoked = 0;
    var self = this;
    var args = {
        country: country.toUpperCase(),
        culture: culture.toUpperCase(),
        currency: currency.toUpperCase(),
        onComplete: function (arrData) {
            if (!self.IsUndefined(arrData)) {
         
                //arrData = [{key : "", value : ""},{key : "", value : ""}]
                for (var i = 0; i < arrData.length; i++) {
                    self.DynamicContent(popup, arrData[i].key, arrData[i].value);
                }
            }
            var popupData = self.GetPopupCallbackData(popup);
            popupData.invoked++;
            if (!self.IsUndefined(complete)) {
                if (popupData.invoked == popupData.callback.length) {
                    complete();
                }                
            }
        }
    };


   
    this.FireStack(data.callback, args);

    //if (popup == "welcome") {
    //    this.FireStack(this.OnBeforeWelcomeCallback,args);
    //}
    //else if (popup == "switcher") {
    //    this.FireStack(this.OnBeforeSwitcherCallback,args);
    //}

}

GEClient.prototype.FireStack = function (stackArr) {
    var retData = [];
    var args = Array.prototype.slice.call(arguments, 1);
   
    stackArr.forEach(function (v, i, arr) {
        var response = v.apply(GlobalE, args);
        retData.push(response);
    });

    return retData;
}

//GEClient.prototype.RegisterOnBeforeWelcome = function (country, culture, currency,complete) {
//    var self = this;
//    this.FireStack(this.OnBeforeWelcomeCallback,{
//        country: country.toUpperCase(),
//        culture: culture.toUpperCase(),
//        currency: currency.toUpperCase(),
//        onComplete: function (arrData) {
//            if (!self.IsUndefined(arrData)) {
//                //arrData = [{key : "", value : ""},{key : "", value : ""}]
//                for (var i = 0; i < arrData.length; i++) {
//                    self.DynamicContent("welcome", arrData[i].key, arrData[i].value);
//                }
//            }
            
//            if (!self.IsUndefined(complete)) {
//                complete();
//            }
//        }
//    });
//}
GEClient.prototype.IsClient = function () { return this.Context == "CLIENT"; }
GEClient.prototype.IsServer = function () { return this.Context != "CLIENT"; }
GEClient.prototype.LoadUnsupportedPlatformProc = function () {        
    var self = this;
    
    //first we check if we need to abort
    if (this.IsClient() && !this.DBG) {
      
        var pdata = this.GetCookie(this.GE_USB_COOKIE, false);
          
        if (!this.IsUndefined(pdata)) {
            //abort                    
            return;
        }
        else {
            //unsupported popup was not shown in the last X days, we need to create a cookie to prevent showing it again for X days
            this.SetCookie(this.GE_USB_COOKIE, "true", this.GE_USB_COOKIE_EXP, false);
        }
    }

    var data = this.GetCookie(this.GE_DATA_COOKIE, true); 
    var cultureCode = null;
    if (!this.IsUndefined(data)) {
        cultureCode = data.cultureCode;
    }

    baseurl = this.GEBaseURL + "merchant/unsupportedPlatform?merchantId=" + this.MerchantID + "&ctx=" + this.Context + "&v=" + this.ScriptsVersion;
    if (cultureCode != null) {
        baseurl += "&culture=" + cultureCode;
    }
    this.AddScript(baseurl, function () {

    }, true);
}

//updates the merchant parameters from global-e servers
GEClient.prototype.SetMerchantParameters = function (objParameters) {
    this.MPH.P = objParameters;
    this.ABEnabled = this.MPH.Get(MPH.K.ABEnabled, MPH.T.Bool);

    var data = this.GetCookie(this.GE_DATA_COOKIE, true);
    if (data != null) {
        //if info cookie is present , extract the data in order to send it as part of the tracking call
        this.Country = data.countryISO;
        this.Currency = data.currencyCode;
        this.Culture = data.cultureCode;
    }

  
}

//Check for mobile mode
GEClient.prototype.IsMobileMode = function () {
     
    return this.IsMobile && (this.MobileDetectionEnabled || this.ForceMobileDetection);
}
//Check for tablet mode
GEClient.prototype.IsTabletMode = function () {
    var tabletAsMobile = GlobalE.MPH.Get(MPH.K.TabletAsMobile, MPH.T.Bool);
    return this.IsTablet && tabletAsMobile && (this.MobileDetectionEnabled || this.ForceMobileDetection);
}
//return the identification cookie that holds the current client id
GEClient.prototype.GetIDCookie = function () {
    var sesCookie = this.GetCookie(this.GE_CT_COOKIE, true);
    if (this.IsUndefined(sesCookie)) {
        return { CUID: null };
    }

    return sesCookie;
}

//jsonp callback - if the persist was called without cuid, then the server will return a
//new cuid to be persisted by the client
GEClient.prototype.TrackCallBack = function (CUID, SESID, sesCookieExists, isEx) {
   
    if (isEx) { this.InTracking = false; return; }
    //create cookie
    this.CID = CUID;
     
    //if not already created, create the client tracking cookie that will hold the client identifier.
    if (!sesCookieExists) {
        this.SetCookie(this.GE_CT_COOKIE, { CUID: CUID }, this.GE_CT_COOKIE_EXP, true);
    }

    //update session cookie
    var fullTracking = GlobalE.MPH.Get(MPH.K.FullClientTracking, MPH.T.Bool);
    this.SetCookie(this.GE_CT_TRACKED, { SESID: SESID, AllowFullTracking: fullTracking }, null, true);
    this.InTracking = false;
}

GEClient.prototype.InvokePopupReposition = function (popup) {       
    this.PopupReposition.call(this.PopupRepositionContext, popup);
}

GEClient.prototype.SetRepositioner = function (defaultFunc,context) {
    //check for mobile
    this.PopupRepositionContext = context;
    if (this.IsMobileMode() || this.IsTabletMode()) {
        //repositioner is from client lib
        this.PopupReposition = this.MobileManager.MobileRePosition;
    }
    else {
        //default repositioner
        this.PopupReposition = defaultFunc;
    }
}

GEClient.prototype.InitABData = function (oncomplete) {
    var self = this;
  
    if (!this.InABDataInitiation) {
        this.InABDataInitiation = true;
    
        if (!this.ABEnabled || this.MerchantID == null || this.Country == null) {
            //AB is not enabled for merchant - complete
            self.InABDataInitiation = false;
            oncomplete();
            return;
        }
         
        var url = this.GEBaseURL + "merchant/script/getabinfo";
        //add client parameters
        url += "?merchantId=" + this.MerchantID;
        url += "&countryCode=" + this.Country;
        url += "&isMobile=" + this.IsMobile;
 

        this.AddScript(url, function () {
            self.InABDataInitiation = false;
            self.SetABData();
            oncomplete();
        }, true);
    }
    else {
        setTimeout(function () {
            self.InitABData(oncomplete);
        }, 200);
    }
}
GEClient.prototype.SetABData = function () {
    if (this.ABData != null) {
        this.ABID = this.ABData.id;
        this.ABGrpID = this.ABData.group;
    }
}
 
GEClient.prototype.AppendAB = function (url) {
  
    if (this.ABData == null) {
        return url;
    }
 
    if (this.ABID != null && this.ABGrpID != null) {
        url += "&abid=" + this.ABID + "&abgrpid=" + this.ABGrpID;
        return url;
    }
       
    return url;
}

GEClient.prototype.InitMobileDevices = function (oncomplete) {
    var self = this;
    
    if (!this.InMobileInitiation) {
        this.InMobileInitiation = true;
        
        if (!(this.IsMobileMode() || this.IsTabletMode()) || this.MobileScriptLoaded) {
            self.InMobileInitiation = false;
            oncomplete();
            return;
        }            
        var url = this.GEBaseURL + "scripts/merchants/globale.merchant.client.mobile.js?v=" + this.ScriptsVersion;
        this.AddScript(url, function () {
            self.InMobileInitiation = false;
            oncomplete();
        }, true);
    }
    else {
        setTimeout(function () {
            self.InitMobileDevices(oncomplete);
        }, 200);
    }
}

//When client tracking is enabled, this function makes the actual tracking through global-e servers
GEClient.prototype.Track = function (optUrl, igGeObject) {
    var self = this;
    if (this.InTracking) { //currently doing a track
        setTimeout(function () {
            self.Track(optUrl, igGeObject);
        }, 100);
        return;
    }
    this.InTracking = true;
    //check for accidental arrival
    //if AB testing is not enabled and allow client tracking is false, we are not tracking any activity
    //If AB tests are enabled for client popups, then tracking for Welcome/Shipping Switcher will take place.
    if (!(this.MPH.Get(MPH.K.AllowClientTracking, MPH.T.Bool) || this.ABEnabled)) {
        this.InTracking = false;
        return;
    }
    //first check if the "tracked" cookie exists, if it exists, no further tracking should take place
    var fullTracking = GlobalE.MPH.Get(MPH.K.FullClientTracking, MPH.T.Bool);
    igGeObject = this.IsUndefined(igGeObject) ? false : igGeObject;
    //try get the Client tracking session cookie
    var trackedCookie = this.GetCookie(this.GE_CT_TRACKED, true);
    
    if (trackedCookie != null) {
        trackedCookie.AllowFullTracking = fullTracking;
        //cookie exists with false permissions, abort tracking
        if (trackedCookie.hasOwnProperty("AllowFullTracking") && //if property exisys on object
            !trackedCookie.AllowFullTracking) {     
            //if allow full tracking is set to false     
            this.InTracking = false;
            return;
        }

        //if full tracking is allowed, i also extract the session id from the cookie in order to send it back to
        //global-e servers
        this.SESID = trackedCookie.SESID;
    }
         

    //check cookie for GUID   
    //extract data cookie
    var country = "", currency = "", culture = "";
    var data = this.GetCookie(this.GE_DATA_COOKIE, true);
    if (data != null) {
        //if info cookie is present , extract the data in order to send it as part of the tracking call
        country = data.countryISO;
        currency = data.currencyCode;
        culture = data.cultureCode;
    }
       
    //prepare tracking URL
    var root = this.GetCDNUrl();
    
    var pixelUrl = root + "/merchant/track";
    var sesCookieExists = false;
    var sesCookie = this.GetIDCookie(); //try get the client id cookie

    pixelUrl += "?mid=" + this.MerchantID + "&";

    //if client id exists then add it as part of the track URL, if no, a null value will be sent, this will cause
    //global-e server to generate a new client id
    if (sesCookie.CUID!=null) {
        sesCookieExists = true;
        this.CID = sesCookie.CUID;
        pixelUrl += "cuid=" + this.CID + "&";                
    }

    
    if (this.SESID != null) {
        pixelUrl += "sesid=" + this.SESID + "&";
    }

    //Always send current location if optional URL was not supplied 
    if (this.IsUndefined(optUrl)) {
        optUrl = document.location.href;
    }

    pixelUrl += "optUrl=" + encodeURIComponent(optUrl) + "&";

    if (this.ABID != null && this.ABGrpID != null) {
        pixelUrl += "abid=" + this.ABID+ "&abgrpid=" + this.ABGrpID + "&";
    }
    pixelUrl += "igGeObject=" + igGeObject + "&";
    pixelUrl += "country={0}&currency={1}&culture={2}&sce={3}".format(country, currency, culture, sesCookieExists);
    //call pixel with/without guid    
 
    this.AddScript(pixelUrl);
    
}

GEClient.prototype.RegisterEventHandlers = function () {

    var gleBoxes = document.querySelectorAll(".gleContainer")
    for (var i = 0; i < gleBoxes.length; i++) {
        var el = gleBoxes[i];
        this.AttachEvent("click", el, function (e) {
            if (e.target.className.indexOf("gleShowSwitcher") != -1) {
                e.preventDefault();
                gle("ShippingSwitcher", "show");
            }
        });
    }




    //var switcherInvokers = document.querySelectorAll(".gleShowSwitcher");
    //for (var i = 0; i < switcherInvokers.length; i++) {
    //    var el = switcherInvokers[i];
    //    this.AttachEvent("click", el, function () {
    //        gle("ShippingSwitcher", "show");
    //    });
    //}
}
 

GEClient.prototype.LoadUnsupportedPlatform = function () {
    
    //get culture
    var self = this;
    //first load JSON parser to support IE7
    var jsonObjUrl = this.GEBaseURL + "/scripts/json2.js";
    if (typeof JSON !== 'object')
    {
        self.AddScript(jsonObjUrl, function () {
            self.LoadUnsupportedPlatformProc();
        }, true);
    }
    else {
        this.LoadUnsupportedPlatformProc();            
    }
}

//Provides functionality to easly load the welcome & shipping and currency switcher when needed
GEClient.prototype.LoadWelcome = function (country, culture, currency, callback) {
    var self = this;
    var root = this.GetCDNUrl();
    this.InitABData(function () {             
        self.InitMobileDevices(function () {
            if (!self.IsPlatformSupported()) return;
            self.RegisterOnBeforePopup("welcome", country, culture, currency, function () {
                baseurl = root + "merchant/script/welcome?merchantid=" + self.MerchantID + "&country=" + country + "&culture=" + culture + "&currency=" + currency + "&v=" + self.GetSkinVersion() + "&environment=" + self.SkinEnvironmentCode + "&ismobile=" + self.IsMobile;
                var cacheBuster = GlobalE.MPH.Get(MPH.K.CacheBuster, MPH.T.String);
                if (cacheBuster != null) {
                    baseurl += "&cb=" + cacheBuster;
                }
                baseurl = self.AppendAB(baseurl);
                self.WelcomeUrl = baseurl;
                self.AddScript(baseurl, callback, true);
            });

        });
    });

}
 
GEClient.prototype.GetQueryParam = function (q) {
    var match = RegExp('[?&]' + q + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
    
GEClient.prototype.PushSwitcherLoaded = function (country, culture, currency) {
    this.SwitcherScriptsArr.push({ country: country, culture: culture, currency: currency });
}

GEClient.prototype.IsSwitcherLoaded = function(country, culture, currency) {
    for (var i = 0; i < this.SwitcherScriptsArr.length; i++) {

        for (var prop in this.SwitcherScriptsArr[i]) {
            //alert(keys[i][prop]);
            var allMatch = true;

            switch (prop) {
                case "country":
                    allMatch = allMatch && this.SwitcherScriptsArr[i][prop] == country; break;
                case "culture":
                    allMatch = allMatch && this.SwitcherScriptsArr[i][prop] == culture; break;
                case "currency":
                    allMatch = allMatch && this.SwitcherScriptsArr[i][prop] == currency; break;
            }


        }
        if (allMatch) {
            return true;//key was already added
        }

    }

    return false;//key was not found!
}


GEClient.prototype.LoadShippingSwitcherEx = function (autoShow, callback,isModal) {
    //get info from cookie
    var cookieData = this.GetCookie(GlobalE.GE_DATA_COOKIE, true);
    isModal = this.IsUndefined(isModal) ? false : isModal;
    this.LoadShippingSwitcher(cookieData.countryISO,cookieData.cultureCode, cookieData.currencyCode, autoShow, callback, null,isModal);
}

GEClient.prototype.LoadShippingSwitcher = function (country, culture, currency, as, callback, callOnBeforeCallback, isModal) {
    
    if (!this.IsPlatformSupported()) return;
    if (this.LoadShippingSwitcherCalled) {
        if (!this.IsUndefined(callback)) {
            callback();
        }
        return;
    }
    var self = this;
    var root = this.GetCDNUrl();
    this.LoadShippingSwitcherCalled = true;
    this.InitABData(function () {
        self.InitMobileDevices(function () {
            as = self.IsUndefined(as) ? false : as;
            callOnBeforeCallback = self.IsUndefined(callOnBeforeCallback) ? true : callOnBeforeCallback;

            self.RegisterOnBeforePopup("switcher", country, culture, currency, function () {
                baseurl = root + "merchant/changeshippingandcurrency?autoshow=" + as + "&merchantid=" + self.MerchantID + "&country=" + country + "&culture=" + culture + "&currency=" + currency + "&v=" + self.ScriptsVersion + "&environment=" + self.SkinEnvironmentCode;
                var cacheBuster = GlobalE.MPH.Get(MPH.K.CacheBuster, MPH.T.String);
                if (cacheBuster != null) {
                    baseurl += "&cb=" + cacheBuster;
                }
                baseurl = self.AppendAB(baseurl);
                self.SwitcherUrl = baseurl;
                var overloadCallback = function () {
                    if (!self.IsUndefined(callback)) {
                        callback();
                    }

                    if (!self.IsUndefined(isModal) && isModal) {
                        //force modal behaviour
                        GlobalE.ShippingSwitcher.ForceModal();
                    }
                }
                self.AddScript(baseurl, overloadCallback, true);
            });
        });
    });
}
GEClient.prototype.GetActionData = function (objAction) {
    var actionName = objAction[0];
    var order = 1000;
    for (var item in this.QueuePriorities)
    {
        if (item == actionName) {
            //action has priority
            order = this.QueuePriorities[item];
        }
    }
    
    return {
        isOrdered: order!=0,
        order: order
    };
}

GEClient.prototype.DOMReady = function r(f) { /in/.test(document.readyState) ? setTimeout(r, 9, f) : f() }

GEClient.prototype.GetCDNUrl = function () {
    var cdnEnabled = GlobalE.MPH.Get(MPH.K.CDNEnabled, MPH.T.Bool);
 
    var url = GlobalE.MPH.Get(MPH.K.CDNUrl, MPH.T.String);
    if (url == null || !cdnEnabled) {
        url = this.GEBaseURL;
    }
   
    var valid = url.indexOf("/", url.length - 1) !== -1;
    if (!valid) url += "/";

    return url;    
}

GEClient.prototype.GetSkinVersion = function () {
    return (GlobalE.MPH.Get(MPH.K.SkinVersion, MPH.T.String));
}
    

GEClient.prototype.Checkout = function (token, container, optCulture, optComplete) {
    var self = this;
    this.InitABData(function () {
        var isv2 = GlobalE.MPH.Get(MPH.K.IsV2Checkout, MPH.T.Bool);
        var url = "Merchant/Script/Checkout";
        url += isv2 ? "V2" : "";
        baseurl = self.GEBaseURL + url + "?token=" + token + "&environment=" + self.SkinEnvironmentCode;
        if (optCulture) baseurl += "&culture=" + culture;
        var cacheBuster = GlobalE.MPH.Get(MPH.K.CacheBuster, MPH.T.String);
        if (cacheBuster != null) {
            baseurl += "&cb=" + cacheBuster;
        }
        baseurl += "&v=" + self.ScriptsVersion;
        baseurl += "&jq=";
        //detect jQuery
        if (typeof jQuery == 'undefined') {
            // jQuery is not loaded  
            baseurl += "false";
        } else {
            // jQuery is loaded
            baseurl += "true";
        }
      
        baseurl = self.AppendAB(baseurl);
        self.AddScript(baseurl, function () {
   
            if (optComplete) {
                optComplete();
            }
            GlobalE.CheckoutManager.Checkout(container);
        }, true);
    });
}
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

//Wrap console log if not exists
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };

//merchant parameters handler
function MPH(objParameters) {
    this.P = objParameters;

    MPH.T = {
        Bool: 1,
        String : 2
    }

    MPH.K = {
        AllowClientTracking: "AllowClientTracking",
        FullClientTracking: "FullClientTracking",
        TabletAsMobile: "TabletAsMobile",
        ABEnabled: "ABEnabled",
        SkinVersion: "SkinVersion",
        CDNUrl: "CDNUrl",
        CDNEnabled: "CDNEnabled",
        IsV2Checkout: "IsV2Checkout",
        CacheBuster: "CacheBuster"
    };
    this.Def = [];
    this.Def[MPH.K.AllowClientTracking] = false;
    this.Def[MPH.K.FullClientTracking] = true;
    this.Def[MPH.K.TabletAsMobile] = true;
    this.Def[MPH.K.ABEnabled] = false;
    this.Def[MPH.K.SkinVersion] = "1.0";
    this.Def[MPH.K.CDNUrl] = null;
    this.Def[MPH.K.CDNEnabled] = false;
    this.Def[MPH.K.IsV2Checkout] = false;
    this.Def[MPH.K.CacheBuster] = null;
 
}
MPH.prototype.Get = function (property, type) {
    if (this.P != null && this.P.hasOwnProperty(property)) {
    
        var val = this.P[property].Value;
      
        if (GlobalE.IsUndefined(type)) {
            return val;
        }
        else {
            switch (type) {
                case MPH.T.Bool:             
                    return JSON.parse(val);
                default:
                    return val;
            }
        }
    }
        
    //try default
    if (this.Def.hasOwnProperty(property)) {
        return this.Def[property];
    }
}

 
//Initialize GEClient instance
var GlobalE = new GEClient();
GlobalE.MPH = new MPH(null);
if (!GlobalE.IsUndefined(window[window.globaleObject])) {
    var globaleObj = window[window.globaleObject];
 
  

    //set api version
    GlobalE.ScriptsVersion = globaleObj.v;
    GlobalE.MerchantID = globaleObj.m;
    



    
    //exec Q        
    if (globaleObj.q) {
        var orderedQ = [];
        for (var i = 0; i < globaleObj.q.length; i++) {
            var actionInfo = GlobalE.GetActionData(globaleObj.q[i]);
            orderedQ.push({ order: actionInfo.order, action: globaleObj.q[i] })
        }

        //sort Q
        orderedQ.sort(function (a, b) {
            if (a.order < b.order) {
                return -1;
            }
            else if (a.order > b.order) {
                return 1;
            }
            else {
                return 0;
            }
        });

        


        for (var i = 0; i < orderedQ.length; i++) {              
            GlobalE.HandleQAction(orderedQ[i].action);
        }      
    }

    if (GlobalE.IsClient()) {               
        if (GlobalE.MPH.Get(MPH.K.AllowClientTracking, MPH.T.Bool)) {
            GlobalE.InitABData(function () {
                GlobalE.Track();
            });            
        }
    }


    //bypass q manager
    window[window.globaleObject] = GlobalE.ActionExec;

    GlobalE.InitMobileDevices(function () { });
}


if (GlobalE.IsUndefined(window["glegem"])) {
    //GEM queue was not created yet, set it to function
    window["glegem"] = GlobalE.ActionExec;
    //window["glegem"] = function (event, args) {
      
    //}
}
else { 
    if (glegem.q) {
        var orderedQ = [];
        for (var i = 0; i < glegem.q.length; i++) {
            var actionInfo = GlobalE.GetActionData(glegem.q[i]);
            orderedQ.push({ order: actionInfo.order, action: glegem.q[i] })
        }

        //sort Q
        orderedQ.sort(function (a, b) {
            if (a.order < b.order) {
                return -1;
            }
            else if (a.order > b.order) {
                return 1;
            }
            else {
                return 0;
            }
        });




        for (var i = 0; i < orderedQ.length; i++) {
            GlobalE.HandleQAction(orderedQ[i].action);
        }
    }
}

GlobalE.AttachEvent("load", window, function () {  
    if (!GlobalE.IsPlatformSupported()) {
        //load platform not supported popup
        GlobalE.LoadUnsupportedPlatform();                   
    }
    GlobalE.RegisterEventHandlers();
    if (GlobalE.OnLoadCallBack != null)
    {
        GlobalE.OnLoadCallBack();
    }        
});