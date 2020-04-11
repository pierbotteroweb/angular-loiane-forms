import { FormArray, FormControl, FormGroup } from '@angular/forms'

export class FormValidations{
    static requiredMinCheckbox(min=1){
        let validator = (formArray: FormArray) =>{
          // let values = formArray['controls']
          // let totalChecked = 0
          // for (let i=0;i<values.length;i++){
          //   if(values[i].value){
          //     totalChecked +=1
          //   }
          // }
          let totalChecked = formArray['controls']
          .map(v=>v.value)
          .reduce((total,current)=> current?total+current:total,0)
          return totalChecked >= min ? null : {required: true}
        }
        return validator
      }
    static cepValidator(control: FormControl){
      const cep = control.value
      if (cep && cep !=""){
        const validacep = /^[0-9]{8}$/
        return validacep.test(cep) ? null :{ cepInvalido : true}
      }
      return null
    }
    static cpfValidator(control: FormControl){
      const cpf = control.value
      if (cpf && cpf !=""){
        const validacpf = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/
        // const validacpf = /^[0-9]{8}$/
        return validacpf.test(cpf) ? null :{ cpfInvalido : true}
      }
      return null
    }

    static equalsTo(otherField: string){
      const validator = (formControl: FormControl) =>{
        if(otherField==null){
          throw new Error("É necessário informar um campo.")
        }

        if(!formControl.root|| !(<FormGroup>formControl.root).get(otherField)){
          return null
        }

        console.log((<FormGroup>formControl.root).get(otherField))

        const field = (<FormGroup>formControl.root).get(otherField)

        if(!field){
          throw new Error("É necessário informar um campo válido")
        }

        if(field.value !== formControl.value){
          return { equalsTo : otherField}
        }

        return null
      }

      return validator
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any){
      const config = {
        'required': `${fieldName} é obrigatório.`,
        'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres`,
        'maxlength': `${fieldName} precisa ter no maximo ${validatorValue.requiredLength} caracteres`,
        'cepInvalido': "CEP inválido"
      }

      return config[validatorName]
    }
}