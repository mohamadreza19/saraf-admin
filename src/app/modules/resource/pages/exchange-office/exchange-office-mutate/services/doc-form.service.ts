import { Injectable, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { DocApiService, DocumentModel } from 'src/app/shared/apis/doc-api.service';
import { Alldoc, ExchangeApiService } from 'src/app/shared/apis/exchange-api.service';
import { Language } from 'src/app/shared/apis/language-api.service';
import { FormArray2, FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { DocCombinedControls } from 'src/app/shared/models/doc-combined-controls.interface';
import { AbstractFormService } from 'src/app/shared/types/abstract-form-service.interface';
import { ConvertControlsToAny } from 'src/app/shared/types/convert-controls-to-any';
import { fileLengthValidator } from 'src/app/shared/validators/file-length-validator';
import { FormLabels } from '../constants';
import { convertGregorianTOJalali } from 'src/app/core/utils/convertGregorianToJalali';

@Injectable({
  providedIn: 'root',
})
export class DocFormService implements AbstractFormService {
  data?: Alldoc[];
  mainForm!: CustomFormGroup;
  docsFormArray!: FormArray2;

  docTypes$ = new BehaviorSubject<DocumentModel[]>([]);
  docTypeControl!: FormControl2;

  constructor(private docApi: DocApiService, private exchangeApi: ExchangeApiService) {
    // this.addDoc();
  }

  pushDocForm() {
    //

    const selectedType = this.docTypeControl.getSelectedOptionAsObject() as DocumentModel;

    let controls = {} as DocCombinedControls;

    if (selectedType.title) {
      const documentType = new FormControl2(selectedType.title, {
        label: 'نوع مدرک',
        type: 'select',
        validators: [Validators.required],
        optionObjImportantKey: '_id',
        options: [selectedType.title],
        selectedOptionIndex: 0,

        objOptions: [selectedType],
      });
      documentType.disable();
      controls.documentType = documentType;
    }
    if (selectedType.hasIdnumber) {
      controls.idNumber = new FormControl2('1234', {
        label: 'شناسه',
        type: 'text',
        validators: [Validators.required],
      });
    }
    if (selectedType.hasexpireDate) {
      controls.expireDate = new FormControl2(null, {
        label: 'تاریخ انقضا',
        type: 'date',
        validators: [Validators.required],
      });
    }
    if (selectedType.pagecount) {
      controls.docs = new FormControl2([], {
        type: 'files',
        filesLength: selectedType.pagecount,
        label: 'بارگزاری مدارک',
        validators: [Validators.required, fileLengthValidator(selectedType.pagecount)], // Added required validator
      });
    }
    const docsFormArrayChildForm = new CustomFormGroup(controls);
    this.docsFormArray.push(docsFormArrayChildForm);
    return docsFormArrayChildForm;
  }

  deleteDoc(docIndex: number) {
    // this.docs = this.docs.filter((_, index) => index !== docIndex);
    this.docsFormArray.removeAt(docIndex);
  }
  beforeInit(data: Alldoc[]): void {
    this.data = data;
  }

  init(language$: BehaviorSubject<Language | null>): void {
    language$.subscribe(async (language) => {
      if (language) {
        const docTypes = await lastValueFrom(this.docApi.getAllDocumentTypesByLanguageId(language.id));
        this.docTypes$.next(docTypes);

        // this.pushDocForm();

        if (docTypes.length) {
          this.docTypeControl.setObjOptions(docTypes);
          this.docTypeControl.options = docTypes.map((dt) => dt.title);
          this.docTypeControl.setValue(this.docTypeControl.options[0]);
        }
        console.log('ss');
        if (this.data) {
          for (const docObj of this.data) {
            const mountedDocType = docTypes.find((dt) => dt._id == (docObj.documentType as any));

            if (mountedDocType) {
              this.docTypeControl.setValue(mountedDocType.title);
              const { docs, expireDate, idNumber }: DocCombinedControls = this.pushDocForm().controls as any;

              if (Array.isArray(docObj.docFiles) && docObj.docFiles.length) {
                docs.setValue(docObj.docFiles);
              }
              if (docObj.expireDate && expireDate) {
                expireDate.setValue(convertGregorianTOJalali(docObj.expireDate));
              }
              if (docObj.idNumber && idNumber) {
                idNumber.setValue(docObj.idNumber);
              }
            }
          }
        } else {
          this.pushDocForm();
        }
      }
    });
  }

  apisCall(language$: BehaviorSubject<Language | null>): void {}

  generateControls(docsFormArray: FormArray2): DocControls {
    return {
      documents: docsFormArray,
    };
  }
  generateForm(addDocTemplate: TemplateRef<any>): CustomFormGroup {
    this.docTypeControl = new FormControl2('', {
      label: 'انواع مدارک',
      type: 'select',
      validators: [Validators.required],
      optionObjImportantKey: '_id',
      options: [],
    });
    this.docsFormArray = new FormArray2([]);
    this.docsFormArray.templateRef = addDocTemplate;

    this.docsFormArray.templateContext = {
      add: () => this.pushDocForm(),
      remove: (index) => this.deleteDoc(index),
      docFormArray: this.docsFormArray,
      docTypeControl: this.docTypeControl,
    } as DocTemplateContext;

    const controls = this.generateControls(this.docsFormArray);

    this.mainForm = new CustomFormGroup(controls, FormLabels.Document, 'ذخیره');

    return this.mainForm;
  }
  submit(exchangeId: string, values: ConvertControlsToAny<DocControls>) {
    let body: DocBackEndStandardBody = {
      docs: [],
      documents: [],
    };

    const documentsExceptFiles = (values.documents as ConvertControlsToAny<DocCombinedControls>[]).map((d) => {
      if (Array.isArray(d.docs)) {
        for (const file of d.docs as File[]) {
          body.docs.push(file);
        }
      } else body.docs.push(d.docs);

      delete d.docs;

      return this.normalizeDocument(d as any);
    });
    body.documents = documentsExceptFiles;

    return this.exchangeApi.patchDocumentInfoByExchangeId(exchangeId, body);
  }
  private normalizeDocument(document: MappedDocument): MappedDocument {
    const documentObj = this.docTypes$.getValue().find((d) => d._id == document.documentType);
    let mapped = { ...document };
    if (documentObj) {
      if (!('idNumber' in document)) mapped.idNumber = '';

      if (!('expireDate' in document)) mapped.expireDate = '';
    }

    return mapped;
  }
}
export interface DocControls {
  documents: FormArray2;
}

interface DocTemplateContext {
  docFormArray: FormArray2;
  add: () => void;
  remove: (index: number) => void;
  docTypeControl: FormControl2;
}

export interface DocBackEndStandardBody {
  documents: object[]; // without files
  docs: File[]; // files
}

export interface MappedDocument {
  documentType: string | null;
  idNumber: string | null;
  expireDate: string | null;
}
