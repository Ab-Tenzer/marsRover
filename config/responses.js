
//http://www.restapitutorial.com/httpstatusstatuss.html

export default class Responses {
    constructor() {}
  
    success = (status, message, data) => {
          /**
           * 2xx Success
              200 OK
              201 Created
              202 Accepted
              203 Non-Authoritative Information
              204 No Content
              205 Reset Content
              206 Partial Content
              207 Multi-Status (WebDAV)
              208 Already Reported (WebDAV)
              226 IM Used
          */
      return { status, message, data };
    };
  
    error = (status, message, data, error) => {
      /**
       * 425 Reserved for WebDAV
          426 Upgrade Required
          428 Precondition Required
          429 Too Many Requests
          431 Request Header Fields Too Large
          444 No Response (Nginx)
          449 Retry With (Microsoft)
          450 Blocked by Windows Parental Controls (Microsoft)
          451 Unavailable For Legal Reasons
          499 Client Closed Request (Nginx)
      */
      return { status, message, data, error };
    };
  }