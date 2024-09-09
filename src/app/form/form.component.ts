import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileItem, FileType } from '../../models/file.item.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Output() closeForm = new EventEmitter<void>();
  @Output() formEmit = new EventEmitter<FileItem>();

  fileType = FileType;
  fileItem: FileItem = {
    id: '',
    name: '',
    creation: new Date(),
    owners: [{ name: '', avatarUrl: '' }],
    type: FileType.FILE,
    parentId: undefined,
  };

  sendForm(form: NgForm) {
    if (form.valid) {
      this.fileItem.id = Math.random().toString(36).substr(2, 9);
      this.fileItem.owners = this.fileItem.owners.filter(owner => owner.name.trim() !== '' && owner.avatarUrl.trim() !== '');
      this.formEmit.emit(this.fileItem);
      this.closeForm.emit();
      console.log('Form sent', this.fileItem);
    }
    else{
      alert('Please fill all the fields');
      console.log('Form not sent', this.fileItem);
    }
  }

  cancel() {
    this.closeForm.emit();
  }

}
