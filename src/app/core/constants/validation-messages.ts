export const ValidationMessages = {
  required: ' فیلد الزامی است.',
  minlength: ({ requiredLength, actualLength }: any) =>
    `حداقل طول باید ${requiredLength} کاراکتر باشد (در حال حاضر ${actualLength} کاراکتر).`,
  maxlength: ({ requiredLength, actualLength }: any) =>
    `حداکثر طول باید ${requiredLength} کاراکتر باشد (در حال حاضر ${actualLength} کاراکتر).`,
  email: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.',
  pattern: 'فرمت نامعتبر است.',
  // Add more custom validators here
};
