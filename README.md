# Simple Form Validator

Almost automatic form validation.

## Usage

Add this javascript file to your html page and it will automatically validate your form for you.

To indicate that a field needs validation add the class "validate" to it

    <input type="text" class="validate" />
    
To indicate that a field is required add the attribute validate_required to it

    <input type="text" class="validate" validate_required />
    
To indicate that a field needs must match a patter, add the attribute validate_reqex="/your-regex/"
      
      <input type="text" class="validate" validate_regex="/your-regex/" />
      
The validation library will validate the validation fields on blur and provide data-hint messages if they do not meet the validation requirements.
     
Your form cannot be submitted until all validation has completed.  If you submit your form, the first field with an error will be scrolled to.
    
This library supports the following html elements:  input, select, textarea, and radio
