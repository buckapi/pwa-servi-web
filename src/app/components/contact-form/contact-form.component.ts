import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone:true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm: FormGroup;

  services = [
    { value: 'dominio', viewValue: 'Dominios' },
    { value: 'hosting', viewValue: 'Paquetes de Hosting' },
    { value: 'desarrollo', viewValue: 'Desarrollo Web' },
    { value: 'soporte', viewValue: 'Soporte' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      // Aquí llamas a tu servicio para enviar el correo.
      this.sendEmail(formData).subscribe(response => {
        console.log('Email sent!', response);
        this.contactForm.reset();
      }, error => {
        console.error('Error sending email', error);
      });
    }
  }

  sendEmail(data: any) {
    // Simulando una llamada a un servicio que envía el correo.
    return this.http.post('https://tuservicio.com/api/send-email', data);
  }
}
