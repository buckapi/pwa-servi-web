import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

interface EmailResponse {
  success: boolean;
  message?: string;
}

@Component({
  selector: 'app-planing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './planing.component.html',
  styleUrl: './planing.component.css'
})
export class PlaningComponent {
  hostingForm: FormGroup;
  showForm = false;
  option: string = '';
  constructor(
    public global: GlobalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.hostingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: [''],
      message: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue] // Campo de aceptación de términos
    });

  }
  setService(option: string) {
    this.option = option;
    this.showForm = true;
    this.hostingForm.get('service')?.setValue(option === 'escencial' ? 'Hosting - Plan Escencial' : 'Hosting - Plan Multiple');
  }
  onSubmit() {
    if (this.hostingForm.valid) {
      const formData = this.hostingForm.value;

      // Mostrar alerta de envío en progreso
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
        (response: EmailResponse) => {  // Especificamos que la respuesta tiene el tipo `EmailResponse`
          console.log('Respuesta del servidor:', response);
          if (response.success) {
            Swal.fire({
              title: 'Correo enviado',
              text: '¡Tu mensaje ha sido enviado exitosamente!',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.hostingForm.reset();
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
      console.warn('Formulario no válido');
    }
  }

  sendEmail(data: any) {
    data.clientEmail = data.email;
    data.email = 'contacto@servi-web.com';
    return this.http.post<EmailResponse>('https://db.buckapi.com:3600/api/send-email', data);
  }


}
