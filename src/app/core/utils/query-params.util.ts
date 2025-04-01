import { inject, Injectable } from '@angular/core';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { PaginationService } from '../services/pagination.service';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { lastValueFrom } from 'rxjs';
import { BaseQuerySearchControls } from 'src/app/shared/types/base-query-search';

@Injectable({
  providedIn: 'root',
})
export class QueryParamUtil {
  // language
  languageApi = inject(LanguageApiService);
  languages!: Language[];
  mountedLanguage!: Language;
  private pg!: PaginationService<any>;

  constructor() {}

  setPagination(pg: PaginationService<any>) {
    this.pg = pg;

    return this;
  }

  async withLanguagePath(controls: BaseQuerySearchControls) {
    this.languages = await lastValueFrom(this.languageApi.getAllLanguages());

    for (const key in controls) {
      if (key == 'language') {
        const languageControl = controls[key];
        languageControl.options = this.languages.map((l) => l.title);
        languageControl.setObjOptions(this.languages);

        if (!this.mountedLanguage) {
          this.mountedLanguage = this.languages[0];
          setTimeout(() => languageControl.setValue(this.mountedLanguage.title), 200);
        }
        if (!languageControl.value && this.mountedLanguage) {
          setTimeout(() => languageControl.setValue(this.mountedLanguage.title), 200);
        }

        languageControl.valueChanges.subscribe(() => {
          const lan = controls.language.getSelectedOptionAsObject() as Language;
          this.mountedLanguage = lan;

          this.pg.initPagination(lan.id);
        });
        // setTimeout()
      } else {
        controls[key].valueChanges.subscribe((value) => {
          const mountedQueries = this.pg.queryParams.set(key, value);
          this.pg.initPagination(this.mountedLanguage.id, mountedQueries);
        });
      }
    }
    if (!this.pg) throw Error('pg not found');
  }

  withoutPath(controls: { [key: string]: FormControl2 }) {
    if (!this.pg) throw Error('pg not found');
  }
}
