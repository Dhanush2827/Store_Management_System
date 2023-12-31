import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/services/snackbar.service';
import { UserService } from 'src/services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { MatFormFieldAppearance } from '@angular/material/form-field';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password = true;
  confirmPassword = true;
  signupForm:any=FormGroup;
  responseMessage:any;
  appearance: MatFormFieldAppearance = 'fill';
  passwordInputType = 'password';
  confirmPasswordInputType = 'password';




  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    public dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService

    ){ }
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({

      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    
    })
  }
  validateSubmit(){
if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
  return true;
}else{
  return false;
 }
}

togglePasswordVisibility() {
  this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
}

toggleConfirmPasswordVisibility() {
  this.confirmPasswordInputType = this.confirmPasswordInputType === 'password' ? 'text' : 'password';
}


  handleSubmit(){
  this.ngxService.start();
  var formData = this.signupForm.value;
  var data ={
    name:formData.name,
    email:formData.email,
    contactNumber:formData.contactNumber,
    password:formData.password
}

this.userService.signup(data).subscribe((response:any)=>{
  this.ngxService.stop();
  this.dialogRef.close();
  this.responseMessage=response?.message;
  this.snackbarService.openSnackBar(this.responseMessage,"");
  this.router.navigate(['/']);
},(error)=>{
  this.ngxService.stop();
  if(error.error?.message){
    this.responseMessage = error.error?.message;
  }else{
    this.responseMessage=GlobalConstants.genericError;
  }
  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  
});

  }

}
