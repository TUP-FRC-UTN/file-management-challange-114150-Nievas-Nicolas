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
  viewForm : boolean = false;

  deleteSelectedFiles() {
    const selectedFiles = this.files.filter(file => file.selected);

    if(selectedFiles.length === 0){
      alert('Please select at least one file to delete');
      console.log('No file selected');
      return;
    }

    if(selectedFiles.length > 1 ){
      const confirmDelete = confirm(`You are about to delete ${selectedFiles.length} files/folders. Are you sure?`);

      if(confirmDelete){
        this.files = this.files.filter(file => !file.selected);
        console.log('Files deleted', selectedFiles);
      }
    } else{
      this.files = this.files.filter(file => !file.selected);
      console.log('File deleted', selectedFiles);
    }
    
  }

  showForm() {
    this.viewForm = true;
  }

  hideForm() {
    this.viewForm = false;
  }

  pushForm(file: FileItem) {
    this.files.push({ ...file, selected: false });
    this.files.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === FileType.FOLDER ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }
}