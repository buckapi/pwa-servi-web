import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

interface EmailResponse {
  success: boolean;
  message?: string;
}
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
  
      Swal.fire({
        title: 'Enviando...',
        text: 'Por favor, espera un momento.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      this.sendEmail(formData).subscribe(
        (response: EmailResponse) => {
          Swal.close();
          if (response.success) {
            Swal.fire({
              title: 'Correo enviado',
              text: '¡Tu mensaje ha sido enviado exitosamente!',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.contactForm.reset();
          } else {
            Swal.fire({
              title: 'Error',
              text: response.message || 'Hubo un problema al enviar el correo. Por favor, intenta de nuevo.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: `Error al enviar el correo: ${error.message || 'Intenta de nuevo'}`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al enviar el email', error);
        }
      );
    } else {
      Swal.fire({
        title: 'Formulario no válido',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  
  sendEmail(data: any) {
    data.clientEmail = data.email;
    data.email = 'contacto@servi-web.com';
    return this.http.post<EmailResponse>('https://db.buckapi.com:3600/api/send-email', data);
  }
}
