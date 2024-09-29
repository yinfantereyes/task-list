import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import * as feather from 'feather-icons';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {AutoFocus} from "primeng/autofocus";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule,
    PanelModule,
    CardModule,
    AvatarModule,
    InputTextModule,
    FormsModule,
    AutoFocus
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  showAddTaskForm: boolean = false;
  taskName: string = '';

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  showTaskForm () {
    this.showAddTaskForm = true;
  }

  hideTaskForm () {
    this.showAddTaskForm = false;
  }
}
