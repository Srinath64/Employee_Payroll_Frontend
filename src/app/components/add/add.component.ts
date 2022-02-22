import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder, FormArray} from '@angular/forms'
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public employee: Employee = new Employee();
  addForm: FormGroup;
  
  departments: Array<any> = [
      {
        id: 1,
        name: "HR",
        value: "HR",
        checked: false
      },
      {
        id: 2,
        name: "Sales",
        value: "Sales",
        checked: false 
      },
      {
        id: 3,
        name: "Finance",
        value: "Finance",
        checked: false  
      },
      {
        id: 4,
        name: "Engineer",
        value: "Engineer",
        checked: false
      },
      {
        id: 5,
        name: "Other",
        value: "Other",
        checked: false 
      }
    ]
  
  constructor(private formBuilder: FormBuilder,
              private httpservice: HttpService,
              private dataService: DataService,
              private router: Router)
               {
      this.addForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
        profile: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        department: this.formBuilder.array([], [Validators.required]),
        salary: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        notes: new FormControl('', [Validators.required]) 
      })
    }

  ngOnInit(): void {
    console.log(this.employee);
  }

   onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.addForm.get('department') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }


  onSubmit(){
    this.employee = this.addForm.value;
    console.log(this.employee);
    this.httpservice.addEmployeeData(this.employee).subscribe((response: any) => {
    console.log(response);
    this.router.navigateByUrl("/home");
    });
  }

}