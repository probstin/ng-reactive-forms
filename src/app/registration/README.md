# Registration

## 1) Step One

### `FormGroup`

Step One is a reactive form with 4 `FormControl`'s:
```typescript
this.registrationForm = this.fb.group({
    company: [null, Validators.required],
    registrationNumber: [null],
    managerOverride: [false],
    projectName: [null]
});
```
When initializing the form, we only know that the `company` control is going to be required. The rest of the fields are dynamically configured based on the `company` selected.

In this case, `GOOGLE` is a special company that requires an additional `registrationNumber` control to complete the form.

### `Input()`'s

| Input | Type | Default Value | Description |
|-------|------|---------------|-------------|
`registration`|`any`|`null`|The registration object that the parent component keeps track of. Can contain all or none of the form controls. Used during initialization to pre-populate the form in the event it's being loaded as a result of a previous page action.
`isCompanyGoogle`|`boolean`|`false`|Boolean flag indicating whether/not the selected company is `GOOGLE`. This has various affects on the form like showing the Registration Number field. The flag gets set at the parent level through the `companySelected` `EvenEmitter`.
`isUserSystemManager`|`boolean`|`false`|Indicates the role of the user. System Managers are able to override invalid Registration Numbers.

### Decision Flow

#### > Form Initialized

- No company selected
- `registrationNumber` control **is not** visible

#### > Company selected

- `companyControl.valueChanges` subscription is triggered
- Emit the selected string value to the parent `registration` component to fulfill the `isCompanyGoogle` variable
- If the company selected **is** `GOOGLE`...
    - `registrationNumber` control becomes visible
    - `registrationNumber` synchronous validators are set: `required` & `minLength(6)`
    - `registrationNumber` asynchronous validators are set: `SetpOneValidator`
- If the company selected **is not** `GOOGLE`...
    - `registrationNumber` control remains hidden
    - `registrationNumber` control validators are set to `null`
    - `registrationNumber` asynchronous validators are set to `null`
- Reset the value of the `registrationNumber` control
- Reset the validity of the `registrationNumber` control with `updateValueAndValidity()`
- If the company selected **is not** `GOOGLE`, the form is now valid and can be submitted

#### > Validating

- If the `registrationNumber` control appears, it is now `required`
- Once the `required` & `minLength(6)` Validators have been met, the async validator `StepOneValidator` will kick in
- The `StepOneValidator` sends an XHR request in the background containing the number entered and returns a `true | null` value indicating there is or is not a `duplicateNumber` error (respectively).
- If the number entered is `invalid`, the form will remain invalid and unable to be submitted
- The user can re-enter and the `StepOneValidator` will kick in again

#### > Manager Override

- If the user `isUserSystemManager` and the number is `invalid`, a checkbox will appear allowing them to "Use this number regardless of its duplicate status"
- Selecting the checkbox will not make the `registrationNumber` control valid itself, rather it will make the form submittable with invalid controls

#### > Submission
- With the form valid, the "Next Step" button will become enabled
- Once clicked, the value of the form will be emitted through an `EventEmitter` to the parent

