import { IFormBuilder, IFormGroup } from '@rxweb/types';

export interface FeleceForm<T> {
  formGroup: IFormGroup<T>;
  formBuilder: IFormBuilder;

  ngOnInit(): void;
  onSubmit(): void;
  createForm(): void;
}
