export const ValidationMessages = {
  // Built-in Validators
  required: 'این فیلد الزامی است.',
  minlength: ({ requiredLength, actualLength }: any) =>
    `حداقل طول باید ${requiredLength} کاراکتر باشد (در حال حاضر ${actualLength} کاراکتر).`,
  maxlength: ({ requiredLength, actualLength }: any) =>
    `حداکثر طول باید ${requiredLength} کاراکتر باشد (در حال حاضر ${actualLength} کاراکتر).`,
  email: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.',
  pattern: 'فرمت وارد شده نامعتبر است.',
  notFound: 'مقدار وارد شده یافت نشد.',

  // Server Errors
  exists: 'این مقدار قبلاً ثبت شده است. لطفاً مقدار دیگری وارد کنید.',
  invalid: 'مقدار وارد شده نامعتبر است.',
  selected: 'مقدار قابل انتخاب نمیباشد',

  // Custom Validators
  fileLength: ({ maxFiles, actualFiles }: any) =>
    `حداکثر ${maxFiles} فایل مجاز است (در حال حاضر ${actualFiles} فایل انتخاب شده است).`,

  // Add more custom validators here
  minFileSize: ({ requiredSize, actualSize }: any) =>
    `حداقل حجم فایل باید ${requiredSize} باشد (در حال حاضر ${actualSize}).`,
  maxFileSize: ({ requiredSize, actualSize }: any) =>
    `حداکثر حجم فایل باید ${requiredSize} باشد (در حال حاضر ${actualSize}).`,
  fileType: ({ allowedTypes }: any) => `فقط فایل‌های با فرمت‌های ${allowedTypes.join(', ')} مجاز هستند.`,
};
