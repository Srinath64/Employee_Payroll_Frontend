import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder, FormArray} from '@angular/forms'
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';


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
              private router: Router,
              private snackBar: MatSnackBar)
               {
                this.addForm = this.formBuilder.group({
                  name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
                  profilePic: new FormControl('', [Validators.required]),
                  gender: new FormControl('', []),
                  department: this.formBuilder.array([], []),
                  salary: new FormControl('', []),
                  startDate: new FormControl('', []),
                  note: new FormControl('', []) 
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
    this.snackBar.open('Created Successfully!', 'Dismiss', {duration: 4000, verticalPosition: 'top'});
    });
  }

}