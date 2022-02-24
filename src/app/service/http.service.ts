import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string = "http://localhost:8084/employeepayrollservice/";

  constructor(private httpClient: HttpClient) {

  }

  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "get");
  }

  addEmployeeData(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "create", body);
  }

  deleteEmployeeData(empId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "delete/" + empId);
  }

  updateEmployeData(id: number, body: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "update/" + id, body);
  }
 
}
