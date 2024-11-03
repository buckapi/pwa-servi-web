import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';

interface EmailResponse {
  success: boolean;
  message?: string;
}

@Component({
  selector: 'app-domine',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './domine.component.html',
  styleUrls: ['./domine.component.css']
})
export class DomineComponent {
  domineform: FormGroup;
  services = [
    { value: 'Dominio .com', viewValue: 'Dominio .com' },
    { value: 'Dominio .com.mx', viewValue: 'Dominio .com.mx' },
    { value: 'Dominio .org', viewValue: 'Dominio .org' },
    { value: 'Dominio .net', viewValue: 'Dominio .net' }
  ];

  constructor(
    public global: GlobalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.domineform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.domineform.valid) {
      const formData = this.domineform.value;

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
            this.domineform.reset();
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
