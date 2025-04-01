import { AppInjector } from 'src/app/app.module';
import { ErrorWithFormLabel } from '../utils/error-with-form-label';
import { ScrollService } from '../services/scroll.service';
import { LoadingSnackbarService } from '../services/loading-snackbar.service';

export function HandleFormSubmitErrors(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      // Run your custom logic here
      if (error instanceof ErrorWithFormLabel) {
        const scroll = AppInjector.get(ScrollService);
        const loadingSnackbar = AppInjector.get(LoadingSnackbarService);
      }

      throw error; // Optionally rethrow the error if needed
    }
  };

  return descriptor;
}
