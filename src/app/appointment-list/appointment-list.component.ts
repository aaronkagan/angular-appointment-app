import { Component } from '@angular/core';

import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle = '';
  newAppointmentContactName = '';
  newAppointmentContactNumber = '';
  newAppointmentDate = new Date();
  appointments: Appointment[] = [];

  ngOnInit() {
    let savedAppointments = localStorage.getItem('appointments');
    console.log(savedAppointments);
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment = () => {
    // if inputs are filled
    if (
      this.newAppointmentTitle.trim().length &&
      this.newAppointmentContactName.trim().length &&
      this.newAppointmentContactNumber.trim().length
    ) {
      const newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        contactName: this.newAppointmentContactName,
        tel: this.newAppointmentContactNumber,
        date: this.newAppointmentDate,
      };

      this.appointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(this.appointments));

      this.newAppointmentTitle = '';
      this.newAppointmentContactName = '';
      this.newAppointmentContactNumber = '';
      this.newAppointmentDate = new Date();
    }
  };

  deleteAppointment = (index: number) => {
    this.appointments.splice(index, 1);
    // Updating local storage by replacing with the updated array
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  };
}
