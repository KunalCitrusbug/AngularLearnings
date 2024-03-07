import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepNavigationService } from '../step-navigation.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  Step4Form: FormGroup;
  constructor(private fb: FormBuilder, private stepNavigationService: StepNavigationService, private router: Router) {
    this.Step4Form = this.fb.group({
      age: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(120)]]
    });
  }

  ngOnInit(): void {
    currentStep$: Observable<number>; 
    this.stepNavigationService.setCurrentStep(4);
  }
  onSubmit() {
    const ageValue = this.Step4Form.controls['age'].value;
    console.log(ageValue)
  
    const storedTempData = localStorage.getItem('temp_data');
    const tempData = storedTempData ? JSON.parse(storedTempData) : {};
    tempData['age'] = ageValue;
  
    try {
      // Attempt to save the updated 'temp_data' object to local storage
      localStorage.setItem('temp_data', JSON.stringify(tempData));

      let user_data;
      if(localStorage.getItem("user_data")){
         user_data = JSON.parse(localStorage.getItem("user_data")||
        "")
      }
      else{
         localStorage.setItem( "user_data",JSON.stringify({}))
         user_data = JSON.parse(localStorage.getItem("user_data")||
        "")
         
      }
      
      let data_obj:any = user_data
      data_obj[String(Object.keys(user_data).length)] = JSON.parse(localStorage.getItem("temp_data") || "")
      localStorage.setItem('user_data',JSON.stringify(
        data_obj
      ))
  
      // If successful, increment the current step
      
      console.log('Updated step 4 temp_data saved to local storage:', tempData);
      this.router.navigate(['/user-list']);
    } catch (error) {
      // Handle any potential errors during local storage save
      console.error('Error saving step4 data to local storage:', error);
    }
  }

  get age(){
    return this.Step4Form.get('age')
  }
  
  prevStep(){
    const currentStep = this.stepNavigationService.getCurrentStep();
    console.log(currentStep,"currr")
    this.stepNavigationService.setCurrentStep(currentStep - 1);
    this.router.navigate([`/step${currentStep - 1}`]);

  }

}