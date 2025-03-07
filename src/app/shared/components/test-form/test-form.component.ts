import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormContainerComponent, FormManager } from 'shared';
import { Form1Service } from './services/form1.service';
import { Form2Service } from './services/form2.service';



@Component({
  standalone: true,
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css'],
  imports: [FormContainerComponent, CommonModule]
})
export class TestFormComponent implements OnInit {

  constructor(public fm: FormManager,
    private form1: Form1Service,
    private form2: Form2Service,
  ) { }

  ngOnInit() {


    this.fm.registerSection(this.form1)

    setTimeout(() => {

      this.fm.registerSection(this.form2)
      console.log('added');
    }, 4000)

  }

}
