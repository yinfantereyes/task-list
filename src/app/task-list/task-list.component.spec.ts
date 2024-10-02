import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import {SafeHtml} from "@angular/platform-browser";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isIconOnly based on window width', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1200);
    component.ngOnInit();
    expect(component.isIconOnly).toBeTrue();
  });

  it('should show the task form', () => {
    component.showTaskForm();
    expect(component.showAddTaskForm).toBeTrue();
  });

  it('should hide the task form', () => {
    component.hideTaskForm();
    expect(component.showAddTaskForm).toBeFalse();
    expect(component.taskName).toBe('');
    expect(component.taskIndex).toBe(-1);
    expect(component.isInsert).toBeFalse();
    expect(component.isEdit).toBeFalse();
  });

  it('should set isInsert to true and show the task form', () => {
    component.addTask();
    expect(component.isInsert).toBeTrue();
    expect(component.showAddTaskForm).toBeTrue();
  });

  it('should set isEdit to true and show the task form with selected task', () => {
    const task = 'Test Task';
    const index = 1;
    component.editTask(task, index);
    expect(component.isEdit).toBeTrue();
    expect(component.taskName).toBe(task);
    expect(component.taskIndex).toBe(index);
    expect(component.showAddTaskForm).toBeTrue();
  });

  it('should add a new task when isInsert is true', () => {
    component.isInsert = true;
    const taskName = 'New Task';
    component.saveTask(taskName);
    expect(component.taskList).toContain(taskName);
  });

  it('should edit an existing task when isEdit is true', () => {
    component.isEdit = true;
    component.taskList = ['Task 1', 'Task 2'];
    component.taskIndex = 1;
    const taskName = 'Updated Task';
    component.saveTask(taskName);
    expect(component.taskList[1]).toBe(taskName);
  });

  it('should format task with tags, emails, mentions, and links', () => {
    const task = 'Task with #tag, email@example.com, @mention, and www.example.com';
    const formattedTask: SafeHtml = component.formatTask(task);
    const sanitizedTask = component['sanitizer'].sanitize(1, formattedTask) as string;

    expect(sanitizedTask).toContain('<span class="tag-style font-bold">#tag</span>');
    expect(sanitizedTask).toContain('<span class="email-style font-bold">email@example.com</span>');
    expect(sanitizedTask).toContain('<span class="mention-style font-bold">@mention</span>');
    expect(sanitizedTask).toContain('<span class="link-style font-bold">www.example.com</span>');
  });
});
