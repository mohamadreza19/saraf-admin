import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FilePond, FilePondEvent, FilePondFile, FilePondOptions } from 'filepond';
import { FilePondComponent, FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FormControl2 } from '../../form-builder2/form-builder2.component';
import { urlToFile } from 'src/app/core/utils/url-to-file.util';

registerPlugin(FilePondPluginImagePreview);

@Component({
  selector: 'app-files-input2',
  templateUrl: './files-input2.component.html',
  standalone: true,
  styleUrls: ['./files-input2.component.css'],
  imports: [FilePondModule],
})
export class FilesInput2Component implements AfterViewInit {
  constructor() {}

  @Input()
  control!: FormControl2;

  @ViewChild('myPond') myPond!: FilePondComponent;

  // Localized strings
  labelIdle = $localize`... فایل‌های خود را اینجا رها کنید یا برای آپلود کلیک کنید`;
  labelFilesAdded = $localize`تعداد فایل های افزوده شده: `;

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: this.labelIdle,
    allowBrowse: true,
    allowPaste: true,
    storeAsFile: true,
    server: {
      url: '',
    },
  };

  pondFiles: FilePondOptions['files'] = [];

  ngAfterViewInit(): void {
    this.control.valueChanges.subscribe((filesLink: string[]) => {
      if (typeof filesLink[0] === 'string') {
        const promises: Promise<File>[] = filesLink.map((link) => urlToFile(link));

        Promise.all(promises)
          .then((files) => {
            this.control.setValue(files);
            this.myTypedPond.addFiles(files);
          })
          .catch((error) => {
            console.error($localize`Error fetching or adding files:`, error);
          });
      }
    });
  }

  get myTypedPond(): FilePond {
    return this.myPond as any;
  }

  pondHandleInit() {
    console.log($localize`FilePond has initialised`, this.myPond);
  }

  async pondHandleAddFile(event: any) {
    try {
      this.mutateControl();
    } catch (error) {
      console.log(error);
    }
  }

  async pondHandleRemoveFile(event: any) {
    this.mutateControl();
    this.control.setErrors(null);
  }

  checkFilesLimit(event: any) {
    const file = event.file as FilePondFile;
    const filesLength = this.control.filesLength || 1;
    const files = this.myTypedPond.getFiles();

    if (files.length >= filesLength) {
      this.control.setErrors({
        fileLength: { maxFiles: filesLength, actualFiles: filesLength + 1 },
      });
      this.control.markAllAsTouched();

      files
        .reverse()
        .filter((_, index) => index > filesLength - 1)
        .forEach((pFile) => {
          this.myTypedPond.removeFile(pFile.id);
        });

      return Promise.reject();
    }
    return Promise.resolve();
  }

  mutateControl() {
    const files = this.myTypedPond.getFiles().map((pf) => pf.file);
    this.control.setValue(files);
    this.control.markAsTouched();

    if (files.length) {
      this.pondOptions = {
        ...this.pondOptions,
        labelIdle: `${this.labelFilesAdded} ${files.length}`,
      };
    } else {
      this.pondOptions = {
        ...this.pondOptions,
        labelIdle: this.labelIdle,
      };
    }
  }

  pondHandleActivateFile(event: any) {
    console.log($localize`A file was activated`, event);
  }
}
