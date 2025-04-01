import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FormDatalizedBodyInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method == 'POST' || request.method == 'PATCH') {
      const modifiedReq = request.clone({
        body: this.remapData(request.body),
      });

      // // Pass on the modified request
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }

  private remapData(body: any): FormData {
    if (body instanceof FormData) {
      return body;
    }
    return Remap.loopAndCheckBody(body);
  }
}
class Remap {
  static loopAndCheckBody(body: any): any | FormData {
    let shouldUseFormData = false;
    for (let key in body) {
      if (this.isFile(body[key])) {
        shouldUseFormData = true;

        break;
      } else if (this.isFileArray(body[key])) {
        shouldUseFormData = true;

        break;
      }
    }

    if (shouldUseFormData === false) {
      let newBody = { ...body };
      for (let key in body) {
        if (Array.isArray(body[key])) {
          newBody[key] = JSON.stringify(body[key]);
        }
      }

      return newBody;
    } else {
      const formData = new FormData();

      for (let key in body) {
        if (this.isFileArray(body[key])) {
          // Handle array of files
          for (const file of body[key]) {
            formData.append(key, file);
          }
        } else if (this.isFile(body[key])) {
          // Handle single file
          formData.append(key, body[key]);
        } else if (Array.isArray(body[key])) {
          // Handle non-file arrays (e.g., arrays of strings or numbers)
          formData.append(key, JSON.stringify(body[key]));
        } else {
          formData.append(key, body[key]);
        }
      }

      return formData;
    }
  }
  static isFile(file: unknown) {
    return file instanceof File;
  }

  static isFileArray(files: unknown): files is File[] {
    // Check if the input is an array
    if (!Array.isArray(files)) {
      return false;
    }

    // Check if every element in the array is a File object
    return files.every((file) => file instanceof File);
  }
}
