import { Component, inject, OnInit } from '@angular/core';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { ModuleApiService } from 'src/app/shared/apis/module-api.service';
import { lastValueFrom } from 'rxjs';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { reorderAndSliceArray } from 'src/app/core/utils/reorder-and-slice-array';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { withLanguageControl } from 'src/app/core/configs/with-language-control.config';
import { FormControl } from '@angular/forms';
import { BaseQuerySearchControls } from 'src/app/shared/types/base-query-search';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css',
})
export class ModuleComponent implements OnInit {
  tableConfig!: TableConfig;
  data: any[] = [];
  lan = inject(LanguageApiService);
  selectedLan!: Language;

  constructor(private module: ModuleApiService) {}

  async ngOnInit() {
    // Localized title for the component
    this.tableConfig = {
      title: $localize`ماژول ها`, // Localized title
      tableHeader: [$localize`عنوان`], // Localized table header
      form: new CustomFormGroup(withLanguageControl({})),
      tableBody: [],
    };

    const { language }: BaseQuerySearchControls = (this.tableConfig.form as any).controls as any;

    // Fetching available languages
    const languages = await lastValueFrom(this.lan.getAllLanguages());
    language.setObjOptions(languages);
    language.options = languages.map((l) => l.title);

    if (!this.selectedLan) {
      this.selectedLan = languages[0];
      setTimeout(() => language.setValue(this.selectedLan.title), 300);
    }

    language.valueChanges.subscribe(async () => {
      const lan = language.getSelectedOptionAsObject() as Language;
      const modules = await lastValueFrom(this.module.getAllByLanguageId(lan.id));
      this.data = reorderAndSliceArray(modules, ['title']);
    });
  }
}
