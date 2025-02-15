import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { urlToFile } from 'src/app/core/utils/url-to-file.util';
import { CustomFormControl } from 'src/app/shared/form-builder/form-builder.component';
import { fileLengthValidator } from 'src/app/shared/validators/file-length-validator';

@Component({
  selector: 'app-files-input',
  standalone: true,
  imports: [AngularSvgIconModule, NgClass, NgIf, NgFor, PdfViewerModule],
  templateUrl: './files-input.component.html',
})
export class FilesInputComponent implements AfterViewInit {
  _iconUrl = '/assets/icons/material-icons/solid/download.svg';
  _iconUrlImage = '/assets/icons/material-icons/solid/image.svg';

  fileUrlToShow!: {
    src: string;
    index: number;
    type: 'image' | 'pdf';
  };

  @Input()
  control!: CustomFormControl;
  @ViewChild('file')
  fileEl!: ElementRef<HTMLInputElement>;
  timeoutId: any;

  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.filesTypeChecker(this.control.value);
    this.control.valueChanges.subscribe((files: (string | File)[]) => this.filesTypeChecker(files));
  }
  onFilesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];
    const filesLength = this.control.filesLength || 1;
    const controlVal = this.control.value as File[];

    // this.control.setValue(file); // Update the FormControl value

    this._checkFileType(file);

    if (controlVal.length == filesLength) {
      this.control.setErrors({
        filesLength: { requiredSize: 1, actualSize: 1 },
      });
      this.control.markAllAsTouched();

      return;
    }
    this.control.setValue(controlVal.concat(file));

    this.fileUrlToShow = {
      src: this._readFileAsObjectURL(file as File),
      index: this.control.value.length - 1,
      type: 'image',
    };
  }
  onDeleteFile(fileIndex: number): void {
    const newFiles = this.control.value.filter((_: any, index: number) => index !== fileIndex);

    this.control.setValue(newFiles);

    if (newFiles.length) {
      this.fileUrlToShow = {
        src: this._readFileAsObjectURL(newFiles[newFiles.length - 1]),
        index: 0,
        type: 'image',
      };
    } else this.fileUrlToShow = null as any;
    this.control.setErrors(null);
  }
  public _drop(e: DragEvent) {
    e.preventDefault();

    const file = (e.dataTransfer?.files as FileList)[0];
    const filesLength = this.control.filesLength || 1;
    const controlVal = this.control.value as File[];

    this._checkFileType(file);
    this.control.setValue(controlVal.concat(file));

    this.fileUrlToShow = {
      src: this._readFileAsObjectURL(file as File),
      index: this.control.value.length - 1,
      type: 'image',
    };
  }
  _checkFileType(file: File): void {
    const allowedFileTypes = this.control.allowedFileTypes;
    let isInclude = false;
    if (allowedFileTypes) {
      for (let allowedFileType of allowedFileTypes) {
        if (file.type.includes(allowedFileType)) {
          isInclude = true;
          break;
        }
      }
      if (!isInclude) {
        const error = `تنها فایل های ${this.control.allowedFileTypes?.join(' ')} مجاز است`;
        this.control.setErrors([error]);
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
          this.control.setErrors(null);
        }, 1700);
        throw 'error';
      }
    }
  }

  public _fileOver(event: DragEvent) {
    event.preventDefault();
  }
  _getValueAsFiles(file: any): File[] {
    return file;
  }
  public _dragover(event: any) {
    event.preventDefault();
  }
  private _readFileAsObjectURL(file: File) {
    return URL.createObjectURL(file);
  }
  openSelectFile() {
    this.fileEl.nativeElement.click();
  }
  filesTypeChecker(files: (string | File)[]) {
    let needValuesBeUpdate = false;
    if (!files.length) return;
    // Collect promises and update `needValuesBeUpdate` when necessary
    const filePromises = files.map((file) => {
      if (typeof file === 'string') {
        // Set needValuesBeUpdate to true if it's a URL (string)
        needValuesBeUpdate = true;
        return urlToFile(file); // Convert the URL to a File object
      } else {
        return Promise.resolve(file); // Return File as a resolved promise
      }
    });

    if (needValuesBeUpdate) {
      Promise.all(filePromises)
        .then((resolvedFiles) => {
          this.control.setValue(resolvedFiles);
          this.fileUrlToShow = {
            src: this._readFileAsObjectURL(resolvedFiles[resolvedFiles.length - 1]),
            index: this.control.value.length - 1,
            type: 'image',
          };
        })
        .catch((error) => {
          console.error('Error converting URLs to files:', error);
        });
    } else {
      // If no update is needed, handle the case here
    }
  }
}
