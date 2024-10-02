import {AfterViewInit, Component, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RouterModule} from "@angular/router";
import * as feather from 'feather-icons';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {AutoFocus} from "primeng/autofocus";
import { CheckboxModule } from 'primeng/checkbox';
import {NgClass} from "@angular/common";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
    AutoFocus,
    CheckboxModule,
    NgClass
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  public showAddTaskForm: boolean = false;
  public taskName: string = '';
  public taskIndex: number = -1;
  public taskList: string[] = [];
  public isInsert: boolean = false;
  public isEdit: boolean = false;
  public isIconOnly: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.isIconOnly = window.innerWidth < 1230;
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  public showTaskForm () {
    this.showAddTaskForm = true;
  }

  public hideTaskForm () {
    this.taskName = '';
    this.taskIndex = -1;
    this.isInsert = false;
    this.isEdit = false;
    this.showAddTaskForm = false;
  }

  public addTask(){
    this.isInsert = true;
    this.showTaskForm();
  }

  public editTask(selectedTask: string, index: number ){
    this.isEdit = true;
    this.taskName = selectedTask;
    this.taskIndex = index;
    this.showTaskForm();
  }

  public saveTask(taskName: string){
    if(taskName){
      if (this.isInsert){
        this.taskList.push(taskName);
      } else if (this.isEdit){
        this.taskList[this.taskIndex] = taskName;
      }
    }

    this.hideTaskForm();
    console.log(this.taskList)
  }

  formatTask(task: string): SafeHtml {
    let formattedTask = task;

    // Formatear etiquetas
    formattedTask = formattedTask.replace(/#(\w+)/g, '<span class="tag-style font-bold">#$1</span>');

    // Formatear correos electrónicos
    formattedTask = formattedTask.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '<span class="email-style font-bold">$&</span>');

    // Formatear menciones (solo si la arroba está al principio de una palabra)
    formattedTask = formattedTask.replace(/(^|\s)@(\w+)/g, '$1<span class="mention-style font-bold">@$2</span>');

    // Formatear enlaces (solo si comienzan con "www")
    formattedTask = formattedTask.replace(/\b(www\.[^\s]+)\b/g, '<span class="link-style font-bold">$&</span>');

    console.log(formattedTask)

    return this.sanitizer.bypassSecurityTrustHtml(formattedTask);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isIconOnly = window.innerWidth < 1230;
  }
}
