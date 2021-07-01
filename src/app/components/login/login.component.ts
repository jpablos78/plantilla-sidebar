import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { LoginService } from './../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("txtUsuario", { static: false, }) txtUsuarioElement: ElementRef;
  @ViewChild("txtClave", { static: false, }) txtClave: ElementRef;
  @ViewChild("btnSave", { static: false, }) btnSave: ElementRef;

  get f() { return this.form.controls; }

  displayWait: boolean = false;

  form: FormGroup;
  errorMsg: string = '';
  key: string;

  //variables que almacenaran las credenciales del usuario que estan grabadas en el PC
  loginPCFE = null;
  clavePCFE = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginPCFE = localStorage.getItem('loginPC');
    this.clavePCFE = localStorage.getItem('clavePC');
    this.buildForm();

    if (this.loginPCFE) {
      this.form.get('txtUsuario').setValue(this.loginPCFE);
      //this.form.get('txtClave').setValue(this.encrDecr.get(this.key, this.clavePCFE));
      this.form.get('chkRecordar').setValue(true);
    }
  }

  ngAfterViewInit() {
    if (this.loginPCFE) {
      this.setFocus(this.btnSave.nativeElement);
    } else {
      this.setFocus(this.txtUsuarioElement.nativeElement);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      txtUsuario: ['', [Validators.required, Validators.maxLength(50)]],
      txtClave: ['', [Validators.required, Validators.maxLength(50)]],
      chkRecordar: [false]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.callService();
    }
  }

  callService() {
    this.callLogin();
  }

  callLogin() {
    const postData = new FormData();

    postData.append('action', 'login');

    this.displayWait = true;

    this.loginService.login(postData);
    this.router.navigate(['/home']);
  }

  setFocus(elm: HTMLInputElement) {
    setTimeout(() => {
      elm.focus()
    }, 300);
  }

  onKeydown(event: any) {
    if (event.key === "Enter") {
      this.ordenFocus(event.target.id);
    }
  }

  onBlur(event: any) {
    if (this.form.controls[event.target.id]) {
      if (this.form.controls[event.target.id].invalid) {
        this.form.controls[event.target.id].markAsDirty();
      }
    }
  }

  ordenFocus(field: string) {
    switch (field) {
      case 'txtUsuario':
        this.setFocus(this.txtClave.nativeElement)
        break;
      case 'txtClave':
        this.setFocus(this.btnSave.nativeElement)
        break;
    }
  }
}