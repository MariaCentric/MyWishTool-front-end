import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarService } from '@windmill/ng-windmill';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit  {
  title = 'MyWishTool';
  files: File[] = [];
  filesList: File[] = [];
  snackBarRef!: MatSnackBarRef<unknown>;
  numberOfFilesAdded = 0;
  statusMessage = '';
  currentDate = new Date();
  // wishes: Object | any;

  constructor(private readonly snackbarService: SnackbarService, private readonly liveAnnouncer: LiveAnnouncer, ) {} 
  // private http: HttpClient

  getUploadedFiles(event: File[]): void {
    this.files = this.filterFileTypes(event);
  }

  getUploadedFilesList(event: File[]): void {
    this.filesList = this.filterFileTypes(event);
  }

  async onFilesAdded(addedFiles: File[]): Promise<void> {
    this.numberOfFilesAdded = this.filterFileTypes(addedFiles).length;

    if (this.numberOfFilesAdded) {
      this.statusMessage =
        this.numberOfFilesAdded === 1
          ? `${this.numberOfFilesAdded} file was added`
          : `${this.numberOfFilesAdded} files were added`;
    } else {
      this.statusMessage = 'No files were added';
    }

    return this.liveAnnouncer.announce(this.statusMessage);
  }

  filterFileTypes(files: File[]): File[] {
    const acceptedFiles: File[] = [];
    files.forEach(file => {
      if (
        file.type.includes('text') ||
        file.type.includes('pdf') ||
        file.type.includes('json') ||
        file.type.includes('officedocument') ||
        file.type.includes('msword')
      ) {
        acceptedFiles.push(file);
      }
    });
    return acceptedFiles;
  }

  errorIfDuplicated(event: File): void {
    this.snackBarRef = this.snackbarService.openSnackbar({
      data: {
        message: `${event.name} file is duplicated.`,
        icon: 'exclamation-circle_b'
      }
    });
  }

  deleteAttachment(index: number): void {
    this.snackBarRef = this.snackbarService.openSnackbar({
      data: {
        message: 'File has been deleted.',
        icon: 'cancel-circle_b'
      }
    });
    this.files.splice(index, 1);
  }

  deleteFile(index: number): void {
    this.snackBarRef = this.snackbarService.openSnackbar({
      data: {
        message: 'File has been deleted.',
        icon: 'cancel-circle_b'
      }
    });
    this.filesList.splice(index, 1);
  }
   
  ngOnInit(): void {
    // this.http.get('https://localhost:7298/api/MyWish/uploadfile').subscribe((data) => this.wishes = data);
  }

}