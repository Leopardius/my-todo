import { FormState, FieldState } from 'formstate';

export class EditModalState {
  // Create a field
  public name = new FieldState('').validators(
    val => !val && 'name is required'
  );

  // Compose fields into a form
  public form = new FormState({
    name: this.name,
  });

  constructor(initNameValue: string) {
    this.name.value = initNameValue;
  }

  public onSubmit = async () => {
    //  Validate all fields
    const res = await this.form.validate();
    // If any errors you would know
    if (res.hasError) {
      console.error(this.form.error);
      return;
    }
    const name = this.name.$;
    this.form.reset();
    return name;
  };
}
