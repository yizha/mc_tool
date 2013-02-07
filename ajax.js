// AjaxRequest object constructor
function AjaxRequest() {
  // Now try the ActiveX (IE) version
 if (window.XMLHttpRequest) {
    try {
      this.request = new XMLHttpRequest();
    } catch(e) {
      this.request = null;
    }
  } else  if (window.ActiveXObject) {
    try {
      this.request = new ActiveXObject("Msxml2.XMLHTTP");
    // Try the older ActiveX object for older versions of IE
    } catch(e) {
      try {
        this.request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        this.request = null;
      }
    }// Try the XMLHttpRequest object first 
  }

// If the request creation failed, notify the user
  if (this.request == null)
    alert("Ajax error creating the request.\n" + "Details: " + e);
}

// Send an Ajax request to the server
AjaxRequest.prototype.send = function(type, url, handler, postDataType, postData) {
  if (this.request != null) {
    // Kill the previous request
    this.request.abort();

	
    // Tack on a dummy parameter to override browser caching
    url += "&dummy=" + new Date().getTime();

    url = '/xmlproxy.php?url=' + encodeURIComponent( url)  ;

    try {
      this.request.onreadystatechange= handler;
  
    this.request.open(type, url, true); // always asynchronous (true)

     if (type.toLowerCase() == "get") {
        // Send a GET request; no data involved
        this.request.send(null);
      } else {
        // Send a POST request; the last argument is data
        this.request.setRequestHeader("Content-Type", postDataType);
        this.request.send(postData);
      }
    } catch(e) {	
      alert("Ajax error communicating with the server.\n" + "Details: " + e.descrition);
    }
  }
}

// Send an Ajax request to the server
AjaxRequest.prototype.sendP = function(type, url, handler,callback_param, postDataType, postData) {
  if (this.request != null) {
    // Kill the previous request
    this.request.abort();

	
    // Tack on a dummy parameter to override browser caching
    url += "&dummy=" + new Date().getTime();

    url = '/xmlproxy.php?url=' + encodeURIComponent( url)  ;

    try {
      this.request.onreadystatechange= function() { handler(callback_param);};
  
    this.request.open(type, url, true); // always asynchronous (true)

     if (type.toLowerCase() == "get") {
        // Send a GET request; no data involved
        this.request.send(null);
      } else {
        // Send a POST request; the last argument is data
        this.request.setRequestHeader("Content-Type", postDataType);
        this.request.send(postData);
      }
    } catch(e) {	
      alert("Ajax error communicating with the server.\n" + "Details: " + e.descrition);
    }
  }
}




AjaxRequest.prototype.getReadyState = function() {
  return this.request.readyState;
}

AjaxRequest.prototype.getStatus = function() {
  return this.request.status;
}

AjaxRequest.prototype.getResponseText = function() {
  return this.request.responseText;
}

AjaxRequest.prototype.getResponseXML = function() {
  var doc=this.request.responseXML
  if( doc== null ) {
    var parser=new DOMParser();
    doc=parser.parseFromString(ajaxReq.getResponseText(),"text/xml");
  }
  return doc;
}
