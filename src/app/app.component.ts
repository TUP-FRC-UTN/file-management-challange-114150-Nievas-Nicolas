import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem, FileOwner, FileType } from '../models/file.item.model';
import { FILE_LIST, OWNERS } from '../data/file.storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: (FileItem & { selected: boolean})[] = FILE_LIST.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === FileType.FOLDER ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  }).map(file => ({ ...file, selected: false }));
  title = 'file-management';
  owner: FileOwner[] = OWNERS

  deleteSelectedFiles() {
    this.files = this.files.filter(file => !file.selected);
  }

  viewForm : boolean = false;

  showForm() {
    this.viewForm = true;
  }
}