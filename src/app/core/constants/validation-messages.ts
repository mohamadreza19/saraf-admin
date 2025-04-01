export const ValidationMessages = {
  // Built-in Validators
  required: $localize`این فیلد الزامی است.`,
  min: ({ min, actual }: any) => $localize`حداقل طول باید ${min.length} کاراکتر باشد (در حال حاضر ${actual} کاراکتر).`,
  max: ({ max, actual }: any) => $localize`حداکثر طول باید ${max.length} کاراکتر باشد (در حال حاضر ${actual} کاراکتر).`,
  email: $localize`لطفاً یک آدرس ایمیل معتبر وارد کنید.`,
  pattern: $localize`فرمت وارد شده نامعتبر است.`,
  notFound: $localize`مقدار وارد شده یافت نشد.`,

  // Server Errors
  exists: $localize`این مقدار قبلاً ثبت شده است. لطفاً مقدار دیگری وارد کنید.`,
  invalid: $localize`مقدار وارد شده نامعتبر است.`,
  selected: $localize`مقدار قابل انتخاب نمیباشد`,

  // Custom Validators
  fileLength: ({ maxFiles, actualFiles }: any) =>
    $localize`حداکثر ${maxFiles} فایل مجاز است (در حال حاضر ${actualFiles} فایل انتخاب شده است).`,

  length: ({ maxLength, actual }: any) =>
    $localize`حداکثر ${maxLength} طول مجاز است (در حال حاضر ${actual} طول انتخاب شده است).`,

  // Add more custom validators here
  minFileSize: ({ requiredSize, actualSize }: any) =>
    $localize`حداقل حجم فایل باید ${requiredSize} باشد (در حال حاضر ${actualSize}).`,
  maxFileSize: ({ requiredSize, actualSize }: any) =>
    $localize`حداکثر حجم فایل باید ${requiredSize} باشد (در حال حاضر ${actualSize}).`,
  fileType: ({ allowedTypes }: any) => $localize`فقط فایل‌های با فرمت‌های ${allowedTypes.join(', ')} مجاز هستند.`,
};
