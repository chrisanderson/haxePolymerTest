/**
 * ...
 * @author Chris Anderson
 */

	"use strict";
	
	Polymer('polymer-ajax', {
      /**
       * The URL target of the request.
       * 
       * @attribute url
       * @type string
       * @default ''
       */
      url: '',
      /**
       * Specifies what data to store in the `response` property, and
       * to deliver as `event.response` in `response` events.
       * 
       * One of:
       * 
       *    `text`: uses `XHR.responseText`.
       *    
       *    `xml`: uses `XHR.responseXML`.
       *    
       *    `json`: uses `XHR.responseText` parsed as JSON.
       *  
       * @attribute handleAs
       * @type string
       * @default 'text'
       */
      handleAs: '',
      /**
       * If true, automatically performs an Ajax request when either `url` or `params` changes.
       *
       * @attribute auto
       * @type boolean
       * @default false
       */
      auto: false,
      /**
       * Parameters to send to the specified URL, as JSON.
       *  
       * @attribute params
       * @type string (JSON)
       * @default ''
       */
      params: '',
      /**
       * Returns the response object.
       *
       * @attribute response
       * @type Object
       * @default null
       */
      response: null,
      /**
       * The HTTP method to use such as 'GET', 'POST', 'PUT', or 'DELETE'.
       * Default is 'GET'.
       *
       * @attribute method
       * @type string
       * @default ''
       */
      method: '',
      /**
       * HTTP request headers to send.
       *
       * Example:
       *
       *     <polymer-ajax auto url="http://somesite.com"
       *         headers='{"X-Requested-With": "XMLHttpRequest"}'
       *         handleAs="json"
       *         on-polymer-response="{{handleResponse}}">
       *     </polymer-ajax>
       *  
       * @attribute headers
       * @type Object
       * @default null
       */
      headers: null,
      /**
       * Optional raw body content to send when method === "POST".
       *
       * Example:
       *
       *     <polymer-ajax method="POST" auto url="http://somesite.com"
       *         body='{"foo":1, "bar":2}'>
       *     </polymer-ajax>
       *  
       * @attribute body
       * @type Object
       * @default null
       */
      body: null,
      /**
       * Content type to use when sending data.
       *
       * @attribute contentType
       * @type string
       * @default 'application/x-www-form-urlencoded'
       */
      contentType: 'application/x-www-form-urlencoded',
      ready: function() {
        this.xhr = document.createElement('polymer-xhr');
      },
      receive: function(response, xhr) {
        if (this.isSuccess(xhr)) {
          this.processResponse(xhr);
        } else {
          this.error(xhr);
        }
        this.complete(xhr);
      },
      isSuccess: function(xhr) {
        var status = xhr.status || 0;
        return !status || (status >= 200 && status < 300);
      },
      processResponse: function(xhr) {
        var response = this.evalResponse(xhr);
        this.response = response;
        this.fire('polymer-response', {response: response, xhr: xhr});
      },
      error: function(xhr) {
        var response = xhr.status + ': ' + xhr.responseText;
        this.fire('polymer-error', {response: response, xhr: xhr});
      },
      complete: function(xhr) {
        this.fire('polymer-complete', {response: xhr.status, xhr: xhr});
      },
      evalResponse: function(xhr) {
        return this[(this.handleAs || 'text') + 'Handler'](xhr);
      },
      xmlHandler: function(xhr) {
        return xhr.responseXML;
      },
      textHandler: function(xhr) {
        return xhr.responseText;
      },
      jsonHandler: function(xhr) {
        var r = xhr.responseText;
        try {
          return JSON.parse(r);
        } catch (x) {
          return r;
        }
      },
      urlChanged: function() {
        if (!this.handleAs) {
          var ext = String(this.url).split('.').pop();
          switch (ext) {
            case 'json':
              this.handleAs = 'json';
              break;
          }
        }
        this.autoGo();
      },
      paramsChanged: function() {
        this.autoGo();
      },
      autoChanged: function() {
        this.autoGo();
      },
      // TODO(sorvell): multiple side-effects could call autoGo 
      // during one micro-task, use a job to have only one action 
      // occur
      autoGo: function() {
        if (this.auto) {
          this.goJob = this.job(this.goJob, this.go, 0);
        }
      },
      /**
       * Performs an Ajax request to the specified URL.
       *
       * @method go
       */
      go: function() {
        var args = this.xhrArgs || {};
        // TODO(sjmiles): alternatively, we could force POST if body is set
        if (this.method === 'POST') {
          args.body = this.body || args.body;
        }
        args.params = this.params || args.params;
        if (args.params && typeof(args.params) == 'string') {
          args.params = JSON.parse(args.params);
        }
        args.headers = this.headers || args.headers || {};
        if (args.headers && typeof(args.headers) == 'string') {
          args.headers = JSON.parse(args.headers);
        }
        if (this.contentType) {
          args.headers['content-type'] = this.contentType;
        }
        args.callback = this.receive.bind(this);
        args.url = this.url;
        args.method = this.method;
        return args.url && this.xhr.request(args);
      }
    });
	
	//var PolymerAjax = function(){};
	//
	//PolymerAjax.prototype = {
      ///**
       //* The URL target of the request.
       //* 
       //* @attribute url
       //* @type string
       //* @default ''
       //*/
      //url: '',
      ///**
       //* Specifies what data to store in the `response` property, and
       //* to deliver as `event.response` in `response` events.
       //* 
       //* One of:
       //* 
       //*    `text`: uses `XHR.responseText`.
       //*    
       //*    `xml`: uses `XHR.responseXML`.
       //*    
       //*    `json`: uses `XHR.responseText` parsed as JSON.
       //*  
       //* @attribute handleAs
       //* @type string
       //* @default 'text'
       //*/
      //handleAs: '',
      ///**
       //* If true, automatically performs an Ajax request when either `url` or `params` changes.
       //*
       //* @attribute auto
       //* @type boolean
       //* @default false
       //*/
      //auto: false,
      ///**
       //* Parameters to send to the specified URL, as JSON.
       //*  
       //* @attribute params
       //* @type string (JSON)
       //* @default ''
       //*/
      //params: '',
      ///**
       //* Returns the response object.
       //*
       //* @attribute response
       //* @type Object
       //* @default null
       //*/
      //response: null,
      ///**
       //* The HTTP method to use such as 'GET', 'POST', 'PUT', or 'DELETE'.
       //* Default is 'GET'.
       //*
       //* @attribute method
       //* @type string
       //* @default ''
       //*/
      //method: '',
      ///**
       //* HTTP request headers to send.
       //*
       //* Example:
       //*
       //*     <polymer-ajax auto url="http://somesite.com"
       //*         headers='{"X-Requested-With": "XMLHttpRequest"}'
       //*         handleAs="json"
       //*         on-polymer-response="{{handleResponse}}">
       //*     </polymer-ajax>
       //*  
       //* @attribute headers
       //* @type Object
       //* @default null
       //*/
      //headers: null,
      ///**
       //* Optional raw body content to send when method === "POST".
       //*
       //* Example:
       //*
       //*     <polymer-ajax method="POST" auto url="http://somesite.com"
       //*         body='{"foo":1, "bar":2}'>
       //*     </polymer-ajax>
       //*  
       //* @attribute body
       //* @type Object
       //* @default null
       //*/
      //body: null,
      ///**
       //* Content type to use when sending data.
       //*
       //* @attribute contentType
       //* @type string
       //* @default 'application/x-www-form-urlencoded'
       //*/
      //contentType: 'application/x-www-form-urlencoded',
      //ready: function() {
        //this.xhr = document.createElement('polymer-xhr');
      //},
      //receive: function(response, xhr) {
        //if (this.isSuccess(xhr)) {
          //this.processResponse(xhr);
        //} else {
          //this.error(xhr);
        //}
        //this.complete(xhr);
      //},
      //isSuccess: function(xhr) {
        //var status = xhr.status || 0;
        //return !status || (status >= 200 && status < 300);
      //},
      //processResponse: function(xhr) {
        //var response = this.evalResponse(xhr);
        //this.response = response;
        //this.fire('polymer-response', {response: response, xhr: xhr});
      //},
      //error: function(xhr) {
        //var response = xhr.status + ': ' + xhr.responseText;
        //this.fire('polymer-error', {response: response, xhr: xhr});
      //},
      //complete: function(xhr) {
        //this.fire('polymer-complete', {response: xhr.status, xhr: xhr});
      //},
      //evalResponse: function(xhr) {
        //return this[(this.handleAs || 'text') + 'Handler'](xhr);
      //},
      //xmlHandler: function(xhr) {
        //return xhr.responseXML;
      //},
      //textHandler: function(xhr) {
        //return xhr.responseText;
      //},
      //jsonHandler: function(xhr) {
        //var r = xhr.responseText;
        //try {
          //return JSON.parse(r);
        //} catch (x) {
          //return r;
        //}
      //},
      //urlChanged: function() {
        //if (!this.handleAs) {
          //var ext = String(this.url).split('.').pop();
          //switch (ext) {
            //case 'json':
              //this.handleAs = 'json';
              //break;
          //}
        //}
        //this.autoGo();
      //},
      //paramsChanged: function() {
        //this.autoGo();
      //},
      //autoChanged: function() {
        //this.autoGo();
      //},
      //// TODO(sorvell): multiple side-effects could call autoGo 
      //// during one micro-task, use a job to have only one action 
      //// occur
      //autoGo: function() {
        //if (this.auto) {
          //this.goJob = this.job(this.goJob, this.go, 0);
        //}
      //},
      ///**
       //* Performs an Ajax request to the specified URL.
       //*
       //* @method go
       //*/
      //go: function() {
        //var args = this.xhrArgs || {};
        //// TODO(sjmiles): alternatively, we could force POST if body is set
        //if (this.method === 'POST') {
          //args.body = this.body || args.body;
        //}
        //args.params = this.params || args.params;
        //if (args.params && typeof(args.params) == 'string') {
          //args.params = JSON.parse(args.params);
        //}
        //args.headers = this.headers || args.headers || {};
        //if (args.headers && typeof(args.headers) == 'string') {
          //args.headers = JSON.parse(args.headers);
        //}
        //if (this.contentType) {
          //args.headers['content-type'] = this.contentType;
        //}
        //args.callback = this.receive.bind(this);
        //args.url = this.url;
        //args.method = this.method;
        //return args.url && this.xhr.request(args);
      //}
    //}
		
		//PolymerAjax.create(PolymerAjax.prototype.constructor);
		
		//var PolymerAjax = function()
		//{
		///**
       //* The URL target of the request.
       //* 
       //* @attribute url
       //* @type string
       //* @default ''
       //*/
      //var url = '';
      ///**
       //* Specifies what data to store in the `response` property, and
       //* to deliver as `event.response` in `response` events.
       //* 
       //* One of:
       //* 
       //*    `text`: uses `XHR.responseText`.
       //*    
       //*    `xml`: uses `XHR.responseXML`.
       //*    
       //*    `json`: uses `XHR.responseText` parsed as JSON.
       //*  
       //* @attribute handleAs
       //* @type string
       //* @default 'text'
       //*/
      //var handleAs = '';
      ///**
       //* If true, automatically performs an Ajax request when either `url` or `params` changes.
       //*
       //* @attribute auto
       //* @type boolean
       //* @default false
       //*/
      //var auto = false;
      ///**
       //* Parameters to send to the specified URL, as JSON.
       //*  
       //* @attribute params
       //* @type string (JSON)
       //* @default ''
       //*/
      //var params = '';
      ///**
       //* Returns the response object.
       //*
       //* @attribute response
       //* @type Object
       //* @default null
       //*/
      //var response = null;
      ///**
       //* The HTTP method to use such as 'GET', 'POST', 'PUT', or 'DELETE'.
       //* Default is 'GET'.
       //*
       //* @attribute method
       //* @type string
       //* @default ''
       //*/
      //var method = '';
      ///**
       //* HTTP request headers to send.
       //*
       //* Example:
       //*
       //*     <polymer-ajax auto url="http://somesite.com"
       //*         headers='{"X-Requested-With": "XMLHttpRequest"}'
       //*         handleAs="json"
       //*         on-polymer-response="{{handleResponse}}">
       //*     </polymer-ajax>
       //*  
       //* @attribute headers
       //* @type Object
       //* @default null
       //*/
      //var headers = null;
      ///**
       //* Optional raw body content to send when method === "POST".
       //*
       //* Example:
       //*
       //*     <polymer-ajax method="POST" auto url="http://somesite.com"
       //*         body='{"foo":1, "bar":2}'>
       //*     </polymer-ajax>
       //*  
       //* @attribute body
       //* @type Object
       //* @default null
       //*/
      //var body = null;
      ///**
       //* Content type to use when sending data.
       //*
       //* @attribute contentType
       //* @type string
       //* @default 'application/x-www-form-urlencoded'
       //*/
      //var contentType = 'application/x-www-form-urlencoded';
			//
      //var ready = function() {
        //this.xhr = document.createElement('polymer-xhr');
      //};
			//
      //var receive = function(response, xhr) {
        //if (this.isSuccess(xhr)) {
          //this.processResponse(xhr);
        //} else {
          //this.error(xhr);
        //}
        //this.complete(xhr);
      //};
			//
      //var isSuccess = function(xhr) {
        //var status = xhr.status || 0;
        //return !status || (status >= 200 && status < 300);
      //};
			//
      //var processResponse = function(xhr) {
        //var response = this.evalResponse(xhr);
        //this.response = response;
        //this.fire('polymer-response', {response: response, xhr: xhr});
      //};
			//
      //var error = function(xhr) {
        //var response = xhr.status + ': ' + xhr.responseText;
        //this.fire('polymer-error', {response: response, xhr: xhr});
      //};
			//
      //var complete = function(xhr) {
        //this.fire('polymer-complete', {response: xhr.status, xhr: xhr});
      //};
			//
      //var evalResponse = function(xhr) {
        //return this[(this.handleAs || 'text') + 'Handler'](xhr);
      //};
			//
      //var xmlHandler = function(xhr) {
        //return xhr.responseXML;
      //};
			//
      //var textHandler = function(xhr) {
        //return xhr.responseText;
      //};
			//
      //var jsonHandler = function(xhr) {
        //var r = xhr.responseText;
        //try {
          //return JSON.parse(r);
        //} catch (x) {
          //return r;
        //}
      //};
			//
      //var urlChanged = function() {
        //if (!this.handleAs) {
          //var ext = String(this.url).split('.').pop();
          //switch (ext) {
            //case 'json':
              //this.handleAs = 'json';
              //break;
          //}
        //}
        //this.autoGo();
      //};
			//
      //var paramsChanged = function() {
        //this.autoGo();
      //};
			//
      //var autoChanged = function() {
        //this.autoGo();
      //};
			//
      //// TODO(sorvell): multiple side-effects could call autoGo 
      //// during one micro-task, use a job to have only one action 
      //// occur
      //var autoGo = function() {
        //if (this.auto) {
          //this.goJob = this.job(this.goJob, this.go, 0);
        //}
      //};
			//
      ///**
       //* Performs an Ajax request to the specified URL.
       //*
       //* @method go
       //*/
      //var go = function() {
        //var args = this.xhrArgs || {};
        //// TODO(sjmiles): alternatively, we could force POST if body is set
        //if (this.method === 'POST') {
          //args.body = this.body || args.body;
        //}
        //args.params = this.params || args.params;
        //if (args.params && typeof(args.params) == 'string') {
          //args.params = JSON.parse(args.params);
        //}
        //args.headers = this.headers || args.headers || {};
        //if (args.headers && typeof(args.headers) == 'string') {
          //args.headers = JSON.parse(args.headers);
        //}
        //if (this.contentType) {
          //args.headers['content-type'] = this.contentType;
        //}
        //args.callback = this.receive.bind(this);
        //args.url = this.url;
        //args.method = this.method;
        //return args.url && this.xhr.request(args);
      //}
		//}