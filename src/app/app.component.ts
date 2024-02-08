import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component} from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarService } from '@windmill/ng-windmill';
import { wishes } from 'src/models/wish-properties';
import { WishService } from './services/wish.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  title = 'MyWishTool';
  files: File[] = [];
  filesList: File[] = [];
  snackBarRef!: MatSnackBarRef<unknown>;
  numberOfFilesAdded = 0;
  statusMessage = '';
  currentDate = new Date();
  //This is how you create a wish
  //If you want to inject a service you have to put this in the constructor
  wishes: wishes[] = []
  constructor(private readonly snackbarService: SnackbarService, private readonly liveAnnouncer: LiveAnnouncer, private wishService: WishService) {} 
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
    console.log(JSON.stringify(addedFiles[0]));
    const fileReader = new FileReader();
    fileReader.readAsText(addedFiles[0]);
    fileReader.onload = () => {
    
    var jsonRecords =  (JSON.parse(fileReader.result as string));
    console.log(jsonRecords);
    this.mappingRecords(jsonRecords.records);
    }
    
    return this.liveAnnouncer.announce(this.statusMessage);
    
  }

  mappingRecords(records : any)
  {
    for(let i=0; i < records.length ; i++)
    {
      var wish = {
      ChangeId: records[i].correlation_id,
      ShortDescription: records[i].description,
      ShortName: records[i].short_description,   
      }
      this.wishes.push(wish);
    }
    console.log(this.wishes);
    this.wishService.addWishes(this.wishes).subscribe(response => {console.log("wishesAdded", response)}, error =>{console.log("error", error)}
    );

  }

  filterFileTypes(files: File[]): File[] {
    const acceptedFiles: File[] = [];
    files.forEach(file => {
      if (
    
        file.type.includes('json') 
       
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
   
}