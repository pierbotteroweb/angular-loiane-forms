import { FormArray, FormControl } from '@angular/forms'

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
}