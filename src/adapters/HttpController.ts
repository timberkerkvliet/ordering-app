type HttpRequest = {
    body: any
}

class HttpResponse {
    private statusCode: number | undefined;
    private jsonResponse: any;
  
    constructor() {
      this.statusCode = undefined;
      this.jsonResponse = undefined;
    }
  
    status(statusCode: number) {
      this.statusCode = statusCode;
      return this;
    }
  
    json(jsonResponse: any) {
      this.jsonResponse = jsonResponse;
      return this;
    }
  
    getStatus(): number | undefined {
      return this.statusCode;
    }
  
    getJson(): any {
      return this.jsonResponse;
    }
  
  }

interface HttpController {
    handle(request: HttpRequest): HttpResponse;
}

export { HttpController, HttpRequest, HttpResponse}